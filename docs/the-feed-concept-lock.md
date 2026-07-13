# The Feed — Concept Lock Specification

**Status:** Working concept lock  
**Project:** Indelible / XDEL  
**Repository:** `Indevible/the-feed`

This document records the current agreed direction for The Feed before implementation begins.

## 1. Foundational thesis

Digital transactions preserve movement but often lose human meaning.

Indelible exists to help restore the interaction inside digital transactions.

> The transaction carries value. Spendspeak carries intent.

> The chain records the movement. The Feed restores the interaction.

The Feed does not create conventional token utility. It interprets activity that already exists and gives it a legible social layer.

## 2. The Feed

The Feed is a public, read-only interpretation layer for XDEL activity.

It observes public XDEL transactions, normalizes them into canonical events, checks their amounts against a versioned Spendspeak lexicon, and presents the results as a live public stream.

The first Feed is an ivory page aligned with `xdel.net`. It begins compactly and expands to show the most recent 100 XDEL events.

The Feed is temporary, contextual, expressive, and allowed to scroll away. It is not the durable reputation layer.

## 3. Initial event coverage

The first implementation should be designed to recognize:

- wallet-to-wallet transfer;
- buy;
- sell;
- swap;
- reciprocal return.

Ordinary activity remains factual when no code is detected.

Recognized activity receives an expressive interpretation while preserving the raw transaction as the authoritative record.

## 4. Spendspeak

Spendspeak is adaptive transactional slang encoded in XDEL amounts and translated by The Feed.

It is a compact expressive layer for:

- greetings;
- acknowledgment;
- humor;
- affection;
- support;
- sass;
- reactions;
- celebration;
- urgency;
- degen culture;
- market theater;
- simple governance signals later.

It must remain inexpensive to use.

A person may send a tiny coded amount or append Spendspeak to a real transaction.

Example:

`105.00143 XDEL`

Possible interpretation:

- economic value: `105 XDEL`;
- appended code: `143`;
- expression: `I love you`.

The exact parsing grammar remains open for negotiation and collision testing.

## 5. Contextual languages

Meaning depends on context.

### Direct transaction language

A wallet sends XDEL directly to another wallet. The amount may carry a social expression.

### Reciprocal language

The recipient later responds with another coded transfer.

The response may repeat the original code, answer with another code, complete a Veme, or resurface an older interaction.

Reciprocity is interaction, not obligation.

An unanswered gesture may scroll away without being labeled rejected, ignored, failed, or incomplete.

### Market language

A buy, sell, or swap may carry a coded expression.

Direction is part of the meaning. A buy carrying a code may perform differently from a sell carrying the same code.

The final taxonomy—Veme, Exeme, Trademe, or other classes—remains open until the context rules are settled.

## 6. Vemes

A Veme is currently understood as a coded expressive interaction carried by XDEL activity.

A one-way coded transfer may appear as an open gesture.

A reciprocal response may create a completed Veme.

Vemes are lightweight, playful, public, cheap, contextual, and allowed to fade from attention.

They are not permanent reputation statements.

## 7. Durable systems remain separate

The Feed must not own durable Vouch mechanics.

Vouches, standing, clout, reputation, recognition, and any future Steed system belong in separate components or repositories.

> The Feed interprets the moment. Indelible preserves the standing.

The Feed may eventually display references to durable records, but it must not define their permanence or rules.

## 8. Live Feed behavior

The first web Feed should:

- use the established ivory visual language;
- show newest activity first;
- begin with a compact recent view;
- expand to the most recent 100 events;
- show ordinary activity factually;
- embellish recognized Spendspeak activity;
- link each event to its public source transaction;
- use readable identities where available;
- fall back to a consistent shortened wallet address;
- resurface later reciprocal completion;
- clearly separate transaction facts from interpretation.

Suggested priority:

1. completed reciprocal interactions;
2. recognized coded events;
3. notable XDEL activity;
4. ordinary transfers, buys, sells, and swaps.

## 9. Canonical event model

The Feed must interpret once and publish anywhere.

The core service produces one canonical event. Every platform adapter consumes that same event.

A canonical event should eventually include:

- schema version;
- event ID;
- event class;
- transaction context;
- exact token amount;
- parsed base amount;
- detected code;
- lexicon version;
- interpreted meaning;
- sender identity;
- recipient or market identity;
- reciprocity status;
- linked event ID;
- source transaction signature;
- source URL;
- timestamp;
- interpretation confidence;
- rendering template key.

The exact schema remains open.

## 10. Lexicon architecture

Spendspeak must live in versioned JSON.

Meanings must not be hard-coded into the website or adapters.

Each lexicon entry should eventually define:

- code;
- slug;
- label;
- meaning;
- category;
- valid contexts;
- valid directions;
- public visibility;
- reciprocity behavior;
- media-pack reference;
- status;
- introduction version;
- deprecation version if applicable;
- moderation classification;
- historical origin where useful.

Old transactions must retain the interpretation active when they occurred.

Schema version and lexicon version remain separate.

## 11. Foundational vocabulary goals

The first language should be compact but balanced.

Initial categories should include:

