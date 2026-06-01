const PRICING = {
  kiosk: 99,
  pos: 49,
  slaPremium: 9,
  terminal: 199,
  ethernet: 300,
};

const LANGUAGE_META = {
  en: { flag: "🇬🇧", label: "English" },
  fr: { flag: "🇫🇷", label: "Français" },
  de: { flag: "🇩🇪", label: "Deutsch" },
  it: { flag: "🇮🇹", label: "Italiano" },
  tr: { flag: "🇹🇷", label: "Türkçe" },
};

const COPY = {
  en: {
    meta: {
      title: "TapGo Onboarding",
      description: "Configure your TapGo system, validate your contract, and submit your menu in one flow.",
    },
    welcome: {
      eyebrow: "Tap. Order. Go.",
      title: "Choose your language, then launch your <em>TapGo onboarding</em>.",
      text: "This self-service flow lets restaurant owners configure the hardware mix, confirm the 36-month contract, sign digitally, and submit the menu without waiting for a sales meeting.",
      note: "Your language stays active throughout the full journey.",
      cta: "Start onboarding",
      privacyNotice: "By proceeding, you consent to TapGo processing your personal data (company name, email, contact details) to generate and manage your onboarding contract, in accordance with Swiss LPD and GDPR. Data is not retained beyond contract management requirements.",
    },
    progress: {
      eyebrow: "Guided flow",
      title: "Restaurant setup journey",
      steps: ["Configuration", "Business details", "Contract & signature", "Menu & submission"],
    },
    actions: {
      continue: "Continue",
      back: "Back",
    },
    page1: {
      eyebrow: "Step 1 of 4",
      title: "Shape your <em>TapGo setup</em>.",
      text: "Keep the decisions lean: choose the kiosk style, set the quantity, and let the system calculate recurring and one-time pricing instantly.",
      stats: {
        contract: "Months of fixed commitment",
        setup: "Week target for ready-to-go setup",
        languages: "Supported contract languages",
      },
      kioskLabel: "Kiosk style",
      equipmentLabel: "Hardware and payments",
      kiosks: {
        standing: {
          title: "Standing kiosk",
          text: "Best for heavy footfall and clear front-of-house ordering lanes.",
        },
        wall: {
          title: "Wall kiosk",
          text: "Low-footprint format for tighter service areas or narrow entrances.",
        },
        tabletop: {
          title: "Countertop kiosk",
          text: "Compact setup for counters, cafés, and limited-width checkout zones.",
        },
      },
      counters: {
        kiosks: {
          title: "Self-order kiosks",
          tag: "Monthly",
          text: "CHF 99 per unit on the 36-month contract.",
        },
        pos: {
          title: "POS system",
          tag: "Mandatory",
          text: "Configurable cashier station at CHF 49 per month. At least one POS is required.",
        },
        terminals: {
          title: "myPOS terminals",
          tag: "One-time",
          text: "Calculated automatically as kiosks + 1. Paid separately via Stripe.",
        },
      },
      ethernet: {
        title: "Ethernet installation",
        tag: "Optional",
        text: "Add the one-time on-site ethernet setup for CHF 300, or install it yourself at no extra cost.",
      },
      highlightsLabel: "Why this setup works",
      highlights: {
        fast: {
          title: "Fast sales cycle",
          text: "The flow is designed to be completed in minutes instead of requiring manual discovery calls.",
        },
        scalable: {
          title: "Scalable hardware logic",
          text: "POS is fixed, terminals are automatic, and printers default from the selected hardware count.",
        },
        cash: {
          title: "Clear pricing split",
          text: "Monthly subscription and one-time Stripe items stay visibly separated from the first screen.",
        },
      },
    },
    page2: {
      eyebrow: "Step 2 of 4",
      title: "Add your <em>business details</em>.",
      text: "These fields map into the generated addendum and legal agreement, so accuracy matters here.",
      companyLabel: "Company",
      restaurantLabel: "Restaurant",
      contactLabel: "Contact and signature",
      operationsLabel: "Operational details",
      slaLabel: "Support plan",
      fields: {
        companyName: "Company / legal name",
        companyAddress: "Company address",
        restaurantName: "Restaurant name",
        restaurantAddress: "Restaurant address",
        contactPerson: "Contact person / signatory",
        email: "Email address",
        phone: "Phone number",
        language: "Contract language",
      },
      placeholders: {
        companyName: "Example: Bouafif Partners SA",
        companyAddress: "Street, postal code, city",
        restaurantName: "Example: TFK Restaurant",
        restaurantAddress: "Restaurant location",
        contactPerson: "First and last name",
        email: "contact@restaurant.ch",
        phone: "+41 76 000 00 00",
      },
      languageHint: "You can still switch languages from the top bar without losing your progress.",
      operations: {
        printers: {
          title: "Printer count",
          tag: "Editable",
          text: "Defaults to kiosks + POS, as requested in the requirements document.",
        },
        stripe: {
          title: "Stripe hardware payment",
        },
        startDate: {
          title: "Contract start date",
          text: "This remains blank in the generated documents and is completed on installation day.",
        },
      },
      sla: {
        recommended: "Recommended",
        standard: {
          title: "Standard",
          price: "Included",
          items: [
            "Mon-Fri support window",
            "Response within 24 working hours",
            "On-site visit billed separately",
            "Baseline 90% availability target",
          ],
        },
        premium: {
          title: "Premium",
          price: "+9 CHF / month",
          items: [
            "7/7 extended support coverage",
            "Priority remote response",
            "On-site intervention included",
            "Higher service availability target",
          ],
        },
      },
      cta: "Review contract",
    },
    page3: {
      eyebrow: "Step 3 of 4",
      title: "Validate the <em>agreement</em>.",
      text: "The commercial addendum stays in sync with your chosen configuration, while the legal terms stay aligned with the contract source you provided.",
      download: "Download contract preview",
      addendumEyebrow: "Generated document",
      addendumTitle: "Commercial addendum",
      termsEyebrow: "Generated document",
      termsTitle: "General conditions",
      acceptanceLabel: "Required confirmations",
      acceptCommitment: "I accept the <strong>36-month commitment</strong> and understand the agreement stays non-cancellable before term except for valid cause.",
      acceptTerms: "I have read and accept the <strong>TapGo general conditions</strong>, including SLA rules, liability limits, and hardware return obligations.",
      signatureLabel: "Electronic signature",
      signaturePending: "Waiting for signature",
      signatureDone: "Signature captured",
      signatureHint: "Draw your signature with a mouse or finger.",
      clear: "Clear",
      cta: "Continue to submission",
      addendumRows: {
        client: "Client company",
        companyAddress: "Company address",
        restaurant: "Restaurant",
        restaurantAddress: "Restaurant address",
        contact: "Signatory",
        kiosks: "Self-order kiosks",
        pos: "POS system",
        printers: "Printers",
        sla: "Support plan",
        duration: "Contract duration",
        startDate: "Effective start date",
        monthlyTotal: "Monthly total",
      },
      terms: [
        {
          title: "1. Parties and structure",
          text: "TapGo by MS-Architecture & Technologies Sàrl remains the provider. The commercial addendum governs prices and quantities, while the main agreement governs legal, technical, and operational clauses.",
        },
        {
          title: "2. Scope of service",
          text: "The agreement covers hardware provision, software access, support services, and the reciprocal obligations between customer and provider.",
        },
        {
          title: "3. Duration",
          text: "The contract starts on the day of full installation and runs for a firm 36-month term. Renewal continues yearly unless cancelled in writing at least three months before renewal.",
        },
        {
          title: "4. Billing model",
          text: "Monthly charges apply to kiosks, POS, and the selected SLA plan. Stripe processing costs and the one-time hardware payments remain outside the recurring contract total.",
        },
        {
          title: "5. Ownership and use",
          text: "TapGo keeps ownership of the hardware, software, interfaces, systems, and configurations. Copying, reverse engineering, or bypassing protections is not permitted.",
        },
        {
          title: "6. Maintenance and SLA",
          text: "Standard and Premium support options follow the support windows, response targets, and exclusions described in the supplied contract. Client-side internet, power, and third-party failures stay outside SLA responsibility.",
        },
        {
          title: "7. Liability and end of term",
          text: "The provider is liable only in cases of gross negligence or intent. Lost revenue, indirect damage, network outages, or Stripe outages are excluded, and hardware must be returned in working condition at the end of term.",
        },
      ],
    },
    page4: {
      eyebrow: "Step 4 of 4",
      title: "Send the <em>menu package</em>.",
      text: "Upload the working menu files or share a menu link for the back-office configuration team, add any notes, and finalize the onboarding package.",
      uploadTitle: "Drop menu files here or choose them from your device",
      uploadText: "You can upload food, drinks, pricing sheets, or updated menu documents in multiple formats.",
      linkLabel: "Menu link",
      linkField: "Menu URL",
      linkPlaceholder: "https://example.com/menu.pdf",
      linkHint: "Use this if your menu is already shared online. A menu file or a menu link is required.",
      fileRules: {
        count: "Maximum files",
        size: "Maximum per file",
        formats: "Accepted formats",
      },
      noteLabel: "Special instructions",
      noteField: "Menu note",
      notePlaceholder: "Add comments for the back-office team, for example separate lunch and dinner pricing, combo logic, or allergy handling.",
      deliveryLabel: "Delivery",
      delivery: {
        tapgo: {
          title: "Internal delivery",
          text: "The package is prepared for delivery to contract@tapgo.ch with the signed contract, menu files, and structured onboarding summary.",
        },
        customer: {
          title: "Customer confirmation",
          text: "The selected contact email receives a confirmation message and a copy of the generated contract details in the chosen language.",
        },
        phase1: {
          title: "Phase 1 scope",
          text: "Browser signature, local PDF generation, menu storage, and Stripe checkout creation are handled in this release.",
        },
      },
      cta: "Submit onboarding package",
    },
    success: {
      eyebrow: "Submission complete",
      title: "Your TapGo setup is <em>ready for handoff</em>.",
      reference: "Reference",
      steps: [
        {
          title: "Hardware ordering",
          text: "TapGo can now prepare the myPOS hardware count and the final device allocation.",
        },
        {
          title: "Installation planning",
          text: "The team can reach out to confirm the installation date and finalize the start-of-service timing.",
        },
        {
          title: "Menu configuration",
          text: "Your menu files and notes are ready for back-office configuration on kiosk and POS interfaces.",
        },
      ],
    },
    summary: {
      eyebrow: "Live summary",
      title: "Commercial snapshot",
      text: "The side panel keeps the recurring contract value and the one-time Stripe basket visible at every step.",
      items: {
        language: "Language",
        kioskType: "Kiosk type",
        kiosks: "Kiosk quantity",
        printers: "Printers",
        terminals: "myPOS terminals",
        pos: "POS quantity",
      },
      oneTime: "One-time Stripe basket",
      total: "Recurring monthly total",
      stepNotes: [
        "Kiosks, POS, and printers are configurable; terminals are calculated automatically as kiosks + 1.",
        "Business data now maps directly into the generated documents and stays ready for notification emails.",
        "The legal start date remains blank here by design and is completed on installation day.",
        "Menu uploads accept multiple files and stay validated against the SRD limits.",
      ],
      kioskTypes: {
        standing: "Standing kiosk",
        wall: "Wall kiosk",
        tabletop: "Countertop kiosk",
      },
      sla: {
        standard: "Standard (included)",
        premium: "Premium (+9 CHF/mo)",
      },
      recurringLabel: "Recurring contract",
      supportLabel: "Support plan",
    },
    errors: {
      required: "This field is required.",
      email: "Enter a valid email address.",
      signature: "A signature is required before moving forward.",
      fileCount: "You can upload up to 10 files.",
      fileSize: "Each file must stay under 20 MB.",
      fileType: "Only PDF, JPG, JPEG, PNG, XLSX, and DOCX files are allowed.",
    },
    templates: {
      perMonth: "CHF/mo",
      oneTime: "CHF",
      stripeInfo: "{count} myPOS terminals are prepared for the one-time Stripe payment.",
      kioskMonthly: "Kiosks ({count} × 99 CHF)",
      successWithFilesAndLink: "Your signed contract, company data, {count} menu file(s), and the shared menu link are prepared for delivery to contract@tapgo.ch.",
      successWithFiles: "Your signed contract, company data, and {count} menu file(s) are prepared for delivery to contract@tapgo.ch.",
      successWithLink: "Your signed contract, company data, and shared menu link are prepared for delivery to contract@tapgo.ch.",
      successNoFiles: "Your signed contract and company data are prepared for delivery to contract@tapgo.ch. No menu files were attached in this submission.",
      printerValue: "{count} printer(s)",
      posMonthly: "POS ({count} × 49 CHF)",
      duration: "36 months fixed",
      blankDate: "Completed on installation day",
    },
  },
  fr: {
    meta: {
      title: "Onboarding TapGo",
      description: "Configurez votre système TapGo, validez le contrat et transmettez votre menu dans un seul parcours.",
    },
    welcome: {
      eyebrow: "Tap. Order. Go.",
      title: "Choisissez votre langue puis lancez votre <em>onboarding TapGo</em>.",
      text: "Ce parcours en libre-service permet au restaurateur de configurer le matériel, confirmer le contrat de 36 mois, signer numériquement et transmettre le menu sans rendez-vous commercial.",
      note: "La langue reste active pendant tout le parcours.",
      cta: "Commencer l'onboarding",
      privacyNotice: "En continuant, vous consentez à ce que TapGo traite vos données personnelles (nom de l'entreprise, e-mail, coordonnées) pour générer et gérer votre contrat d'onboarding, conformément à la LPD suisse et au RGPD. Les données ne sont pas conservées au-delà des besoins de gestion contractuelle.",
    },
    progress: {
      eyebrow: "Parcours guidé",
      title: "Mise en place du restaurant",
      steps: ["Configuration", "Informations", "Contrat & signature", "Menu & envoi"],
    },
    actions: {
      continue: "Continuer",
      back: "Retour",
    },
    page1: {
      eyebrow: "Étape 1 sur 4",
      title: "Composez votre <em>configuration TapGo</em>.",
      text: "Gardez les décisions simples : choisissez le format de borne, définissez la quantité et laissez le système calculer immédiatement le mensuel et les paiements uniques.",
      stats: {
        contract: "Mois d'engagement ferme",
        setup: "Semaines visées pour une mise en place rapide",
        languages: "Langues de contrat disponibles",
      },
      kioskLabel: "Type de borne",
      equipmentLabel: "Matériel et paiements",
      kiosks: {
        standing: {
          title: "Borne debout",
          text: "Idéale pour les flux importants et les zones de commande bien visibles.",
        },
        wall: {
          title: "Borne murale",
          text: "Format compact pour les espaces étroits ou les zones de service réduites.",
        },
        tabletop: {
          title: "Borne comptoir",
          text: "Configuration compacte pour comptoirs, cafés et petites zones d'encaissement.",
        },
      },
      counters: {
        kiosks: {
          title: "Bornes de commande",
          tag: "Mensuel",
          text: "CHF 99 par unité sur le contrat de 36 mois.",
        },
        pos: {
          title: "Système POS",
          tag: "Obligatoire",
          text: "Station caisse configurable à CHF 49 par mois. Au moins un POS est requis.",
        },
        terminals: {
          title: "Terminaux myPOS",
          tag: "Paiement unique",
          text: "Calcul automatique : bornes + 1. Paiement séparé via Stripe.",
        },
      },
      ethernet: {
        title: "Installation Ethernet",
        tag: "Optionnel",
        text: "Ajoutez l'installation Ethernet sur site à CHF 300 ou installez vous-même sans coût supplémentaire.",
      },
      highlightsLabel: "Pourquoi cette logique fonctionne",
      highlights: {
        fast: {
          title: "Cycle de vente plus rapide",
          text: "Le parcours est pensé pour se terminer en quelques minutes au lieu de dépendre d'un rendez-vous manuel.",
        },
        scalable: {
          title: "Logique matérielle scalable",
          text: "La caisse est fixe, les terminaux sont automatiques et les imprimantes suivent le matériel choisi par défaut.",
        },
        cash: {
          title: "Séparation de prix claire",
          text: "L'abonnement mensuel et les éléments Stripe payés une fois restent visibles dès le premier écran.",
        },
      },
    },
    page2: {
      eyebrow: "Étape 2 sur 4",
      title: "Ajoutez vos <em>informations société</em>.",
      text: "Ces champs alimentent directement l'avenant et le contrat, donc la précision est importante.",
      companyLabel: "Société",
      restaurantLabel: "Restaurant",
      contactLabel: "Contact et signature",
      operationsLabel: "Détails opérationnels",
      slaLabel: "Niveau de support",
      fields: {
        companyName: "Raison sociale",
        companyAddress: "Adresse de la société",
        restaurantName: "Nom du restaurant",
        restaurantAddress: "Adresse du restaurant",
        contactPerson: "Personne de contact / signataire",
        email: "Adresse e-mail",
        phone: "Téléphone",
        language: "Langue du contrat",
      },
      placeholders: {
        companyName: "Exemple : Bouafif Partners SA",
        companyAddress: "Rue, NPA, ville",
        restaurantName: "Exemple : TFK Restaurant",
        restaurantAddress: "Adresse du restaurant",
        contactPerson: "Prénom Nom",
        email: "contact@restaurant.ch",
        phone: "+41 76 000 00 00",
      },
      languageHint: "Vous pouvez encore changer la langue depuis la barre supérieure sans perdre votre progression.",
      operations: {
        printers: {
          title: "Nombre d'imprimantes",
          tag: "Modifiable",
          text: "Par défaut : bornes + POS, conformément au cahier des charges.",
        },
        stripe: {
          title: "Paiement matériel Stripe",
        },
        startDate: {
          title: "Date de début du contrat",
          text: "Elle reste vide dans les documents générés et sera complétée le jour de l'installation.",
        },
      },
      sla: {
        recommended: "Recommandé",
        standard: {
          title: "Standard",
          price: "Inclus",
          items: [
            "Support lun-ven",
            "Réponse sous 24h ouvrables",
            "Intervention sur site facturée séparément",
            "Objectif de disponibilité 90%",
          ],
        },
        premium: {
          title: "Premium",
          price: "+9 CHF / mois",
          items: [
            "Couverture étendue 7/7",
            "Réponse distante prioritaire",
            "Intervention sur site incluse",
            "Objectif de disponibilité renforcé",
          ],
        },
      },
      cta: "Relire le contrat",
    },
    page3: {
      eyebrow: "Étape 3 sur 4",
      title: "Validez le <em>cadre contractuel</em>.",
      text: "L'avenant commercial reste synchronisé avec la configuration choisie, tandis que les clauses juridiques suivent le contrat source fourni.",
      download: "Télécharger l'aperçu du contrat",
      addendumEyebrow: "Document généré",
      addendumTitle: "Avenant contractuel",
      termsEyebrow: "Document généré",
      termsTitle: "Conditions générales",
      acceptanceLabel: "Confirmations requises",
      acceptCommitment: "J'accepte <strong>l'engagement de 36 mois</strong> et je comprends que le contrat reste non résiliable avant terme sauf juste motif reconnu.",
      acceptTerms: "J'ai lu et j'accepte les <strong>conditions générales TapGo</strong>, y compris les règles SLA, les limites de responsabilité et la restitution du matériel.",
      signatureLabel: "Signature électronique",
      signaturePending: "Signature en attente",
      signatureDone: "Signature enregistrée",
      signatureHint: "Signez avec votre souris ou votre doigt.",
      clear: "Effacer",
      cta: "Continuer vers l'envoi",
      addendumRows: {
        client: "Société cliente",
        companyAddress: "Adresse société",
        restaurant: "Restaurant",
        restaurantAddress: "Adresse restaurant",
        contact: "Signataire",
        kiosks: "Bornes de commande",
        pos: "Système POS",
        printers: "Imprimantes",
        sla: "Support",
        duration: "Durée contractuelle",
        startDate: "Date d'effet",
        monthlyTotal: "Total mensuel",
      },
      terms: [
        {
          title: "1. Parties et hiérarchie",
          text: "TapGo by MS-Architecture & Technologies Sàrl reste le fournisseur. L'avenant commercial fait foi pour les prix et quantités, tandis que le contrat principal gouverne les clauses juridiques, techniques et opérationnelles.",
        },
        {
          title: "2. Objet du service",
          text: "Le contrat couvre la mise à disposition du matériel, l'accès logiciel, le support et les obligations réciproques entre le client et le fournisseur.",
        },
        {
          title: "3. Durée",
          text: "Le contrat démarre le jour de l'installation complète et court sur une durée ferme de 36 mois. Il se renouvelle ensuite par périodes annuelles sauf résiliation écrite trois mois avant échéance.",
        },
        {
          title: "4. Modèle de facturation",
          text: "Les redevances mensuelles couvrent les bornes, la caisse et le SLA choisi. Les coûts Stripe et les paiements matériels uniques restent hors du total contractuel récurrent.",
        },
        {
          title: "5. Propriété et usage",
          text: "TapGo conserve la propriété du matériel, du logiciel, des interfaces, des systèmes et des configurations. La copie, la rétro-ingénierie ou le contournement des protections sont interdits.",
        },
        {
          title: "6. Maintenance et SLA",
          text: "Les options Standard et Premium suivent les plages de support, délais de réponse et exclusions définis dans le contrat fourni. Les pannes internet, électriques ou tierces restent hors SLA.",
        },
        {
          title: "7. Responsabilité et fin de contrat",
          text: "La responsabilité du fournisseur n'est engagée qu'en cas de faute grave ou intentionnelle. Les pertes indirectes, coupures réseau ou indisponibilités Stripe sont exclues et le matériel doit être restitué en bon état en fin de contrat.",
        },
      ],
    },
    page4: {
      eyebrow: "Étape 4 sur 4",
      title: "Transmettez le <em>package menu</em>.",
      text: "Déposez les fichiers utiles ou partagez un lien vers le menu pour la configuration back-office, ajoutez vos remarques et finalisez le dossier d'onboarding.",
      uploadTitle: "Déposez vos fichiers menu ici ou choisissez-les sur votre appareil",
      uploadText: "Vous pouvez joindre menus food, boissons, feuilles de prix ou documents mis à jour dans plusieurs formats.",
      linkLabel: "Lien du menu",
      linkField: "URL du menu",
      linkPlaceholder: "https://exemple.com/menu.pdf",
      linkHint: "Utilisez ce champ si votre menu est déjà partagé en ligne. Un fichier menu ou un lien de menu est requis.",
      fileRules: {
        count: "Nombre maximum",
        size: "Taille max par fichier",
        formats: "Formats acceptés",
      },
      noteLabel: "Instructions spéciales",
      noteField: "Note menu",
      notePlaceholder: "Ajoutez des précisions pour l'équipe back-office : menus midi/soir, logiques de combos, allergènes, etc.",
      deliveryLabel: "Livraison",
      delivery: {
        tapgo: {
          title: "Envoi interne",
          text: "Le dossier est préparé pour contract@tapgo.ch avec le contrat signé, les fichiers menu et un résumé structuré.",
        },
        customer: {
          title: "Confirmation client",
          text: "L'adresse de contact reçoit un message de confirmation ainsi qu'une copie du contrat généré dans la langue choisie.",
        },
        phase1: {
          title: "Périmètre Phase 1",
          text: "La signature dans le navigateur, la génération PDF locale, le stockage des menus et la création du paiement Stripe sont gérés dans cette version.",
        },
      },
      cta: "Soumettre le dossier",
    },
    success: {
      eyebrow: "Envoi terminé",
      title: "Votre mise en place TapGo est <em>prête pour le relais</em>.",
      reference: "Référence",
      steps: [
        {
          title: "Commande matériel",
          text: "TapGo peut maintenant préparer le nombre de terminaux myPOS et l'allocation finale des appareils.",
        },
        {
          title: "Planification installation",
          text: "L'équipe peut vous recontacter pour fixer la date d'installation et le démarrage du service.",
        },
        {
          title: "Configuration du menu",
          text: "Vos fichiers et notes sont prêts pour la configuration des bornes et du POS.",
        },
      ],
    },
    summary: {
      eyebrow: "Résumé en direct",
      title: "Snapshot commercial",
      text: "Le panneau latéral garde visible la valeur récurrente du contrat et le panier Stripe payé une seule fois.",
      items: {
        language: "Langue",
        kioskType: "Type de borne",
        kiosks: "Quantité de bornes",
        printers: "Imprimantes",
        terminals: "Terminaux myPOS",
        pos: "Quantité POS",
      },
      oneTime: "Panier Stripe unique",
      total: "Total mensuel récurrent",
      stepNotes: [
        "Bornes, POS et imprimantes sont configurables ; les terminaux sont calculés automatiquement (bornes + 1).",
        "Les données société alimentent désormais directement les documents générés et les notifications.",
        "La date de démarrage reste volontairement vide ici et sera complétée le jour d'installation.",
        "Les uploads menu respectent les limites du SRD tout en restant multi-fichiers.",
      ],
      kioskTypes: {
        standing: "Borne debout",
        wall: "Borne murale",
        tabletop: "Borne comptoir",
      },
      sla: {
        standard: "Standard (inclus)",
        premium: "Premium (+9 CHF/mois)",
      },
      recurringLabel: "Contrat récurrent",
      supportLabel: "Niveau de support",
    },
    errors: {
      required: "Ce champ est requis.",
      email: "Saisissez une adresse e-mail valide.",
      signature: "Une signature est requise avant de continuer.",
      fileCount: "Vous pouvez téléverser jusqu'à 10 fichiers.",
      fileSize: "Chaque fichier doit rester sous 20 MB.",
      fileType: "Seuls les fichiers PDF, JPG, JPEG, PNG, XLSX et DOCX sont acceptés.",
    },
    templates: {
      perMonth: "CHF/mois",
      oneTime: "CHF",
      stripeInfo: "{count} terminaux myPOS sont préparés pour le paiement matériel Stripe.",
      kioskMonthly: "Bornes ({count} × 99 CHF)",
      successWithFilesAndLink: "Votre contrat signé, vos données société, {count} fichier(s) menu et le lien du menu sont prêts pour contract@tapgo.ch.",
      successWithFiles: "Votre contrat signé, vos données société et {count} fichier(s) menu sont prêts pour contract@tapgo.ch.",
      successWithLink: "Votre contrat signé, vos données société et le lien du menu sont prêts pour contract@tapgo.ch.",
      successNoFiles: "Votre contrat signé et vos données société sont prêts pour contract@tapgo.ch. Aucun fichier menu n'a été joint à cet envoi.",
      printerValue: "{count} imprimante(s)",
      posMonthly: "POS ({count} × 49 CHF)",
      duration: "36 mois fermes",
      blankDate: "Complété le jour de l'installation",
    },
  },
  de: {
    meta: {
      title: "TapGo Onboarding",
      description: "Konfigurieren Sie Ihr TapGo-System, bestätigen Sie den Vertrag und senden Sie Ihr Menü in einem einzigen Ablauf.",
    },
    welcome: {
      eyebrow: "Tap. Order. Go.",
      title: "Wählen Sie Ihre Sprache und starten Sie das <em>TapGo Onboarding</em>.",
      text: "Dieser Self-Service-Ablauf ermöglicht Restaurantinhabern, die Hardware zu konfigurieren, den 36-Monats-Vertrag zu bestätigen, digital zu unterschreiben und das Menü ohne Verkaufstermin einzureichen.",
      note: "Die Sprache bleibt im gesamten Ablauf aktiv.",
      cta: "Onboarding starten",
      privacyNotice: "Durch Fortfahren stimmen Sie zu, dass TapGo Ihre personenbezogenen Daten (Unternehmensname, E-Mail, Kontaktdaten) gemäss Schweizer DSG und DSGVO verarbeitet, um Ihren Onboarding-Vertrag zu erstellen und zu verwalten. Daten werden nicht über die Anforderungen der Vertragsverwaltung hinaus aufbewahrt.",
    },
    progress: {
      eyebrow: "Geführter Ablauf",
      title: "Einrichtung des Restaurants",
      steps: ["Konfiguration", "Firmendaten", "Vertrag & Signatur", "Menü & Versand"],
    },
    actions: {
      continue: "Weiter",
      back: "Zurück",
    },
    page1: {
      eyebrow: "Schritt 1 von 4",
      title: "Bauen Sie Ihr <em>TapGo Setup</em> auf.",
      text: "Halten Sie die Entscheidungen schlank: Wählen Sie den Kiosktyp, legen Sie die Menge fest und lassen Sie das System wiederkehrende und einmalige Kosten sofort berechnen.",
      stats: {
        contract: "Monate feste Laufzeit",
        setup: "Ziel in Wochen für ein schnelles Go-live",
        languages: "Verfügbare Vertragssprachen",
      },
      kioskLabel: "Kiosktyp",
      equipmentLabel: "Hardware und Zahlungen",
      kiosks: {
        standing: {
          title: "Stehkiosk",
          text: "Ideal für hohe Frequenz und klar geführte Bestellzonen im Frontbereich.",
        },
        wall: {
          title: "Wandkiosk",
          text: "Platzsparendes Format für engere Serviceflächen oder schmale Eingänge.",
        },
        tabletop: {
          title: "Thekenkiosk",
          text: "Kompaktes Setup für Theken, Cafés und schmale Checkout-Bereiche.",
        },
      },
      counters: {
        kiosks: {
          title: "Self-Order-Kioske",
          tag: "Monatlich",
          text: "CHF 99 pro Einheit innerhalb des 36-Monats-Vertrags.",
        },
        pos: {
          title: "POS-System",
          tag: "Pflicht",
          text: "Konfigurierbare Kassenstation zu CHF 49 pro Monat. Mindestens ein POS ist erforderlich.",
        },
        terminals: {
          title: "myPOS-Terminals",
          tag: "Einmalig",
          text: "Automatisch berechnet als Kioske + 1. Separate Stripe-Zahlung.",
        },
      },
      ethernet: {
        title: "Ethernet-Installation",
        tag: "Optional",
        text: "Fügen Sie die einmalige Vor-Ort-Installation für CHF 300 hinzu oder installieren Sie selbst ohne Zusatzkosten.",
      },
      highlightsLabel: "Warum diese Logik funktioniert",
      highlights: {
        fast: {
          title: "Schneller Vertriebszyklus",
          text: "Der Ablauf ist so gebaut, dass er in Minuten statt über manuelle Gespräche abgeschlossen werden kann.",
        },
        scalable: {
          title: "Skalierbare Hardwarelogik",
          text: "POS ist fix, Terminals sind automatisch und Drucker folgen standardmässig der gewählten Hardware.",
        },
        cash: {
          title: "Klare Preisaufteilung",
          text: "Monatliches Abo und einmalige Stripe-Positionen bleiben vom ersten Bildschirm an sichtbar getrennt.",
        },
      },
    },
    page2: {
      eyebrow: "Schritt 2 von 4",
      title: "Erfassen Sie Ihre <em>Firmendaten</em>.",
      text: "Diese Felder fliessen direkt in Addendum und Vertrag ein, deshalb ist Genauigkeit wichtig.",
      companyLabel: "Firma",
      restaurantLabel: "Restaurant",
      contactLabel: "Kontakt und Unterschrift",
      operationsLabel: "Betriebliche Details",
      slaLabel: "Supportplan",
      fields: {
        companyName: "Firmenname / juristischer Name",
        companyAddress: "Firmenadresse",
        restaurantName: "Restaurantname",
        restaurantAddress: "Restaurantadresse",
        contactPerson: "Kontaktperson / Unterzeichner",
        email: "E-Mail-Adresse",
        phone: "Telefonnummer",
        language: "Vertragssprache",
      },
      placeholders: {
        companyName: "Beispiel: Bouafif Partners SA",
        companyAddress: "Strasse, PLZ, Ort",
        restaurantName: "Beispiel: TFK Restaurant",
        restaurantAddress: "Restaurantstandort",
        contactPerson: "Vorname Nachname",
        email: "contact@restaurant.ch",
        phone: "+41 76 000 00 00",
      },
      languageHint: "Sie können die Sprache oben weiterhin wechseln, ohne den Fortschritt zu verlieren.",
      operations: {
        printers: {
          title: "Anzahl Drucker",
          tag: "Bearbeitbar",
          text: "Standardmässig Kioske + POS, wie im Anforderungspapier beschrieben.",
        },
        stripe: {
          title: "Stripe-Hardwarezahlung",
        },
        startDate: {
          title: "Vertragsstart",
          text: "Bleibt im generierten Dokument leer und wird am Installationstag ergänzt.",
        },
      },
      sla: {
        recommended: "Empfohlen",
        standard: {
          title: "Standard",
          price: "Inklusive",
          items: [
            "Supportfenster Mo-Fr",
            "Antwort innert 24 Arbeitsstunden",
            "Vor-Ort-Einsatz separat verrechnet",
            "Basisziel 90% Verfügbarkeit",
          ],
        },
        premium: {
          title: "Premium",
          price: "+9 CHF / Monat",
          items: [
            "Erweiterte 7/7-Abdeckung",
            "Priorisierte Remote-Antwort",
            "Vor-Ort-Einsatz inklusive",
            "Höheres Verfügbarkeitsziel",
          ],
        },
      },
      cta: "Vertrag prüfen",
    },
    page3: {
      eyebrow: "Schritt 3 von 4",
      title: "Bestätigen Sie den <em>Vertragsrahmen</em>.",
      text: "Das kommerzielle Addendum bleibt mit Ihrer gewählten Konfiguration synchron, während die juristischen Klauseln dem gelieferten Vertragsdokument folgen.",
      download: "Vertragsvorschau herunterladen",
      addendumEyebrow: "Generiertes Dokument",
      addendumTitle: "Kommerzielles Addendum",
      termsEyebrow: "Generiertes Dokument",
      termsTitle: "Allgemeine Bedingungen",
      acceptanceLabel: "Erforderliche Bestätigungen",
      acceptCommitment: "Ich akzeptiere die <strong>36-monatige Laufzeit</strong> und verstehe, dass der Vertrag vor Ablauf nur aus wichtigem Grund beendet werden kann.",
      acceptTerms: "Ich habe die <strong>TapGo AGB</strong> gelesen und akzeptiere sie, einschliesslich SLA-Regeln, Haftungsgrenzen und Rückgabepflichten für Hardware.",
      signatureLabel: "Elektronische Unterschrift",
      signaturePending: "Unterschrift ausstehend",
      signatureDone: "Unterschrift erfasst",
      signatureHint: "Unterschreiben Sie mit Maus oder Finger.",
      clear: "Löschen",
      cta: "Weiter zur Einreichung",
      addendumRows: {
        client: "Kundenfirma",
        companyAddress: "Firmenadresse",
        restaurant: "Restaurant",
        restaurantAddress: "Restaurantadresse",
        contact: "Unterzeichner",
        kiosks: "Bestellkioske",
        pos: "POS-System",
        printers: "Drucker",
        sla: "Supportplan",
        duration: "Vertragsdauer",
        startDate: "Wirksamkeitsdatum",
        monthlyTotal: "Monatstotal",
      },
      terms: [
        {
          title: "1. Parteien und Hierarchie",
          text: "TapGo by MS-Architecture & Technologies Sàrl bleibt der Anbieter. Das kommerzielle Addendum regelt Preise und Mengen, während der Hauptvertrag die rechtlichen, technischen und operativen Klauseln regelt.",
        },
        {
          title: "2. Leistungsumfang",
          text: "Der Vertrag deckt die Bereitstellung der Hardware, den Softwarezugang, Supportleistungen sowie die wechselseitigen Pflichten zwischen Kunde und Anbieter ab.",
        },
        {
          title: "3. Laufzeit",
          text: "Der Vertrag beginnt am Tag der vollständigen Installation und läuft für feste 36 Monate. Danach verlängert er sich jährlich, sofern nicht drei Monate vor Ablauf schriftlich gekündigt wird.",
        },
        {
          title: "4. Abrechnungsmodell",
          text: "Die monatlichen Gebühren decken Kioske, POS und den gewählten SLA-Plan. Stripe-Gebühren und einmalige Hardwarezahlungen bleiben ausserhalb des wiederkehrenden Vertragstotals.",
        },
        {
          title: "5. Eigentum und Nutzung",
          text: "TapGo behält das Eigentum an Hardware, Software, Interfaces, Systemen und Konfigurationen. Kopieren, Reverse Engineering oder das Umgehen von Schutzmechanismen ist nicht erlaubt.",
        },
        {
          title: "6. Wartung und SLA",
          text: "Standard- und Premium-Support folgen den im gelieferten Vertrag beschriebenen Servicefenstern, Reaktionszielen und Ausschlüssen. Kundeninternet, Strom und Drittanbieter-Ausfälle liegen ausserhalb des SLA.",
        },
        {
          title: "7. Haftung und Vertragsende",
          text: "Der Anbieter haftet nur bei grober Fahrlässigkeit oder Vorsatz. Indirekte Schäden, Netzausfälle oder Stripe-Ausfälle sind ausgeschlossen und die Hardware muss am Vertragsende funktionsfähig zurückgegeben werden.",
        },
      ],
    },
    page4: {
      eyebrow: "Schritt 4 von 4",
      title: "Senden Sie das <em>Menüpaket</em>.",
      text: "Laden Sie die relevanten Dateien hoch oder teilen Sie einen Menülink für die Back-Office-Konfiguration, ergänzen Sie Hinweise und schliessen Sie das Onboarding-Paket ab.",
      uploadTitle: "Menüdateien hier ablegen oder vom Gerät auswählen",
      uploadText: "Sie können Speise-, Getränke-, Preislisten oder aktualisierte Dokumente in mehreren Formaten hochladen.",
      linkLabel: "Menülink",
      linkField: "Menü-URL",
      linkPlaceholder: "https://beispiel.com/menu.pdf",
      linkHint: "Verwenden Sie dieses Feld, wenn Ihr Menü bereits online geteilt wird. Eine Menüdatei oder ein Menülink ist erforderlich.",
      fileRules: {
        count: "Maximale Dateien",
        size: "Maximal pro Datei",
        formats: "Erlaubte Formate",
      },
      noteLabel: "Spezielle Hinweise",
      noteField: "Menü-Hinweis",
      notePlaceholder: "Ergänzen Sie Hinweise für das Back-Office, z. B. Mittags-/Abendkarten, Kombilogik oder Allergenhinweise.",
      deliveryLabel: "Zustellung",
      delivery: {
        tapgo: {
          title: "Interne Zustellung",
          text: "Das Paket wird für contract@tapgo.ch mit unterschriebenem Vertrag, Menüdateien und strukturiertem Überblick vorbereitet.",
        },
        customer: {
          title: "Kundenbestätigung",
          text: "Die Kontaktadresse erhält eine Bestätigung und eine Kopie der generierten Vertragsdetails in der gewählten Sprache.",
        },
        phase1: {
          title: "Phase-1-Umfang",
          text: "Browser-Signatur, lokale PDF-Generierung, Menüspeicherung und Stripe-Checkout werden in dieser Version verarbeitet.",
        },
      },
      cta: "Onboarding-Paket absenden",
    },
    success: {
      eyebrow: "Versand abgeschlossen",
      title: "Ihr TapGo Setup ist <em>bereit zur Übergabe</em>.",
      reference: "Referenz",
      steps: [
        {
          title: "Hardware-Bestellung",
          text: "TapGo kann jetzt die Anzahl der myPOS-Geräte und die finale Geräteverteilung vorbereiten.",
        },
        {
          title: "Installationsplanung",
          text: "Das Team kann sich melden, um den Installationstermin und den Servicebeginn zu bestätigen.",
        },
        {
          title: "Menükonfiguration",
          text: "Ihre Dateien und Hinweise sind bereit für die Konfiguration von Kiosk und POS.",
        },
      ],
    },
    summary: {
      eyebrow: "Live-Zusammenfassung",
      title: "Kommerzieller Überblick",
      text: "Das Seitenpanel hält den wiederkehrenden Vertragswert und den einmaligen Stripe-Korb in jedem Schritt sichtbar.",
      items: {
        language: "Sprache",
        kioskType: "Kiosktyp",
        kiosks: "Kioskanzahl",
        printers: "Drucker",
        terminals: "myPOS-Terminals",
        pos: "POS-Anzahl",
      },
      oneTime: "Einmaliger Stripe-Korb",
      total: "Wiederkehrender Monatstotal",
      stepNotes: [
        "Kioske, POS und Drucker sind konfigurierbar; Terminals werden automatisch berechnet (Kioske + 1).",
        "Die Firmendaten fliessen jetzt direkt in die generierten Dokumente und Benachrichtigungen ein.",
        "Das Startdatum bleibt hier absichtlich leer und wird am Installationstag ergänzt.",
        "Menü-Uploads bleiben mehrteilig und erfüllen gleichzeitig die SRD-Grenzen.",
      ],
      kioskTypes: {
        standing: "Stehkiosk",
        wall: "Wandkiosk",
        tabletop: "Thekenkiosk",
      },
      sla: {
        standard: "Standard (inklusive)",
        premium: "Premium (+9 CHF/Monat)",
      },
      recurringLabel: "Wiederkehrender Vertrag",
      supportLabel: "Supportplan",
    },
    errors: {
      required: "Dieses Feld ist erforderlich.",
      email: "Geben Sie eine gültige E-Mail-Adresse ein.",
      signature: "Eine Unterschrift ist erforderlich, bevor Sie fortfahren.",
      fileCount: "Sie können bis zu 10 Dateien hochladen.",
      fileSize: "Jede Datei muss unter 20 MB bleiben.",
      fileType: "Nur PDF-, JPG-, JPEG-, PNG-, XLSX- und DOCX-Dateien sind erlaubt.",
    },
    templates: {
      perMonth: "CHF/Monat",
      oneTime: "CHF",
      stripeInfo: "{count} myPOS-Terminals sind für die einmalige Stripe-Zahlung vorbereitet.",
      kioskMonthly: "Kioske ({count} × 99 CHF)",
      successWithFilesAndLink: "Ihr unterschriebener Vertrag, Ihre Firmendaten, {count} Menüdatei(en) und der Menülink sind für contract@tapgo.ch vorbereitet.",
      successWithFiles: "Ihr unterschriebener Vertrag, Ihre Firmendaten und {count} Menüdatei(en) sind für contract@tapgo.ch vorbereitet.",
      successWithLink: "Ihr unterschriebener Vertrag, Ihre Firmendaten und der Menülink sind für contract@tapgo.ch vorbereitet.",
      successNoFiles: "Ihr unterschriebener Vertrag und Ihre Firmendaten sind für contract@tapgo.ch vorbereitet. Es wurden keine Menüdateien angehängt.",
      printerValue: "{count} Drucker",
      posMonthly: "POS ({count} × 49 CHF)",
      duration: "36 Monate fest",
      blankDate: "Am Installationstag auszufüllen",
    },
  },
  it: {
    meta: {
      title: "Onboarding TapGo",
      description: "Configura il tuo sistema TapGo, valida il contratto e invia il menu in un unico flusso.",
    },
    welcome: {
      eyebrow: "Tap. Order. Go.",
      title: "Scegli la lingua e avvia l'<em>onboarding TapGo</em>.",
      text: "Questo flusso self-service permette ai ristoratori di configurare l'hardware, confermare il contratto di 36 mesi, firmare digitalmente e inviare il menu senza intervento commerciale.",
      note: "La lingua resta attiva per tutto il percorso.",
      cta: "Avvia onboarding",
      privacyNotice: "Procedendo, acconsenti che TapGo elabori i tuoi dati personali (nome azienda, e-mail, dettagli di contatto) per generare e gestire il tuo contratto di onboarding, in conformità con la LPD svizzera e il RGPD. I dati non vengono conservati oltre i requisiti di gestione contrattuale.",
    },
    progress: {
      eyebrow: "Percorso guidato",
      title: "Impostazione del ristorante",
      steps: ["Configurazione", "Dati azienda", "Contratto e firma", "Menu e invio"],
    },
    actions: {
      continue: "Continua",
      back: "Indietro",
    },
    page1: {
      eyebrow: "Passo 1 di 4",
      title: "Definisci il tuo <em>setup TapGo</em>.",
      text: "Mantieni le scelte essenziali: seleziona il formato del kiosk, imposta la quantità e lascia che il sistema calcoli subito canone ricorrente e costi una tantum.",
      stats: {
        contract: "Mesi di impegno fisso",
        setup: "Settimane target per partire rapidamente",
        languages: "Lingue contratto supportate",
      },
      kioskLabel: "Tipologia kiosk",
      equipmentLabel: "Hardware e pagamenti",
      kiosks: {
        standing: {
          title: "Kiosk da terra",
          text: "Ideale per alto traffico e percorsi di ordinazione ben visibili.",
        },
        wall: {
          title: "Kiosk a parete",
          text: "Formato salvaspazio per aree di servizio più strette o ingressi ridotti.",
        },
        tabletop: {
          title: "Kiosk da banco",
          text: "Setup compatto per banconi, caffè e casse con poco spazio.",
        },
      },
      counters: {
        kiosks: {
          title: "Self-order kiosk",
          tag: "Mensile",
          text: "CHF 99 per unità nel contratto da 36 mesi.",
        },
        pos: {
          title: "Sistema POS",
          tag: "Obbligatorio",
          text: "Postazione cassa configurabile a CHF 49 al mese. È richiesta almeno una postazione POS.",
        },
        terminals: {
          title: "Terminali myPOS",
          tag: "Una tantum",
          text: "Calcolo automatico: kiosk + 1. Pagamento separato tramite Stripe.",
        },
      },
      ethernet: {
        title: "Installazione Ethernet",
        tag: "Opzionale",
        text: "Aggiungi l'installazione on-site una tantum da CHF 300 oppure installa autonomamente senza costi extra.",
      },
      highlightsLabel: "Perché questa logica funziona",
      highlights: {
        fast: {
          title: "Ciclo vendita più rapido",
          text: "Il flusso è progettato per chiudersi in pochi minuti invece di dipendere da riunioni manuali.",
        },
        scalable: {
          title: "Logica hardware scalabile",
          text: "Il POS è fisso, i terminali sono automatici e le stampanti seguono per default l'hardware selezionato.",
        },
        cash: {
          title: "Prezzi separati con chiarezza",
          text: "Abbonamento mensile ed elementi Stripe una tantum restano separati sin dal primo schermo.",
        },
      },
    },
    page2: {
      eyebrow: "Passo 2 di 4",
      title: "Inserisci i <em>dati aziendali</em>.",
      text: "Questi campi alimentano direttamente addendum e contratto, quindi l'accuratezza è importante.",
      companyLabel: "Azienda",
      restaurantLabel: "Ristorante",
      contactLabel: "Contatto e firma",
      operationsLabel: "Dettagli operativi",
      slaLabel: "Piano di supporto",
      fields: {
        companyName: "Ragione sociale",
        companyAddress: "Indirizzo azienda",
        restaurantName: "Nome ristorante",
        restaurantAddress: "Indirizzo ristorante",
        contactPerson: "Persona di contatto / firmatario",
        email: "Indirizzo e-mail",
        phone: "Numero di telefono",
        language: "Lingua del contratto",
      },
      placeholders: {
        companyName: "Esempio: Bouafif Partners SA",
        companyAddress: "Via, CAP, città",
        restaurantName: "Esempio: TFK Restaurant",
        restaurantAddress: "Sede del ristorante",
        contactPerson: "Nome e cognome",
        email: "contact@restaurant.ch",
        phone: "+41 76 000 00 00",
      },
      languageHint: "Puoi ancora cambiare lingua dalla barra superiore senza perdere i dati inseriti.",
      operations: {
        printers: {
          title: "Numero stampanti",
          tag: "Modificabile",
          text: "Default kiosk + POS, come richiesto nel documento requisiti.",
        },
        stripe: {
          title: "Pagamento hardware Stripe",
        },
        startDate: {
          title: "Data inizio contratto",
          text: "Rimane vuota nei documenti generati e verrà completata il giorno dell'installazione.",
        },
      },
      sla: {
        recommended: "Consigliato",
        standard: {
          title: "Standard",
          price: "Incluso",
          items: [
            "Finestra supporto lun-ven",
            "Risposta entro 24 ore lavorative",
            "Intervento on-site fatturato separatamente",
            "Target disponibilità 90%",
          ],
        },
        premium: {
          title: "Premium",
          price: "+9 CHF / mese",
          items: [
            "Copertura estesa 7/7",
            "Risposta remota prioritaria",
            "Intervento on-site incluso",
            "Target disponibilità più alto",
          ],
        },
      },
      cta: "Rivedi il contratto",
    },
    page3: {
      eyebrow: "Passo 3 di 4",
      title: "Conferma il <em>quadro contrattuale</em>.",
      text: "L'addendum commerciale resta allineato alla configurazione scelta, mentre le clausole legali seguono il contratto sorgente che hai fornito.",
      download: "Scarica anteprima contratto",
      addendumEyebrow: "Documento generato",
      addendumTitle: "Addendum commerciale",
      termsEyebrow: "Documento generato",
      termsTitle: "Condizioni generali",
      acceptanceLabel: "Conferme richieste",
      acceptCommitment: "Accetto <strong>l'impegno di 36 mesi</strong> e comprendo che il contratto non è rescindibile prima della scadenza salvo giusta causa.",
      acceptTerms: "Ho letto e accetto le <strong>condizioni generali TapGo</strong>, incluse regole SLA, limiti di responsabilità e restituzione dell'hardware.",
      signatureLabel: "Firma elettronica",
      signaturePending: "Firma in attesa",
      signatureDone: "Firma acquisita",
      signatureHint: "Disegna la tua firma con mouse o dito.",
      clear: "Cancella",
      cta: "Continua all'invio",
      addendumRows: {
        client: "Società cliente",
        companyAddress: "Indirizzo società",
        restaurant: "Ristorante",
        restaurantAddress: "Indirizzo ristorante",
        contact: "Firmatario",
        kiosks: "Kiosk ordine",
        pos: "Sistema POS",
        printers: "Stampanti",
        sla: "Piano supporto",
        duration: "Durata contratto",
        startDate: "Data efficacia",
        monthlyTotal: "Totale mensile",
      },
      terms: [
        {
          title: "1. Parti e gerarchia",
          text: "TapGo by MS-Architecture & Technologies Sàrl resta il fornitore. L'addendum commerciale governa prezzi e quantità, mentre il contratto principale governa clausole legali, tecniche e operative.",
        },
        {
          title: "2. Oggetto del servizio",
          text: "Il contratto copre la messa a disposizione dell'hardware, l'accesso software, i servizi di supporto e gli obblighi reciproci tra cliente e fornitore.",
        },
        {
          title: "3. Durata",
          text: "Il contratto inizia il giorno dell'installazione completa e dura 36 mesi fissi. Successivamente si rinnova annualmente salvo disdetta scritta tre mesi prima della scadenza.",
        },
        {
          title: "4. Modello di fatturazione",
          text: "I canoni mensili coprono kiosk, POS e piano SLA selezionato. Costi Stripe e pagamenti hardware una tantum restano fuori dal totale ricorrente del contratto.",
        },
        {
          title: "5. Proprietà e utilizzo",
          text: "TapGo mantiene la proprietà di hardware, software, interfacce, sistemi e configurazioni. Non sono consentiti copia, reverse engineering o aggiramento delle protezioni.",
        },
        {
          title: "6. Manutenzione e SLA",
          text: "Le opzioni Standard e Premium seguono finestre di supporto, tempi di risposta ed esclusioni descritte nel contratto fornito. Internet del cliente, elettricità e guasti di terzi restano fuori SLA.",
        },
        {
          title: "7. Responsabilità e fine contratto",
          text: "Il fornitore risponde solo in caso di colpa grave o dolo. Sono esclusi danni indiretti, interruzioni di rete o Stripe e l'hardware deve essere restituito funzionante a fine rapporto.",
        },
      ],
    },
    page4: {
      eyebrow: "Passo 4 di 4",
      title: "Invia il <em>pacchetto menu</em>.",
      text: "Carica i file utili o condividi un link al menu per la configurazione back-office, aggiungi note operative e completa il pacchetto di onboarding.",
      uploadTitle: "Trascina qui i file menu o selezionali dal dispositivo",
      uploadText: "Puoi inviare menu food, bevande, listini o documenti aggiornati in più formati.",
      linkLabel: "Link menu",
      linkField: "URL del menu",
      linkPlaceholder: "https://esempio.com/menu.pdf",
      linkHint: "Usa questo campo se il tuo menu è già condiviso online. È richiesto un file menu o un link al menu.",
      fileRules: {
        count: "Numero massimo",
        size: "Massimo per file",
        formats: "Formati accettati",
      },
      noteLabel: "Istruzioni speciali",
      noteField: "Nota menu",
      notePlaceholder: "Aggiungi commenti per il back-office: menu pranzo/cena, logiche combo, allergeni, ecc.",
      deliveryLabel: "Consegna",
      delivery: {
        tapgo: {
          title: "Invio interno",
          text: "Il pacchetto viene preparato per contract@tapgo.ch con contratto firmato, file menu e riepilogo strutturato.",
        },
        customer: {
          title: "Conferma cliente",
          text: "L'e-mail di contatto riceve un messaggio di conferma e una copia dei dettagli contrattuali generati nella lingua scelta.",
        },
        phase1: {
          title: "Ambito Fase 1",
          text: "La firma nel browser, la generazione PDF locale, l'archiviazione del menu e la creazione del checkout Stripe sono gestite in questa versione.",
        },
      },
      cta: "Invia pacchetto onboarding",
    },
    success: {
      eyebrow: "Invio completato",
      title: "Il tuo setup TapGo è <em>pronto per il passaggio di consegne</em>.",
      reference: "Riferimento",
      steps: [
        {
          title: "Ordine hardware",
          text: "TapGo può ora preparare il conteggio myPOS e la distribuzione finale dei dispositivi.",
        },
        {
          title: "Pianificazione installazione",
          text: "Il team può ricontattarti per confermare la data di installazione e l'avvio del servizio.",
        },
        {
          title: "Configurazione menu",
          text: "File e note sono pronti per la configurazione di kiosk e POS.",
        },
      ],
    },
    summary: {
      eyebrow: "Riepilogo live",
      title: "Snapshot commerciale",
      text: "Il pannello laterale mantiene visibili il valore ricorrente del contratto e il carrello Stripe una tantum in ogni passo.",
      items: {
        language: "Lingua",
        kioskType: "Tipo kiosk",
        kiosks: "Quantità kiosk",
        printers: "Stampanti",
        terminals: "Terminali myPOS",
        pos: "Quantità POS",
      },
      oneTime: "Carrello Stripe una tantum",
      total: "Totale mensile ricorrente",
      stepNotes: [
        "Kiosk, POS e stampanti sono configurabili; i terminali vengono calcolati automaticamente (kiosk + 1).",
        "I dati aziendali alimentano ora direttamente documenti generati e notifiche.",
        "La data di inizio resta intenzionalmente vuota qui e verrà completata il giorno installazione.",
        "I caricamenti menu restano multi-file rispettando i limiti SRD.",
      ],
      kioskTypes: {
        standing: "Kiosk da terra",
        wall: "Kiosk a parete",
        tabletop: "Kiosk da banco",
      },
      sla: {
        standard: "Standard (incluso)",
        premium: "Premium (+9 CHF/mese)",
      },
      recurringLabel: "Contratto ricorrente",
      supportLabel: "Piano di supporto",
    },
    errors: {
      required: "Questo campo è obbligatorio.",
      email: "Inserisci un indirizzo e-mail valido.",
      signature: "È necessaria una firma prima di procedere.",
      fileCount: "Puoi caricare fino a 10 file.",
      fileSize: "Ogni file deve restare sotto i 20 MB.",
      fileType: "Sono ammessi solo file PDF, JPG, JPEG, PNG, XLSX e DOCX.",
    },
    templates: {
      perMonth: "CHF/mese",
      oneTime: "CHF",
      stripeInfo: "{count} terminali myPOS sono pronti per il pagamento hardware Stripe.",
      kioskMonthly: "Kiosk ({count} × 99 CHF)",
      successWithFilesAndLink: "Il contratto firmato, i dati aziendali, {count} file menu e il link al menu sono pronti per contract@tapgo.ch.",
      successWithFiles: "Il contratto firmato, i dati aziendali e {count} file menu sono pronti per contract@tapgo.ch.",
      successWithLink: "Il contratto firmato, i dati aziendali e il link al menu sono pronti per contract@tapgo.ch.",
      successNoFiles: "Il contratto firmato e i dati aziendali sono pronti per contract@tapgo.ch. Nessun file menu è stato allegato.",
      printerValue: "{count} stampante(i)",
      posMonthly: "POS ({count} × 49 CHF)",
      duration: "36 mesi fissi",
      blankDate: "Compilato il giorno dell'installazione",
    },
  },
  tr: {
    meta: {
      title: "TapGo Onboarding",
      description: "TapGo sisteminizi yapılandırın, sözleşmeyi onaylayın ve menünüzü tek akışta gönderin.",
    },
    welcome: {
      eyebrow: "Tap. Order. Go.",
      title: "Dilini seç ve <em>TapGo onboarding</em> akışını başlat.",
      text: "Bu self-service akış, restoran sahiplerinin donanımı yapılandırmasına, 36 aylık sözleşmeyi onaylamasına, dijital imza atmasına ve menüyü satış toplantısı olmadan göndermesine olanak tanır.",
      note: "Seçilen dil tüm akış boyunca korunur.",
      cta: "Onboarding'i başlat",
      privacyNotice: "Devam ederek, TapGo'nun onboarding sözleşmenizi oluşturmak ve yönetmek amacıyla kişisel verilerinizi (şirket adı, e-posta, iletişim bilgileri) İsviçre LPD ve GDPR uyarınca işlemesini kabul edersiniz. Veriler, sözleşme yönetimi gereksinimlerinin ötesinde saklanmaz.",
    },
    progress: {
      eyebrow: "Yönlendirilmiş akış",
      title: "Restoran kurulum yolculuğu",
      steps: ["Yapılandırma", "İşletme bilgileri", "Sözleşme ve imza", "Menü ve gönderim"],
    },
    actions: {
      continue: "Devam et",
      back: "Geri",
    },
    page1: {
      eyebrow: "4 adımın 1'i",
      title: "<em>TapGo kurulumunu</em> oluştur.",
      text: "Kararları sade tut: kiosk tipini seç, adedi belirle ve sistemin aylık ile tek seferlik maliyetleri anında hesaplamasına izin ver.",
      stats: {
        contract: "Sabit taahhüt ayı",
        setup: "Hızlı kurulum için hedef hafta",
        languages: "Desteklenen sözleşme dilleri",
      },
      kioskLabel: "Kiosk tipi",
      equipmentLabel: "Donanım ve ödemeler",
      kiosks: {
        standing: {
          title: "Ayakta kiosk",
          text: "Yoğun müşteri akışı ve görünür sipariş alanları için idealdir.",
        },
        wall: {
          title: "Duvar kiosk",
          text: "Dar servis alanları veya sınırlı girişler için yer tasarruflu formattır.",
        },
        tabletop: {
          title: "Tezgah üstü kiosk",
          text: "Tezgahlar, kafeler ve dar ödeme noktaları için kompakt kurulumdur.",
        },
      },
      counters: {
        kiosks: {
          title: "Self-order kiosklar",
          tag: "Aylık",
          text: "36 aylık sözleşme kapsamında birim başına 99 CHF.",
        },
        pos: {
          title: "POS sistemi",
          tag: "Zorunlu",
          text: "Ayda CHF 49 olan yapılandırılabilir kasa istasyonu. En az bir POS gereklidir.",
        },
        terminals: {
          title: "myPOS terminalleri",
          tag: "Tek seferlik",
          text: "Otomatik hesap: kiosk + 1. Stripe üzerinden ayrı ödenir.",
        },
      },
      ethernet: {
        title: "Ethernet kurulumu",
        tag: "Opsiyonel",
        text: "300 CHF tek seferlik saha kurulumunu ekleyin veya ekstra ücret olmadan kendiniz kurun.",
      },
      highlightsLabel: "Bu yapı neden çalışıyor",
      highlights: {
        fast: {
          title: "Daha hızlı satış döngüsü",
          text: "Akış, manuel keşif görüşmeleri yerine dakikalar içinde tamamlanacak şekilde tasarlandı.",
        },
        scalable: {
          title: "Ölçeklenebilir donanım mantığı",
          text: "POS sabittir, terminaller otomatiktir ve yazıcılar varsayılan olarak seçilen donanımı takip eder.",
        },
        cash: {
          title: "Net fiyat ayrımı",
          text: "Aylık abonelik ile tek seferlik Stripe kalemleri ilk ekrandan itibaren ayrı görünür.",
        },
      },
    },
    page2: {
      eyebrow: "4 adımın 2'si",
      title: "<em>İşletme bilgilerini</em> gir.",
      text: "Bu alanlar doğrudan addendum ve sözleşmeye aktarılır; bu yüzden doğruluk önemlidir.",
      companyLabel: "Şirket",
      restaurantLabel: "Restoran",
      contactLabel: "İletişim ve imza",
      operationsLabel: "Operasyon detayları",
      slaLabel: "Destek planı",
      fields: {
        companyName: "Şirket / yasal unvan",
        companyAddress: "Şirket adresi",
        restaurantName: "Restoran adı",
        restaurantAddress: "Restoran adresi",
        contactPerson: "İletişim kişisi / imzacı",
        email: "E-posta adresi",
        phone: "Telefon numarası",
        language: "Sözleşme dili",
      },
      placeholders: {
        companyName: "Örnek: Bouafif Partners SA",
        companyAddress: "Cadde, posta kodu, şehir",
        restaurantName: "Örnek: TFK Restaurant",
        restaurantAddress: "Restoran konumu",
        contactPerson: "Ad Soyad",
        email: "contact@restaurant.ch",
        phone: "+41 76 000 00 00",
      },
      languageHint: "İlerlemeyi kaybetmeden üst çubuktan dili değiştirebilirsiniz.",
      operations: {
        printers: {
          title: "Yazıcı sayısı",
          tag: "Düzenlenebilir",
          text: "Gereksinim dokümanına göre varsayılan kiosk + POS olarak gelir.",
        },
        stripe: {
          title: "Stripe donanım ödemesi",
        },
        startDate: {
          title: "Sözleşme başlangıç tarihi",
          text: "Oluşturulan belgede boş kalır ve kurulum gününde doldurulur.",
        },
      },
      sla: {
        recommended: "Önerilen",
        standard: {
          title: "Standart",
          price: "Dahil",
          items: [
            "Pzt-Cuma destek penceresi",
            "24 iş saati içinde yanıt",
            "Yerinde ziyaret ayrı faturalandırılır",
            "Temel %90 erişilebilirlik hedefi",
          ],
        },
        premium: {
          title: "Premium",
          price: "+9 CHF / ay",
          items: [
            "7/7 geniş destek kapsamı",
            "Öncelikli uzaktan yanıt",
            "Yerinde müdahale dahil",
            "Daha yüksek erişilebilirlik hedefi",
          ],
        },
      },
      cta: "Sözleşmeyi incele",
    },
    page3: {
      eyebrow: "4 adımın 3'ü",
      title: "<em>Sözleşme çerçevesini</em> onayla.",
      text: "Ticari addendum seçtiğiniz yapılandırma ile senkron kalırken, hukuki maddeler sağladığınız kaynak sözleşmeye bağlı kalır.",
      download: "Sözleşme önizlemesini indir",
      addendumEyebrow: "Oluşturulan belge",
      addendumTitle: "Ticari addendum",
      termsEyebrow: "Oluşturulan belge",
      termsTitle: "Genel şartlar",
      acceptanceLabel: "Gerekli onaylar",
      acceptCommitment: "<strong>36 aylık taahhüdü</strong> kabul ediyorum ve geçerli bir haklı neden dışında sözleşmenin süreden önce feshedilemeyeceğini anlıyorum.",
      acceptTerms: "SLA kuralları, sorumluluk sınırları ve donanım iade yükümlülükleri dahil olmak üzere <strong>TapGo genel şartlarını</strong> okudum ve kabul ediyorum.",
      signatureLabel: "Elektronik imza",
      signaturePending: "İmza bekleniyor",
      signatureDone: "İmza alındı",
      signatureHint: "İmzanızı fare veya parmakla çizin.",
      clear: "Temizle",
      cta: "Gönderime devam et",
      addendumRows: {
        client: "Müşteri şirketi",
        companyAddress: "Şirket adresi",
        restaurant: "Restoran",
        restaurantAddress: "Restoran adresi",
        contact: "İmzacı",
        kiosks: "Sipariş kioskları",
        pos: "POS sistemi",
        printers: "Yazıcılar",
        sla: "Destek planı",
        duration: "Sözleşme süresi",
        startDate: "Yürürlük tarihi",
        monthlyTotal: "Aylık toplam",
      },
      terms: [
        {
          title: "1. Taraflar ve hiyerarşi",
          text: "TapGo by MS-Architecture & Technologies Sàrl sağlayıcı olarak kalır. Ticari addendum fiyat ve adetleri yönetir; ana sözleşme ise hukuki, teknik ve operasyonel maddeleri yönetir.",
        },
        {
          title: "2. Hizmet kapsamı",
          text: "Sözleşme donanım tahsisini, yazılım erişimini, destek hizmetlerini ve müşteri ile sağlayıcı arasındaki karşılıklı yükümlülükleri kapsar.",
        },
        {
          title: "3. Süre",
          text: "Sözleşme tam kurulum gününde başlar ve sabit 36 ay sürer. Sonrasında, bitişten üç ay önce yazılı fesih yapılmazsa yıllık olarak yenilenir.",
        },
        {
          title: "4. Faturalama modeli",
          text: "Aylık ücretler kioskları, POS'u ve seçilen SLA planını kapsar. Stripe maliyetleri ve tek seferlik donanım ödemeleri tekrarlayan sözleşme toplamına dahil değildir.",
        },
        {
          title: "5. Mülkiyet ve kullanım",
          text: "TapGo donanım, yazılım, arayüzler, sistemler ve yapılandırmaların mülkiyetini korur. Kopyalama, tersine mühendislik veya korumaları aşma yasaktır.",
        },
        {
          title: "6. Bakım ve SLA",
          text: "Standart ve Premium destek seçenekleri, sağlanan sözleşmede yer alan destek saatleri, yanıt hedefleri ve istisnalara uyar. Müşteri interneti, elektrik ve üçüncü taraf arızaları SLA kapsamı dışındadır.",
        },
        {
          title: "7. Sorumluluk ve sözleşme sonu",
          text: "Sağlayıcı yalnızca ağır ihmal veya kasıt durumunda sorumludur. Dolaylı zararlar, ağ kesintileri veya Stripe kesintileri hariçtir ve donanım sözleşme sonunda çalışır durumda iade edilmelidir.",
        },
      ],
    },
    page4: {
      eyebrow: "4 adımın 4'ü",
      title: "<em>Menü paketini</em> gönder.",
      text: "Back-office yapılandırması için gerekli dosyaları yükleyin veya bir menu baglantisi paylaşın, notlar ekleyin ve onboarding paketini tamamlayın.",
      uploadTitle: "Menü dosyalarını buraya bırakın veya cihazınızdan seçin",
      uploadText: "Yemek, içecek, fiyat listesi veya güncel belgeleri birden fazla formatta yükleyebilirsiniz.",
      linkLabel: "Menu baglantisi",
      linkField: "Menu URL",
      linkPlaceholder: "https://ornek.com/menu.pdf",
      linkHint: "Menunuz zaten internette paylasiliyorsa bunu kullanin. Bir menu dosyasi veya bir menu baglantisi gereklidir.",
      fileRules: {
        count: "Maksimum dosya",
        size: "Dosya başına maksimum",
        formats: "Kabul edilen formatlar",
      },
      noteLabel: "Özel talimatlar",
      noteField: "Menü notu",
      notePlaceholder: "Back-office ekibi için not ekleyin: öğle/akşam menüsü, combo mantığı, alerjenler vb.",
      deliveryLabel: "Teslimat",
      delivery: {
        tapgo: {
          title: "İç teslimat",
          text: "Paket, imzalı sözleşme, menü dosyaları ve yapılandırılmış özet ile contract@tapgo.ch için hazırlanır.",
        },
        customer: {
          title: "Müşteri onayı",
          text: "Seçilen iletişim adresi, onay mesajı ve seçilen dilde oluşturulmuş sözleşme detaylarının kopyasını alır.",
        },
        phase1: {
          title: "Aşama 1 kapsamı",
          text: "Tarayıcı imzası, yerel PDF oluşturma, menü depolama ve Stripe ödeme oluşturma bu sürümde işlenir.",
        },
      },
      cta: "Onboarding paketini gönder",
    },
    success: {
      eyebrow: "Gönderim tamamlandı",
      title: "TapGo kurulumunuz <em>teslim için hazır</em>.",
      reference: "Referans",
      steps: [
        {
          title: "Donanım siparişi",
          text: "TapGo artık myPOS sayısını ve nihai cihaz dağıtımını hazırlayabilir.",
        },
        {
          title: "Kurulum planlama",
          text: "Ekip, kurulum tarihini ve servis başlangıcını doğrulamak için size ulaşabilir.",
        },
        {
          title: "Menü yapılandırma",
          text: "Dosyalarınız ve notlarınız kiosk ve POS yapılandırması için hazırdır.",
        },
      ],
    },
    summary: {
      eyebrow: "Canlı özet",
      title: "Ticari görünüm",
      text: "Yan panel, tekrarlayan sözleşme değerini ve tek seferlik Stripe sepetini her adımda görünür tutar.",
      items: {
        language: "Dil",
        kioskType: "Kiosk tipi",
        kiosks: "Kiosk adedi",
        printers: "Yazıcılar",
        terminals: "myPOS terminalleri",
        pos: "POS miktarı",
      },
      oneTime: "Tek seferlik Stripe sepeti",
      total: "Tekrarlayan aylık toplam",
      stepNotes: [
        "Kiosk, POS ve yazıcılar yapılandırılabilir; terminaller otomatik hesaplanır (kiosk + 1).",
        "İşletme verileri artık oluşturulan belgelere ve bildirimlere doğrudan bağlanır.",
        "Başlangıç tarihi burada bilinçli olarak boş bırakılır ve kurulum gününde tamamlanır.",
        "Menü yüklemeleri çoklu dosya yapısını korurken SRD limitlerine uyar.",
      ],
      kioskTypes: {
        standing: "Ayakta kiosk",
        wall: "Duvar kiosk",
        tabletop: "Tezgah üstü kiosk",
      },
      sla: {
        standard: "Standart (dahil)",
        premium: "Premium (+9 CHF/ay)",
      },
      recurringLabel: "Tekrarlayan sözleşme",
      supportLabel: "Destek planı",
    },
    errors: {
      required: "Bu alan zorunludur.",
      email: "Geçerli bir e-posta adresi girin.",
      signature: "Devam etmeden önce imza gereklidir.",
      fileCount: "En fazla 10 dosya yükleyebilirsiniz.",
      fileSize: "Her dosya 20 MB altında olmalıdır.",
      fileType: "Sadece PDF, JPG, JPEG, PNG, XLSX ve DOCX dosyalarına izin verilir.",
    },
    templates: {
      perMonth: "CHF/ay",
      oneTime: "CHF",
      stripeInfo: "{count} myPOS terminali tek seferlik Stripe ödemesi için hazırlandı.",
      kioskMonthly: "Kiosklar ({count} × 99 CHF)",
      successWithFilesAndLink: "İmzalı sözleşmeniz, şirket bilgileriniz, {count} menu dosyasi ve paylasilan menu baglantisi contract@tapgo.ch için hazırlandı.",
      successWithFiles: "İmzalı sözleşmeniz, şirket bilgileriniz ve {count} menü dosyası contract@tapgo.ch için hazırlandı.",
      successWithLink: "İmzalı sözleşmeniz, şirket bilgileriniz ve paylasilan menu baglantisi contract@tapgo.ch için hazırlandı.",
      successNoFiles: "İmzalı sözleşmeniz ve şirket bilgileriniz contract@tapgo.ch için hazırlandı. Bu gönderimde menü dosyası eklenmedi.",
      printerValue: "{count} yazıcı",
      posMonthly: "POS ({count} × 49 CHF)",
      duration: "Sabit 36 ay",
      blankDate: "Kurulum gününde doldurulur",
    },
  },
};

