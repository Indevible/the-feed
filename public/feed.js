const feedElement = document.querySelector("[data-feed]");
const creditElement = document.querySelector("[data-feed-credit]");
const refreshCountdownElement = document.querySelector("[data-feed-refresh-count]");
const feedEndpoint = feedElement?.dataset.feedEndpoint ?? "../events/latest.json";
const MARKET_TINT_CAP_XDEL = 100;
const FEED_REFRESH_INTERVAL_MS = 30_000;
const OFFICIAL_X_URL = "https://x.com/Indelible_XDEL";
const PROVIDER_LINKS = {
  birdeye: "https://birdeye.so/",
  coingecko: "https://www.coingecko.com/",
  geckoterminal: "https://www.geckoterminal.com/",
  helius: "https://www.helius.dev/",
  jupiter: "https://jup.ag/",
  solscan: "https://solscan.io/"
};
const TONE_TINTS = {
  love: { rgb: "178 52 68", alpha: 0.13, borderAlpha: 0.58 },
  governance: { rgb: "44 38 32", alpha: 0.15, borderAlpha: 0.74 },
  proposal_lifecycle: { rgb: "44 38 32", alpha: 0.15, borderAlpha: 0.74 },
  safety: { rgb: "181 110 32", alpha: 0.13, borderAlpha: 0.64 },
  caution: { rgb: "181 110 32", alpha: 0.13, borderAlpha: 0.64 },
  coordination: { rgb: "181 110 32", alpha: 0.13, borderAlpha: 0.64 },
  urgent: { rgb: "181 110 32", alpha: 0.13, borderAlpha: 0.64 },
  capacity: { rgb: "181 110 32", alpha: 0.13, borderAlpha: 0.64 },
  protest: { rgb: "144 64 51", alpha: 0.13, borderAlpha: 0.62 },
  provenance: { rgb: "92 64 126", alpha: 0.12, borderAlpha: 0.6 },
  resolve: { rgb: "92 64 126", alpha: 0.12, borderAlpha: 0.6 },
  human_resolution: { rgb: "92 64 126", alpha: 0.12, borderAlpha: 0.6 },
  oracle: { rgb: "76 70 152", alpha: 0.12, borderAlpha: 0.58 },
  oracle_answer: { rgb: "76 70 152", alpha: 0.12, borderAlpha: 0.58 },
  control: { rgb: "72 69 63", alpha: 0.1, borderAlpha: 0.52 },
  feed_preference: { rgb: "72 69 63", alpha: 0.1, borderAlpha: 0.52 },
  boundary: { rgb: "72 69 63", alpha: 0.1, borderAlpha: 0.52 },
  identity: { rgb: "47 42 35", alpha: 0.1, borderAlpha: 0.52 },
  useful: { rgb: "72 92 112", alpha: 0.1, borderAlpha: 0.52 },
  social: { rgb: "187 118 67", alpha: 0.09, borderAlpha: 0.44 },
  social_action: { rgb: "187 118 67", alpha: 0.09, borderAlpha: 0.44 },
  soft: { rgb: "184 94 118", alpha: 0.1, borderAlpha: 0.46 },
  symbolic_expression: { rgb: "184 94 118", alpha: 0.1, borderAlpha: 0.46 },
  presence: { rgb: "171 129 58", alpha: 0.1, borderAlpha: 0.46 },
  playful: { rgb: "129 54 164", alpha: 0.11, borderAlpha: 0.52 },
  degen: { rgb: "129 54 164", alpha: 0.11, borderAlpha: 0.52 },
  market_expression: { rgb: "129 54 164", alpha: 0.11, borderAlpha: 0.52 },
  bullish: { rgb: "43 126 73", alpha: 0.13, borderAlpha: 0.62 },
  bearish: { rgb: "158 63 54", alpha: 0.13, borderAlpha: 0.62 }
};

let currentFeedSignature = null;
let feedRefreshTimer = null;
let feedCountdownTimer = null;
let nextFeedRefreshAt = null;
let isFeedLoading = false;
let hasRenderedFeed = false;

function formatRefreshCount(milliseconds) {
  const seconds = Math.max(0, Math.ceil(milliseconds / 1000));
  return String(seconds).padStart(2, "0");
}

function renderFeedCountdown() {
  if (!refreshCountdownElement || !nextFeedRefreshAt) return;
  refreshCountdownElement.textContent = formatRefreshCount(nextFeedRefreshAt - Date.now());
}

function resetFeedCountdown() {
  nextFeedRefreshAt = Date.now() + FEED_REFRESH_INTERVAL_MS;
  renderFeedCountdown();
}

function stopFeedCountdown() {
  if (!feedCountdownTimer) return;
  window.clearInterval(feedCountdownTimer);
  feedCountdownTimer = null;
}

function startFeedCountdown() {
  if (document.hidden || feedCountdownTimer) return;
  renderFeedCountdown();
  feedCountdownTimer = window.setInterval(renderFeedCountdown, 1000);
}

