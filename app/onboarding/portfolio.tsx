import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useTheme } from "@/contexts/theme-context";
import Svg, { Path } from "react-native-svg";

const { width } = Dimensions.get("window");

interface Asset {
  id: string;
  symbol: string;
  name: string;
  value: string;
  change: string;
  bgColor: string;
}

const assets: Asset[] = [
  {
    id: "BTC",
    symbol: "₿",
    name: "Bitcoin",
    value: "$64.2k",
    change: "+3.2%",
    bgColor: "#8B4513",
  },
  {
    id: "AAPL",
    symbol: "iOS",
    name: "Apple",
    value: "$189.4",
    change: "+0.8%",
    bgColor: "#2C4A6B",
  },
  {
    id: "GOLD",
    symbol: "$",
    name: "Gold",
    value: "$2,341",
    change: "-0.2%",
    bgColor: "#6B6B2C",
  },
];

export default function PortfolioTab() {
  const { colors } = useTheme();

  return (
    <View style={styles.slide}>
      <View>
        {/* Portfolio Card */}
        <View
          style={[styles.portfolioCard, { backgroundColor: colors.surface }]}
        >
          <Text
            style={[styles.portfolioLabel, { color: colors.textSecondary }]}
          >
            TOTAL VALUE
          </Text>
          <Text style={[styles.portfolioValue, { color: colors.text }]}>
            $42,850.50
          </Text>

          <View style={styles.liveMarketRow}>
            <View style={styles.liveIndicator} />
            <Text
              style={[styles.liveMarketText, { color: colors.textSecondary }]}
            >
              Live Market
            </Text>
            <Text style={styles.percentagePositive}>+2.4%</Text>
          </View>

          {/* Simple Chart */}
          <View style={styles.chartContainer}>
            <Svg width="100%" height="120" viewBox="0 0 300 120">
              <Path
                d="
                    M 10 90
                    L 30 85
                    L 50 70
                    L 70 75
                    L 90 55
                    L 110 60
                    L 130 45
                    L 150 50
                    L 170 40
                    L 190 35
                    L 210 50
                    L 230 45
                    L 250 30
                    L 270 35
                    L 290 25
                    L 290 110
                    L 10 110
                    Z
                "
                fill="rgba(65, 105, 225, 0.1)"
              />

              <Path
                d="
                    M 10 90
                    L 30 85
                    L 50 70
                    L 70 75
                    L 90 55
                    L 110 60
                    L 130 45
                    L 150 50
                    L 170 40
                    L 190 35
                    L 210 50
                    L 230 45
                    L 250 30
                    L 270 35
                    L 290 25
                "
                stroke="#4169E1"
                strokeWidth={3}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </View>
        </View>

        {/* Asset Cards */}
        <View style={styles.assetsRow}>
          {assets.map((item) => (
            <View
              key={item.id}
              style={[styles.assetCard, { backgroundColor: colors.surface }]}
            >
              <View
                style={[styles.assetIcon, { backgroundColor: item.bgColor }]}
              >
                <Text style={styles.assetIconText}>{item.symbol}</Text>
              </View>
              <Text style={[styles.assetSymbol, { color: colors.text }]}>
                {item.id}
              </Text>
              <Text
                style={[styles.assetValue, { color: colors.textSecondary }]}
              >
                {item.value}
              </Text>
              <Text
                style={
                  item.change.startsWith("+")
                    ? styles.percentagePositive
                    : styles.percentageNegative
                }
              >
                {item.change}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View>
        <Text style={[styles.bottomTitle, { color: colors.text }]}>
          Live Prices for Stocks, Gold & Crypto
        </Text>
        <Text
          style={[styles.bottomDescription, { color: colors.textSecondary }]}
        >
          Real-time data for all your holdings across global markets
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    width,
  },
  portfolioCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  portfolioLabel: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1.2,
  },
  portfolioValue: {
    fontSize: 42,
    fontWeight: "bold",
  },
  liveMarketRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
  },
  liveIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00D66B",
  },
  liveMarketText: {
    fontSize: 14,
  },
  percentagePositive: {
    fontSize: 14,
    color: "#00D66B",
    fontWeight: "600",
  },
  percentageNegative: {
    fontSize: 14,
    color: "#FF3B30",
    fontWeight: "600",
  },
  chartContainer: {
    height: 100,
    marginTop: 8,
  },
  assetsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
    width: "100%",
  },
  assetCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  assetIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  assetIconText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  assetSymbol: {
    fontSize: 16,
    fontWeight: "600",
  },
  assetValue: {
    fontSize: 14,
  },
  bottomTitle: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 34,
  },
  bottomDescription: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
  },
});