const state = {
  languageConfirmed: false,
  lang: "en",
  step: 1,
  kioskType: "standing",
  kioskCount: 1,
  printerCount: 2,
  posCount: 1,
  printerTouched: false,
  ethernet: false,
  sla: "standard",
  signed: false,
  signatureData: "",
  files: [],
  submitted: false,
  reference: buildReference(),
  serverConfig: null,
  submissionResult: null,
  form: {
    companyName: "",
    companyAddress: "",
    restaurantName: "",
    restaurantAddress: "",
    contactPerson: "",
    emailAddress: "",
    phoneNumber: "",
    menuLink: "",
    menuNote: "",
  },
};

const elements = {};
let signatureCtx = null;
let isDrawing = false;

document.addEventListener("DOMContentLoaded", () => {
  cacheElements();
  bindEvents();
  renderAll();
  initSignature();
  void initializeApp();
});

async function initializeApp() {
  await loadServerConfig();
  await hydrateFromPaymentReturn();
}

function cacheElements() {
  elements.welcomeOverlay = document.getElementById("welcomeOverlay");
  elements.languageGrid = document.getElementById("languageGrid");
  elements.inlineLanguages = document.getElementById("inlineLanguages");
  elements.welcomeStart = document.getElementById("welcomeStart");
  elements.kioskMinus = document.getElementById("kioskMinus");
  elements.kioskPlus = document.getElementById("kioskPlus");
  elements.posMinus = document.getElementById("posMinus");
  elements.posPlus = document.getElementById("posPlus");
  elements.printerMinus = document.getElementById("printerMinus");
  elements.printerPlus = document.getElementById("printerPlus");
  elements.ethernetToggle = document.getElementById("ethernetToggle");
  elements.toStep2 = document.getElementById("toStep2");
  elements.toStep3 = document.getElementById("toStep3");
  elements.toStep4 = document.getElementById("toStep4");
  elements.backToStep1 = document.getElementById("backToStep1");
  elements.backToStep2 = document.getElementById("backToStep2");
  elements.backToStep3 = document.getElementById("backToStep3");
  elements.submitFlow = document.getElementById("submitFlow");
  elements.downloadContract = document.getElementById("downloadContract");
  elements.clearSignature = document.getElementById("clearSignature");
  elements.menuUpload = document.getElementById("menuUpload");
  elements.uploadList = document.getElementById("uploadList");
  elements.uploadError = document.getElementById("uploadError");
  elements.signatureCanvas = document.getElementById("signatureCanvas");
  elements.signaturePad = document.getElementById("signaturePad");
  elements.signatureHint = document.getElementById("signatureHint");
  elements.signatureStatus = document.getElementById("signatureStatus");
  elements.signatureError = document.getElementById("signatureError");
  elements.summaryPanel = document.getElementById("summaryPanel");
  elements.mobileTotalBar = document.getElementById("mobileTotalBar");
  elements.submissionStage = document.getElementById("submissionStage");
  elements.successStage = document.getElementById("successStage");
  elements.addendumRows = document.getElementById("addendumRows");
  elements.contractTerms = document.getElementById("contractTerms");
  elements.successReference = document.getElementById("successReference");
  elements.successText = document.getElementById("successText");
  elements.paymentStatus = document.getElementById("paymentStatus");
  elements.paymentAction = document.getElementById("paymentAction");
  elements.downloadFinalContract = document.getElementById("downloadFinalContract");
}

