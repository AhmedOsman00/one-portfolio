import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@/contexts/theme-context";
import DonutChart from "@/components/donut-chart";

interface AssetAllocationProps {
  allocations: Array<{
    name: string;
    percentage: number;
    color: string;
  }>;
}

export default function AssetAllocation({ allocations }: AssetAllocationProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>
        Asset Allocation
      </Text>

      <View
        style={[styles.chartContainer, { backgroundColor: colors.surface }]}
      >
        <View style={styles.chart}>
          <DonutChart allocations={allocations} size={200} strokeWidth={20} />
          <View style={styles.centerLabel}>
            <Text
              style={[styles.centerLabelText, { color: colors.textSecondary }]}
            >
              Total
            </Text>
            <Text style={[styles.centerLabelValue, { color: colors.text }]}>
              100%
            </Text>
          </View>
        </View>

        <View style={styles.legend}>
          {allocations.map((allocation, index) => (
            <View key={index} style={styles.legendItem}>
              <View
                style={[
                  styles.legendDot,
                  { backgroundColor: allocation.color },
                ]}
              />
              <Text style={[styles.legendLabel, { color: colors.text }]}>
                {allocation.name}
              </Text>
              <Text
                style={[styles.legendValue, { color: colors.textSecondary }]}
              >
                {allocation.percentage}%
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  chartContainer: {
    padding: 20,
    gap: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  chart: {
    alignItems: "center",
    justifyContent: "center",
  },
  centerLabel: {
    position: "absolute",
    alignItems: "center",
  },
  centerLabelText: {
    fontSize: 14,
    marginBottom: 4,
  },
  centerLabelValue: {
    fontSize: 32,
    fontWeight: "bold",
  },
  legend: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    width: "45%",
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendLabel: {
    fontSize: 14,
    flex: 1,
  },
  legendValue: {
    fontSize: 14,
    fontWeight: "600",
  },
});
