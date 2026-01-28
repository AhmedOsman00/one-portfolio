import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '@/contexts/theme-context';
import Svg, { Rect } from 'react-native-svg';

const { width } = Dimensions.get('window');

export default function TrackAllTab() {
  const { colors } = useTheme();

  // Bar chart data (heights in percentages)
  const barHeights = [60, 40, 50, 85, 75, 95];

  return (
    <View style={styles.slide}>
      <View>
        {/* Portfolio Card */}
        <View style={[styles.portfolioCard, { backgroundColor: colors.surface }]}>
          <Text style={[styles.portfolioLabel, { color: colors.textSecondary }]}>
            Total Balance
          </Text>

          <View style={styles.balanceRow}>
            <Text style={[styles.portfolioValue, { color: colors.text }]}>
              $42,850.12
            </Text>
            <View style={styles.percentageBadge}>
              <Text style={styles.percentagePositive}>+12.4%</Text>
            </View>
          </View>

          {/* Bar Chart */}
          <View style={styles.chartContainer}>
            <Svg width="100%" height="120" viewBox="0 0 300 120">
              {barHeights.map((height, index) => (
                <Rect
                  key={index}
                  x={20 + index * 45}
                  y={120 - height}
                  width={20}
                  height={height}
                  fill="#4169E1"
                  rx="4"
                  ry="4"
                />
              ))}
            </Svg>
          </View>

          {/* Asset Rows */}
          <View style={styles.assetsList}>
            <View style={styles.assetRow}>
              <View style={styles.assetLeft}>
                <View style={[styles.assetIcon, { backgroundColor: '#FF9500' }]}>
                  <Text style={styles.assetIconText}>₿</Text>
                </View>
                <Text style={[styles.assetName, { color: colors.text }]}>Bitcoin</Text>
              </View>
              <Text style={[styles.assetValue, { color: colors.text }]}>$28,142</Text>
            </View>

            <View style={styles.assetRow}>
              <View style={styles.assetLeft}>
                <View style={[styles.assetIcon, { backgroundColor: '#4169E1' }]}>
                  <Text style={styles.assetIconText}>🏢</Text>
                </View>
                <Text style={[styles.assetName, { color: colors.text }]}>Real Estate</Text>
              </View>
              <Text style={[styles.assetValue, { color: colors.text }]}>$12,000</Text>
            </View>
          </View>
        </View>
      </View>

      <View>
        <Text style={[styles.bottomTitle, { color: colors.text }]}>
          Track All Your Investments in One Place
        </Text>
        <Text style={[styles.bottomDescription, { color: colors.textSecondary }]}>
          Stocks, crypto, real estate, bonds — everything in one powerful dashboard.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 40,
    width,
  },
  portfolioCard: {
    width: '100%',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  portfolioLabel: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 8,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  portfolioValue: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  percentageBadge: {
    backgroundColor: 'rgba(0, 214, 107, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  percentagePositive: {
    fontSize: 14,
    color: '#00D66B',
    fontWeight: '600',
  },
  chartContainer: {
    width: '100%',
    height: 120,
    marginBottom: 24,
  },
  assetsList: {
    gap: 12,
  },
  assetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
  },
  assetLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  assetIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  assetIconText: {
    fontSize: 20,
  },
  assetName: {
    fontSize: 16,
    fontWeight: '600',
  },
  assetValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  bottomTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 36,
  },
  bottomDescription: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.7,
  },
});