function bindEvents() {
  elements.languageGrid.addEventListener("click", handleLanguageChoice);
  elements.welcomeStart.addEventListener("click", startOnboarding);
  elements.kioskMinus.addEventListener("click", () => changeKiosk(-1));
  elements.kioskPlus.addEventListener("click", () => changeKiosk(1));
  elements.posMinus.addEventListener("click", () => changePOS(-1));
  elements.posPlus.addEventListener("click", () => changePOS(1));
  elements.printerMinus.addEventListener("click", () => changePrinter(-1));
  elements.printerPlus.addEventListener("click", () => changePrinter(1));
  elements.ethernetToggle.addEventListener("click", toggleEthernet);
  elements.toStep2.addEventListener("click", () => goToStep(2));
  elements.toStep3.addEventListener("click", submitStep2);
  elements.toStep4.addEventListener("click", submitStep3);
  elements.backToStep1.addEventListener("click", () => goToStep(1));
  elements.backToStep2.addEventListener("click", () => goToStep(2));
  elements.backToStep3.addEventListener("click", () => goToStep(3));
  elements.submitFlow.addEventListener("click", finalizeSubmission);
  elements.downloadContract.addEventListener("click", downloadContractPreview);
  elements.clearSignature.addEventListener("click", clearSignature);
  elements.menuUpload.addEventListener("change", handleUploadSelection);
  elements.paymentAction.addEventListener("click", handlePaymentAction);

  document.querySelectorAll("[data-kiosk-type]").forEach((button) => {
    button.addEventListener("click", () => {
      state.kioskType = button.dataset.kioskType;
      renderAll();
    });
  });

  document.querySelectorAll("[data-sla]").forEach((button) => {
    button.addEventListener("click", () => {
      state.sla = button.dataset.sla;
      renderAll();
    });
  });

  ["companyName", "companyAddress", "restaurantName", "restaurantAddress", "contactPerson", "emailAddress", "phoneNumber", "menuLink", "menuNote"].forEach((id) => {
    const field = document.getElementById(id);
    if (!field) return;
    field.addEventListener("input", () => {
      state.form[id] = field.value.trim();
      if (id !== "menuNote") {
        validateStep2(false);
      }
    });
  });

  ["acceptCommitment", "acceptTerms"].forEach((id) => {
    document.getElementById(id).addEventListener("change", validateStep3);
  });

  window.addEventListener("resize", resizeSignatureCanvas);
}

