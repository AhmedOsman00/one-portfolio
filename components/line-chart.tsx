import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@/contexts/theme-context";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";
import { useState } from "react";

interface StockDataPoint {
  timestamp: number;
  price: number;
}

interface LineChartProps {
  data: StockDataPoint[];
  height?: number;
}

export default function LineChart({ data, height = 150 }: LineChartProps) {
  const { colors } = useTheme();
  const [width, setWidth] = useState(0);

  // Calculate if positive based on data or provided values
  const isPositive =
    data.length >= 2 && data[data.length - 1].price >= data[0].price;

  const chartColor = isPositive ? colors.primary : colors.error;

  const generatePath = (
    points: StockDataPoint[],
    isFilled: boolean = false
  ): string => {
    if (points.length === 0) return "";

    const prices = points.map((p) => p.price);
    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);
    const priceRange = maxPrice - minPrice || 1;

    const stepX = width / (points.length - 1 || 1);
    const padding = 10;

    const coords = points.map((point, index) => {
      const x = index * stepX;
      const normalizedY = (point.price - minPrice) / priceRange;
      const y = height - padding - normalizedY * (height - 2 * padding);
      return { x, y };
    });

    let path = `M${coords[0].x} ${coords[0].y}`;

    for (let i = 0; i < coords.length - 1; i++) {
      const current = coords[i];
      const next = coords[i + 1];
      const controlX = (current.x + next.x) / 2;
      path += ` C${controlX} ${current.y}, ${controlX} ${next.y}, ${next.x} ${next.y}`;
    }

    if (isFilled) {
      const lastPoint = coords[coords.length - 1];
      path += ` L${lastPoint.x} ${height} L0 ${height} L0 ${coords[0].y} Z`;
    }

    return path;
  };

  const linePath = generatePath(data, false);
  const fillPath = generatePath(data, true);

  return (
    <View
      style={styles.container}
      onLayout={(event) => {
        const { width: layoutWidth } = event.nativeEvent.layout;
        setWidth(layoutWidth);
      }}
    >
      <Svg
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
      >
        <Defs>
          <LinearGradient id="stockGradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor={chartColor} stopOpacity="0.3" />
            <Stop offset="50%" stopColor={chartColor} stopOpacity="0.1" />
            <Stop offset="100%" stopColor={chartColor} stopOpacity="0" />
          </LinearGradient>
        </Defs>

        <Path d={fillPath} fill="url(#stockGradient)" />
        <Path
          d={linePath}
          stroke={chartColor}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
