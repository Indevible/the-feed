# First Brick Ingestion

## Purpose

The first Feed robot turns public XDEL activity into canonical, adapter-ready Feed events.

It does not host an API, post to social platforms, sign transactions, connect wallets, hold keys, or decide durable standing.

```text
provider event
  -> XDEL raw event
  -> Lexicon 0 parser
  -> canonical Feed event
  -> adapter output
```

## Provider boundary

The robot is provider-agnostic by design.

Helius, raw Solana RPC, GeckoTerminal, Jupiter, Solscan, or a fixture file may all become sources. Each provider must normalize its output into the same raw event shape before Lexicon 0 runs.

Required raw event fields:

```json
{
  "provider": "fixture",
  "network": "solana",
  "signature": "transaction-signature",
  "event_index": 0,
  "block_time": "2026-07-15T10:00:00.000Z",
  "activity_type": "transfer",
  "token_mint": "CA2BuDpdxzuwxmoqnW37tPsYhEGhBjEjURa4oLD9pump",
  "token_decimals": 6,
  "amount_atomic": "105001430",
  "amount": "105.001430",
  "sender": "sender-wallet",
  "recipient": "recipient-wallet"
}
```

## Lexicon 0 MVP activity types

Lexicon 0 stays intentionally small:

- `transfer`
- `buy`
- `sell`
- `swap`

These are the event types the first robot can normalize and route without pretending to understand more than it does.

## Governance in Lexicon 0

Governance is included in Lexicon 0 as a meaning category, not as a raw activity type.

A `transfer`, `buy`, `sell`, or `swap` can carry a governance stance when its amount matches one of the universal governance code families:

- `11` = maybe
- `17` = no
- `18` = yes
- `50` = abstain
- `61` = option A
- `62` = option B
- `63` = option C

The same stance family can appear differently by event profile:

```text
transfer yes: 1.000180 XDEL -> field 00018
buy yes:      1.018000 XDEL -> field 01800
sell yes:     1.018000 XDEL -> field 01800
swap yes:     1.018000 XDEL -> field 01800

transfer option B: 1.000620 XDEL -> field 00062
buy option B:      1.062000 XDEL -> field 06200
```

This lets early users signal from the same public transaction rails before any dedicated governance interface exists.

Proposal-choice codes are intentionally neutral. `Option A`, `Option B`, and `Option C` do not carry permanent meanings by themselves.

The proposal supplies the context:

- proposal identifier;
- public opening time or slot;
- public closing time or slot;
- eligible activity types;
- candidate A;
- candidate B;
- candidate C;
- tally rule.

Lexicon 0 provides the signal rail. It does not decide what a proposal means.

Governance signals should be presented as public participation signals, not as legal control, fiduciary authority, binding DAO votes, or off-chain identity claims.

## Social action signals

Lexicon 0 includes a small transfer-only social-action lane:

- `00031` = Fren
- `00032` = Unfren
- `00033` = Like
- `00034` = Unlike
- `00035` = Boost

These are public gestures from sender to recipient. They do not prove friendship, consent, endorsement, membership, identity, or permission.

Adapters may display them as lightweight social language, but should keep them visibly non-binding.

## Proposal lifecycle markers

Lexicon 0 also reserves transfer-only proposal lifecycle markers:

- `00064` = proposal notice
- `00065` = proposal open
- `00066` = proposal close
- `00067` = proposal result

These markers are transfer-only because they describe administration, not market performance.

The code alone does not make a proposal official. Official status must be derived from provenance, such as a registered Indelible wallet, a signed statement, or a published site record.

```text
origin.indelible.sol sends 1.000650 XDEL -> proposal open marker
```

If an unrelated wallet sends the same amount, The Feed may still interpret the phrase, but adapters should not present it as an official proposal lifecycle event.

## Oracle answer codes

Lexicon 0 reserves transfer-only oracle answer codes for future echo-style interpreters:

- `00080` = ask again
- `00081` = sources say yes
- `00082` = outlook not great
- `00083` = send it
- `00084` = rekt
- `00085` = probably nothing
- `00086` = touch grass

These codes are valid public expressions on their own. A future registered echo wallet may use the same vocabulary to respond to users, but Lexicon 0 does not require or operate that bot.

Adapters should distinguish between:

- any wallet using an oracle phrase;
- a registered oracle wallet responding with an oracle phrase.

## Feed presentation controls

Lexicon 0 reserves transfer-only control codes for Feed presentation preferences:

- `00090` = Feed On
- `00091` = Feed Off
- `00092` = Feed Invite
- `00093` = Feed Grant
- `00094` = Feed Grant Revoke

Default presentation policy should be conservative:

```text
Address has no Feed preference -> render factual activity only
Address sends Feed On          -> render future recognized language from that sender
Address sends Feed Off         -> return future activity from that sender to factual-only display
```

The control event itself must remain readable by the engine so preference state can be updated.

`Feed Invite` lets a registered Indelible sender invite a recipient to opt in. It does not enable the recipient by itself.

`Feed Grant` is a visible override from a registered Indelible sender to enable Feed presentation for the recipient. It should be used sparingly and only under a published policy, such as managed project wallets, assisted onboarding, or another public consent path.

The recipient can always send `Feed Off` to disable future Feed presentation for their own address.

The override is not silent and should not imply off-chain identity, private consent, or legal authority. It only changes how Feed adapters present public-chain activity.

## Lexicon 1 problems

The following ideas are important, but they are not Lexicon 0 promises:

- self-send governance
- reciprocation

Self-send governance is deferred until provider behavior is tested against live output.

Reciprocation is deferred because it should be a later relationship pass over existing events, not a raw activity type emitted by the first provider adapter.

```json
{
  "activity_type": "transfer",
  "relationship_status": "none"
}
```

Future relationship statuses may include:

- `open`
- `reciprocated`

## Static-first delivery

The first public Feed should not require a dyno or REST API.

The robot can write canonical events as JSON or JSONL. A static explorer can read the generated files.

```text
events/latest.json
events/archive/2026-07-15.jsonl
```

Viewers should not trigger blockchain API calls. Only the robot talks to providers.

## Local fixture proof

Run:

```bash
npm run lexicon:validate
npm run feed:fixture
```

For adapter-friendly JSONL:

```bash
npm run feed:fixture:jsonl
```

The fixture provider is the first proof. Live API providers can be added after the canonical event shape is stable.