function currentCopy() {
  return COPY[state.lang] || COPY.en;
}

function fallbackCopy(path) {
  return getNested(COPY.en, path) ?? "";
}

function textFor(path) {
  return getNested(currentCopy(), path) ?? fallbackCopy(path);
}

function getNested(source, path) {
  return path.split(".").reduce((acc, part) => {
    if (acc === undefined || acc === null) return undefined;
    if (Array.isArray(acc)) {
      return acc[Number(part)];
    }
    return acc[part];
  }, source);
}

function renderAll() {
  translateStatic();
  renderLanguageCards();
  renderInlineLanguages();
  renderProgress();
  renderSelections();
  renderPricing();
  renderFormValues();
  renderDocuments();
  renderUploadList();
  renderSuccessState();
  validateStep2(false);
  validateStep3();
}

function translateStatic() {
  document.title = textFor("meta.title");
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) metaDescription.setAttribute("content", textFor("meta.description"));

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = textFor(node.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-html]").forEach((node) => {
    node.innerHTML = textFor(node.dataset.i18nHtml);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.setAttribute("placeholder", textFor(node.dataset.i18nPlaceholder));
  });

  document.getElementById("selectedLanguageLabel").textContent = `${LANGUAGE_META[state.lang].flag} ${LANGUAGE_META[state.lang].label}`;
  const readonlyLanguage = document.getElementById("selectedLanguageReadonly");
  if (readonlyLanguage) {
    readonlyLanguage.textContent = `${LANGUAGE_META[state.lang].flag} ${LANGUAGE_META[state.lang].label}`;
  }

  document.getElementById("stripeInfoLine").textContent = template(textFor("templates.stripeInfo"), {
    count: terminalCount(),
  });

  document.getElementById("summaryMonthlyLabel").textContent = template(textFor("templates.kioskMonthly"), {
    count: state.kioskCount,
  });
  document.getElementById("summaryPosLabel").textContent = template(textFor("templates.posMonthly"), {
    count: state.posCount,
  });
  document.getElementById("summarySlaLabel").textContent = textFor("summary.supportLabel");
  document.getElementById("summaryNote").textContent = textFor(`summary.stepNotes.${state.step - 1}`);
}

