import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@/contexts/theme-context";
import { useUserPreferences } from "@/contexts/user-preferences-context";
import { formatCurrency } from "@/utils/formatCurrency";
import type { DbAsset } from "@/database/models/asset";
import {
  getAssetUnits,
  getAssetTypeByCategory,
  calculateAssetValue,
} from "@/database/helpers/asset-helpers";

interface HoldingsListProps {
  holdings: DbAsset[];
}

export default function HoldingsList({ holdings }: HoldingsListProps) {
  const { colors } = useTheme();
  const { baseCurrency } = useUserPreferences();

  function handleSeeAll() {
    // TODO: Navigate to full holdings list
    console.log("See all holdings pressed");
  }

  function handleHoldingPress(id: string) {
    // TODO: Navigate to holding detail
    console.log(`Holding ${id} pressed`);
  }

  if (holdings.length === 0) {
    return null;
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
        {holdings.map((holding) => {
          const assetType = getAssetTypeByCategory(holding.asset_category);
          const units = getAssetUnits(holding);
          const value = calculateAssetValue(holding);
          const icon = assetType?.icon ?? "📦";
          const iconColor = assetType?.iconColor ?? colors.primary;
          const bgColor = assetType?.bgColor ?? colors.surface;

          return (
            <TouchableOpacity
              key={holding.id}
              style={[
                styles.holdingItem,
                { backgroundColor: colors.surfaceSecondary },
              ]}
              onPress={() => handleHoldingPress(holding.id)}
              activeOpacity={0.7}
            >
              <View style={styles.leftSection}>
                <View
                  style={[styles.symbolBadge, { backgroundColor: bgColor }]}
                >
                  <Text style={[styles.symbolText, { color: iconColor }]}>
                    {icon}
                  </Text>
                </View>
                <View>
                  <Text style={[styles.name, { color: colors.text }]}>
                    {holding.name}
                  </Text>
                  <Text
                    style={[styles.shares, { color: colors.textSecondary }]}
                  >
                    {holding.type === "custom"
                      ? "Custom"
                      : `${holding.quantity} ${units}`}
                  </Text>
                </View>
              </View>

              <View style={styles.rightSection}>
                <Text style={[styles.value, { color: colors.text }]}>
                  {formatCurrency(value, baseCurrency ?? "USD")}
                </Text>
                {/* Price change will be shown once we have price cache */}
                {holding.type === "listed" && holding.ticker && (
                  <Text
                    style={[styles.ticker, { color: colors.textSecondary }]}
                  >
                    {holding.ticker}
                  </Text>
                )}
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
    fontSize: 20,
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
  ticker: {
    fontSize: 12,
  },
});
