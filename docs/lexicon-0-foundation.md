# Lexicon 0 Foundation

Lexicon 0 is the first experimental public grammar for The Feed.

It is designed to prove the idea without pretending to be the final language. The foundation should be stable enough to build a feed, Terminal 0, and early public demonstrations around it.

## What Lexicon 0 Covers

Lexicon 0 supports four raw activity profiles:

- `transfer`
- `buy`
- `sell`
- `swap`

The first robot normalizes those events, parses the amount, and attaches a meaning when the signal field matches a known code.

## Foundational Lanes

The foundation includes these meaning lanes:

- social greetings, thanks, affection, and presence;
- transfer-only social actions: Fren, Unfren, Like, Unlike, Boost;
- symbolic and low-verbal expression;
- meme-trader buy and sell language;
- coordination signals;
- safety signals;
- protest and appeal signals;
- provenance and verification signals;
- governance stances;
- proposal choices;
- proposal lifecycle markers;
- oracle answer language for future echo-style interpreters;
- Feed presentation controls.

## What It Does Not Claim

Lexicon 0 does not create legal authority, fiduciary control, identity, private consent, platform membership, or a binding DAO.

It does not require a wallet connection beyond the transaction a user already chooses to make.

It does not hold keys, sign messages, custody funds, or deploy a smart contract.

It does not make any unrelated wallet official just because that wallet uses an official-looking code.

Officiality must come from provenance outside the bare code, such as a registered Indelible wallet, a signed statement, a published site record, or another verifiable project source.

## Governance Rules

Governance in Lexicon 0 is public participation language.

Universal stance families:

- `11` = Maybe
- `17` = No
- `18` = Yes
- `50` = Abstain

Universal proposal choices:

- `61` = Option A
- `62` = Option B
- `63` = Option C

Proposal choices are intentionally neutral. A proposal context supplies the candidates, window, eligible activity types, and tally rule.

## Social Action Rules

Social-action codes are transfer-only because they need a recipient.

- `00031` = Fren
- `00032` = Unfren
- `00033` = Like
- `00034` = Unlike
- `00035` = Boost

These are non-binding public gestures. They do not prove an off-chain relationship or require the recipient to accept anything.

## Feed Preference Rules

Feed presentation controls are transfer-only:

- `00090` = Feed On
- `00091` = Feed Off
- `00092` = Feed Invite
- `00093` = Feed Grant
- `00094` = Feed Grant Revoke

The parser can recognize language for any public event, but adapters should render conservatively.

An address can opt into language presentation with `Feed On` and return to factual-only display with `Feed Off`.

`Feed Grant` is a visible registered-sender override for managed or assisted contexts. It must remain public, revocable in presentation, and subordinate to recipient `Feed Off`.

## Lexicon 1 Problems

The following are not Lexicon 0 commitments:

- self-send governance;
- reciprocation;
- relationship scoring;
- address standing;
- oracle or echo-wallet operation;
- game interpreters;
- mediation outcomes.

Those require live provider behavior, relationship passes over multiple events, explicit policy, or additional adapters.

## Validation

Lexicon 0 must pass local validation before release:

```bash
npm run lexicon:validate
npm run feed:fixture
```

The validation script checks the foundational categories, required transfer codes, universal governance families, code shape, metadata, and compact market-code grammar.
