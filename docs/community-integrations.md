# Community integrations

The Feed should be designed as a reusable event source rather than a webpage that owns all interpretation.

## Intended flow

```text
Public XDEL activity
        ↓
Read-only indexer
        ↓
Numeric interpreter
        ↓
Normalized Feed event
        ↓
Web · Discord · Telegram · future clients
```

Each destination should consume the same canonical event.

Presentation may vary by surface, but meaning should not.

## Web

- recent interpreted activity;
- event details;
- source transaction links;
- reciprocal resurfacing;
- shareable URLs;
- deterministic meme cards.

## Discord

- a dedicated live Feed channel;
- compact event embeds;
- links to the canonical web event;
- configurable filtering by event class;
- moderation-safe presentation templates.

## Telegram

- compact channel posts;
- reply-friendly formatting;
- links to source activity;
- optional community-specific filters;
- the same canonical interpretation used elsewhere.

## Community portability

The Feed should not assume that one platform, audience, or subculture will remain primary.

Community integrations should be adapters around the canonical event model, not separate interpreters that drift into incompatible meanings.