function renderLanguageCards() {
  elements.welcomeStart.disabled = false;
  document.body.classList.toggle("welcome-lock", !elements.welcomeOverlay.classList.contains("is-hidden"));
  elements.languageGrid.querySelectorAll("[data-lang]").forEach((card) => {
    card.classList.toggle("is-selected", card.dataset.lang === state.lang && state.languageConfirmed);
  });
}

function renderInlineLanguages() {
  elements.inlineLanguages.innerHTML = "";
  Object.entries(LANGUAGE_META).forEach(([key, value]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = `${value.flag} ${key.toUpperCase()}`;
    button.classList.toggle("is-selected", key === state.lang);
    button.addEventListener("click", () => {
      state.lang = key;
      state.languageConfirmed = true;
      renderAll();
    });
    elements.inlineLanguages.appendChild(button);
  });
}

function renderProgress() {
  document.getElementById("progressCounter").textContent = `${state.step} / 4`;

  for (let index = 1; index <= 4; index += 1) {
    const bullet = document.getElementById(`progressBullet${index}`);
    const label = document.getElementById(`progressLabel${index}`);
    const line = document.getElementById(`progressLine${index}`);
    bullet.className = "progress-step__bullet";
    label.className = "progress-step__label";
    if (index < state.step) {
      bullet.classList.add("done");
      bullet.textContent = "✓";
    } else {
      bullet.textContent = String(index);
    }
    if (index === state.step) {
      bullet.classList.add("active");
      label.classList.add("active");
    }
    if (line) {
      line.className = "progress-track__line";
      if (index < state.step) line.classList.add("done");
    }
  }

  for (let index = 1; index <= 4; index += 1) {
    document.getElementById(`page${index}`).classList.toggle("hidden", index !== state.step);
  }
}

