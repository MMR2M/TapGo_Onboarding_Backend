#!/usr/bin/env python3
from __future__ import annotations

import os
from pathlib import Path

import httpx


ENV_PATH = Path("/opt/tapgo-backend/.env")
WEBHOOK_URL = "https://contract.tapgo.ch/api/stripe/webhook"
EVENTS = [
    "checkout.session.completed",
    "checkout.session.expired",
    "checkout.session.async_payment_failed",
]


def read_env() -> dict[str, str]:
    values: dict[str, str] = {}
    for raw_line in ENV_PATH.read_text(encoding="utf-8").splitlines():
        if "=" not in raw_line or raw_line.lstrip().startswith("#"):
            continue
        key, value = raw_line.split("=", 1)
        values[key.strip()] = value.strip()
    return values


def write_env(updates: dict[str, str]) -> None:
    lines = ENV_PATH.read_text(encoding="utf-8").splitlines()
    seen: set[str] = set()
    output: list[str] = []
    for line in lines:
        if "=" not in line or line.lstrip().startswith("#"):
            output.append(line)
            continue
        key = line.split("=", 1)[0].strip()
        if key in updates:
            output.append(f"{key}={updates[key]}")
            seen.add(key)
        else:
            output.append(line)
    for key, value in updates.items():
        if key not in seen:
            output.append(f"{key}={value}")
    ENV_PATH.write_text("\n".join(output) + "\n", encoding="utf-8")
    os.chmod(ENV_PATH, 0o600)


def main() -> None:
    env = read_env()
    if env.get("TAPGO_STRIPE_WEBHOOK_SECRET"):
        write_env({"TAPGO_ENV": "production"})
        print("Stripe webhook secret already configured; production mode enabled.")
        return

    stripe_secret = env.get("TAPGO_STRIPE_SECRET_KEY")
    if not stripe_secret:
        raise RuntimeError("TAPGO_STRIPE_SECRET_KEY is missing.")

    form_data: list[tuple[str, str]] = [("url", WEBHOOK_URL)]
    form_data.extend(("enabled_events[]", event) for event in EVENTS)
    response = httpx.post(
        "https://api.stripe.com/v1/webhook_endpoints",
        auth=(stripe_secret, ""),
        data=form_data,
        timeout=30,
    )
    response.raise_for_status()
    webhook_secret = response.json()["secret"]
    write_env(
        {
            "TAPGO_STRIPE_WEBHOOK_SECRET": webhook_secret,
            "TAPGO_ENV": "production",
        }
    )
    print("Stripe webhook created and production mode enabled.")


if __name__ == "__main__":
    main()
