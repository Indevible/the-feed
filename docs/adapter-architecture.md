# Adapter architecture

## Purpose

The Feed must be able to appear wherever people already gather without forcing the core system to be rebuilt for each platform.

Telegram, Discord, X, Meta/Facebook, Reddit, traditional forums, the Indelible website, and future platforms all have different formatting limits, identity systems, moderation requirements, rate limits, and delivery methods.

Those differences belong in adapters.

They must not leak into the interpreter.

> Interpret once. Publish anywhere.

## System boundary

```text
Public XDEL activity
        ↓
Read-only indexer
        ↓
Canonical interpreter
        ↓
Canonical Feed event service
        ↓
Adapter layer
        ├── Web
        ├── Indeligram
        ├── Indiscible
        ├── Indelixible
        ├── Indelimeta
        ├── Indeddible
        ├── Indelorum
        └── future adapters
```

## Layer responsibilities

### Read-only indexer

The indexer observes public XDEL activity and records source facts:

- transaction signature;
- event or instruction index;
- block time;
- sender and recipient;
- exact token amount;
- activity context;
- public market or pool references;
- public identity references.

It must not sign transactions, hold keys, move tokens, assign meanings, or format social posts.

### Canonical interpreter

The interpreter applies the published grammar and lexicon.

It alone determines:

- whether an amount contains a recognized code;
- the code and lexicon version;
- the event class;
- the interpreted meaning;
- whether reciprocity occurred;
- which earlier event is linked;
- which interpretation warnings apply.

No adapter may reinterpret the activity.

### Canonical Feed event service

The event service stores and serves normalized Feed events.

It provides:

- stable event IDs;
- schema and lexicon versions;
- source references;
- identity-display data;
- reciprocity links;
- rendering hints;
- adapter-delivery state.

It remains independent of any single platform.

### Adapter layer

Adapters translate canonical events into platform-native presentation.

An adapter may decide:

- text length and line breaks;
- card, embed, image, thread, or plain-text format;
- placement of source links;
- configured event filters;
- destination-specific tone.

An adapter may not decide:

- what a code means;
- whether an event is a Veme, Exeme, or Trademe;
- whether reciprocity occurred;
- which source transaction belongs to the event;
- how event IDs are generated;
- whether historical meaning changes;
- whether an event becomes a durable Vouch.

## Provisional canonical event

```json
{
  "schema_version": "0.1",
  "event_id": "stable-event-id",
  "event_class": "veme",
  "context": "wallet_transfer",
  "code": "143",
  "lexicon_version": "draft-0.1",
  "meaning": "I love you",
  "amount": "105.00143",
  "base_amount": "105",
  "sender": {
    "address": "sender-wallet",
    "display_name": "alice.sol",
    "display_source": "sns"
  },
  "recipient": {
    "address": "recipient-wallet",
    "display_name": "bob.sol",
    "display_source": "sns"
  },
  "reciprocity": {
    "status": "open",
    "linked_event_id": null
  },
  "source": {
    "transaction_signature": "signature",
    "event_index": 0,
    "url": "https://solscan.io/tx/signature"
  },
  "occurred_at": "2026-07-12T12:00:00Z",
  "interpretation": {
    "intent_claimed": false,
    "confidence": "grammar-match"
  },
  "rendering": {
    "tone": "warm",
    "template_key": "love-signal"
  }
}
```

The exact schema remains provisional. The requirement is that adapters never need to read the chain or apply the grammar themselves.

## Stable identity

One event must retain the same identity everywhere.

A deterministic event ID should derive from immutable facts where possible:

```text
network + transaction signature + event index + interpretation version
```

A web post, Telegram post, Discord embed, X post, Reddit comment, and forum entry may look different but must point to the same canonical event ID.

## Schema and lexicon versioning

- Adapters declare supported schema versions.
- Additive fields should not break older adapters.
- Required-field changes require a new schema version.
- Unsupported major versions must fail cleanly.
- Historical events retain the schema and lexicon versions used when interpreted.
- Reprocessing creates an auditable revision rather than silently rewriting history.
- Schema version and lexicon version remain separate.

