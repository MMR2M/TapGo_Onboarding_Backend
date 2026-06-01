from __future__ import annotations

import base64
import hashlib
import hmac
import html
import json
import mimetypes
import os
import re
import sqlite3
import subprocess
import imaplib
import tempfile
import textwrap
import time
import uuid
import logging
from dataclasses import dataclass
from contextlib import contextmanager
from datetime import datetime, timezone
from email.message import EmailMessage
from pathlib import Path
from typing import Any
from urllib.parse import urlparse
from urllib.parse import urlencode

import httpx
from flask import Flask, abort, jsonify, redirect, request, send_file, send_from_directory
from jinja2 import Environment, FileSystemLoader, select_autoescape
from werkzeug.utils import secure_filename


BASE_DIR = Path(__file__).resolve().parent
ASSETS_DIR = BASE_DIR / "assets"
TEMPLATES_DIR = BASE_DIR / "templates"
DATA_DIR = BASE_DIR / "data"
STORAGE_DIR = DATA_DIR / "storage"
SUBMISSIONS_DIR = STORAGE_DIR / "submissions"
OUTBOX_DIR = STORAGE_DIR / "outbox"
DATABASE_PATH = DATA_DIR / "tapgo.db"
LOGGER = logging.getLogger("tapgo")

ALLOWED_EXTENSIONS = {"pdf", "jpg", "jpeg", "png", "xlsx", "docx"}
MAX_FILE_SIZE = 20 * 1024 * 1024
MAX_FILES = 10
SUPPORTED_LANGUAGES = {"en", "fr", "de", "it", "tr"}
SUPPORTED_KIOSK_TYPES = {"standing", "wall", "tabletop"}
SUPPORTED_SLA = {"standard", "premium"}
PRICING = {
    "kiosk": 99,
    "pos": 49,
    "sla_premium": 9,
    "terminal": 199,
    "ethernet": 300,
}

LANGUAGE_META = {
    "en": {"label": "English"},
    "fr": {"label": "Français"},
    "de": {"label": "Deutsch"},
    "it": {"label": "Italiano"},
    "tr": {"label": "Türkçe"},
}

