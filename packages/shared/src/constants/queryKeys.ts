const baseKey = "kylix";

interface Balance {
  address: string | undefined;
  assetId: number | undefined;
}

export const queryKeys = {
  accounts: [baseKey, "wallet-modal", "accounts"],
  activeAccount: [baseKey, "wallet-modal", "active-account"],
  connectionRequest: [baseKey, "wallet-modal", "connection-request"],
  config: [baseKey, "wallet-modal", "config"],
  status: [baseKey, "wallet-modal", "status"],
  connector: [baseKey, "wallet-modal", "connector"],
  disconnectRequest: [baseKey, "wallet-modal", "disconnect-request"],
  options: [baseKey, "onchain", "options"],
  provider: [baseKey, "onchain", "provider"],
  lendingPools: [baseKey, "onchain", "lendingPools"],
  assets: (assetId: number) => [baseKey, "onchain", assetId],
  metadata: (assetId: number) => [baseKey, "onchain", assetId],
  balance: ({ address, assetId }: Balance) => [
    baseKey,
    "onchain",
    address,
    assetId,
  ],
};
