#!/usr/bin/env python3
from __future__ import annotations

import smtplib

import httpx

import app


BASE_URL = "https://contract.tapgo.ch"


def assert_ok(response: httpx.Response, label: str) -> None:
    response.raise_for_status()
    print(f"PASS {label}")


def main() -> None:
    assert_ok(httpx.get(f"{BASE_URL}/", timeout=20), "frontend")
    assert_ok(httpx.get(f"{BASE_URL}/health", timeout=20), "public health")

    config = httpx.get(f"{BASE_URL}/api/config", timeout=20)
    assert_ok(config, "API config")
    assert config.json()["payment_mode"] == "stripe"
    assert config.json()["storage_mode"] == "object-storage"
    assert config.json()["email_mode"] == "smtp"

    integration_health = httpx.get(
        f"{BASE_URL}/api/integrations/health",
        headers={"Authorization": f"Bearer {app.SETTINGS.health_token}"},
        timeout=30,
    )
    assert_ok(integration_health, "protected integration health")
    assert integration_health.json()["imap_ok"] is True
    print("PASS IMAP login")

    with smtplib.SMTP(app.SETTINGS.smtp_host, app.SETTINGS.smtp_port, timeout=20) as smtp:
        smtp.starttls()
        smtp.login(app.SETTINGS.smtp_username, app.SETTINGS.smtp_password)
        smtp.noop()
    print("PASS SMTP login")

    app.object_storage_client().head_bucket(Bucket=app.SETTINGS.object_storage_bucket)
    print("PASS Exoscale bucket access")

    webhooks = httpx.get(
        "https://api.stripe.com/v1/webhook_endpoints",
        auth=(app.SETTINGS.stripe_secret_key, ""),
        timeout=30,
    )
    assert_ok(webhooks, "Stripe API")
    assert any(item.get("url") == f"{BASE_URL}/api/stripe/webhook" for item in webhooks.json()["data"])
    print("PASS Stripe webhook")

    preview = httpx.post(
        f"{BASE_URL}/api/contracts/preview",
        json={
            "payload": {
                "language": "en",
                "kioskType": "standing",
                "kioskCount": 1,
                "printerCount": 2,
                "ethernet": False,
                "sla": "standard",
                "signatureData": "data:image/png;base64,iVBORw0KGgo=",
                "acceptCommitment": True,
                "acceptTerms": True,
                "form": {
                    "companyName": "TapGo Smoke Check",
                    "companyAddress": "Production server",
                    "restaurantName": "TapGo Smoke Check",
                    "restaurantAddress": "Production server",
                    "contactPerson": "TapGo",
                    "emailAddress": "contract@tapgo.ch",
                    "phoneNumber": "",
                },
            }
        },
        timeout=120,
    )
    assert_ok(preview, "Chrome PDF preview")
    assert preview.content.startswith(b"%PDF")

    print("All smoke checks passed.")


if __name__ == "__main__":
    main()