CONTRACT_COPY = {
    "en": {
        "bundle_title": "TapGo Contract Bundle",
        "addendum_title": "Commercial Addendum",
        "agreement_title": "General Agreement",
        "provider_title": "Provider",
        "provider_value": "MS-Architecture & Technologies Sàrl (TapGo), Bernstrasse 15a, 3280 Murten, Switzerland",
        "note": "The effective installation date remains blank and is completed on installation day.",
        "duration": "Fixed 36-month term",
        "blank_date": "Completed on installation day",
        "rows": {
            "reference": "Reference",
            "language": "Language",
            "company_name": "Company / legal name",
            "company_address": "Company address",
            "restaurant_name": "Restaurant name",
            "restaurant_address": "Restaurant address",
            "contact_person": "Contact person / signatory",
            "email": "Email address",
            "phone": "Phone number",
            "kiosk_type": "Kiosk type",
            "kiosk_count": "Self-order kiosks",
            "pos_count": "POS systems",
            "printer_count": "Printers",
            "terminal_count": "myPOS terminals",
            "ethernet": "Ethernet installation",
            "sla": "Support plan",
            "contract_duration": "Contract duration",
            "start_date": "Effective start date",
            "monthly_total": "Recurring monthly total",
            "one_time_total": "One-time Stripe total",
            "menu_note": "Back-office note",
        },
        "kiosk_types": {
            "standing": "Standing kiosk",
            "wall": "Wall kiosk",
            "tabletop": "Countertop kiosk",
        },
        "sla": {
            "standard": "Standard (included)",
            "premium": "Premium (+9 CHF/month)",
        },
        "ethernet_yes": "Included",
        "ethernet_no": "Customer self-installs",
        "sections": [
            {
                "title": "1. Contract structure",
                "body": "The commercial addendum governs hardware quantities, service level, and prices. The main agreement governs the legal, technical, and operational clauses. In case of contradiction, commercial terms follow the addendum.",
            },
            {
                "title": "2. Scope",
                "body": "The agreement covers TapGo hardware provision, software access, maintenance, and support for the customer deployment described in this document.",
            },
            {
                "title": "3. Duration and renewal",
                "body": "The contract starts on the day of complete installation and runs for a firm thirty-six month term. It renews yearly unless cancelled in writing at least three months before expiry.",
            },
            {
                "title": "4. Financial model",
                "body": "Recurring monthly fees cover kiosks, one mandatory POS system, and the selected SLA option. Stripe fees, payment terminals, and optional ethernet installation remain outside the recurring contract and are paid separately.",
            },
            {
                "title": "5. Ownership and obligations",
                "body": "TapGo keeps ownership of the provided hardware, software, interfaces, and configurations. The customer must maintain a compliant environment, protect the equipment, and use the system according to operational instructions.",
            },
            {
                "title": "6. Support and exclusions",
                "body": "Standard and Premium support follow the service windows and response expectations described during onboarding. Client internet outages, power problems, misuse, force majeure, and third-party failures remain outside the SLA.",
            },
            {
                "title": "7. Liability and return",
                "body": "The provider is liable only in cases of gross negligence or intent. Lost revenue, indirect damages, and outages caused by internet, electricity, or Stripe are excluded. Hardware must be returned in working condition at the end of the contract.",
            },
        ],
        "signature": {
            "title": "Customer signature",
            "signed_at": "Signed at",
        },
    },
    "fr": {
        "bundle_title": "Dossier Contractuel TapGo",
        "addendum_title": "Avenant Commercial",
        "agreement_title": "Contrat Général",
        "provider_title": "Fournisseur",
        "provider_value": "MS-Architecture & Technologies Sàrl (TapGo), Bernstrasse 15a, 3280 Murten, Suisse",
        "note": "La date effective d'installation reste vide et sera complétée le jour de l'installation.",
        "duration": "Durée ferme de 36 mois",
        "blank_date": "Complété le jour de l'installation",
        "rows": {
            "reference": "Référence",
            "language": "Langue",
            "company_name": "Raison sociale",
            "company_address": "Adresse société",
            "restaurant_name": "Nom du restaurant",
            "restaurant_address": "Adresse restaurant",
            "contact_person": "Personne de contact / signataire",
            "email": "Adresse e-mail",
            "phone": "Téléphone",
            "kiosk_type": "Type de borne",
            "kiosk_count": "Bornes de commande",
            "pos_count": "Systèmes POS",
            "printer_count": "Imprimantes",
            "terminal_count": "Terminaux myPOS",
            "ethernet": "Installation Ethernet",
            "sla": "Niveau de support",
            "contract_duration": "Durée du contrat",
            "start_date": "Date d'effet",
            "monthly_total": "Total mensuel récurrent",
            "one_time_total": "Total Stripe paiement unique",
            "menu_note": "Note back-office",
        },
        "kiosk_types": {
            "standing": "Borne debout",
            "wall": "Borne murale",
            "tabletop": "Borne comptoir",
        },
        "sla": {
            "standard": "Standard (inclus)",
            "premium": "Premium (+9 CHF/mois)",
        },
        "ethernet_yes": "Inclus",
        "ethernet_no": "Installation par le client",
        "sections": [
            {
                "title": "1. Structure contractuelle",
                "body": "L'avenant commercial régit les quantités de matériel, le niveau de service et les prix. Le contrat principal régit les clauses juridiques, techniques et opérationnelles. En cas de contradiction, les éléments commerciaux suivent l'avenant.",
            },
            {
                "title": "2. Objet",
                "body": "Le contrat couvre la mise à disposition du matériel TapGo, l'accès au logiciel, la maintenance et le support pour le déploiement client décrit dans ce dossier.",
            },
            {
                "title": "3. Durée et renouvellement",
                "body": "Le contrat débute le jour de l'installation complète et court sur une durée ferme de trente-six mois. Il se renouvelle ensuite annuellement sauf résiliation écrite au moins trois mois avant échéance.",
            },
            {
                "title": "4. Modèle financier",
                "body": "Les frais mensuels récurrents couvrent les bornes, un système POS obligatoire et le SLA choisi. Les frais Stripe, les terminaux de paiement et l'installation Ethernet optionnelle restent hors du contrat récurrent et sont payés séparément.",
            },
            {
                "title": "5. Propriété et obligations",
                "body": "TapGo conserve la propriété du matériel, du logiciel, des interfaces et des configurations fournis. Le client doit maintenir un environnement conforme, protéger l'équipement et utiliser le système selon les instructions opérationnelles.",
            },
            {
                "title": "6. Support et exclusions",
                "body": "Les options Standard et Premium suivent les horaires de service et attentes de réponse décrits pendant l'onboarding. Les coupures internet du client, problèmes électriques, mauvaise utilisation, force majeure et incidents tiers restent hors SLA.",
            },
            {
                "title": "7. Responsabilité et restitution",
                "body": "Le fournisseur n'est responsable qu'en cas de faute grave ou intentionnelle. Les pertes de chiffre d'affaires, dommages indirects et interruptions liées à internet, l'électricité ou Stripe sont exclus. Le matériel doit être restitué en bon état à la fin du contrat.",
            },
        ],
        "signature": {
            "title": "Signature du client",
            "signed_at": "Signé le",
        },
    },
    "de": {
        "bundle_title": "TapGo Vertragsdossier",
        "addendum_title": "Kommerzielles Addendum",
        "agreement_title": "Hauptvertrag",
        "provider_title": "Anbieter",
        "provider_value": "MS-Architecture & Technologies Sàrl (TapGo), Bernstrasse 15a, 3280 Murten, Schweiz",
        "note": "Das wirksame Installationsdatum bleibt leer und wird am Installationstag ergänzt.",
        "duration": "Feste Laufzeit von 36 Monaten",
        "blank_date": "Am Installationstag auszufüllen",
        "rows": {
            "reference": "Referenz",
            "language": "Sprache",
            "company_name": "Firmenname",
            "company_address": "Firmenadresse",
            "restaurant_name": "Restaurantname",
            "restaurant_address": "Restaurantadresse",
            "contact_person": "Kontaktperson / Unterzeichner",
            "email": "E-Mail-Adresse",
            "phone": "Telefonnummer",
            "kiosk_type": "Kiosktyp",
            "kiosk_count": "Self-Order-Kioske",
            "pos_count": "POS-Systeme",
            "printer_count": "Drucker",
            "terminal_count": "myPOS-Terminals",
            "ethernet": "Ethernet-Installation",
            "sla": "Supportplan",
            "contract_duration": "Vertragsdauer",
            "start_date": "Wirksamkeitsdatum",
            "monthly_total": "Wiederkehrender Monatstotal",
            "one_time_total": "Einmaliger Stripe-Gesamtbetrag",
            "menu_note": "Back-Office-Hinweis",
        },
        "kiosk_types": {
            "standing": "Stehkiosk",
            "wall": "Wandkiosk",
            "tabletop": "Thekenkiosk",
        },
        "sla": {
            "standard": "Standard (inklusive)",
            "premium": "Premium (+9 CHF/Monat)",
        },
        "ethernet_yes": "Enthalten",
        "ethernet_no": "Installation durch Kunden",
        "sections": [
            {
                "title": "1. Vertragsstruktur",
                "body": "Das kommerzielle Addendum regelt Hardwaremengen, Servicelevel und Preise. Der Hauptvertrag regelt rechtliche, technische und operative Klauseln. Im Widerspruchsfall gelten für kommerzielle Punkte die Bestimmungen des Addendums.",
            },
            {
                "title": "2. Leistungsumfang",
                "body": "Der Vertrag deckt die Bereitstellung von TapGo-Hardware, den Softwarezugang, Wartung und Support für die in diesem Dossier beschriebene Kundeneinführung ab.",
            },
            {
                "title": "3. Laufzeit und Verlängerung",
                "body": "Der Vertrag beginnt am Tag der vollständigen Installation und läuft über feste sechsunddreissig Monate. Danach verlängert er sich jährlich, sofern nicht mindestens drei Monate vor Ablauf schriftlich gekündigt wird.",
            },
            {
                "title": "4. Finanzmodell",
                "body": "Die wiederkehrenden Monatsgebühren decken die Kioske, ein obligatorisches POS-System und die gewählte SLA-Option. Stripe-Gebühren, Zahlungsterminals und optionale Ethernet-Installationen bleiben ausserhalb des wiederkehrenden Vertrags und werden separat bezahlt.",
            },
            {
                "title": "5. Eigentum und Pflichten",
                "body": "TapGo behält das Eigentum an der bereitgestellten Hardware, Software, den Interfaces und Konfigurationen. Der Kunde muss eine konforme Umgebung sicherstellen, die Geräte schützen und das System gemäss den Betriebsanweisungen nutzen.",
            },
            {
                "title": "6. Support und Ausschlüsse",
                "body": "Standard- und Premium-Support folgen den während des Onboardings beschriebenen Servicefenstern und Reaktionserwartungen. Kundenseitige Internetausfälle, Stromprobleme, Fehlbedienung, höhere Gewalt und Vorfälle durch Dritte liegen ausserhalb des SLA.",
            },
            {
                "title": "7. Haftung und Rückgabe",
                "body": "Der Anbieter haftet nur bei grober Fahrlässigkeit oder Vorsatz. Umsatzausfälle, indirekte Schäden und Unterbrechungen durch Internet, Strom oder Stripe sind ausgeschlossen. Die Hardware muss am Vertragsende in funktionsfähigem Zustand zurückgegeben werden.",
            },
        ],
        "signature": {
            "title": "Unterschrift des Kunden",
            "signed_at": "Unterzeichnet am",
        },
    },
    "it": {
        "bundle_title": "Dossier Contrattuale TapGo",
        "addendum_title": "Addendum Commerciale",
        "agreement_title": "Contratto Principale",
        "provider_title": "Fornitore",
        "provider_value": "MS-Architecture & Technologies Sàrl (TapGo), Bernstrasse 15a, 3280 Murten, Svizzera",
        "note": "La data effettiva di installazione resta vuota e verrà completata il giorno dell'installazione.",
        "duration": "Durata fissa di 36 mesi",
        "blank_date": "Da completare il giorno dell'installazione",
        "rows": {
            "reference": "Riferimento",
            "language": "Lingua",
            "company_name": "Ragione sociale",
            "company_address": "Indirizzo azienda",
            "restaurant_name": "Nome ristorante",
            "restaurant_address": "Indirizzo ristorante",
            "contact_person": "Persona di contatto / firmatario",
            "email": "Indirizzo e-mail",
            "phone": "Numero di telefono",
            "kiosk_type": "Tipo kiosk",
            "kiosk_count": "Kiosk self-order",
            "pos_count": "Sistemi POS",
            "printer_count": "Stampanti",
            "terminal_count": "Terminali myPOS",
            "ethernet": "Installazione Ethernet",
            "sla": "Piano di supporto",
            "contract_duration": "Durata contratto",
            "start_date": "Data di efficacia",
            "monthly_total": "Totale mensile ricorrente",
            "one_time_total": "Totale Stripe una tantum",
            "menu_note": "Nota back-office",
        },
        "kiosk_types": {
            "standing": "Kiosk da terra",
            "wall": "Kiosk a parete",
            "tabletop": "Kiosk da banco",
        },
        "sla": {
            "standard": "Standard (incluso)",
            "premium": "Premium (+9 CHF/mese)",
        },
        "ethernet_yes": "Inclusa",
        "ethernet_no": "Installazione a cura del cliente",
        "sections": [
            {
                "title": "1. Struttura contrattuale",
                "body": "L'addendum commerciale disciplina quantità hardware, livello di servizio e prezzi. Il contratto principale disciplina le clausole legali, tecniche e operative. In caso di contraddizione, per gli elementi commerciali prevale l'addendum.",
            },
            {
                "title": "2. Oggetto",
                "body": "Il contratto copre la fornitura dell'hardware TapGo, l'accesso al software, la manutenzione e il supporto per il progetto cliente descritto in questo dossier.",
            },
            {
                "title": "3. Durata e rinnovo",
                "body": "Il contratto decorre dal giorno dell'installazione completa e ha durata fissa di trentasei mesi. Si rinnova annualmente salvo disdetta scritta almeno tre mesi prima della scadenza.",
            },
            {
                "title": "4. Modello economico",
                "body": "I costi mensili ricorrenti coprono i kiosk, un sistema POS obbligatorio e il piano SLA selezionato. Le commissioni Stripe, i terminali di pagamento e l'installazione Ethernet opzionale restano fuori dal contratto ricorrente e vengono pagati separatamente.",
            },
            {
                "title": "5. Proprietà e obblighi",
                "body": "TapGo mantiene la proprietà di hardware, software, interfacce e configurazioni fornite. Il cliente deve garantire un ambiente conforme, proteggere l'attrezzatura e utilizzare il sistema secondo le istruzioni operative.",
            },
            {
                "title": "6. Supporto ed esclusioni",
                "body": "Le opzioni Standard e Premium seguono finestre di servizio e aspettative di risposta descritte durante l'onboarding. Interruzioni internet del cliente, problemi elettrici, uso improprio, forza maggiore e guasti di terzi restano fuori SLA.",
            },
            {
                "title": "7. Responsabilità e restituzione",
                "body": "Il fornitore risponde solo in caso di colpa grave o dolo. Perdita di fatturato, danni indiretti e interruzioni dovute a internet, elettricità o Stripe sono esclusi. L'hardware deve essere restituito in buono stato al termine del contratto.",
            },
        ],
        "signature": {
            "title": "Firma del cliente",
            "signed_at": "Firmato il",
        },
    },
    "tr": {
        "bundle_title": "TapGo Sözleşme Dosyası",
        "addendum_title": "Ticari Addendum",
        "agreement_title": "Ana Sözleşme",
        "provider_title": "Sağlayıcı",
        "provider_value": "MS-Architecture & Technologies Sàrl (TapGo), Bernstrasse 15a, 3280 Murten, İsviçre",
        "note": "Geçerli kurulum tarihi boş bırakılır ve kurulum gününde tamamlanır.",
        "duration": "Sabit 36 aylık süre",
        "blank_date": "Kurulum gününde doldurulur",
        "rows": {
            "reference": "Referans",
            "language": "Dil",
            "company_name": "Şirket / yasal unvan",
            "company_address": "Şirket adresi",
            "restaurant_name": "Restoran adı",
            "restaurant_address": "Restoran adresi",
            "contact_person": "İletişim kişisi / imzacı",
            "email": "E-posta adresi",
            "phone": "Telefon numarası",
            "kiosk_type": "Kiosk tipi",
            "kiosk_count": "Self-order kiosklar",
            "pos_count": "POS sistemleri",
            "printer_count": "Yazıcılar",
            "terminal_count": "myPOS terminalleri",
            "ethernet": "Ethernet kurulumu",
            "sla": "Destek planı",
            "contract_duration": "Sözleşme süresi",
            "start_date": "Yürürlük tarihi",
            "monthly_total": "Tekrarlayan aylık toplam",
            "one_time_total": "Tek seferlik Stripe toplamı",
            "menu_note": "Back-office notu",
        },
        "kiosk_types": {
            "standing": "Ayakta kiosk",
            "wall": "Duvar kiosk",
            "tabletop": "Tezgah üstü kiosk",
        },
        "sla": {
            "standard": "Standart (dahil)",
            "premium": "Premium (+9 CHF/ay)",
        },
        "ethernet_yes": "Dahil",
        "ethernet_no": "Müşteri kendi kurar",
        "sections": [
            {
                "title": "1. Sözleşme yapısı",
                "body": "Ticari addendum donanım adetlerini, hizmet seviyesini ve fiyatları düzenler. Ana sözleşme hukuki, teknik ve operasyonel maddeleri düzenler. Çelişki halinde ticari hükümler için addendum geçerlidir.",
            },
            {
                "title": "2. Kapsam",
                "body": "Sözleşme, bu dosyada tanımlanan müşteri kurulumu için TapGo donanımı, yazılım erişimi, bakım ve destek hizmetlerini kapsar.",
            },
            {
                "title": "3. Süre ve yenileme",
                "body": "Sözleşme tam kurulum gününde başlar ve sabit otuz altı ay sürer. Sonrasında, bitişten en az üç ay önce yazılı fesih yapılmazsa yıllık yenilenir.",
            },
            {
                "title": "4. Finansal model",
                "body": "Tekrarlayan aylık ücretler kioskları, bir zorunlu POS sistemini ve seçilen SLA seçeneğini kapsar. Stripe ücretleri, ödeme terminalleri ve opsiyonel ethernet kurulumu tekrarlayan sözleşme dışında kalır ve ayrı ödenir.",
            },
            {
                "title": "5. Mülkiyet ve yükümlülükler",
                "body": "TapGo, sağlanan donanım, yazılım, arayüz ve yapılandırmaların mülkiyetini korur. Müşteri uygun ortamı sağlamak, ekipmanı korumak ve sistemi operasyonel talimatlara göre kullanmak zorundadır.",
            },
            {
                "title": "6. Destek ve istisnalar",
                "body": "Standart ve Premium seçenekleri, onboarding sırasında açıklanan hizmet pencereleri ve yanıt beklentilerini takip eder. Müşteri internet kesintileri, elektrik problemleri, yanlış kullanım, mücbir sebepler ve üçüncü taraf arızaları SLA dışındadır.",
            },
            {
                "title": "7. Sorumluluk ve iade",
                "body": "Sağlayıcı yalnızca ağır ihmal veya kasıt halinde sorumludur. Ciro kaybı, dolaylı zararlar ve internet, elektrik veya Stripe kaynaklı kesintiler hariçtir. Donanım, sözleşme sonunda çalışır durumda iade edilmelidir.",
            },
        ],
        "signature": {
            "title": "Müşteri imzası",
            "signed_at": "İmza tarihi",
        },
    },
}


