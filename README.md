# The Shop at Teabury

Nuxt/Vuetify site for The Shop at Teabury.

## Setup

Make sure to install the dependencies:

```bash

# yarn
yarn install
```

## Environment

### Announcement Banner

The homepage can show a dismissible announcement banner above the hero logo. It is controlled by public Nuxt runtime config values, so the content is visible to users.

The banner renders only when:

- `NUXT_PUBLIC_ANNOUNCEMENT_MESSAGE` is set.
- `NUXT_PUBLIC_ANNOUNCEMENT_EXPIRES_AT` is a valid future ISO timestamp.

Optional CTA button fields render only when both label and URL are set.

```bash
NUXT_PUBLIC_ANNOUNCEMENT_TITLE="Heads up"
NUXT_PUBLIC_ANNOUNCEMENT_MESSAGE="Holiday hours are limited this week."
NUXT_PUBLIC_ANNOUNCEMENT_EXPIRES_AT="2026-06-01T04:00:00Z"
NUXT_PUBLIC_ANNOUNCEMENT_ACTION_LABEL="Book Now"
NUXT_PUBLIC_ANNOUNCEMENT_ACTION_URL="https://www.vagaro.com/theshopatteaburyllc"
```

Dismissal is page-view only. The banner returns on a fresh visit while the announcement is still active.

### Analytics

PennyLabs analytics is configured in `nuxt.config.ts` and only renders when `NODE_ENV === 'production'`.