function renderSelections() {
  document.querySelectorAll("[data-kiosk-type]").forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.kioskType === state.kioskType);
  });

  document.querySelectorAll("[data-sla]").forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.sla === state.sla);
  });

  elements.ethernetToggle.classList.toggle("is-selected", state.ethernet);
  document.getElementById("checkCardCommitment").classList.toggle("is-selected", document.getElementById("acceptCommitment").checked);
  document.getElementById("checkCardTerms").classList.toggle("is-selected", document.getElementById("acceptTerms").checked);

  elements.kioskMinus.disabled = state.kioskCount <= 1;
  elements.posMinus.disabled = state.posCount <= 1;
  elements.printerMinus.disabled = state.printerCount <= 1;
  document.getElementById("kioskCount").textContent = state.kioskCount;
  document.getElementById("posCount").textContent = state.posCount;
  document.getElementById("printerCount").textContent = state.printerCount;
}

function renderPricing() {
  const recurring = recurringTotal();
  const oneTime = oneTimeTotal();
  const perMonth = formatRecurring(recurring);
  const oneTimeFormatted = formatMoney(oneTime);

  document.getElementById("kioskPrice").textContent = formatRecurring(state.kioskCount * PRICING.kiosk);
  document.getElementById("posPrice").textContent = formatRecurring(state.posCount * PRICING.pos);
  document.getElementById("terminalCount").textContent = terminalCount();
  document.getElementById("terminalPrice").textContent = formatMoney(terminalCount() * PRICING.terminal);
  document.getElementById("ethernetPrice").textContent = state.ethernet ? formatMoney(PRICING.ethernet) : `+${formatMoney(PRICING.ethernet)}`;
  document.getElementById("summaryKioskType").textContent = textFor(`summary.kioskTypes.${state.kioskType}`);
  document.getElementById("summaryKioskCount").textContent = String(state.kioskCount);
  document.getElementById("summaryPosCount").textContent = String(state.posCount);
  document.getElementById("summaryPrinterCount").textContent = template(textFor("templates.printerValue"), { count: state.printerCount });
  document.getElementById("summaryTerminalCount").textContent = String(terminalCount());
  document.getElementById("summaryLanguage").textContent = `${LANGUAGE_META[state.lang].flag} ${LANGUAGE_META[state.lang].label}`;
  document.getElementById("summaryMonthlyValue").textContent = formatRecurring(state.kioskCount * PRICING.kiosk);
  document.getElementById("summaryPosValue").textContent = formatRecurring(state.posCount * PRICING.pos);
  document.getElementById("summarySlaValue").textContent = textFor(`summary.sla.${state.sla}`);
  document.getElementById("summaryOneTimeValue").textContent = oneTimeFormatted;
  document.getElementById("summaryTotalValue").textContent = perMonth;
  document.getElementById("mobileTotalValue").textContent = perMonth;
}