function titleCase(value) {
  return String(value ?? "")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function casualCase(value) {
  return String(value ?? "")
    .split(" ")
    .map((word) => {
      if (word === "I" || /^[A-Z0-9]{2,}$/.test(word)) return word;
      return word.charAt(0).toLowerCase() + word.slice(1);
    })
    .join(" ");
}

function formatTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) return "Unknown time";

  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(date);
}

function describeParty(party) {
  return party?.display_name ?? "unknown";
}

function eventClass(event) {
  const classes = [];

  if (event.activity_type === "buy" || event.activity_type === "sell" || event.activity_type === "swap") {
    classes.push("is-market", `is-${event.activity_type}`);
  } else if (event.lexicon?.meaning) {
    classes.push("is-signal");
  }

  return classes.join(" ");
}

function isLoveSignal(meaning) {
  return /love|heart|kiss|hug|miss/i.test(meaning?.label ?? "");
}

function eventDescriptor(event) {
  const meaning = event.lexicon?.meaning;
  const activity = titleCase(event.activity_type);

  if (!meaning) return `${activity} Factual`;
  if (meaning.category === "governance") return `${activity} Vote`;
  if (meaning.category === "proposal_lifecycle") return `${activity} Proposal`;
  if (meaning.category === "social_action") return `${activity} Gesture`;
  if (meaning.category === "feed_preference") return `${activity} Control`;
  if (meaning.category === "market_expression") return `${activity} Market`;
  if (meaning.category === "oracle_answer") return `${activity} Oracle`;

  return `${activity} ${titleCase(meaning.category)}`;
}

function platformFor(event) {
  const market = event.parties?.market;
  if (market) {
    const key = market.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return {
      className: `platform-${key}`,
      icon: market
        .split(/[^a-z0-9]+/i)
        .filter(Boolean)
        .map((part) => part[0])
        .join("")
        .slice(0, 3)
        .toUpperCase(),
      label: market
    };
  }

  if (event.network === "solana") {
    return {
      className: "platform-solana",
      icon: "SOL",
      label: "Solana"
    };
  }

  return {
    className: "platform-chain",
    icon: "ON",
    label: titleCase(event.network ?? "chain")
  };
}

