import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet } from "react-native";
import { useTheme } from "@/contexts/theme-context";
import {
  HomeHeader,
  TotalValueCard,
  AssetAllocation,
  PremiumFeatureCard,
  HoldingsList,
} from "./components";
import { assets } from "@/models/asset";

export default function HomeScreen() {
  const { colors } = useTheme();

  const mockPortfolioData = {
    totalValue: 45283.5,
    changeAmount: 320.15,
    changePercentage: 0.71,
    timeframe: "24h",
  };

  const mockAllocations = [
    { name: "Stocks", percentage: 60, color: "#2C4DC8" },
    { name: "Real Estate", percentage: 25, color: "#5FA3D0" },
    { name: "Bonds", percentage: 10, color: "#4A5568" },
    { name: "Cash", percentage: 5, color: "#A0AEC0" },
  ];

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
          totalValue={mockPortfolioData.totalValue}
          changeAmount={mockPortfolioData.changeAmount}
          changePercentage={mockPortfolioData.changePercentage}
          timeframe={mockPortfolioData.timeframe}
        />
        <AssetAllocation allocations={mockAllocations} />
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
});
