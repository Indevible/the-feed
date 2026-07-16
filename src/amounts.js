export function atomicToDecimalString(amountAtomic, decimals) {
  const raw = String(amountAtomic);
  if (!/^\d+$/.test(raw)) {
    throw new Error(`Invalid atomic amount: ${amountAtomic}`);
  }

  const padded = raw.padStart(decimals + 1, "0");
  const whole = padded.slice(0, -decimals);
  const fractional = padded.slice(-decimals);
  return `${whole}.${fractional}`;
}

export function parseSignalField(amount, decimals = 6) {
  const value = String(amount);
  if (!/^\d+\.\d+$/.test(value)) {
    throw new Error(`Amount must be a decimal string: ${amount}`);
  }

  const [whole, fraction] = value.split(".");
  const paddedFraction = fraction.padEnd(decimals, "0").slice(0, decimals);
  const signalField = paddedFraction.slice(0, 5);
  const sixthDecimal = paddedFraction[5] ?? "0";

  return {
    amount: `${whole}.${paddedFraction}`,
    base_amount: whole,
    signal_field: signalField,
    sixth_decimal: sixthDecimal
  };
}

export function isCompactMarketField(signalField) {
  return /^0\d{2}00$/.test(signalField);
}