def load_local_env(env_path: Path) -> None:
    if not env_path.exists():
        return
    for raw_line in env_path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        os.environ.setdefault(key, value)


load_local_env(BASE_DIR / ".env")


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()


def ensure_directories() -> None:
    for path in [DATA_DIR, STORAGE_DIR, SUBMISSIONS_DIR, OUTBOX_DIR]:
        path.mkdir(parents=True, exist_ok=True)


def init_database() -> None:
    ensure_directories()
    conn = sqlite3.connect(DATABASE_PATH)
    try:
        conn.execute("PRAGMA journal_mode=WAL;")
        conn.execute("PRAGMA synchronous=NORMAL;")
        conn.execute("PRAGMA foreign_keys=ON;")
        conn.execute("PRAGMA busy_timeout=5000;")
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS submissions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                reference TEXT NOT NULL UNIQUE,
                created_at TEXT NOT NULL,
                language TEXT NOT NULL,
                company_name TEXT NOT NULL,
                company_address TEXT NOT NULL,
                restaurant_name TEXT NOT NULL,
                restaurant_address TEXT NOT NULL,
                contact_person TEXT NOT NULL,
                email TEXT NOT NULL,
                phone TEXT,
                kiosk_type TEXT NOT NULL,
                kiosk_count INTEGER NOT NULL,
                pos_count INTEGER NOT NULL,
                printer_count INTEGER NOT NULL,
                terminal_count INTEGER NOT NULL,
                ethernet INTEGER NOT NULL,
                sla TEXT NOT NULL,
                recurring_total INTEGER NOT NULL,
                one_time_total INTEGER NOT NULL,
                payment_status TEXT NOT NULL,
                payment_url TEXT,
                payment_provider TEXT,
                contract_pdf_path TEXT NOT NULL,
                contract_html_path TEXT NOT NULL,
                signature_path TEXT,
                menu_note TEXT,
                access_token TEXT,
                form_payload_json TEXT NOT NULL
            )
            """
        )
        columns = {row[1] for row in conn.execute("PRAGMA table_info(submissions)")}
        if "access_token" not in columns:
            conn.execute("ALTER TABLE submissions ADD COLUMN access_token TEXT")
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS submission_files (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                submission_reference TEXT NOT NULL,
                original_name TEXT NOT NULL,
                stored_name TEXT NOT NULL,
                stored_path TEXT NOT NULL,
                mime_type TEXT,
                size_bytes INTEGER NOT NULL,
                created_at TEXT NOT NULL,
                FOREIGN KEY(submission_reference) REFERENCES submissions(reference)
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS email_logs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                submission_reference TEXT NOT NULL,
                recipient TEXT NOT NULL,
                subject TEXT NOT NULL,
                delivery_mode TEXT NOT NULL,
                status TEXT NOT NULL,
                artifact_path TEXT,
                created_at TEXT NOT NULL
            )
            """
        )
        conn.commit()
    finally:
        conn.close()


@dataclass
class Settings:
    environment: str = os.getenv("TAPGO_ENV", "development").lower()
    internal_email: str = os.getenv("TAPGO_INTERNAL_EMAIL", "contract@tapgo.ch")
    customer_from_email: str = os.getenv("TAPGO_FROM_EMAIL", "noreply@tapgo.local")
    base_url: str = os.getenv("TAPGO_BASE_URL", "").rstrip("/")
    smtp_host: str | None = os.getenv("TAPGO_SMTP_HOST")
    smtp_port: int = int(os.getenv("TAPGO_SMTP_PORT", "587"))
    smtp_username: str | None = os.getenv("TAPGO_SMTP_USERNAME")
    smtp_password: str | None = os.getenv("TAPGO_SMTP_PASSWORD")
    smtp_starttls: bool = os.getenv("TAPGO_SMTP_STARTTLS", "true").lower() == "true"
    imap_host: str | None = os.getenv("TAPGO_IMAP_HOST")
    imap_port: int = int(os.getenv("TAPGO_IMAP_PORT", "993"))
    imap_username: str | None = os.getenv("TAPGO_IMAP_USERNAME")
    imap_password: str | None = os.getenv("TAPGO_IMAP_PASSWORD")
    stripe_secret_key: str | None = os.getenv("TAPGO_STRIPE_SECRET_KEY")
    stripe_webhook_secret: str | None = os.getenv("TAPGO_STRIPE_WEBHOOK_SECRET")
    stripe_currency: str = os.getenv("TAPGO_STRIPE_CURRENCY", "chf")
    pdf_engine: str = os.getenv("TAPGO_PDF_ENGINE", "chrome")
    chrome_bin: str = os.getenv("TAPGO_CHROME_BIN", "/usr/bin/google-chrome")
    object_storage_bucket: str | None = os.getenv("TAPGO_OBJECT_STORAGE_BUCKET")
    object_storage_endpoint: str | None = os.getenv("TAPGO_OBJECT_STORAGE_ENDPOINT")
    object_storage_access_key: str | None = os.getenv("TAPGO_OBJECT_STORAGE_ACCESS_KEY")
    object_storage_secret_key: str | None = os.getenv("TAPGO_OBJECT_STORAGE_SECRET_KEY")
    object_storage_region: str = os.getenv("TAPGO_OBJECT_STORAGE_REGION", "ch-dk-2")
    object_storage_base_url: str | None = os.getenv("TAPGO_OBJECT_STORAGE_BASE_URL")
    health_token: str | None = os.getenv("TAPGO_HEALTH_TOKEN")

    @property
    def production(self) -> bool:
        return self.environment == "production"

    @property
    def email_mode(self) -> str:
        return "smtp" if self.smtp_host else "outbox"

    @property
    def payment_mode(self) -> str:
        return "stripe" if self.stripe_secret_key else "development"

    @property
    def storage_mode(self) -> str:
        return "object-storage" if self.object_storage_enabled else "local"

    @property
    def object_storage_enabled(self) -> bool:
        return bool(
            self.object_storage_bucket
            and self.object_storage_endpoint
            and self.object_storage_access_key
            and self.object_storage_secret_key
        )


