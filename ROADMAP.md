# Roadmap

The Feed is a public, read-only interpretation layer for XDEL activity.

Its architecture must support broad distribution from the beginning. The Feed should interpret activity once, produce one canonical event, and allow that event to appear across the web, Telegram, Discord, X, Meta/Facebook, Reddit, traditional forums, and future platforms without redesigning the core system.

> Interpret once. Publish anywhere.

The core interpreter owns meaning. Adapters own presentation.

## M0 — Public design foundation

- Define the scope and boundary of The Feed.
- Keep durable Vouch mechanics outside this repository.
- Define provisional terminology: Veme, Exeme, Trademe, open gesture, reciprocal interaction.
- Define the numeric transaction grammar.
- Define how economic value and appended expression are separated.
- Define collision, ambiguity, padding, and decimal-placement rules.
- Define the canonical Feed event model.
- Define stable event identifiers and source references.
- Define identity-display precedence.
- Define the adapter architecture and adapter contract.
- Document community-integration requirements.
- Draft a small provisional lexicon.
- Document interpretation, moderation, and amplification boundaries.

**Exit condition:** one public XDEL activity record can be traced into one canonical Feed event and then into multiple platform presentations without changing its meaning.

## M1 — Offline interpreter

- Accept sample wallet-transfer, swap, and trade records.
- Preserve exact token amounts as strings.
- Separate base economic value from appended expression.
- Detect provisional codes.
- Classify event context without claiming private intent.
- Produce schema-valid canonical Feed events.
- Produce deterministic event IDs.
- Test ambiguity, collisions, decimal placement, substantive transfers, and reciprocity.
- Reject malformed inputs cleanly.

**Exit condition:** the same sample input always produces the same normalized output regardless of adapter.

## M2 — Read-only XDEL indexer

- Observe activity for the canonical XDEL mint.
- Ingest wallet transfers and supported swap/trade contexts.
- Preserve transaction signatures and event indexes.
- Deduplicate repeated observations.
- Resolve readable identities where available.
- Record identity provenance.
- Apply the canonical interpreter.
- Link later reciprocal activity to earlier eligible gestures.
- Support replay when the interpreter or lexicon changes.

**Exit condition:** live public activity becomes stable canonical Feed events without dependence on any presentation platform.

## M3 — Canonical Feed service

- Persist canonical Feed events.
- Version the event schema and lexicon independently.
- Provide a read-only event API.
- Provide recent-event pagination and event lookup.
- Preserve source-transaction and reciprocity links.
- Provide adapter-safe rendering hints.
- Support polling, webhook, or stream delivery.
- Isolate adapter failures from the core.
- Support idempotent delivery.

**Exit condition:** a new adapter can consume The Feed without reading the chain or reimplementing interpretation.

## M4 — Web adapter

- Display recent interpreted activity.
- Resolve readable identities with consistent fallback.
- Link events to canonical detail pages and source transactions.
- Let old activity scroll away naturally.
- Resurface completed reciprocal interactions.
- Create stable, shareable event URLs.
- Avoid negative scoring or pressure language.
- Use deterministic, moderation-safe templates.

**Exit condition:** the website contains no duplicate interpretation logic and renders only canonical events.

## M5 — First external adapter

The first external adapter will likely be **Indeligram**, though the final choice remains open.

- Consume the same canonical events as the web adapter.
- Format platform-native posts.
- Link back to the canonical event.
- Preserve event identity.
- Support filters, retries, and deduplication.
- Fail without interrupting indexing or other adapters.
- Keep platform credentials outside public configuration.

**Exit condition:** one event appears on the web and one external platform with the same meaning and different presentation.

## M6 — Adapter expansion

Conceptual adapters:

- **Indeligram** — Telegram
- **Indiscible** — Discord
- **Indelixible** — X
- **Indelimeta** — Meta/Facebook
- **Indeddible** — Reddit
- **Indelorum** — traditional forums

- Publish a standard adapter interface.
- Publish an adapter starter template.
- Document authentication, secret handling, and platform limits.
- Support per-adapter filters and tone packs.
- Prevent adapters from changing lexicon definitions or historical interpretation.
- Allow adapters to be suspended or retired without affecting The Feed.

**Exit condition:** adapters can be added, removed, or replaced without changes to indexing or interpretation.

## M7 — Meme and presentation renderer

- Define deterministic visual templates.
- Define code-specific captions, iconography, and tone.
- Generate shareable static cards.
- Evaluate short animations.
- Separate canonical event data from presentation.
- Record template versions.
- Avoid unrestricted public generation at first.
- Establish asset-rights and moderation rules.

## M8 — Expanded language

- Grow the lexicon carefully after observing real use.
- Cover a balanced range of expression.
- Test ordinary-transfer collision rates.
- Version meanings explicitly.
- Preserve historical interpretation.
- Define how codes are introduced, revised, deprecated, or retired.
- Distinguish wallet, swap, and trade contexts where meaning differs.

## M9 — Public integration layer

- Publish read-only API documentation.
- Publish webhook or event-stream documentation.
- Publish an embeddable Feed component.
- Publish adapter-development guidance.
- Publish schema and versioning guarantees.
- Provide fixtures and sample events.
- Keep custody and signing outside scope.

## Explicitly outside this repository

- durable Vouch mechanics;
- soulbound or reserve-held recognition;
- The Steed or any system of enduring standing;
- custody and wallet control;
- treasury and launch operations;
- governance over personal recognition;
- private identity claims;
- negative reputation systems.

The Feed may later display public references to those systems, but it must not own their permanence or rules.
