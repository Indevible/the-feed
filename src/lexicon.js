import { isCompactMarketField, parseSignalField } from "./amounts.js";

const DIRECT_PROFILE = new Set(["transfer"]);
const MARKET_PROFILE = new Set(["buy", "sell", "swap"]);

function resolveProfile(activityType, lexicon) {
  const profile = lexicon.profiles[activityType];
  if (!profile) return null;

  if (profile.inherits) {
    return {
      profile_name: activityType,
      inherited_profile_name: profile.inherits,
      profile: lexicon.profiles[profile.inherits],
      profile_status: profile.status
    };
  }

  return {
    profile_name: activityType,
    inherited_profile_name: null,
    profile,
    profile_status: profile.status
  };
}

export function interpretAmount(rawEvent, lexicon) {
  const parsed = parseSignalField(rawEvent.amount, rawEvent.token_decimals);
  const resolved = resolveProfile(rawEvent.activity_type, lexicon);

  if (!resolved) {
    return {
      ...parsed,
      profile_name: rawEvent.activity_type,
      profile_status: "unsupported",
      exact_match: false,
      code: null,
      meaning: null,
      warning: "unsupported_activity_type"
    };
  }

  const table = resolved.profile.table ?? {};
  const compactRequired = MARKET_PROFILE.has(rawEvent.activity_type);
  const compactOk = isCompactMarketField(parsed.signal_field);
  const mayTranslate =
    DIRECT_PROFILE.has(rawEvent.activity_type) || (compactRequired && compactOk);

  const entry = mayTranslate ? table[parsed.signal_field] : null;

  return {
    ...parsed,
    profile_name: resolved.profile_name,
    inherited_profile_name: resolved.inherited_profile_name,
    profile_status: resolved.profile_status,
    exact_match: Boolean(entry),
    code: entry ? parsed.signal_field : null,
    meaning: entry
      ? {
          slug: entry.slug,
          label: entry.label,
          alt_label: entry.alt_label ?? null,
          tone: entry.tone,
          visibility: entry.visibility,
          category: entry.category ?? "expression",
          scope: entry.scope ?? null,
          code_family: entry.code_family ?? null,
          emoji_key: entry.emoji_key ?? null,
          display_mode: entry.display_mode ?? "default",
          accessibility: entry.accessibility ?? null,
          social_action: entry.social_action ?? null,
          governance: entry.governance ?? null,
          proposal: entry.proposal ?? null,
          oracle: entry.oracle ?? null,
          preference: entry.preference ?? null,
          privacy_notice: entry.privacy_notice ?? null,
          source: entry.source ?? "indelible-native"
        }
      : null,
    warning: compactRequired && !compactOk ? "compact_market_pattern_miss" : null
  };
}
