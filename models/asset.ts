import AssetType, { STOCK_ETF, GOLD, REAL_ESTATE, CRYPTO } from "./asset-type";

interface Asset {
  id: string;
  assetType: AssetType;
  symbol: string;
  name: string;
  shares: number;
  units: string;
  value: number;
  changeAmount: number;
  changePercentage: number;
  bgColor: string;
  foregroundColor: string;
  type: "listed" | "unlisted";
}

export const assets: Asset[] = [
  {
    id: "BTC",
    assetType: CRYPTO,
    symbol: "₿",
    name: "Bitcoin",
    shares: 10,
    units: "BTC",
    value: 64200,
    changeAmount: 3200,
    changePercentage: 3.2,
    bgColor: "#4A3026",
    foregroundColor: "#FA7316",
    type: "listed",
  },
  {
    id: "AAPL",
    assetType: STOCK_ETF,
    symbol: "iOS",
    name: "Apple",
    shares: 15,
    units: "shares",
    value: 189.45,
    changeAmount: 1.25,
    changePercentage: 0.8,
    bgColor: "#243353",
    foregroundColor: "#3B82F6",
    type: "listed",
  },
  {
    id: "GOLD",
    assetType: GOLD,
    symbol: "$",
    name: "Gold",
    value: 2341,
    shares: 10,
    units: "oz",
    changeAmount: -4.5,
    changePercentage: -0.2,
    bgColor: "#473D24",
    foregroundColor: "#EAB308",
    type: "listed",
  },
  {
    id: "RE",
    assetType: REAL_ESTATE,
    symbol: "🏢",
    name: "Real Estate",
    value: 12000,
    shares: 1,
    units: "property",
    changeAmount: 180,
    changePercentage: 1.5,
    bgColor: "#2A3A2E",
    foregroundColor: "#10B981",
    type: "unlisted",
  },
];

export default Asset;