- greetings and presence;
- acknowledgment;
- thanks;
- respect;
- affection;
- humor;
- disbelief;
- sass;
- apology;
- support;
- urgency;
- agreement;
- disagreement;
- celebration;
- challenge;
- yes;
- no;
- abstain;
- seen;
- reply;
- degen actions;
- market theater.

Candidate concepts discussed include:

- GM;
- GN;
- LOL;
- respect;
- seen;
- reply;
- based;
- cope;
- yeet;
- sweep;
- dump;
- send it;
- load;
- fade;
- rekt;
- bullish;
- bearish;
- yay;
- nay;
- abstain;
- heed;
- need.

The exact codes remain unsettled.

## 12. Media packs

Each supported expression may have a versioned media pack containing some combination of:

- canonical label;
- caption;
- emoji;
- PNG;
- GIF;
- sticker;
- Lottie animation;
- short animation;
- platform-specific variants;
- reciprocal-state variant;
- governance-state variant.

The canonical event references a media key. Each adapter selects the approved asset suited to its platform.

The code means the same thing everywhere. The performance may differ.

## 13. Adapter architecture

The Feed must be designed for broad distribution from the beginning.

> Interpret once. Publish anywhere.

The website is the first adapter, not the definition of The Feed.

Conceptual adapters include:

- **Indeligram** — Telegram;
- **Indiscible** — Discord;
- **Indelixible** — X;
- **Indelimeta** — Meta/Facebook;
- **Indeddible** — Reddit;
- **Indelorum** — traditional forums.

Adapters may change presentation, filtering, and formatting.

Adapters may not change meaning, reciprocity, event identity, source facts, or historical interpretation.

## 14. Read-only and non-custodial boundary

The Feed must not:

- hold keys;
- request signatures;
- move XDEL;
- automate custody;
- control treasury wallets;
- execute trades;
- create Vouches;
- assign permanent reputation;
- create negative standing records.

Its speed and playfulness are possible because it owns neither funds nor permanence.

## 15. Future Spendspeak composer

After the working Feed, the next likely product is a Spendspeak phrasebook and transaction calculator.

It may:

- let a user choose an expression;
- select a transaction context;
- enter a base amount;
- append the correct code;
- preview the exact XDEL amount;
- show whether The Feed will amplify it;
- reduce decimal mistakes;
- expose the larger language without requiring memorization.

The composer is optional. People should be able to learn a small set and transact manually with tiny amounts.

A quiet marker may eventually let official Feed adapters ignore a coded transaction without implying blockchain privacy.

> Hidden from The Feed is not hidden from the chain.

Spendspeak is the language. The final product name of the composer remains open.

## 16. Future governance

Governance may later use the same transaction-language principles.

A proposal could define an active context and allow eligible wallets to send canonical YAY, NAY, ABSTAIN, HEED, NEED, SUPPORT, or OPPOSE signals.

A random matching transaction must never be counted as a vote.

Governance changes to the lexicon must be prospective and versioned.

Governance is not required for the first Feed.

## 17. Public interpretation boundaries

The Feed interprets public activity. It does not prove private intent.

A numeric match may be accidental.

The Feed must not become:

- a blacklist;
- an accusation system;
- a cancellation archive;
- a threat amplifier;
- a self-harm meme renderer;
- a negative reputation score;
- a price-promotion service.

Some historical codes may be retained as research but excluded from public rendering.

## 18. Initial build objective

The first working objective is:

1. read the latest public XDEL activity;
2. normalize transfers, buys, sells, and supported swaps;
3. produce canonical Feed events;
4. display them on a live ivory page;
5. begin with a compact recent view;
6. expand to the latest 100 events;
7. check each amount against a versioned draft Spendspeak JSON bundle;
8. embellish recognized events;
9. leave ordinary activity factual;
10. link each event to its source transaction;
11. preserve adapter-ready output from the beginning.

## 19. Locked concepts

The following are currently locked at the concept level:

- The Feed is read-only.
- The Feed is public.
- The Feed is temporary and contextual.
- The Feed visually aligns with `xdel.net`.
- It begins small and expands to the latest 100 events.
- It observes transfers, buys, sells, swaps, and reciprocal activity.
- Spendspeak is adaptive transactional slang.
- Spendspeak meaning lives in versioned JSON.
- Economic value and expression may coexist in one amount.
- Reciprocity creates richer interaction.
- Historical lexicons remain readable.
- The translator produces one canonical event for all adapters.
- Adapters change presentation, not meaning.
- Durable Vouch and Steed systems remain separate.
- The project is interaction-first, not price-first.
- No custody or signing belongs in The Feed.

## 20. Open decisions before implementation

These remain open:

- exact suffix grammar;
- marker design;
- decimal normalization;
- code-length limits;
- collision handling;
- token-precision constraints;
- buy, sell, and swap context detection;
- reciprocal matching rules;
- first lexicon size;
- first lexicon categories;
- canonical event schema;
- identity-resolution rules;
- quiet-marker design;
- media-pack schema;
- live data source;
- storage and replay strategy;
- moderation policy;
- first adapter after the web.

No code should silently settle these questions through implementation convenience.

## Closing

> Spendspeak makes XDEL expressive. The Feed makes expression visible.

> The transaction preserves movement. Indelible restores meaning.

> The Feed is contextual noise with cultural value. What endures belongs elsewhere.
