interface Asset {
  id: string;
  symbol: string;
  name: string;
  value: string;
  change: number;
  bgColor: string;
  foregroundColor: string;
  type: "listed" | "unlisted";
}

const assets: Asset[] = [
  {
    id: "BTC",
    symbol: "₿",
    name: "Bitcoin",
    value: "$64.2k",
    change: 3.2,
    bgColor: "#4A3026",
    foregroundColor: "#FA7316",
    type: "listed",
  },
  {
    id: "AAPL",
    symbol: "iOS",
    name: "Apple",
    value: "$189.4",
    change: 0.8,
    bgColor: "#243353",
    foregroundColor: "#3B82F6",
    type: "listed",
  },
  {
    id: "GOLD",
    symbol: "$",
    name: "Gold",
    value: "$2,341",
    change: -0.2,
    bgColor: "#473D24",
    foregroundColor: "#EAB308",
    type: "listed",
  },
  {
    id: "RE",
    symbol: "🏢",
    name: "Real Estate",
    value: "$12,000",
    change: 1.5,
    bgColor: "#2A3A2E",
    foregroundColor: "#10B981",
    type: "unlisted",
  },
];

export default assets;