function renderFormValues() {
  Object.entries(state.form).forEach(([id, value]) => {
    const field = document.getElementById(id);
    if (field && field.value !== value) {
      field.value = value;
    }
  });
}

function successMessage() {
  const menuLink = state.submissionResult?.menu_link || state.form.menuLink;
  if (state.files.length && menuLink) {
    return template(textFor("templates.successWithFilesAndLink"), { count: state.files.length });
  }
  if (state.files.length) {
    return template(textFor("templates.successWithFiles"), { count: state.files.length });
  }
  if (menuLink) {
    return textFor("templates.successWithLink");
  }
  return textFor("templates.successNoFiles");
}

function renderDocuments() {
  document.getElementById("referenceBadge").textContent = state.reference;
  const addendumRef = document.getElementById("addendumRef");
  if (addendumRef) {
    addendumRef.textContent = `${state.reference} / TapGo`;
  }

  const addendumValues = {
    client: state.form.companyName || "—",
    companyAddress: state.form.companyAddress || "—",
    restaurant: state.form.restaurantName || "—",
    restaurantAddress: state.form.restaurantAddress || "—",
    contact: state.form.contactPerson || "—",
    kiosks: `${state.kioskCount} × ${formatRecurring(PRICING.kiosk)}`,
    pos: `${state.posCount} × ${formatRecurring(PRICING.pos)}`,
    printers: template(textFor("templates.printerValue"), { count: state.printerCount }),
    sla: textFor(`summary.sla.${state.sla}`),
    duration: textFor("templates.duration"),
    startDate: textFor("templates.blankDate"),
    monthlyTotal: formatRecurring(recurringTotal()),
  };

  elements.addendumRows.innerHTML = "";
  Object.entries(addendumValues).forEach(([key, value]) => {
    const row = document.createElement("div");
    row.className = "document-row";
    row.innerHTML = `
      <span class="document-row__label">${textFor(`page3.addendumRows.${key}`)}</span>
      <strong class="document-row__value">${escapeHtml(value)}</strong>
    `;
    elements.addendumRows.appendChild(row);
  });

  const sections = textFor("page3.terms");
  elements.contractTerms.innerHTML = "";
  sections.forEach((section) => {
    const item = document.createElement("div");
    item.className = "terms-item";
    item.innerHTML = `
      <h3>${escapeHtml(section.title)}</h3>
      <p>${escapeHtml(section.text)}</p>
    `;
    elements.contractTerms.appendChild(item);
  });
}

function renderUploadList() {
  elements.uploadList.innerHTML = "";
  if (!state.files.length) {
    const empty = document.createElement("div");
    empty.className = "upload-item";
    empty.innerHTML = `<div><div class="upload-item__name">—</div><div class="upload-item__meta">${escapeHtml(textFor("page4.uploadText"))}</div></div>`;
    elements.uploadList.appendChild(empty);
    return;
  }

  state.files.forEach((file, index) => {
    const item = document.createElement("div");
    item.className = "upload-item";
    item.innerHTML = `
      <div>
        <div class="upload-item__name">${escapeHtml(file.name)}</div>
        <div class="upload-item__meta">${formatFileSize(file.size)}</div>
      </div>
    `;
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "btn-text";
    remove.textContent = "×";
    remove.setAttribute("aria-label", "Remove file");
    remove.addEventListener("click", () => {
      state.files.splice(index, 1);
      renderUploadList();
      clearFieldError(elements.uploadError);
    });
    item.appendChild(remove);
    elements.uploadList.appendChild(item);
  });
}

function renderSuccessState() {
  elements.submissionStage.classList.toggle("hidden", state.submitted);
  elements.successStage.classList.toggle("hidden", !state.submitted);
  elements.summaryPanel.classList.toggle("hidden", state.submitted);
  elements.mobileTotalBar.classList.toggle("hidden", state.submitted);
  elements.successReference.textContent = state.reference;
  elements.successText.textContent = successMessage();
  elements.downloadFinalContract.textContent = textFor("page3.download");
  elements.paymentAction.textContent = paymentActionLabel();
  delete elements.paymentAction.dataset.action;
  delete elements.paymentAction.dataset.busy;
  elements.paymentAction.removeAttribute("aria-disabled");
  elements.paymentAction.removeAttribute("target");
  elements.paymentAction.removeAttribute("rel");

  const result = state.submissionResult;
  if (!result) {
    elements.paymentStatus.classList.add("hidden");
    elements.paymentAction.classList.add("hidden");
    elements.downloadFinalContract.classList.add("hidden");
    return;
  }

  if (result.contract_download_url) {
    elements.downloadFinalContract.href = result.contract_download_url;
    elements.downloadFinalContract.classList.remove("hidden");
  } else {
    elements.downloadFinalContract.classList.add("hidden");
  }

  const paymentMessage = paymentStatusMessage(
    result.payment_mode,
    result.payment_url,
    result.payment_error,
    result.payment_retry_available,
    result.payment_status,
  );
  if (paymentMessage) {
    elements.paymentStatus.textContent = paymentMessage;
    elements.paymentStatus.classList.remove("hidden");
  } else {
    elements.paymentStatus.classList.add("hidden");
  }

  if (result.payment_status === "paid") {
    elements.paymentAction.classList.add("hidden");
  } else if (result.payment_url) {
    elements.paymentAction.href = result.payment_url;
    elements.paymentAction.target = "_blank";
    elements.paymentAction.rel = "noopener noreferrer";
    elements.paymentAction.classList.remove("hidden");
  } else if (result.payment_retry_url) {
    elements.paymentAction.href = "#";
    elements.paymentAction.dataset.action = "retry-payment";
    elements.paymentAction.textContent = retryPaymentLabel();
    elements.paymentAction.classList.remove("hidden");
  } else {
    elements.paymentAction.classList.add("hidden");
  }
}

function handleLanguageChoice(event) {
  const button = event.target.closest("[data-lang]");
  if (!button) return;
  state.lang = button.dataset.lang;
  state.languageConfirmed = true;
  renderAll();
}

function startOnboarding() {
  if (!state.languageConfirmed) {
    state.languageConfirmed = true;
    renderLanguageCards();
  }
  elements.welcomeOverlay.classList.add("is-hidden");
  document.body.classList.remove("welcome-lock");
}

function startOnboardingSilently() {
  if (!elements.welcomeOverlay.classList.contains("is-hidden")) {
    startOnboarding();
  }
}

function changeKiosk(delta) {
  state.kioskCount = Math.max(1, Math.min(10, state.kioskCount + delta));
  if (!state.printerTouched) {
    state.printerCount = state.kioskCount + state.posCount;
  }
  renderAll();
}

function changePOS(delta) {
  state.posCount = Math.max(1, Math.min(10, state.posCount + delta));
  if (!state.printerTouched) {
    state.printerCount = state.kioskCount + state.posCount;
  }
  renderAll();
}

function changePrinter(delta) {
  state.printerTouched = true;
  state.printerCount = Math.max(1, Math.min(20, state.printerCount + delta));
  renderAll();
}

function toggleEthernet() {
  state.ethernet = !state.ethernet;
  renderAll();
}

function goToStep(step) {
  state.step = step;
  renderAll();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function submitStep2() {
  if (!validateStep2(true)) return;
  goToStep(3);
}

function validateStep2(showErrors) {
  const rules = [
    ["companyName", "errorCompanyName", "required"],
    ["companyAddress", "errorCompanyAddress", "required"],
    ["restaurantName", "errorRestaurantName", "required"],
    ["restaurantAddress", "errorRestaurantAddress", "required"],
    ["contactPerson", "errorContactPerson", "required"],
    ["emailAddress", "errorEmailAddress", "email"],
  ];

  let valid = true;
  rules.forEach(([fieldId, errorId, type]) => {
    const value = state.form[fieldId];
    const errorNode = document.getElementById(errorId);
    let message = "";
    if (!value) {
      message = textFor("errors.required");
    } else if (type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      message = textFor("errors.email");
    }
    if (message) valid = false;
    if (showErrors && message) {
      setFieldError(errorNode, message);
    } else {
      clearFieldError(errorNode);
    }
  });

  elements.toStep3.disabled = !valid;
  return valid;
}

function submitStep3() {
  if (!validateStep3(true)) return;
  goToStep(4);
}

function validateStep3(showErrors = false) {
  const accepted = document.getElementById("acceptCommitment").checked && document.getElementById("acceptTerms").checked;
  const valid = accepted && state.signed;
  renderSelections();
  elements.signatureStatus.textContent = state.signed ? textFor("page3.signatureDone") : textFor("page3.signaturePending");
  if (showErrors && !state.signed) {
    setFieldError(elements.signatureError, textFor("errors.signature"));
  } else if (state.signed) {
    clearFieldError(elements.signatureError);
  }
  elements.toStep4.disabled = !valid;
  return valid;
}

function recurringTotal() {
  return state.kioskCount * PRICING.kiosk + state.posCount * PRICING.pos + (state.sla === "premium" ? PRICING.slaPremium : 0);
}

function terminalCount() {
  return state.kioskCount + 1;
}

function oneTimeTotal() {
  return terminalCount() * PRICING.terminal + (state.ethernet ? PRICING.ethernet : 0);
}

function formatRecurring(amount) {
  return `${amount} ${textFor("templates.perMonth")}`;
}

function formatMoney(amount) {
  return `${amount} ${textFor("templates.oneTime")}`;
}

function buildReference() {
  const year = new Date().getFullYear();
  const code = Math.floor(1000 + Math.random() * 9000);
  return `TG-${year}-${code}`;
}

function template(source, vars) {
  return source.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? "");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function setFieldError(node, message) {
  node.textContent = message;
  node.classList.add("is-visible");
}

function clearFieldError(node) {
  node.textContent = "";
  node.classList.remove("is-visible");
}

function initSignature() {
  signatureCtx = elements.signatureCanvas.getContext("2d");
  resizeSignatureCanvas();
  signatureCtx.strokeStyle = "#be1b4c";
  signatureCtx.lineWidth = 2.6;
  signatureCtx.lineCap = "round";
  signatureCtx.lineJoin = "round";

  elements.signatureCanvas.addEventListener("pointerdown", startDrawing);
  elements.signatureCanvas.addEventListener("pointermove", drawSignature);
  elements.signatureCanvas.addEventListener("pointerup", stopDrawing);
  elements.signatureCanvas.addEventListener("pointerleave", stopDrawing);
}

function resizeSignatureCanvas() {
  const rect = elements.signaturePad.getBoundingClientRect();
  const snapshot = state.signatureData;
  elements.signatureCanvas.width = rect.width;
  elements.signatureCanvas.height = rect.height;
  if (!signatureCtx) {
    signatureCtx = elements.signatureCanvas.getContext("2d");
  }
  signatureCtx.strokeStyle = "#be1b4c";
  signatureCtx.lineWidth = 2.6;
  signatureCtx.lineCap = "round";
  signatureCtx.lineJoin = "round";
  if (snapshot) {
    const image = new Image();
    image.onload = () => {
      signatureCtx.drawImage(image, 0, 0, rect.width, rect.height);
    };
    image.src = snapshot;
  }
}

function startDrawing(event) {
  isDrawing = true;
  const point = signaturePoint(event);
  signatureCtx.beginPath();
  signatureCtx.moveTo(point.x, point.y);
}

function drawSignature(event) {
  if (!isDrawing) return;
  const point = signaturePoint(event);
  signatureCtx.lineTo(point.x, point.y);
  signatureCtx.stroke();
  markSigned();
}

function stopDrawing() {
  if (!isDrawing) return;
  isDrawing = false;
  state.signatureData = elements.signatureCanvas.toDataURL("image/png");
}

function signaturePoint(event) {
  const rect = elements.signatureCanvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}

function markSigned() {
  state.signed = true;
  elements.signaturePad.classList.add("is-signed");
  elements.signatureHint.classList.add("hidden");
  clearFieldError(elements.signatureError);
  validateStep3();
}

function clearSignature() {
  signatureCtx.clearRect(0, 0, elements.signatureCanvas.width, elements.signatureCanvas.height);
  state.signed = false;
  state.signatureData = "";
  elements.signaturePad.classList.remove("is-signed");
  elements.signatureHint.classList.remove("hidden");
  validateStep3();
}

function handleUploadSelection(event) {
  const incoming = Array.from(event.target.files || []);
  const merged = [...state.files];
  let hasError = false;

  for (const file of incoming) {
    const extension = file.name.split(".").pop()?.toLowerCase() || "";
    if (!["pdf", "jpg", "jpeg", "png", "xlsx", "docx"].includes(extension)) {
      setFieldError(elements.uploadError, textFor("errors.fileType"));
      hasError = true;
      continue;
    }
    if (file.size > 20 * 1024 * 1024) {
      setFieldError(elements.uploadError, textFor("errors.fileSize"));
      hasError = true;
      continue;
    }
    const duplicate = merged.find((existing) => existing.name === file.name && existing.size === file.size);
    if (!duplicate) merged.push(file);
  }

  if (merged.length > 10) {
    setFieldError(elements.uploadError, textFor("errors.fileCount"));
    hasError = true;
    merged.length = 10;
  } else if (!hasError) {
    clearFieldError(elements.uploadError);
  }

  state.files = merged;
  elements.menuUpload.value = "";
  renderUploadList();
}

async function finalizeSubmission() {
  clearFieldError(elements.uploadError);
  state.form.menuLink = document.getElementById("menuLink").value.trim();
  state.form.menuNote = document.getElementById("menuNote").value.trim();
  if (state.form.menuLink && !isValidMenuLink(state.form.menuLink)) {
    setFieldError(elements.uploadError, invalidMenuLinkMessage());
    return;
  }
  if (!state.files.length && !state.form.menuLink) {
    setFieldError(elements.uploadError, requiredMenuSourceMessage());
    return;
  }
  elements.submitFlow.disabled = true;

  try {
    const formData = new FormData();
    formData.append("payload", JSON.stringify(buildPayload()));
    state.files.forEach((file) => {
      formData.append("menu_files", file, file.name);
    });

    const response = await fetch("/api/submissions", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    if (!response.ok) {
      const message = Array.isArray(data.errors) ? data.errors.join(" ") : data.error || "Submission failed.";
      setFieldError(elements.uploadError, message);
      return;
    }

    state.submitted = true;
    state.reference = data.reference || state.reference;
    state.submissionResult = data;
    renderSuccessState();
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (error) {
    setFieldError(elements.uploadError, error.message || "Submission failed.");
  } finally {
    elements.submitFlow.disabled = false;
  }
}

async function handlePaymentAction(event) {
  if (elements.paymentAction.dataset.action !== "retry-payment") return;
  event.preventDefault();

  if (elements.paymentAction.dataset.busy === "true") return;
  const retryUrl = state.submissionResult?.payment_retry_url;
  if (!retryUrl) return;

  elements.paymentAction.dataset.busy = "true";
  elements.paymentAction.setAttribute("aria-disabled", "true");
  elements.paymentAction.textContent = retryingPaymentLabel();

  try {
    const response = await fetch(retryUrl, { method: "POST" });
    const data = await response.json().catch(() => ({}));
    state.submissionResult = {
      ...(state.submissionResult || {}),
      ...data,
    };
    renderSuccessState();

    if (!response.ok && data.error) {
      elements.paymentStatus.textContent = data.error;
      elements.paymentStatus.classList.remove("hidden");
    }
  } catch (error) {
    state.submissionResult = {
      ...(state.submissionResult || {}),
      payment_mode: "fallback",
      payment_url: null,
      payment_error: error.message || "Unable to retry the Stripe checkout link.",
      payment_retry_url: retryUrl,
      payment_retry_available: true,
    };
    renderSuccessState();
  }
}

async function hydrateFromPaymentReturn() {
  const params = new URLSearchParams(window.location.search);
  const reference = params.get("ref");
  const payment = params.get("payment");
  const sessionId = params.get("session_id");
  const token = params.get("token");
  if (!reference || !payment || !token) return;

  startOnboardingSilently();

  try {
    const response = await fetch(`/api/submissions/${encodeURIComponent(reference)}?token=${encodeURIComponent(token)}`);
    if (!response.ok) return;
    const data = await response.json();
    applySubmissionSnapshot(data);
    renderAll();
    await syncPaymentReturn(payment, reference, sessionId, data.payment_sync_url);
  } catch (error) {
    if (state.submissionResult) {
      state.submissionResult.payment_error = error.message || "Unable to load the Stripe payment result.";
      renderAll();
    }
  }
}

function applySubmissionSnapshot(data) {
  const submission = data.submission || {};
  state.reference = submission.reference || state.reference;
  state.lang = submission.language || state.lang;
  state.languageConfirmed = true;
  state.submitted = true;
  state.form.menuLink = data.menu_link || "";
  state.files = (data.files || []).map((file) => ({
    name: file.original_name,
    size: file.size_bytes,
  }));
  state.submissionResult = {
    ...(state.submissionResult || {}),
    reference: submission.reference || state.reference,
    contract_download_url: data.contract_download_url,
    menu_link: data.menu_link || null,
    payment_mode: data.payment_mode || submission.payment_provider || "development",
    payment_status: data.payment_status || submission.payment_status,
    payment_url: data.payment_url || submission.payment_url || null,
    payment_required: data.payment_required,
    payment_error: data.payment_error || null,
    payment_retry_available: data.payment_retry_available,
    payment_retry_url: data.payment_retry_url,
    payment_sync_url: data.payment_sync_url,
  };
}

async function syncPaymentReturn(payment, reference, sessionId, paymentSyncUrl) {
  const syncUrl = paymentSyncUrl || `/api/submissions/${encodeURIComponent(reference)}/payment-sync`;
  const response = await fetch(syncUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      payment,
      session_id: sessionId || "",
    }),
  });
  const data = await response.json().catch(() => ({}));
  state.submissionResult = {
    ...(state.submissionResult || {}),
    ...data,
  };
  if (!response.ok && data.error) {
    state.submissionResult.payment_error = data.error;
  }
  renderAll();
}