function providerLabel(value) {
  if (!value) return "local fixture";
  return String(value)
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function providerUrl(value) {
  const key = String(value ?? "").toLowerCase().replace(/[^a-z0-9]+/g, "");
  return PROVIDER_LINKS[key] ?? null;
}

function eventTitle(event) {
  return casualCase(event.lexicon?.meaning?.label ?? titleCase(event.activity_type));
}

function eventScopeLabel(event) {
  if (event.lexicon?.meaning?.scope === "aoe") return "AOE";
  return null;
}

function shouldShowOfficialProposalLink(event) {
  return event.lexicon?.meaning?.proposal?.action === "open";
}

function eventMeta(event) {
  const sender = describeParty(event.parties?.sender);
  const recipient = describeParty(event.parties?.recipient);
  const amount = `${event.amount?.exact ?? "0"} ${event.token?.symbol ?? "XDEL"}`;
  const when = formatTime(event.occurred_at);

  if (event.parties?.market) {
    return `${sender} sent it through ${event.parties.market} with ${amount} / ${when}`;
  }

  if (recipient !== "unknown") {
    return `${sender} sent ${amount} to ${recipient} / ${when}`;
  }

  return `${sender} moved ${amount} / ${when}`;
}

function marketDirectionTint(event) {
  if (event.activity_type !== "buy" && event.activity_type !== "sell") return null;

  const amount = Number.parseFloat(event.amount?.exact ?? event.amount?.base_amount ?? "0");
  if (!Number.isFinite(amount) || amount <= 0) return null;

  const percent = Math.min(amount / MARKET_TINT_CAP_XDEL, 1);
  const strength = Math.sqrt(percent);

  return {
    rgb: event.activity_type === "buy" ? "43 126 73" : "158 63 54",
    alpha: (0.04 + strength * 0.16).toFixed(3),
    borderAlpha: (0.34 + strength * 0.36).toFixed(3)
  };
}

function lexiconTint(event) {
  const meaning = event.lexicon?.meaning;

  if (!meaning) return marketDirectionTint(event);
  if (meaning.category === "market_expression") return marketDirectionTint(event) ?? TONE_TINTS.degen;
  if (meaning.category === "governance" || meaning.category === "proposal_lifecycle") {
    return TONE_TINTS.governance;
  }
  if (isLoveSignal(meaning)) return TONE_TINTS.love;
  if (meaning.tone === "warm") return TONE_TINTS.love;
  if (meaning.category === "social_action") return TONE_TINTS.social;
  if (meaning.category === "oracle_answer") return TONE_TINTS.oracle;
  if (meaning.category === "feed_preference") return TONE_TINTS.control;

  return TONE_TINTS[meaning.tone] ?? TONE_TINTS[meaning.category] ?? null;
}

function renderEvent(event) {
  const article = document.createElement("article");
  article.className = `feed-event ${eventClass(event)}`.trim();

  const tint = lexiconTint(event);
  if (tint) {
    article.style.setProperty("--event-tint-rgb", tint.rgb);
    article.style.setProperty("--event-tint-alpha", tint.alpha);
    article.style.setProperty("--event-border-alpha", tint.borderAlpha);
  }

  const platform = platformFor(event);
  const platformBadge = document.createElement("span");
  platformBadge.className = `platform-badge ${platform.className}`;
  platformBadge.title = platform.label;

  const platformIcon = document.createElement("span");
  platformIcon.className = "platform-icon";
  platformIcon.textContent = platform.icon;

  const platformLabel = document.createElement("span");
  platformLabel.className = "platform-label";
  platformLabel.textContent = platform.label;

  platformBadge.append(platformIcon, platformLabel);

  const title = document.createElement("h2");
  title.textContent = eventTitle(event);

  if (shouldShowOfficialProposalLink(event)) {
    const officialLink = document.createElement("a");
    officialLink.className = "event-official-link";
    officialLink.href = OFFICIAL_X_URL;
    officialLink.target = "_blank";
    officialLink.rel = "noopener noreferrer";
    officialLink.textContent = "check official";
    title.append(" ", officialLink);
  }

  const scopeLabel = eventScopeLabel(event);
  if (scopeLabel) {
    const scope = document.createElement("span");
    scope.className = "event-scope";
    scope.textContent = scopeLabel;
    title.append(" ", scope);
  }

  const meta = document.createElement("p");
  meta.className = "event-meta";
  meta.textContent = eventMeta(event);

  const subline = document.createElement("p");
  subline.className = "event-subline";

  const eventSignal = document.createElement("span");
  eventSignal.className = "event-signal";

  const descriptor = document.createElement("span");
  descriptor.className = "event-descriptor";
  descriptor.textContent = eventDescriptor(event);

  const code = document.createElement("span");
  code.className = "event-code";
  code.textContent = event.lexicon?.code ?? event.amount?.signal_field ?? "no-code";

  eventSignal.append(descriptor, code);

  const eventTools = document.createElement("span");
  eventTools.className = "event-tools";

  const source = document.createElement("a");
  source.className = "event-source";
  source.href = event.source?.url ?? "#";
  source.target = "_blank";
  source.rel = "noopener noreferrer";
  source.textContent = "Source";

  eventTools.append(platformBadge, source);
  subline.append(eventSignal, eventTools);
  article.append(title, meta, subline);
  return article;
}

function renderError() {
  feedElement.replaceChildren();
  const article = document.createElement("article");
  article.className = "feed-event";
  const label = document.createElement("p");
  label.className = "event-label";
  label.textContent = "Offline";
  const title = document.createElement("h2");
  title.textContent = "No Feed file found.";
  const meta = document.createElement("p");
  meta.className = "event-meta";
  meta.textContent = "Run the static Feed build, then refresh this page.";
  article.append(label, title, meta);
  feedElement.append(article);
}

function renderCredit(payload, events) {
  if (!creditElement) return;

  const provider = payload.provider ?? events.find((event) => event.provider)?.provider ?? "fixture";
  const explicitUrl = payload.provider_url ?? payload.provider_homepage;
  const url = explicitUrl ?? providerUrl(provider);
  const label = providerLabel(provider);

  creditElement.replaceChildren("Feed source: ");

  if (!url || provider === "fixture") {
    creditElement.append(label);
    return;
  }

  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = label;
  creditElement.append(link);
}

function feedSignature(payload, events) {
  const provider = Array.isArray(payload) ? null : payload.provider ?? null;
  return JSON.stringify({
    provider,
    events: events.map((event) => [
      event.event_id,
      event.occurred_at,
      event.source?.signature,
      event.lexicon?.code,
      event.amount?.exact
    ])
  });
}

async function loadFeed({ silent = false } = {}) {
  if (isFeedLoading) return;

  isFeedLoading = true;

  try {
    const response = await fetch(feedEndpoint, { cache: "no-store" });
    if (!response.ok) throw new Error(`Feed request failed: ${response.status}`);
    const payload = await response.json();
    const events = Array.isArray(payload) ? payload : payload.events ?? [];
    const nextSignature = feedSignature(payload, events);

    if (nextSignature !== currentFeedSignature) {
      feedElement.replaceChildren(...events.map(renderEvent));
      renderCredit(payload, events);
      currentFeedSignature = nextSignature;
      hasRenderedFeed = true;
    }
  } catch {
    if (!silent && !hasRenderedFeed) renderError();
  } finally {
    isFeedLoading = false;
  }
}

function stopFeedRefresh() {
  if (!feedRefreshTimer) return;
  window.clearInterval(feedRefreshTimer);
  feedRefreshTimer = null;
  stopFeedCountdown();
}

function startFeedRefresh() {
  if (document.hidden || feedRefreshTimer) return;
  resetFeedCountdown();
  startFeedCountdown();
  feedRefreshTimer = window.setInterval(() => {
    resetFeedCountdown();
    loadFeed({ silent: true });
  }, FEED_REFRESH_INTERVAL_MS);
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopFeedRefresh();
    return;
  }

  loadFeed({ silent: true });
  startFeedRefresh();
});

loadFeed().then(startFeedRefresh);
