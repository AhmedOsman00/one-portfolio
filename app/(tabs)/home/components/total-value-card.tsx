import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@/contexts/theme-context";
import { useUserPreferences } from "@/contexts/user-preferences-context";
import { formatCurrency } from "@/utils/formatCurrency";

interface TotalValueCardProps {
  totalValue: number;
  changeAmount: number;
  changePercentage: number;
  timeframe: string;
}

export default function TotalValueCard({
  totalValue,
  changeAmount,
  changePercentage,
  timeframe,
}: TotalValueCardProps) {
  const { colors } = useTheme();
  const { baseCurrency } = useUserPreferences();
  const isPositive = changeAmount >= 0;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Total Value</Text>
      <Text style={styles.amount}>
        {formatCurrency(totalValue, baseCurrency ?? 'USD')}
      </Text>
      <View style={styles.changeRow}>
        <Text style={styles.changeIcon}>{isPositive ? "↗" : "↘"}</Text>
        <Text
          style={[
            styles.changeText,
            { color: isPositive ? colors.success : colors.error },
          ]}
        >
          {isPositive ? "+" : ""}{formatCurrency(Math.abs(changeAmount), baseCurrency ?? 'USD')} (
          {isPositive ? "+" : ""}
          {changePercentage.toFixed(2)}%)
        </Text>
        <Text style={styles.timeframe}>{timeframe}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1E3FAE",
    marginHorizontal: 20,
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
  },
  label: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  amount: {
    color: "#FFFFFF",
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 12,
  },
  changeRow: {
    backgroundColor: "#3452B6",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    gap: 6,
  },
  changeIcon: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  changeText: {
    fontSize: 14,
    fontWeight: "600",
  },
  timeframe: {
    color: "#FFFFFF",
    fontSize: 14,
  },
});
