# SendSpeak Lexicon 0 — Grammar and Status Specification

**Status:** Experimental Lexicon 0 implementation specification  
**Project:** Indelible / The Feed  
**Lexicon version:** `0`

## Scope

Lexicon 0 supports:

- direct wallet transfers;
- reciprocal wallet transfers;
- buys;
- sells;
- swap-ins as trial behavior;
- swap-outs as trial behavior.

The Feed may display unmatched activity factually, but Lexicon 0 translates exact matches only.

## XDEL precision

XDEL supports six decimal places on-chain.

Lexicon 0 reads the first five digits after the decimal point as the SendSpeak signal field.

The sixth decimal is ignored for language interpretation but preserved in the canonical event.

Examples:

```text
12.001430 → field 00143, sixth decimal 0
12.001439 → field 00143, sixth decimal 9
```

## Exact five-digit signal field

1. Read exactly the first five fractional digits.
2. Preserve leading, interior, and trailing zeros.
3. Ignore the sixth decimal for interpretation.
4. Any five-digit field may be assigned meaning.
5. No mandatory marker is required.
6. Distinct fields remain distinct unless the lexicon explicitly defines aliases.

Examples:

```text
105.001430 → 00143
105.143000 → 14300
22.009110  → 00911
8.004040   → 00404
```

## Direct transfer profile

**Status:** `stable`

Direct wallet transfers use the full five-digit field.

A transfer is interpreted only when the exact field exists in the active transfer table.

Example:

```text
105.001430 XDEL
base amount: 105
signal field: 00143
```

## Reciprocal transfer profile

**Status:** `stable`

Reciprocal transfers use the same parser and table as direct transfers.

Reciprocity is an event relationship, not a separate lexicon.

A later valid response may:

- repeat the original code;
- answer with another transfer code;
- complete a Veme;
- resurface an earlier interaction in The Feed.

No reply is required.

## Buy profile

**Status:** `provisional`

Buys use a compact market field with this exact five-digit structure:

```text
0CC00
```

Where `CC` is a two-digit buy code from `00` through `99`.

Examples:

```text
0.021000  → buy code 21
0.077000  → buy code 77
12.042000 → buy code 42
```

Not valid:

```text
0.042990
0.042999
8.077010
```

A buy is translated only when:

1. the executed XDEL amount preserves the compact pattern exactly;
2. the two-digit code exists in the buy table;
3. the event is confidently classified as a buy.

## Sell profile

**Status:** `provisional`

Sells use the same `0CC00` structure but a separate sell table.

The same two-digit code may mean something different in a buy and a sell.

## Swap-in profile

**Status:** `trial`

Swap-ins inherit the buy table.

A swap-in is translated only when the executed XDEL amount exactly matches `0CC00`.

If slippage, routing, or fees alter the amount, the event remains factual and untranslated.

## Swap-out profile

**Status:** `trial`

Swap-outs inherit the sell table.

The same exact-match requirement applies.

## Context tables

Required tables:

```text
transfer
buy
sell
```

Inheritance:

```text
reciprocal → transfer
swap_in    → buy
swap_out   → sell
```

Context determines meaning.

## Exact-match rule

Lexicon 0 must not:

- use tolerance;
- round toward a code;
- strip meaningful zeros;
- scan arbitrary substrings;
- translate near-matches;
- reinterpret slippage-altered amounts.

Examples:

```text
00143 = exact transfer code
00142 = different code or no code
00144 = different code or no code
```

```text
02100 = valid compact market field
02099 = not code 21
02101 = not code 21
```

## Factual fallback

If no exact code matches, The Feed still displays the transaction factually.

The raw transaction remains authoritative.

## Canonical event requirements

Every event should preserve:

- exact on-chain XDEL amount;
- transaction context;
- source transaction signature;
- event or instruction index;
- timestamp;
- sender;
- recipient or market;
- five-digit signal field;
- sixth decimal;
- lexicon version;
- profile name;
- profile status;
- exact-match result;
- interpreted code, if any;
- interpreted meaning, if any;
- interpretation confidence;
- source URL.

Trial swaps should also preserve intended versus executed amounts where available.

## Recommended JSON shape

```json
{
  "lexicon_version": "0",
  "token": {
    "symbol": "XDEL",
    "mint": "CA2BuDpdxzuwxmoqnW37tPsYhEGhBjEjURa4oLD9pump",
    "decimals": 6
  },
  "profiles": {
    "transfer": {
      "status": "stable",
      "field_length": 5,
      "table": {}
    },
    "buy": {
      "status": "provisional",
      "pattern": "0CC00",
      "table": {}
    },
    "sell": {
      "status": "provisional",
      "pattern": "0CC00",
      "table": {}
    },
    "swap_in": {
      "status": "trial",
      "inherits": "buy"
    },
    "swap_out": {
      "status": "trial",
      "inherits": "sell"
    }
  }
}
```

## Historical interpretation

Every interpreted event records:

```text
lexicon_version = 0
```

Future lexicons must not silently rewrite Lexicon 0 history.

## Implementation status

```text
transfer       stable
reciprocal     stable
buy            provisional
sell           provisional
swap_in        trial
swap_out       trial
```

## Required offline tests

### Transfers

- exact match;
- no match;
- leading-zero code;
- trailing-zero code;
- different sixth decimal;
- substantive base amount;
- tiny standalone amount.

### Reciprocity

- same-code return;
- different-code return;
- late return;
- unrelated reverse transfer;
- self-transfer;
- multiple possible earlier gestures.

### Buys and sells

- exact compact match;
- invalid final interpreted digits;
- code absent from table;
- sixth-decimal variation;
- context misclassification.

### Trial swaps

- exact swap-in;
- exact swap-out;
- slippage near-miss;
- routing-altered amount;
- missing intended amount;
- ambiguous direction.

## Locked decisions

1. XDEL supports six decimals.
2. Lexicon 0 reads the first five fractional digits.
3. The sixth decimal is ignored for language interpretation.
4. Zeros are preserved exactly.
5. Any exact five-digit field may be assigned meaning.
6. Direct transfers use the full five-digit field.
7. Reciprocal transfers use the same transfer language.
8. Reciprocity is an event relationship, not a separate lexicon.
9. Buys use compact `0CC00` codes.
10. Sells use compact `0CC00` codes.
11. Buy and sell use separate tables.
12. Swap-ins inherit buy as trial behavior.
13. Swap-outs inherit sell as trial behavior.
14. Only exact matches are translated.
15. Near-matches remain factual.
16. Historical events retain Lexicon 0 interpretation.

## Open decisions

- first transfer vocabulary;
- first buy vocabulary;
- first sell vocabulary;
- code categories;
- aliases;
- public and quiet codes;
- reciprocal completion rules;
- matching window;
- media-pack keys;
- identity-resolution order;
- live data source;
- trial swap presentation;
- governance process for future lexicons.

No implementation should silently settle these questions.

## Closing rule

> Lexicon 0 translates only what it can match exactly.

> The transaction remains factual. SendSpeak is the added interpretation.
