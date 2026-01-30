import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useTheme } from "@/contexts/theme-context";
import { useUserPreferences } from "@/contexts/user-preferences-context";
import { formatCurrency } from "@/utils/formatCurrency";
import Asset from "@/models/assets";

interface HoldingsListProps {
  holdings: Asset[];
}

export default function HoldingsList({ holdings }: HoldingsListProps) {
  const { colors } = useTheme();
  const { baseCurrency } = useUserPreferences();

  function handleSeeAll() {
    // TODO: Navigate to full holdings list
    console.log("See all holdings pressed");
  }

  function handleHoldingPress(symbol: string) {
    // TODO: Navigate to holding detail
    console.log(`Holding ${symbol} pressed`);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Holdings</Text>
        <TouchableOpacity onPress={handleSeeAll}>
          <Text style={[styles.seeAllText, { color: colors.primary }]}>
            See all
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.list}>
        {holdings.map((holding, index) => {
          const isPositive = holding.changeAmount >= 0;
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.holdingItem,
                { backgroundColor: colors.surfaceSecondary },
              ]}
              onPress={() => handleHoldingPress(holding.symbol)}
              activeOpacity={0.7}
            >
              <View style={styles.leftSection}>
                <View
                  style={[
                    styles.symbolBadge,
                    { backgroundColor: holding.bgColor + "20" },
                  ]}
                >
                  <Text
                    style={[
                      styles.symbolText,
                      { color: holding.foregroundColor },
                    ]}
                  >
                    {holding.symbol}
                  </Text>
                </View>
                <View>
                  <Text style={[styles.name, { color: colors.text }]}>
                    {holding.name}
                  </Text>
                  <Text
                    style={[styles.shares, { color: colors.textSecondary }]}
                  >
                    {holding.shares} {holding.units}
                  </Text>
                </View>
              </View>

              <View style={styles.rightSection}>
                <Text style={[styles.value, { color: colors.text }]}>
                  {formatCurrency(holding.value, baseCurrency ?? "USD")}
                </Text>
                <Text
                  style={[
                    styles.change,
                    { color: isPositive ? colors.success : colors.error },
                  ]}
                >
                  {isPositive ? "+" : ""}
                  {formatCurrency(
                    Math.abs(holding.changeAmount),
                    baseCurrency ?? "USD"
                  )}{" "}
                  ({isPositive ? "+" : ""}
                  {holding.changePercentage.toFixed(2)}%)
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: "600",
  },
  list: {
    gap: 12,
  },
  holdingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  symbolBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  symbolText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  shares: {
    fontSize: 12,
  },
  rightSection: {
    alignItems: "flex-end",
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },
  change: {
    fontSize: 12,
    fontWeight: "600",
  },
});