SETTINGS = Settings()
init_database()

app = Flask(__name__, static_folder=str(ASSETS_DIR), static_url_path="/assets")
app.config["MAX_CONTENT_LENGTH"] = (MAX_FILES * MAX_FILE_SIZE) + (1024 * 1024)
jinja_env = Environment(
    loader=FileSystemLoader(str(TEMPLATES_DIR)),
    autoescape=select_autoescape(["html", "xml"]),
)


@contextmanager
def db_connection() -> Any:
    conn = sqlite3.connect(DATABASE_PATH, timeout=10)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys=ON;")
    conn.execute("PRAGMA busy_timeout=5000;")
    try:
        with conn:
            yield conn
    finally:
        conn.close()


def build_reference() -> str:
    return f"TG-{datetime.now().year}-{uuid.uuid4().hex[:6].upper()}"


def build_access_token() -> str:
    return uuid.uuid4().hex


def validate_production_settings() -> None:
    if not SETTINGS.production:
        return
    required = {
        "TAPGO_BASE_URL": SETTINGS.base_url,
        "TAPGO_SMTP_HOST": SETTINGS.smtp_host,
        "TAPGO_SMTP_USERNAME": SETTINGS.smtp_username,
        "TAPGO_SMTP_PASSWORD": SETTINGS.smtp_password,
        "TAPGO_STRIPE_SECRET_KEY": SETTINGS.stripe_secret_key,
        "TAPGO_STRIPE_WEBHOOK_SECRET": SETTINGS.stripe_webhook_secret,
        "TAPGO_OBJECT_STORAGE_BUCKET": SETTINGS.object_storage_bucket,
        "TAPGO_OBJECT_STORAGE_ENDPOINT": SETTINGS.object_storage_endpoint,
        "TAPGO_OBJECT_STORAGE_ACCESS_KEY": SETTINGS.object_storage_access_key,
        "TAPGO_OBJECT_STORAGE_SECRET_KEY": SETTINGS.object_storage_secret_key,
        "TAPGO_HEALTH_TOKEN": SETTINGS.health_token,
    }
    missing = [name for name, value in required.items() if not value]
    if missing:
        raise RuntimeError(f"Missing required production settings: {', '.join(missing)}")
    if not SETTINGS.base_url.startswith("https://"):
        raise RuntimeError("TAPGO_BASE_URL must use https:// in production.")


validate_production_settings()


def parse_bool(value: Any) -> bool:
    if isinstance(value, bool):
        return value
    if isinstance(value, str):
        return value.strip().lower() in {"1", "true", "yes", "on"}
    return bool(value)


def validate_payload(payload: dict[str, Any]) -> tuple[dict[str, Any], list[str]]:
    errors: list[str] = []
    language = payload.get("language") or "en"
    kiosk_type = payload.get("kioskType")
    kiosk_count = int(payload.get("kioskCount", 0) or 0)
    printer_count = int(payload.get("printerCount", 0) or 0)
    ethernet = parse_bool(payload.get("ethernet"))
    sla = payload.get("sla")
    signature_data = payload.get("signatureData", "")
    accepted_commitment = parse_bool(payload.get("acceptCommitment"))
    accepted_terms = parse_bool(payload.get("acceptTerms"))
    note = (payload.get("menuNote") or "").strip()
    menu_link = (payload.get("menuLink") or "").strip()
    form = payload.get("form") or {}

    required_fields = {
        "companyName": form.get("companyName", "").strip(),
        "companyAddress": form.get("companyAddress", "").strip(),
        "restaurantName": form.get("restaurantName", "").strip(),
        "restaurantAddress": form.get("restaurantAddress", "").strip(),
        "contactPerson": form.get("contactPerson", "").strip(),
        "emailAddress": form.get("emailAddress", "").strip(),
    }

    if language not in SUPPORTED_LANGUAGES:
        errors.append("Unsupported language selected.")
    if kiosk_type not in SUPPORTED_KIOSK_TYPES:
        errors.append("Unsupported kiosk type selected.")
    if sla not in SUPPORTED_SLA:
        errors.append("Unsupported SLA option selected.")
    if kiosk_count < 1 or kiosk_count > 10:
        errors.append("Kiosk count must be between 1 and 10.")
    if printer_count < 1 or printer_count > 20:
        errors.append("Printer count must be between 1 and 20.")
    for key, value in required_fields.items():
        if not value:
            errors.append(f"Missing required field: {key}.")
    email = required_fields["emailAddress"]
    if email and ("@" not in email or "." not in email.split("@")[-1]):
        errors.append("A valid email address is required.")
    if menu_link and not re.match(r"^https?://", menu_link, flags=re.IGNORECASE):
        errors.append("Menu link must be a valid http or https URL.")
    if not signature_data.startswith("data:image/png;base64,"):
        errors.append("A digital signature is required.")
    if not accepted_commitment or not accepted_terms:
        errors.append("Contract acceptance checkboxes must be confirmed.")

    recurring_total = kiosk_count * PRICING["kiosk"] + PRICING["pos"] + (PRICING["sla_premium"] if sla == "premium" else 0)
    terminal_count = kiosk_count + 1
    one_time_total = terminal_count * PRICING["terminal"] + (PRICING["ethernet"] if ethernet else 0)

    cleaned = {
        "language": language,
        "kioskType": kiosk_type,
        "kioskCount": kiosk_count,
        "printerCount": printer_count,
        "ethernet": ethernet,
        "sla": sla,
        "signatureData": signature_data,
        "acceptCommitment": accepted_commitment,
        "acceptTerms": accepted_terms,
        "menuNote": note,
        "menuLink": menu_link,
        "form": {
            "companyName": required_fields["companyName"],
            "companyAddress": required_fields["companyAddress"],
            "restaurantName": required_fields["restaurantName"],
            "restaurantAddress": required_fields["restaurantAddress"],
            "contactPerson": required_fields["contactPerson"],
            "emailAddress": required_fields["emailAddress"],
            "phoneNumber": form.get("phoneNumber", "").strip(),
        },
        "posCount": 1,
        "terminalCount": terminal_count,
        "recurringTotal": recurring_total,
        "oneTimeTotal": one_time_total,
    }
    return cleaned, errors


def validate_files(files: list[Any]) -> list[str]:
    errors: list[str] = []
    if len(files) > MAX_FILES:
        errors.append(f"At most {MAX_FILES} menu files are allowed.")
    for uploaded in files:
        extension = uploaded.filename.rsplit(".", 1)[-1].lower() if "." in uploaded.filename else ""
        if extension not in ALLOWED_EXTENSIONS:
            errors.append(f"Unsupported file type for {uploaded.filename}.")
            continue
        uploaded.stream.seek(0, os.SEEK_END)
        size = uploaded.stream.tell()
        uploaded.stream.seek(0)
        if size > MAX_FILE_SIZE:
            errors.append(f"{uploaded.filename} exceeds the 20 MB limit.")
    return errors


def validate_menu_sources(menu_link: str, files: list[Any]) -> list[str]:
    if menu_link or files:
        return []
    return ["At least one menu file or a menu link is required."]


def language_copy(lang: str) -> dict[str, Any]:
    return CONTRACT_COPY.get(lang, CONTRACT_COPY["en"])


def format_bool(copy: dict[str, Any], value: bool) -> str:
    return copy["ethernet_yes"] if value else copy["ethernet_no"]


def format_kiosk(copy: dict[str, Any], kiosk_type: str) -> str:
    return copy["kiosk_types"][kiosk_type]


def format_sla(copy: dict[str, Any], sla: str) -> str:
    return copy["sla"][sla]


def save_signature(signature_data: str, target_path: Path) -> None:
    _, encoded = signature_data.split(",", 1)
    target_path.write_bytes(base64.b64decode(encoded))


def object_storage_client() -> Any:
    if not SETTINGS.object_storage_enabled:
        return None
    try:
        import boto3
    except ImportError as exc:  # pragma: no cover - runtime dependency guard
        raise RuntimeError("boto3 is required for object storage uploads. Install requirements.txt.") from exc

    return boto3.client(
        "s3",
        endpoint_url=SETTINGS.object_storage_endpoint,
        aws_access_key_id=SETTINGS.object_storage_access_key,
        aws_secret_access_key=SETTINGS.object_storage_secret_key,
        region_name=SETTINGS.object_storage_region,
    )


def object_storage_key(reference: str, filename: str) -> str:
    return f"submissions/{reference}/{filename}"


def upload_to_object_storage(local_path: Path, key: str, content_type: str | None = None) -> None:
    if not SETTINGS.object_storage_enabled:
        return
    client = object_storage_client()
    extra_args: dict[str, Any] = {}
    if content_type:
        extra_args["ContentType"] = content_type
    if extra_args:
        client.upload_file(str(local_path), SETTINGS.object_storage_bucket, key, ExtraArgs=extra_args)
        return
    client.upload_file(str(local_path), SETTINGS.object_storage_bucket, key)


def upload_submission_artifacts(reference: str, paths: list[Path]) -> None:
    if not SETTINGS.object_storage_enabled:
        return
    for path in paths:
        mime_type, _ = mimetypes.guess_type(path.name)
        upload_to_object_storage(path, object_storage_key(reference, path.name), mime_type)


