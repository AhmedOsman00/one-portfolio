import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@/contexts/theme-context";
import OnboardingFooter from "./components/footer";
import OnboardingContainer from "./components/container";
import { assets } from "../../models/assets";
import { formatCurrency } from "@/utils/formatCurrency";

export default function TrackAllTab() {
  const { colors } = useTheme();

  return (
    <OnboardingContainer>
      {/* Phone Mockup */}
      <View style={styles.phoneMockup}>
        {/* Status Bar */}
        <View style={styles.statusBar}>
          <Text style={styles.statusTime}>9:41</Text>
          <View style={styles.statusIcons}>
            <Text style={styles.statusIcon}>▲</Text>
            <Text style={styles.statusIcon}>≈</Text>
            <Text style={styles.statusIcon}>▮</Text>
          </View>
        </View>

        {/* Portfolio Content */}
        <View style={styles.mockupContent}>
          <Text style={styles.mockupLabel}>Total Balance</Text>
          <View style={styles.mockupHeader}>
            <Text style={styles.mockupValue}>$42,850.12</Text>
            <View style={styles.mockupBadge}>
              <Text style={styles.mockupBadgeText}>+12.4%</Text>
            </View>
          </View>

          {/* Bar Chart */}
          <View style={styles.barChartContainer}>
            {[40, 60, 45, 90, 55, 80].map((height, index) => (
              <View
                key={index}
                style={[
                  styles.bar,
                  {
                    height: `${height}%`,
                    backgroundColor:
                      index === 3
                        ? colors.primary
                        : `rgba(30, 63, 174, ${0.4 + index * 0.1})`,
                  },
                ]}
              />
            ))}
          </View>

          {/* Asset List */}
          <View style={styles.assetList}>
            {assets.map((asset) => (
              <View key={asset.id} style={styles.assetRow}>
                <View style={styles.assetLeft}>
                  <View
                    style={[
                      styles.assetIcon,
                      { backgroundColor: asset.bgColor },
                    ]}
                  >
                    <Text
                      style={[
                        styles.assetEmoji,
                        { color: asset.foregroundColor },
                      ]}
                    >
                      {asset.symbol}
                    </Text>
                  </View>
                  <Text style={styles.assetName}>{asset.name}</Text>
                </View>
                <Text style={styles.assetValue}>
                  {formatCurrency(asset.value)}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <OnboardingFooter
        title="Track All Your Investments in One Place"
        description="Stocks, crypto, real estate, bonds — everything in one powerful dashboard."
      />
    </OnboardingContainer>
  );
}

const styles = StyleSheet.create({
  phoneMockup: {
    width: 280,
    aspectRatio: 15 / 25,
    backgroundColor: "#1A1F2E",
    borderRadius: 48,
    borderWidth: 6,
    borderColor: "#2D364D",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 20,
  },
  statusBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 12,
    height: 28,
  },
  statusTime: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  statusIcons: {
    flexDirection: "row",
    gap: 4,
  },
  statusIcon: {
    color: "#FFFFFF",
    fontSize: 10,
  },
  mockupContent: {
    padding: 16,
    flex: 1,
  },
  mockupLabel: {
    color: "#9CA3AF",
    fontSize: 10,
    marginBottom: 4,
  },
  mockupHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  mockupValue: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
  },
  mockupBadge: {
    backgroundColor: "rgba(16, 185, 129, 0.2)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  mockupBadgeText: {
    color: "#10B981",
    fontSize: 10,
    fontWeight: "600",
  },
  barChartContainer: {
    height: 100,
    backgroundColor: "rgba(30, 63, 174, 0.1)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(30, 63, 174, 0.2)",
    padding: 12,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 16,
  },
  bar: {
    width: 12,
    borderRadius: 4,
  },
  assetList: {
    gap: 8,
  },
  assetRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 8,
    borderRadius: 8,
  },
  assetLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  assetIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  assetEmoji: {
    fontSize: 12,
  },
  assetName: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "500",
  },
  assetValue: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "500",
  },
});
