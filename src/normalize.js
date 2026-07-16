import { SCHEMA_VERSION, SOURCE_URLS, XDEL_MINT } from "./constants.js";
import { interpretAmount } from "./lexicon.js";

function stableEventId(rawEvent, interpretation) {
  return [
    rawEvent.network,
    rawEvent.signature,
    rawEvent.event_index,
    "schema",
    SCHEMA_VERSION,
    "lexicon",
    interpretation.profile_name,
    interpretation.code ?? "no-code"
  ].join(":");
}

function identity(address) {
  if (!address) return null;
  return {
    address,
    display_name: shortenAddress(address),
    display_source: "address",
    verified: false
  };
}

function shortenAddress(address) {
  if (address.length <= 12) return address;
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

export function normalizeRawEvent(rawEvent, lexicon) {
  if (rawEvent.token_mint !== XDEL_MINT) {
    throw new Error(`Raw event is not XDEL: ${rawEvent.token_mint}`);
  }

  const interpretation = interpretAmount(rawEvent, lexicon);
  const eventId = stableEventId(rawEvent, interpretation);

  return {
    schema_version: SCHEMA_VERSION,
    event_id: eventId,
    provider: rawEvent.provider,
    network: rawEvent.network,
    activity_type: rawEvent.activity_type,
    relationship_status: "none",
    token: {
      symbol: "XDEL",
      mint: rawEvent.token_mint,
      decimals: rawEvent.token_decimals
    },
    amount: {
      exact: interpretation.amount,
      atomic: rawEvent.amount_atomic,
      base_amount: interpretation.base_amount,
      signal_field: interpretation.signal_field,
      sixth_decimal: interpretation.sixth_decimal
    },
    lexicon: {
      version: lexicon.lexicon_version,
      profile: interpretation.profile_name,
      inherited_profile: interpretation.inherited_profile_name,
      profile_status: interpretation.profile_status,
      exact_match: interpretation.exact_match,
      code: interpretation.code,
      meaning: interpretation.meaning,
      warning: interpretation.warning,
      confidence: interpretation.exact_match ? "grammar-match" : "factual-only"
    },
    parties: {
      sender: identity(rawEvent.sender),
      recipient: identity(rawEvent.recipient),
      market: rawEvent.market ?? null
    },
    source: {
      signature: rawEvent.signature,
      event_index: rawEvent.event_index,
      url: SOURCE_URLS[rawEvent.network]?.transaction(rawEvent.signature) ?? null
    },
    occurred_at: rawEvent.block_time
  };
}