def presigned_object_storage_url(key: str, expires_in: int = 3600) -> str:
    if not SETTINGS.object_storage_enabled:
        raise RuntimeError("Object storage is not configured.")
    client = object_storage_client()
    return client.generate_presigned_url(
        "get_object",
        Params={"Bucket": SETTINGS.object_storage_bucket, "Key": key},
        ExpiresIn=expires_in,
    )


def build_object_storage_public_url(key: str) -> str:
    if SETTINGS.object_storage_base_url:
        base = SETTINGS.object_storage_base_url.rstrip("/")
        return f"{base}/{key}"
    endpoint = (SETTINGS.object_storage_endpoint or "").rstrip("/")
    bucket = SETTINGS.object_storage_bucket or ""
    return f"{endpoint}/{bucket}/{key}"


def check_imap_connection() -> tuple[bool, str]:
    if not SETTINGS.imap_host:
        return False, "IMAP host is not configured."
    if not SETTINGS.imap_username or not SETTINGS.imap_password:
        return False, "IMAP credentials are incomplete."
    try:
        client = imaplib.IMAP4_SSL(SETTINGS.imap_host, SETTINGS.imap_port)
        client.login(SETTINGS.imap_username, SETTINGS.imap_password)
        client.logout()
        return True, "IMAP login succeeded."
    except Exception as exc:  # noqa: BLE001
        return False, str(exc)


def html_to_plain_text(html_content: str) -> str:
    cleaned = re.sub(r"<(script|style)[^>]*>.*?</\1>", "", html_content, flags=re.IGNORECASE | re.DOTALL)
    cleaned = re.sub(r"<br\s*/?>", "\n", cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r"</(p|div|section|article|h1|h2|h3|li|tr)>", "\n", cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r"<li[^>]*>", "• ", cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r"<[^>]+>", " ", cleaned)
    cleaned = html.unescape(cleaned)
    cleaned = re.sub(r"[ \t]+\n", "\n", cleaned)
    cleaned = re.sub(r"\n{3,}", "\n\n", cleaned)
    cleaned = re.sub(r"[ \t]{2,}", " ", cleaned)
    return cleaned.strip()


def wrap_pdf_text(text: str, width: int = 90) -> list[str]:
    wrapped: list[str] = []
    for raw_line in text.splitlines():
        line = raw_line.strip()
        if not line:
            wrapped.append("")
            continue
        wrapped.extend(textwrap.wrap(line, width=width) or [""])
    return wrapped


def pdf_escape(value: str) -> str:
    safe = value.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")
    return safe.encode("latin-1", "replace").decode("latin-1")


