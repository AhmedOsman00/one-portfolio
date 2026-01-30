interface AssetType {
  id: string;
  name: string;
  description: string;
  icon: string;
  iconColor: string;
  bgColor: string;
}

export const STOCK_ETF: AssetType = {
  id: "stock-etf",
  name: "Stock/ETF",
  description: "Publicly traded companies and funds.",
  icon: "📈",
  iconColor: "#3B82F6",
  bgColor: "#EBF4FF",
};

export const GOLD: AssetType = {
  id: "gold",
  name: "Gold",
  description: "Precious metals and commodities.",
  icon: "💰",
  iconColor: "#D97706",
  bgColor: "#FEF9E7",
};

export const FIXED_INCOME: AssetType = {
  id: "fixed-income",
  name: "Fixed Income",
  description: "Bonds, CDs, and debt instruments.",
  icon: "🏛️",
  iconColor: "#059669",
  bgColor: "#ECFDF5",
};

export const REAL_ESTATE: AssetType = {
  id: "real-estate",
  name: "Real Estate",
  description: "Residential or commercial properties.",
  icon: "🏠",
  iconColor: "#EA580C",
  bgColor: "#FFF4ED",
};

export const CASH: AssetType = {
  id: "cash",
  name: "Cash",
  description: "Savings, checking, or emergency funds.",
  icon: "💵",
  iconColor: "#3B82F6",
  bgColor: "#EBF4FF",
};

export const PHYSICAL_ASSET: AssetType = {
  id: "physical-asset",
  name: "Physical Asset",
  description: "Collectibles, vehicles, or art.",
  icon: "🚗",
  iconColor: "#9333EA",
  bgColor: "#F5F3FF",
};

export const CRYPTO: AssetType = {
  id: "crypto",
  name: "Crypto",
  description: "Cryptocurrencies and digital assets.",
  icon: "₿",
  iconColor: "#F97316",
  bgColor: "#FFF7ED",
};

export const assetTypes: AssetType[] = [
  STOCK_ETF,
  GOLD,
  FIXED_INCOME,
  REAL_ESTATE,
  CASH,
  PHYSICAL_ASSET,
  CRYPTO,
];

export default AssetType;
