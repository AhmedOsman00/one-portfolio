import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet, ActivityIndicator, View } from "react-native";
import { useTheme } from "@/contexts/theme-context";
import { useAssets } from "@/contexts/assets-context";
import {
  HomeHeader,
  TotalValueCard,
  AssetAllocation,
  PremiumFeatureCard,
  HoldingsList,
  EmptyState,
} from "./components";
import {
  calculateAssetValue,
  getAssetTypeByCategory,
} from "@/database/helpers/asset-helpers";

export default function HomeScreen() {
  const { colors } = useTheme();
  const { assets, isLoading } = useAssets();

  // Calculate portfolio totals from real data
  const totalValue = assets.reduce(
    (sum, asset) => sum + calculateAssetValue(asset),
    0
  );

  // Calculate allocations by asset category
  const allocationMap = new Map<string, { name: string; value: number; color: string }>();
  
  for (const asset of assets) {
    const assetType = getAssetTypeByCategory(asset.asset_category);
    const categoryName = assetType?.name ?? "Other";
    const categoryColor = assetType?.iconColor ?? "#718096";
    const assetValue = calculateAssetValue(asset);
    
    const existing = allocationMap.get(asset.asset_category);
    if (existing) {
      existing.value += assetValue;
    } else {
      allocationMap.set(asset.asset_category, {
        name: categoryName,
        value: assetValue,
        color: categoryColor,
      });
    }
  }

  const allocations = Array.from(allocationMap.values())
    .map((item) => ({
      name: item.name,
      percentage: totalValue > 0 ? Math.round((item.value / totalValue) * 100) : 0,
      color: item.color,
    }))
    .sort((a, b) => b.percentage - a.percentage);

  // Show loading spinner while loading
  if (isLoading) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
        edges={["top", "left", "right"]}
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  // Show empty state if no assets
  if (assets.length === 0) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
        edges={["top", "left", "right"]}
      >
        <HomeHeader />
        <EmptyState />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={["top", "left", "right"]}
    >
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <HomeHeader />
        <TotalValueCard
          totalValue={totalValue}
          changeAmount={0} // Will be populated from price cache later
          changePercentage={0}
          timeframe="24h"
        />
        {allocations.length > 0 && (
          <AssetAllocation allocations={allocations} />
        )}
        <PremiumFeatureCard />
        <HoldingsList holdings={assets} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
