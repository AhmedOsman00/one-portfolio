import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '../contexts/theme-context';
import { useUserPreferences } from '../contexts/user-preferences-context';

interface Currency {
  code: string;
  name: string;
  symbol: string;
}

const currencies: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
];

export default function CurrencySelectionScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const { setBaseCurrency, setHasCompletedOnboarding } = useUserPreferences();
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);

  async function handleContinue() {
    if (!selectedCurrency) return;

    try {
      await setBaseCurrency(selectedCurrency);
      await setHasCompletedOnboarding(true);
      router.replace('/(tabs)/home');
    } catch (error) {
      console.error('Failed to save currency:', error);
    }
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top', 'left', 'right', 'bottom']}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Choose your base currency</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            This will be used to display all your portfolio values
          </Text>
        </View>

        <View style={styles.currencyList}>
          {currencies.map((currency) => {
            const isSelected = selectedCurrency === currency.code;
            return (
              <TouchableOpacity
                key={currency.code}
                style={[
                  styles.currencyCard,
                  {
                    backgroundColor: colors.surface,
                    borderColor: isSelected ? colors.primary : colors.border,
                    borderWidth: isSelected ? 2 : 1,
                  },
                ]}
                onPress={() => setSelectedCurrency(currency.code)}
              >
                <View style={styles.currencyInfo}>
                  <Text style={[styles.currencySymbol, { color: colors.text }]}>
                    {currency.symbol}
                  </Text>
                  <View style={styles.currencyDetails}>
                    <Text style={[styles.currencyCode, { color: colors.text }]}>
                      {currency.code}
                    </Text>
                    <Text style={[styles.currencyName, { color: colors.textSecondary }]}>
                      {currency.name}
                    </Text>
                  </View>
                </View>
                {isSelected && (
                  <View
                    style={[styles.checkmark, { backgroundColor: colors.primary }]}
                  >
                    <Text style={styles.checkmarkText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: selectedCurrency ? colors.primary : colors.border,
            },
          ]}
          onPress={handleContinue}
          disabled={!selectedCurrency}
        >
          <Text
            style={[
              styles.buttonText,
              { opacity: selectedCurrency ? 1 : 0.5 },
            ]}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  currencyList: {
    gap: 12,
  },
  currencyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
  },
  currencyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  currencySymbol: {
    fontSize: 32,
    fontWeight: 'bold',
    width: 48,
    textAlign: 'center',
  },
  currencyDetails: {
    gap: 4,
  },
  currencyCode: {
    fontSize: 18,
    fontWeight: '600',
  },
  currencyName: {
    fontSize: 14,
  },
  checkmark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
    paddingBottom: 32,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
