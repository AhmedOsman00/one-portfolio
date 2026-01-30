import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { G, Circle } from "react-native-svg";

interface Allocation {
  percentage: number;
  color: string;
}

interface DonutChartProps {
  allocations: Allocation[];
  size?: number;
  strokeWidth?: number;
}

const DonutChart: React.FC<DonutChartProps> = ({
  allocations,
  size = 200,
  strokeWidth = 20,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  let currentOffset = 0;

  return (
    <View style={styles.container}>
      <Svg width={size} height={size} style={styles.chart}>
        <G transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          {allocations.map((allocation, index) => {
            const strokeDashoffset = currentOffset;
            const strokeDasharray = `${(allocation.percentage / 100) * circumference} ${circumference}`;
            currentOffset -= (allocation.percentage / 100) * circumference;

            return (
              <Circle
                key={index}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={allocation.color}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                fill="none"
              />
            );
          })}
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  chart: {},
});

export default DonutChart;