def write_basic_pdf(text: str, pdf_path: Path) -> None:
    lines = wrap_pdf_text(text)
    if not lines:
        lines = ["TapGo contract preview unavailable."]

    lines_per_page = 46
    pages = [lines[index:index + lines_per_page] for index in range(0, len(lines), lines_per_page)]
    if not pages:
        pages = [["TapGo contract preview unavailable."]]

    objects: list[bytes] = []
    page_count = len(pages)
    content_nums = list(range(2, 2 + page_count))
    page_nums = list(range(2 + page_count, 2 + (page_count * 2)))
    pages_root_num = 2 + (page_count * 2)
    font_num = pages_root_num + 1

    objects.append(f"<< /Type /Catalog /Pages {pages_root_num} 0 R >>".encode("latin-1"))
    for page_lines in pages:
        content_lines = ["BT", "/F1 11 Tf", "50 790 Td", "14 TL"]
        for line in page_lines:
            content_lines.append(f"({pdf_escape(line)}) Tj")
            content_lines.append("T*")
        content_lines.append("ET")
        stream = "\n".join(content_lines).encode("latin-1", "replace")
        objects.append(f"<< /Length {len(stream)} >>\nstream\n".encode("latin-1") + stream + b"\nendstream")

    for index, content_num in enumerate(content_nums):
        page_object = (
            f"<< /Type /Page /Parent {pages_root_num} 0 R /MediaBox [0 0 612 792] "
            f"/Resources << /Font << /F1 {font_num} 0 R >> >> /Contents {content_num} 0 R >>"
        ).encode("latin-1")
        objects.append(page_object)

    kids = " ".join(f"{number} 0 R" for number in page_nums)
    objects.append(f"<< /Type /Pages /Kids [{kids}] /Count {page_count} >>".encode("latin-1"))
    objects.append(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>")

    pdf = bytearray(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
    offsets = [0]
    for index, obj in enumerate(objects, start=1):
        offsets.append(len(pdf))
        pdf.extend(f"{index} 0 obj\n".encode("latin-1"))
        pdf.extend(obj)
        pdf.extend(b"\nendobj\n")

    xref_start = len(pdf)
    pdf.extend(f"xref\n0 {len(offsets)}\n".encode("latin-1"))
    pdf.extend(b"0000000000 65535 f \n")
    for offset in offsets[1:]:
        pdf.extend(f"{offset:010d} 00000 n \n".encode("latin-1"))
    pdf.extend(
        (
            f"trailer\n<< /Size {len(offsets)} /Root 1 0 R >>\n"
            f"startxref\n{xref_start}\n%%EOF\n"
        ).encode("latin-1")
    )
    pdf_path.write_bytes(bytes(pdf))


def render_contract_html(reference: str, payload: dict[str, Any], submission_dir: Path) -> Path:
    copy = language_copy(payload["language"])
    signature_path = submission_dir / "signature.png"
    signature_data_url = payload["signatureData"]
    context = {
        "reference": reference,
        "generated_at": datetime.now().strftime("%Y-%m-%d %H:%M"),
        "copy": copy,
        "language_label": LANGUAGE_META[payload["language"]]["label"],
        "form": payload["form"],
        "kiosk_type": format_kiosk(copy, payload["kioskType"]),
        "kiosk_count": payload["kioskCount"],
        "printer_count": payload["printerCount"],
        "pos_count": payload["posCount"],
        "terminal_count": payload["terminalCount"],
        "ethernet": format_bool(copy, payload["ethernet"]),
        "sla": format_sla(copy, payload["sla"]),
        "recurring_total": payload["recurringTotal"],
        "one_time_total": payload["oneTimeTotal"],
        "menu_note": payload["menuNote"] or "—",
        "pricing": PRICING,
        "signature_data_url": signature_data_url,
        "signed_at": datetime.now().strftime("%Y-%m-%d %H:%M"),
    }
    html = jinja_env.get_template("contract_bundle.html").render(**context)
    output_path = submission_dir / "contract_bundle.html"
    output_path.write_text(html, encoding="utf-8")
    save_signature(payload["signatureData"], signature_path)
    return output_path


def generate_pdf_from_html(html_path: Path, pdf_path: Path) -> None:
    errors: list[str] = []
    preferred = SETTINGS.pdf_engine.lower()
    engines = [preferred]
    for candidate in ["chrome", "libreoffice"]:
        if candidate not in engines:
            engines.append(candidate)

    for engine in engines:
        if engine == "chrome":
            command = [
                SETTINGS.chrome_bin,
                "--headless=new",
                "--disable-gpu",
                "--no-sandbox",
                f"--print-to-pdf={pdf_path}",
                html_path.resolve().as_uri(),
            ]
            completed = subprocess.run(command, capture_output=True, text=True)
            if completed.returncode == 0 and pdf_path.exists():
                return
            errors.append(completed.stderr.strip() or "Chrome PDF generation failed.")
            continue

        if engine == "libreoffice":
            with tempfile.TemporaryDirectory() as tmp_dir:
                completed = subprocess.run(
                    [
                        "/usr/bin/libreoffice",
                        "--headless",
                        "--convert-to",
                        "pdf:writer_web_pdf_Export",
                        "--outdir",
                        tmp_dir,
                        str(html_path),
                    ],
                    capture_output=True,
                    text=True,
                )
                generated = Path(tmp_dir) / f"{html_path.stem}.pdf"
                if completed.returncode == 0 and generated.exists():
                    pdf_path.write_bytes(generated.read_bytes())
                    return
                errors.append(completed.stderr.strip() or "LibreOffice PDF generation failed.")

    fallback_text = html_to_plain_text(html_path.read_text(encoding="utf-8"))
    if errors:
        fallback_text = (
            "TapGo contract PDF was generated with the built-in fallback renderer.\n\n"
            f"Engine diagnostics: {' | '.join(error for error in errors if error)}\n\n"
            f"{fallback_text}"
        )
    write_basic_pdf(fallback_text, pdf_path)


def build_summary_text(reference: str, payload: dict[str, Any]) -> str:
    return textwrap.dedent(
        f"""
        TapGo submission summary
        Reference: {reference}
        Language: {payload['language']}
        Company: {payload['form']['companyName']}
        Company address: {payload['form']['companyAddress']}
        Restaurant: {payload['form']['restaurantName']}
        Restaurant address: {payload['form']['restaurantAddress']}
        Contact: {payload['form']['contactPerson']}
        Email: {payload['form']['emailAddress']}
        Phone: {payload['form']['phoneNumber'] or '—'}
        Kiosk type: {payload['kioskType']}
        Kiosks: {payload['kioskCount']}
        POS: {payload['posCount']}
        Printers: {payload['printerCount']}
        Terminals: {payload['terminalCount']}
        Ethernet: {"yes" if payload['ethernet'] else "no"}
        SLA: {payload['sla']}
        Recurring total: CHF {payload['recurringTotal']}
        One-time total: CHF {payload['oneTimeTotal']}
        Menu link: {payload['menuLink'] or '—'}
        Menu note: {payload['menuNote'] or '—'}
        """
    ).strip()


def build_email_messages(reference: str, payload: dict[str, Any], contract_pdf_path: Path, uploaded_files: list[Path]) -> tuple[EmailMessage, EmailMessage]:
    internal = EmailMessage()
    internal["Subject"] = f"TapGo onboarding submission {reference}"
    internal["From"] = SETTINGS.customer_from_email
    internal["To"] = SETTINGS.internal_email
    internal.set_content(build_summary_text(reference, payload))
    internal.add_attachment(
        contract_pdf_path.read_bytes(),
        maintype="application",
        subtype="pdf",
        filename=contract_pdf_path.name,
    )
    for file_path in uploaded_files:
        mime_type, _ = mimetypes.guess_type(file_path.name)
        maintype, subtype = (mime_type or "application/octet-stream").split("/", 1)
        internal.add_attachment(
            file_path.read_bytes(),
            maintype=maintype,
            subtype=subtype,
            filename=file_path.name,
        )

    customer = EmailMessage()
    customer["Subject"] = f"TapGo onboarding confirmation {reference}"
    customer["From"] = SETTINGS.customer_from_email
    customer["To"] = payload["form"]["emailAddress"]
    customer.set_content(
        textwrap.dedent(
            f"""
            Hello,

            Thank you for completing the TapGo onboarding flow.

            Reference: {reference}
            Restaurant: {payload['form']['restaurantName']}
            Recurring monthly total: CHF {payload['recurringTotal']}
            One-time Stripe total: CHF {payload['oneTimeTotal']}
            Menu link: {payload['menuLink'] or '—'}

            A copy of the generated contract is attached to this confirmation.
            """
        ).strip()
    )
    customer.add_attachment(
        contract_pdf_path.read_bytes(),
        maintype="application",
        subtype="pdf",
        filename=contract_pdf_path.name,
    )
    return internal, customer


def write_eml_message(reference: str, recipient: str, subject: str, message: EmailMessage) -> Path:
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    artifact = OUTBOX_DIR / f"{reference}_{timestamp}_{secure_filename(recipient)}.eml"
    artifact.write_bytes(message.as_bytes())
    with db_connection() as conn:
        conn.execute(
            """
            INSERT INTO email_logs (submission_reference, recipient, subject, delivery_mode, status, artifact_path, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            """,
            (reference, recipient, subject, SETTINGS.email_mode, "queued", str(artifact), utc_now()),
        )
    return artifact


def send_or_spool_email(reference: str, message: EmailMessage) -> None:
    recipient = message["To"]
    subject = message["Subject"]
    if SETTINGS.email_mode == "smtp" and SETTINGS.smtp_host:
        import smtplib

        with smtplib.SMTP(SETTINGS.smtp_host, SETTINGS.smtp_port, timeout=20) as smtp:
            if SETTINGS.smtp_starttls:
                smtp.starttls()
            if SETTINGS.smtp_username and SETTINGS.smtp_password:
                smtp.login(SETTINGS.smtp_username, SETTINGS.smtp_password)
            smtp.send_message(message)
        with db_connection() as conn:
            conn.execute(
                """
                INSERT INTO email_logs (submission_reference, recipient, subject, delivery_mode, status, artifact_path, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                """,
                (reference, recipient, subject, SETTINGS.email_mode, "sent", None, utc_now()),
            )
        return

    write_eml_message(reference, recipient, subject, message)


def build_return_url(base_url: str, payment: str, reference: str, access_token: str, include_session: bool = False) -> str:
    params = {"payment": payment, "ref": reference, "token": access_token}
    if include_session:
        params["session_id"] = "{CHECKOUT_SESSION_ID}"
    return f"{base_url}/?{urlencode(params, safe='{}')}"


def create_stripe_checkout_session(reference: str, access_token: str, payload: dict[str, Any], base_url: str) -> tuple[str, str]:
    if not SETTINGS.stripe_secret_key:
        return "simulated", ""

    success_url = build_return_url(base_url, "success", reference, access_token, include_session=True)
    cancel_url = build_return_url(base_url, "cancelled", reference, access_token)
    line_items: list[dict[str, Any]] = [
        {
            "name": f"myPOS terminals ({payload['terminalCount']})",
            "unit_amount": PRICING["terminal"] * 100,
            "quantity": payload["terminalCount"],
        }
    ]
    if payload["ethernet"]:
        line_items.append(
            {
                "name": "Ethernet installation",
                "unit_amount": PRICING["ethernet"] * 100,
                "quantity": 1,
            }
        )

    form_data: dict[str, str] = {
        "mode": "payment",
        "success_url": success_url,
        "cancel_url": cancel_url,
        "client_reference_id": reference,
        "metadata[reference]": reference,
    }
    for index, item in enumerate(line_items):
        form_data[f"line_items[{index}][quantity]"] = str(item["quantity"])
        form_data[f"line_items[{index}][price_data][currency]"] = SETTINGS.stripe_currency
        form_data[f"line_items[{index}][price_data][unit_amount]"] = str(item["unit_amount"])
        form_data[f"line_items[{index}][price_data][product_data][name]"] = item["name"]

    response = httpx.post(
        "https://api.stripe.com/v1/checkout/sessions",
        auth=(SETTINGS.stripe_secret_key, ""),
        data=form_data,
        timeout=30,
    )
    response.raise_for_status()
    session = response.json()
    return "stripe", session["url"]


def fetch_stripe_checkout_session(session_id: str) -> dict[str, Any]:
    response = httpx.get(
        f"https://api.stripe.com/v1/checkout/sessions/{session_id}",
        auth=(SETTINGS.stripe_secret_key or "", ""),
        timeout=30,
    )
    response.raise_for_status()
    return response.json()


def verify_stripe_webhook_signature(payload: bytes, signature_header: str, secret: str) -> bool:
    parts = {}
    for entry in signature_header.split(","):
        if "=" not in entry:
            continue
        key, value = entry.split("=", 1)
        parts[key.strip()] = value.strip()
    timestamp = parts.get("t")
    signature = parts.get("v1")
    if not timestamp or not signature:
        return False
    try:
        timestamp_int = int(timestamp)
    except ValueError:
        return False
    # Reject very old signatures.
    if abs(int(time.time()) - timestamp_int) > 300:
        return False
    signed_payload = f"{timestamp}.{payload.decode('utf-8')}".encode("utf-8")
    computed = hmac.new(secret.encode("utf-8"), signed_payload, hashlib.sha256).hexdigest()
    return hmac.compare_digest(computed, signature)


def submission_directory(reference: str) -> Path:
    return SUBMISSIONS_DIR / reference


def payment_error_path(reference: str) -> Path:
    return submission_directory(reference) / "payment_error.log"


def describe_payment_error(exc: Exception) -> str:
    message = str(exc).strip() or exc.__class__.__name__
    normalized = message.lower()
    if (
        isinstance(exc, httpx.ConnectError)
        or "name resolution" in normalized
        or "temporary failure in name resolution" in normalized
        or "nodename nor servname provided" in normalized
    ):
        return (
            "Stripe could not be reached from this environment. "
            "The submission was saved, but the server could not connect to api.stripe.com."
        )
    if isinstance(exc, httpx.HTTPStatusError):
        detail = message
        try:
            error_payload = exc.response.json().get("error") or {}
            detail = error_payload.get("message") or detail
        except Exception:  # noqa: BLE001
            detail = message
        return f"Stripe returned an API error: {detail}"
    return f"Stripe checkout creation failed: {message}"


def write_payment_error(reference: str, exc: Exception) -> str:
    submission_dir = submission_directory(reference)
    submission_dir.mkdir(parents=True, exist_ok=True)
    message = describe_payment_error(exc)
    payment_error_path(reference).write_text(message, encoding="utf-8")
    return message


def read_payment_error(reference: str) -> str | None:
    artifact = payment_error_path(reference)
    if not artifact.exists():
        return None
    message = artifact.read_text(encoding="utf-8").strip()
    return message or None


def clear_payment_error(reference: str) -> None:
    artifact = payment_error_path(reference)
    if artifact.exists():
        artifact.unlink()


def update_submission_payment(reference: str, payment_provider: str, payment_url: str) -> None:
    payment_status = "pending" if payment_provider == "stripe" and payment_url else "retry_required"
    with db_connection() as conn:
        conn.execute(
            """
            UPDATE submissions
            SET payment_provider = ?, payment_url = ?, payment_status = ?
            WHERE reference = ?
            """,
            (payment_provider, payment_url or None, payment_status, reference),
        )


def set_submission_payment_status(reference: str, payment_status: str, payment_provider: str | None = None, payment_url: str | None = None) -> None:
    fields = ["payment_status = ?"]
    params: list[Any] = [payment_status]
    if payment_provider is not None:
        fields.append("payment_provider = ?")
        params.append(payment_provider)
    if payment_url is not None:
        fields.append("payment_url = ?")
        params.append(payment_url or None)
    params.append(reference)
    with db_connection() as conn:
        conn.execute(
            f"UPDATE submissions SET {', '.join(fields)} WHERE reference = ?",
            tuple(params),
        )


def build_payment_payload(
    reference: str,
    payment_provider: str,
    payment_url: str,
    payment_required: bool,
) -> dict[str, Any]:
    with db_connection() as conn:
        row = conn.execute(
            "SELECT payment_status, access_token FROM submissions WHERE reference = ?",
            (reference,),
        ).fetchone()
    payment_status = row["payment_status"] if row else ("pending" if payment_provider == "stripe" and payment_url else "unpaid")
    payment_mode = payment_provider if payment_provider != "simulated" else SETTINGS.payment_mode
    payment_error = read_payment_error(reference)
    retry_available = payment_required and SETTINGS.payment_mode == "stripe" and payment_status != "paid" and not payment_url
    access_token = row["access_token"] if row else None
    return {
        "payment_mode": payment_mode,
        "payment_status": payment_status,
        "payment_url": payment_url or None,
        "payment_required": payment_required,
        "payment_error": payment_error,
        "payment_retry_available": retry_available,
        "payment_retry_url": build_customer_url(f"/api/submissions/{reference}/retry-payment", access_token) if retry_available and access_token else None,
    }


def persist_submission(
    reference: str,
    access_token: str,
    payload: dict[str, Any],
    contract_pdf_path: Path,
    contract_html_path: Path,
    signature_path: Path,
    stored_files: list[dict[str, Any]],
    payment_provider: str,
    payment_url: str,
) -> None:
    if payment_provider == "stripe":
        payment_status = "pending"
    elif payment_provider == "fallback":
        payment_status = "retry_required"
    else:
        payment_status = "simulated"
    with db_connection() as conn:
        conn.execute(
            """
            INSERT INTO submissions (
                reference, created_at, language, company_name, company_address, restaurant_name, restaurant_address,
                contact_person, email, phone, kiosk_type, kiosk_count, pos_count, printer_count, terminal_count,
                ethernet, sla, recurring_total, one_time_total, payment_status, payment_url, payment_provider,
                contract_pdf_path, contract_html_path, signature_path, menu_note, access_token, form_payload_json
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                reference,
                utc_now(),
                payload["language"],
                payload["form"]["companyName"],
                payload["form"]["companyAddress"],
                payload["form"]["restaurantName"],
                payload["form"]["restaurantAddress"],
                payload["form"]["contactPerson"],
                payload["form"]["emailAddress"],
                payload["form"]["phoneNumber"],
                payload["kioskType"],
                payload["kioskCount"],
                payload["posCount"],
                payload["printerCount"],
                payload["terminalCount"],
                1 if payload["ethernet"] else 0,
                payload["sla"],
                payload["recurringTotal"],
                payload["oneTimeTotal"],
                payment_status,
                payment_url or None,
                payment_provider,
                str(contract_pdf_path),
                str(contract_html_path),
                str(signature_path),
                payload["menuNote"],
                access_token,
                json.dumps(payload, ensure_ascii=False),
            ),
        )
        for item in stored_files:
            conn.execute(
                """
                INSERT INTO submission_files (
                    submission_reference, original_name, stored_name, stored_path, mime_type, size_bytes, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    reference,
                    item["original_name"],
                    item["stored_name"],
                    item["stored_path"],
                    item["mime_type"],
                    item["size_bytes"],
                    utc_now(),
                ),
            )


def resolve_base_url() -> str:
    if SETTINGS.base_url:
        return SETTINGS.base_url
    return request.url_root.rstrip("/")


def build_customer_url(path: str, access_token: str) -> str:
    return f"{resolve_base_url()}{path}?{urlencode({'token': access_token})}"


def build_contract_download_url(reference: str, access_token: str) -> str:
    return build_customer_url(f"/api/submissions/{reference}/contract", access_token)


def submission_access_token(reference: str) -> str | None:
    with db_connection() as conn:
        row = conn.execute("SELECT access_token FROM submissions WHERE reference = ?", (reference,)).fetchone()
    return row["access_token"] if row else None


def require_submission_access(reference: str) -> str:
    access_token = submission_access_token(reference)
    supplied_token = request.args.get("token", "")
    if not access_token or not supplied_token or not hmac.compare_digest(access_token, supplied_token):
        abort(404)
    return access_token


def extract_payload_from_request() -> dict[str, Any]:
    if request.content_type and request.content_type.startswith("multipart/form-data"):
        raw_payload = request.form.get("payload")
    else:
        raw_payload = (request.get_json(silent=True) or {}).get("payload") or request.get_json(silent=True)
    if not raw_payload:
        raise ValueError("Missing payload.")
    if isinstance(raw_payload, str):
        return json.loads(raw_payload)
    if isinstance(raw_payload, dict):
        return raw_payload
    raise ValueError("Unsupported payload format.")


@app.route("/")
def index() -> Any:
    return send_from_directory(BASE_DIR, "tapgo_onboarding_v2.html")


@app.route("/index.html")
def root_index() -> Any:
    return send_from_directory(BASE_DIR, "index.html")


@app.route("/tapgo_onboarding_v2.html")
def onboarding_page() -> Any:
    return send_from_directory(BASE_DIR, "tapgo_onboarding_v2.html")


@app.route("/health")
def health() -> Any:
    return jsonify({"status": "ok", "timestamp": utc_now()})


@app.route("/api/integrations/health")
def integrations_health() -> Any:
    if SETTINGS.production:
        authorization = request.headers.get("Authorization", "")
        supplied_token = authorization[len("Bearer "):].strip() if authorization.startswith("Bearer ") else ""
        if not SETTINGS.health_token or not hmac.compare_digest(SETTINGS.health_token, supplied_token):
            abort(404)
    imap_ok, imap_message = check_imap_connection()
    object_storage_ready = SETTINGS.object_storage_enabled
    return jsonify(
        {
            "timestamp": utc_now(),
            "email_mode": SETTINGS.email_mode,
            "smtp_configured": bool(SETTINGS.smtp_host),
            "imap_configured": bool(SETTINGS.imap_host),
            "imap_ok": imap_ok,
            "imap_message": imap_message,
            "storage_mode": SETTINGS.storage_mode,
            "object_storage_configured": object_storage_ready,
            "payment_mode": SETTINGS.payment_mode,
            "stripe_configured": bool(SETTINGS.stripe_secret_key),
        }
    )


@app.route("/api/config")
def config() -> Any:
    return jsonify(
        {
            "email_mode": SETTINGS.email_mode,
            "payment_mode": SETTINGS.payment_mode,
            "storage_mode": SETTINGS.storage_mode,
            "internal_email": SETTINGS.internal_email,
            "max_files": MAX_FILES,
            "max_file_size_mb": 20,
            "menu_upload_required": False,
            "menu_link_enabled": True,
            "menu_source_required": True,
        }
    )


@app.route("/api/contracts/preview", methods=["POST"])
def preview_contract() -> Any:
    try:
        payload = extract_payload_from_request()
    except Exception as exc:  # noqa: BLE001
        return jsonify({"error": str(exc)}), 400

    cleaned, errors = validate_payload(payload)
    if errors:
        return jsonify({"errors": errors}), 400

    preview_reference = payload.get("reference") or build_reference()
    with tempfile.TemporaryDirectory() as tmp_dir:
        preview_dir = Path(tmp_dir)
        html_path = render_contract_html(preview_reference, cleaned, preview_dir)
        pdf_path = preview_dir / "contract_bundle.pdf"
        try:
            generate_pdf_from_html(html_path, pdf_path)
        except Exception as exc:  # noqa: BLE001
            return jsonify({"error": f"Contract preview generation failed: {exc}"}), 500
        return send_file(pdf_path, as_attachment=True, download_name=f"{preview_reference}_contract_bundle.pdf")


@app.route("/api/submissions", methods=["POST"])
def create_submission() -> Any:
    try:
        payload = extract_payload_from_request()
    except Exception as exc:  # noqa: BLE001
        return jsonify({"error": str(exc)}), 400

    uploaded_files = request.files.getlist("menu_files")
    cleaned, errors = validate_payload(payload)
    errors.extend(validate_files(uploaded_files))
    errors.extend(validate_menu_sources(cleaned["menuLink"], uploaded_files))
    if errors:
        return jsonify({"errors": errors}), 400

    reference = build_reference()
    access_token = build_access_token()
    submission_dir = submission_directory(reference)
    submission_dir.mkdir(parents=True, exist_ok=True)

    stored_files: list[dict[str, Any]] = []
    saved_paths: list[Path] = []
    for uploaded in uploaded_files:
        safe_name = secure_filename(uploaded.filename) or f"menu_{uuid.uuid4().hex}"
        target_name = f"{uuid.uuid4().hex[:8]}_{safe_name}"
        target_path = submission_dir / target_name
        uploaded.save(target_path)
        stored_files.append(
            {
                "original_name": uploaded.filename,
                "stored_name": target_name,
                "stored_path": str(target_path),
                "mime_type": uploaded.mimetype,
                "size_bytes": target_path.stat().st_size,
            }
        )
        saved_paths.append(target_path)

    html_path = render_contract_html(reference, cleaned, submission_dir)
    pdf_path = submission_dir / "contract_bundle.pdf"
    signature_path = submission_dir / "signature.png"
    summary_path = submission_dir / "submission_summary.txt"
    summary_path.write_text(build_summary_text(reference, cleaned), encoding="utf-8")

    try:
        generate_pdf_from_html(html_path, pdf_path)
    except Exception as exc:  # noqa: BLE001
        return jsonify({"error": f"Failed to generate contract PDF: {exc}"}), 500

    artifact_paths = [html_path, pdf_path, signature_path, summary_path, *saved_paths]
    try:
        upload_submission_artifacts(reference, artifact_paths)
    except Exception as exc:  # noqa: BLE001
        (submission_dir / "storage_error.log").write_text(str(exc), encoding="utf-8")

    payment_provider = "simulated"
    payment_url = ""
    try:
        payment_provider, payment_url = create_stripe_checkout_session(reference, access_token, cleaned, resolve_base_url())
    except Exception as exc:  # noqa: BLE001
        payment_provider = "fallback"
        payment_url = ""
        write_payment_error(reference, exc)

    persist_submission(reference, access_token, cleaned, pdf_path, html_path, signature_path, stored_files, payment_provider, payment_url)

    internal_message, customer_message = build_email_messages(reference, cleaned, pdf_path, saved_paths)
    email_errors: list[str] = []
    for message in [internal_message, customer_message]:
        try:
            send_or_spool_email(reference, message)
        except Exception as exc:  # noqa: BLE001
            LOGGER.exception("Email delivery failed for submission %s", reference)
            email_errors.append(f"Email delivery failed for {message['To']}: {exc}")

    response_payload = {
        "reference": reference,
        "contract_download_url": build_contract_download_url(reference, access_token),
        "email_mode": SETTINGS.email_mode,
        "email_delivery_status": "sent" if not email_errors else "failed",
        "menu_link": cleaned["menuLink"] or None,
        "stored_files": len(stored_files),
        "submitted_at": utc_now(),
    }
    response_payload.update(build_payment_payload(reference, payment_provider, payment_url, cleaned["oneTimeTotal"] > 0))
    return jsonify(response_payload)


@app.route("/api/submissions/<reference>/contract")
def download_contract(reference: str) -> Any:
    require_submission_access(reference)
    with db_connection() as conn:
        row = conn.execute("SELECT contract_pdf_path FROM submissions WHERE reference = ?", (reference,)).fetchone()
    if not row:
        abort(404)
    pdf_path = Path(row["contract_pdf_path"])
    if not pdf_path.exists():
        if SETTINGS.object_storage_enabled:
            return redirect(presigned_object_storage_url(object_storage_key(reference, "contract_bundle.pdf")))
        abort(404)
    return send_file(pdf_path, as_attachment=True, download_name=f"{reference}_contract_bundle.pdf")


@app.route("/api/submissions/<reference>/retry-payment", methods=["POST"])
def retry_submission_payment(reference: str) -> Any:
    access_token = require_submission_access(reference)
    with db_connection() as conn:
        row = conn.execute(
            "SELECT form_payload_json, one_time_total FROM submissions WHERE reference = ?",
            (reference,),
        ).fetchone()
    if not row:
        abort(404)
    if row["one_time_total"] <= 0:
        return jsonify({"error": "This submission does not require a one-time Stripe payment."}), 400
    if SETTINGS.payment_mode != "stripe":
        return jsonify({"error": "Stripe is not configured in this environment."}), 400

    payload = json.loads(row["form_payload_json"])
    try:
        payment_provider, payment_url = create_stripe_checkout_session(reference, access_token, payload, resolve_base_url())
    except Exception as exc:  # noqa: BLE001
        error_message = write_payment_error(reference, exc)
        update_submission_payment(reference, "fallback", "")
        response_payload = build_payment_payload(reference, "fallback", "", True)
        response_payload["payment_error"] = error_message
        return jsonify(response_payload), 502

    clear_payment_error(reference)
    update_submission_payment(reference, payment_provider, payment_url)
    return jsonify(build_payment_payload(reference, payment_provider, payment_url, True))


@app.route("/api/submissions/<reference>/payment-sync", methods=["POST"])
def sync_submission_payment(reference: str) -> Any:
    require_submission_access(reference)
    with db_connection() as conn:
        row = conn.execute(
            """
            SELECT reference, one_time_total, payment_provider, payment_url
            FROM submissions WHERE reference = ?
            """,
            (reference,),
        ).fetchone()
    if not row:
        abort(404)

    if row["one_time_total"] <= 0:
        set_submission_payment_status(reference, "not_required", payment_provider="simulated")
        return jsonify(build_payment_payload(reference, "simulated", "", False))

    action = (request.get_json(silent=True) or {}).get("payment")
    session_id = (request.get_json(silent=True) or {}).get("session_id", "").strip()

    if action == "cancelled":
        set_submission_payment_status(reference, "cancelled", payment_provider=row["payment_provider"] or "stripe", payment_url="")
        clear_payment_error(reference)
        return jsonify(build_payment_payload(reference, row["payment_provider"] or "stripe", "", True))

    if action != "success":
        return jsonify({"error": "Unsupported payment sync action."}), 400
    if not SETTINGS.stripe_secret_key:
        return jsonify({"error": "Stripe is not configured in this environment."}), 400
    if not session_id:
        return jsonify({"error": "Missing Stripe session id."}), 400

    try:
        session = fetch_stripe_checkout_session(session_id)
    except Exception as exc:  # noqa: BLE001
        error_message = describe_payment_error(exc)
        write_payment_error(reference, exc)
        return jsonify({"error": error_message}), 502

    session_reference = session.get("client_reference_id") or ((session.get("metadata") or {}).get("reference"))
    if session_reference != reference:
        return jsonify({"error": "Stripe session does not match this submission."}), 400

    payment_state = session.get("payment_status")
    if payment_state == "paid":
        clear_payment_error(reference)
        set_submission_payment_status(reference, "paid", payment_provider="stripe", payment_url=session.get("url") or row["payment_url"] or "")
    else:
        set_submission_payment_status(reference, payment_state or "pending", payment_provider="stripe", payment_url=session.get("url") or row["payment_url"] or "")

    return jsonify(build_payment_payload(reference, "stripe", session.get("url") or row["payment_url"] or "", True))


@app.route("/api/stripe/webhook", methods=["POST"])
def stripe_webhook() -> Any:
    if not SETTINGS.stripe_webhook_secret:
        return jsonify({"error": "Stripe webhook secret is not configured."}), 400

    payload = request.get_data() or b""
    signature = request.headers.get("Stripe-Signature", "")
    if not verify_stripe_webhook_signature(payload, signature, SETTINGS.stripe_webhook_secret):
        return jsonify({"error": "Invalid Stripe webhook signature."}), 400

    event = request.get_json(silent=True) or {}
    event_type = event.get("type", "")
    data_object = ((event.get("data") or {}).get("object") or {})

    reference = (
        data_object.get("client_reference_id")
        or ((data_object.get("metadata") or {}).get("reference"))
        or ""
    ).strip()
    if not reference:
        return jsonify({"status": "ignored", "reason": "missing_reference"}), 200

    with db_connection() as conn:
        row = conn.execute(
            "SELECT reference, payment_url FROM submissions WHERE reference = ?",
            (reference,),
        ).fetchone()
    if not row:
        return jsonify({"status": "ignored", "reason": "submission_not_found"}), 200

    if event_type == "checkout.session.completed" and data_object.get("payment_status") == "paid":
        set_submission_payment_status(
            reference,
            "paid",
            payment_provider="stripe",
            payment_url=data_object.get("url") or row["payment_url"] or "",
        )
        clear_payment_error(reference)
        return jsonify({"status": "updated", "payment_status": "paid"}), 200

    if event_type in {"checkout.session.expired", "checkout.session.async_payment_failed"}:
        set_submission_payment_status(
            reference,
            "cancelled" if event_type == "checkout.session.expired" else "unpaid",
            payment_provider="stripe",
            payment_url=row["payment_url"] or "",
        )
        return jsonify({"status": "updated", "payment_status": "cancelled"}), 200

    return jsonify({"status": "ignored", "event_type": event_type}), 200


@app.route("/api/submissions/<reference>")
def get_submission(reference: str) -> Any:
    access_token = require_submission_access(reference)
    with db_connection() as conn:
        row = conn.execute(
            """
            SELECT reference, created_at, language, company_name, restaurant_name, email,
                   recurring_total, one_time_total, payment_status, payment_url, payment_provider, form_payload_json
            FROM submissions WHERE reference = ?
            """,
            (reference,),
        ).fetchone()
        files = conn.execute(
            "SELECT original_name, size_bytes, mime_type FROM submission_files WHERE submission_reference = ? ORDER BY id",
            (reference,),
        ).fetchall()
    if not row:
        abort(404)
    submission_payload = json.loads(row["form_payload_json"])
    submission = dict(row)
    submission.pop("form_payload_json", None)
    return jsonify(
        {
            "submission": submission,
            "files": [dict(file_row) for file_row in files],
            "contract_download_url": build_contract_download_url(reference, access_token),
            "payment_error": read_payment_error(reference),
            "payment_retry_url": build_customer_url(f"/api/submissions/{reference}/retry-payment", access_token),
            "payment_sync_url": build_customer_url(f"/api/submissions/{reference}/payment-sync", access_token),
            "menu_link": submission_payload.get("menuLink") or None,
            **build_payment_payload(reference, row["payment_provider"] or "simulated", row["payment_url"] or "", row["one_time_total"] > 0),
        }
    )


if __name__ == "__main__":
    ensure_directories()
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", "8000")), debug=not SETTINGS.production)