async function downloadContractPreview() {
  if (!validateStep2(true)) {
    goToStep(2);
    return;
  }

  elements.downloadContract.disabled = true;
  try {
    const response = await fetch("/api/contracts/preview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payload: buildPayload() }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setFieldError(elements.signatureError, data.error || "Preview generation failed.");
      return;
    }

    clearFieldError(elements.signatureError);
    const blob = await response.blob();
    downloadBlob(blob, `${state.reference.toLowerCase()}-tapgo-contract.pdf`);
  } catch (error) {
    setFieldError(elements.signatureError, error.message || "Preview generation failed.");
  } finally {
    elements.downloadContract.disabled = false;
  }
}

function formatFileSize(bytes) {
  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function buildPayload() {
  return {
    reference: state.reference,
    language: state.lang,
    kioskType: state.kioskType,
    kioskCount: state.kioskCount,
    posCount: state.posCount,
    printerCount: state.printerCount,
    ethernet: state.ethernet,
    sla: state.sla,
    signatureData: state.signatureData,
    acceptCommitment: document.getElementById("acceptCommitment").checked,
    acceptTerms: document.getElementById("acceptTerms").checked,
    sourceRef: new URLSearchParams(window.location.search).get("ref") || "",
    menuLink: state.form.menuLink,
    menuNote: state.form.menuNote,
    form: {
      companyName: state.form.companyName,
      companyAddress: state.form.companyAddress,
      restaurantName: state.form.restaurantName,
      restaurantAddress: state.form.restaurantAddress,
      contactPerson: state.form.contactPerson,
      emailAddress: state.form.emailAddress,
      phoneNumber: state.form.phoneNumber,
    },
  };
}

function isValidMenuLink(value) {
  return /^https?:\/\/\S+/i.test(value);
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

async function loadServerConfig() {
  try {
    const response = await fetch("/api/config");
    if (!response.ok) return;
    state.serverConfig = await response.json();
  } catch {
    state.serverConfig = null;
  }
}

function paymentActionLabel() {
  const labels = {
    en: "Resume payment",
    fr: "Reprendre le paiement",
    de: "Zahlung fortsetzen",
    it: "Riprendi il pagamento",
    tr: "Odemeye devam et",
  };
  return labels[state.lang] || labels.en;
}

function retryPaymentLabel() {
  const labels = {
    en: "Retry payment link",
    fr: "Relancer le lien de paiement",
    de: "Zahlungslink erneut erstellen",
    it: "Rigenera il link di pagamento",
    tr: "Odeme baglantisini yeniden dene",
  };
  return labels[state.lang] || labels.en;
}

function retryingPaymentLabel() {
  const labels = {
    en: "Retrying...",
    fr: "Nouvelle tentative...",
    de: "Wird erneut versucht...",
    it: "Nuovo tentativo...",
    tr: "Tekrar deneniyor...",
  };
  return labels[state.lang] || labels.en;
}

function paymentStatusMessage(mode, paymentUrl, paymentError, retryAvailable, paymentStatus) {
  if (paymentError) {
    return retryAvailable ? `${paymentError} ${retryHintText()}` : paymentError;
  }

  const statusMessages = {
    en: {
      paid: "Payment received. This submission is marked as paid.",
      cancelled: "Payment was cancelled. You can generate a new Stripe link below.",
      pending: paymentUrl ? "Checkout is ready. Complete the one-time Stripe payment to finish this submission." : "Payment is still pending.",
      retry_required: "The previous Stripe link is no longer active. Generate a new payment link below.",
    },
    fr: {
      paid: "Paiement reçu. Ce dossier est marqué comme payé.",
      cancelled: "Le paiement a été annulé. Vous pouvez générer un nouveau lien Stripe ci-dessous.",
      pending: paymentUrl ? "Le checkout est prêt. Finalisez le paiement Stripe unique pour terminer ce dossier." : "Le paiement est toujours en attente.",
      retry_required: "L'ancien lien Stripe n'est plus actif. Générez un nouveau lien ci-dessous.",
    },
    de: {
      paid: "Zahlung erhalten. Diese Einreichung ist als bezahlt markiert.",
      cancelled: "Die Zahlung wurde abgebrochen. Sie können unten einen neuen Stripe-Link erzeugen.",
      pending: paymentUrl ? "Der Checkout ist bereit. Schliessen Sie die einmalige Stripe-Zahlung ab, um diese Einreichung zu finalisieren." : "Die Zahlung ist noch ausstehend.",
      retry_required: "Der vorige Stripe-Link ist nicht mehr aktiv. Erzeugen Sie unten einen neuen Link.",
    },
    it: {
      paid: "Pagamento ricevuto. Questa richiesta è contrassegnata come pagata.",
      cancelled: "Il pagamento è stato annullato. Puoi generare un nuovo link Stripe qui sotto.",
      pending: paymentUrl ? "Il checkout è pronto. Completa il pagamento Stripe una tantum per finalizzare questa richiesta." : "Il pagamento è ancora in sospeso.",
      retry_required: "Il precedente link Stripe non è più attivo. Genera un nuovo link qui sotto.",
    },
    tr: {
      paid: "Odeme alindi. Bu basvuru odendi olarak isaretlendi.",
      cancelled: "Odeme iptal edildi. Asagidan yeni bir Stripe baglantisi olusturabilirsiniz.",
      pending: paymentUrl ? "Checkout hazir. Bu basvuruyu tamamlamak icin tek seferlik Stripe odemesini bitirin." : "Odeme hala beklemede.",
      retry_required: "Onceki Stripe baglantisi artik aktif degil. Asagidan yeni bir baglanti olusturun.",
    },
  };

  const statusCopy = statusMessages[state.lang] || statusMessages.en;
  if (paymentStatus && statusCopy[paymentStatus]) {
    return statusCopy[paymentStatus];
  }

  const messages = {
    en: {
      stripe: paymentUrl ? "Your one-time Stripe checkout link is ready." : "Stripe is enabled, but no checkout link was returned.",
      development: "Stripe is not configured in this environment, so one-time payment is marked as simulated for local development.",
      fallback: "The submission was stored, but the Stripe checkout link could not be created automatically.",
      simulated: "Stripe is not configured in this environment, so one-time payment is marked as simulated for local development.",
    },
    fr: {
      stripe: paymentUrl ? "Votre lien de paiement Stripe est prêt." : "Stripe est activé, mais aucun lien de paiement n'a été retourné.",
      development: "Stripe n'est pas configuré dans cet environnement, donc le paiement unique est simulé pour le développement local.",
      fallback: "Le dossier a été enregistré, mais le lien Stripe n'a pas pu être généré automatiquement.",
      simulated: "Stripe n'est pas configuré dans cet environnement, donc le paiement unique est simulé pour le développement local.",
    },
    de: {
      stripe: paymentUrl ? "Ihr Stripe-Zahlungslink ist bereit." : "Stripe ist aktiv, aber es wurde kein Zahlungslink zurückgegeben.",
      development: "Stripe ist in dieser Umgebung nicht konfiguriert, daher wird die Einmalzahlung lokal als simuliert markiert.",
      fallback: "Die Einreichung wurde gespeichert, aber der Stripe-Link konnte nicht automatisch erstellt werden.",
      simulated: "Stripe ist in dieser Umgebung nicht konfiguriert, daher wird die Einmalzahlung lokal als simuliert markiert.",
    },
    it: {
      stripe: paymentUrl ? "Il link di pagamento Stripe è pronto." : "Stripe è attivo ma non è stato restituito alcun link di pagamento.",
      development: "Stripe non è configurato in questo ambiente, quindi il pagamento una tantum è simulato per lo sviluppo locale.",
      fallback: "L'invio è stato salvato, ma il link Stripe non è stato creato automaticamente.",
      simulated: "Stripe non è configurato in questo ambiente, quindi il pagamento una tantum è simulato per lo sviluppo locale.",
    },
    tr: {
      stripe: paymentUrl ? "Stripe ödeme linkiniz hazır." : "Stripe etkin, ancak bir ödeme bağlantısı döndürülmedi.",
      development: "Stripe bu ortamda yapılandırılmadığı için tek seferlik ödeme yerel geliştirme modunda simüle edildi.",
      fallback: "Gönderi kaydedildi, ancak Stripe ödeme bağlantısı otomatik olarak oluşturulamadı.",
      simulated: "Stripe bu ortamda yapılandırılmadığı için tek seferlik ödeme yerel geliştirme modunda simüle edildi.",
    },
  };

  const copy = messages[state.lang] || messages.en;
  return copy[mode] || "";
}

function retryHintText() {
  const messages = {
    en: "Use the retry button below to generate the Stripe link again.",
    fr: "Utilisez le bouton ci-dessous pour regénérer le lien Stripe.",
    de: "Nutzen Sie die Schaltfläche unten, um den Stripe-Link erneut zu erzeugen.",
    it: "Usa il pulsante qui sotto per rigenerare il link Stripe.",
    tr: "Stripe baglantisini yeniden olusturmak icin asagidaki dugmeyi kullanin.",
  };
  return messages[state.lang] || messages.en;
}

function requiredMenuSourceMessage() {
  const messages = {
    en: "Add at least one menu file or a menu link.",
    fr: "Ajoutez au moins un fichier menu ou un lien de menu.",
    de: "Fügen Sie mindestens eine Menüdatei oder einen Menülink hinzu.",
    it: "Aggiungi almeno un file menu o un link al menu.",
    tr: "En az bir menu dosyasi veya bir menu baglantisi ekleyin.",
  };
  return messages[state.lang] || messages.en;
}

function invalidMenuLinkMessage() {
  const messages = {
    en: "Enter a valid menu link starting with http:// or https://.",
    fr: "Saisissez un lien menu valide commençant par http:// ou https://.",
    de: "Geben Sie einen gültigen Menülink ein, der mit http:// oder https:// beginnt.",
    it: "Inserisci un link menu valido che inizi con http:// o https://.",
    tr: "http:// veya https:// ile baslayan gecerli bir menu baglantisi girin.",
  };
  return messages[state.lang] || messages.en;
}
