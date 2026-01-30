import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useTheme } from "@/contexts/theme-context";
import OnboardingFooter from "./components/footer";
import OnboardingContainer from "./components/container";
import assets from "@/models/assets";
import LineChart from "@/components/line-chart";

export default function PortfolioTab() {
  const { colors } = useTheme();

  return (
    <OnboardingContainer>
      {/* Main Card */}
      <View style={styles.totalValueCard}>
        <Text style={styles.totalValueLabel}>TOTAL VALUE</Text>
        <Text style={styles.totalValueAmount}>$42,850.50</Text>
        <View style={styles.liveIndicator}>
          <Text style={styles.liveText}>Live Market</Text>
          <Text style={styles.liveChange}>+2.4%</Text>
        </View>

        {/* Line Chart */}
        <LineChart
          data={[
            { timestamp: 1704067200000, price: 150.25 },
            { timestamp: 1704153600000, price: 152.8 },
            { timestamp: 1704240000000, price: 151.5 },
            { timestamp: 1704326400000, price: 155.3 },
            { timestamp: 1704412800000, price: 158.9 },
            { timestamp: 1704499200000, price: 157.2 },
            { timestamp: 1704585600000, price: 162.45 },
          ]}
        />
      </View>

      {/* Asset Cards Grid */}
      <View style={styles.assetCardsGrid}>
        {assets
          .filter((item) => item.type === "listed")
          .map((item) => (
            <View key={item.id} style={styles.assetCard}>
              <View
                style={[
                  styles.assetCardIcon,
                  { backgroundColor: item.bgColor },
                ]}
              >
                <Text
                  style={[
                    styles.assetCardEmoji,
                    { color: item.foregroundColor },
                  ]}
                >
                  {item.symbol}
                </Text>
              </View>
              <Text style={styles.assetCardSymbol}>{item.id}</Text>
              <Text style={styles.assetCardPrice}>{item.value}</Text>
              <Text
                style={[
                  styles.assetCardChange,
                  {
                    color: item.change >= 0 ? colors.success : colors.error,
                  },
                ]}
              >
                {item.change}%
              </Text>
            </View>
          ))}
      </View>

      <OnboardingFooter
        title="Live Prices for Stocks, Gold & Crypto"
        description="Real-time data for all your holdings across global markets"
      />
    </OnboardingContainer>
  );
}

const styles = StyleSheet.create({
  totalValueCard: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    padding: 24,
  },
  totalValueLabel: {
    color: "#97A1C4",
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 8,
  },
  totalValueAmount: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "700",
    marginBottom: 8,
  },
  liveIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  liveText: {
    color: "#97A1C4",
    fontSize: 14,
  },
  liveChange: {
    color: "#0BDA62",
    fontSize: 14,
    fontWeight: "500",
  },
  assetCardsGrid: {
    width: "100%",
    flexDirection: "row",
    gap: 12,
  },
  assetCard: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 12,
    alignItems: "center",
  },
  assetCardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  assetCardEmoji: {
    fontSize: 18,
    fontWeight: "700",
  },
  assetCardSymbol: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 4,
  },
  assetCardPrice: {
    color: "#97A1C4",
    fontSize: 12,
    marginBottom: 2,
  },
  assetCardChange: {
    fontSize: 10,
    fontWeight: "700",
  },
});
