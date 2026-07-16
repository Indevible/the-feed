export const XDEL_MINT = "CA2BuDpdxzuwxmoqnW37tPsYhEGhBjEjURa4oLD9pump";
export const XDEL_DECIMALS = 6;
export const SCHEMA_VERSION = "0.1";

export const SOURCE_URLS = {
  solana: {
    transaction(signature) {
      return `https://solscan.io/tx/${signature}`;
    }
  }
};
