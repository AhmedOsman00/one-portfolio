import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../../contexts/theme-context";
import { useUserPreferences } from "../../contexts/user-preferences-context";

export default function HomeScreen() {
  const { colors } = useTheme();
  const { baseCurrency } = useUserPreferences();

  function handleAddAsset() {
    // TODO: Navigate to add asset screen
    console.log('Add asset pressed');
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={["top", "left", "right"]}
    >
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Portfolio</Text>
        {baseCurrency && (
          <View style={[styles.currencyBadge, { backgroundColor: colors.surface }]}>
            <Text style={[styles.currencyText, { color: colors.textSecondary }]}>
              {baseCurrency}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.emptyStateContainer}>
        <View style={styles.emptyStateContent}>
          <Text style={styles.emptyStateIcon}>📈</Text>
          <Text style={[styles.emptyStateTitle, { color: colors.text }]}>
            Start Your Investment Journey
          </Text>
          <Text style={[styles.emptyStateDescription, { color: colors.textSecondary }]}>
            Track stocks, crypto, gold and more. Add your first asset to get started.
          </Text>
          <TouchableOpacity
            style={[styles.ctaButton, { backgroundColor: colors.primary }]}
            onPress={handleAddAsset}
          >
            <Text style={styles.ctaButtonText}>Add Your First Asset</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  currencyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  currencyText: {
    fontSize: 14,
    fontWeight: '600',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyStateContent: {
    alignItems: 'center',
    maxWidth: 400,
  },
  emptyStateIcon: {
    fontSize: 80,
    marginBottom: 24,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  emptyStateDescription: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  ctaButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