A schema change alters structure.

A lexicon change alters language.

## Delivery modes

The canonical service should be capable of supporting:

### Polling
Simple adapters request events after a cursor or timestamp.

### Webhooks
The service sends signed event payloads to adapter endpoints.

### Event streams
Subscribers receive new canonical events as they are published.

The first implementation may support only one mode, but the architecture must not depend permanently on it.

## Idempotency

Every delivery should include:

- canonical event ID;
- delivery attempt ID;
- schema version;
- destination;
- creation timestamp.

Repeated delivery of the same event to the same destination must not create duplicate public posts unless explicitly requested.

## Adapter isolation

Each adapter should have its own:

- queue or delivery state;
- credentials;
- rate-limit handling;
- retry policy;
- error log;
- destination configuration.

A failed Telegram integration must not stop the web Feed.

A suspended X account must not stop Discord.

A retired platform must not require interpreter changes.

## Identity presentation

A provisional display order may be:

1. verified SNS name;
2. explicitly linked platform identity;
3. approved Pump.fun identity;
4. consistently shortened wallet address.

The canonical event should record the display value, its source, its verification state, and the underlying wallet address.

Adapters may shorten presentation for platform limits but must preserve a route to the full address and canonical event.

Adapters must not invent identity links independently.

## Community configuration

Permitted configuration may include:

- enabled event classes;
- minimum confidence;
- locale;
- compact or expanded format;
- image-card usage;
- tone pack;
- destination channel;
- quiet hours;
- publication rate;
- whether open gestures or only completed reciprocity are shown.

Configuration must not alter:

- code definitions;
- event class;
- source transaction;
- reciprocity status;
- canonical event ID;
- historical interpretation.

## Moderation and amplification

Public blockchain activity does not require The Feed to amplify every matching event.

A canonical event may carry presentation guidance such as:

- safe to publish;
- publish neutrally;
- do not amplify automatically;
- requires review;
- source only.

Moderation addresses spam, abuse, illegal content, impersonation, platform policy, and presentation risk.

It must not become a hidden negative reputation system.

## Security

Adapters must remain non-custodial.

They must not require:

- wallet seeds;
- private keys;
- signing authority;
- treasury access;
- creator-wallet control.

Platform credentials must be isolated per adapter and excluded from source control, event payloads, public logs, and rendered posts.

Webhook payloads should be signed and replay-protected.

## Portability

The website is an adapter, not the definition of The Feed.

If the website changes, The Feed remains.

If Telegram disappears, The Feed remains.

If a community migrates from Facebook to a forum, canonical event history remains.

If a new platform becomes important, it receives a new adapter rather than a new interpreter.

## Conceptual adapter names

- **Indeligram** — Telegram
- **Indiscible** — Discord
- **Indelixible** — X
- **Indelimeta** — Meta/Facebook
- **Indeddible** — Reddit
- **Indelorum** — traditional forums

These names preserve design intent. They do not imply that integrations already exist.

## First proof

The first proof should use:

1. the public web Feed;
2. one external adapter.

Indeligram is a likely first external candidate, but the final choice should remain practical.

The proof succeeds when:

- both surfaces consume the same canonical event;
- neither surface parses XDEL activity independently;
- meaning is identical;
- presentation is platform-appropriate;
- one adapter can fail without affecting the other;
- both presentations trace back to one source event.

## Boundary with Vouch and enduring systems

The Feed handles public, moving, expressive activity.

Durable Vouch mechanics remain separate.

An adapter may eventually display a public reference to a Vouch or another enduring Indelible object, but The Feed must not own:

- Vouch creation rules;
- permanence;
- soulbound mechanics;
- symbolic reserve custody;
- standing;
- identity adjudication;
- governance over recognition.

The Feed moves.

What endures belongs elsewhere.
