interface AssetType {
    id: string;
    name: string;
    description: string;
    icon: string;
    iconColor: string;
    bgColor: string;
  }
  
  export const assetTypes: AssetType[] = [
    {
      id: "stock-etf",
      name: "Stock/ETF",
      description: "Publicly traded companies and funds.",
      icon: "📈",
      iconColor: "#3B82F6",
      bgColor: "#EBF4FF",
    },
    {
      id: "gold",
      name: "Gold",
      description: "Precious metals and commodities.",
      icon: "💰",
      iconColor: "#D97706",
      bgColor: "#FEF9E7",
    },
    {
      id: "fixed-income",
      name: "Fixed Income",
      description: "Bonds, CDs, and debt instruments.",
      icon: "🏛️",
      iconColor: "#059669",
      bgColor: "#ECFDF5",
    },
    {
      id: "real-estate",
      name: "Real Estate",
      description: "Residential or commercial properties.",
      icon: "🏠",
      iconColor: "#EA580C",
      bgColor: "#FFF4ED",
    },
    {
      id: "cash",
      name: "Cash",
      description: "Savings, checking, or emergency funds.",
      icon: "💵",
      iconColor: "#3B82F6",
      bgColor: "#EBF4FF",
    },
    {
      id: "physical-asset",
      name: "Physical Asset",
      description: "Collectibles, vehicles, or art.",
      icon: "🚗",
      iconColor: "#9333EA",
      bgColor: "#F5F3FF",
    },
  ];
  
  export default AssetType;