import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/theme-context";
import { useAssets } from "@/contexts/assets-context";
import { assetTypes } from "@/models/asset-type";
import type AssetType from "@/models/asset-type";
import type { AssetCategoryId } from "@/database/models/asset";

// Categories that are "listed" (have live prices)
const LISTED_CATEGORIES: AssetCategoryId[] = ["stock-etf", "crypto", "gold"];

export default function AddAssetScreen() {
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const { addListedAsset, addCustomAsset } = useAssets();

  // Step: "select" or "form"
  const [step, setStep] = useState<"select" | "form">("select");
  const [selectedType, setSelectedType] = useState<AssetType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form fields for listed assets
  const [ticker, setTicker] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");

  // Form fields for custom assets
  const [customName, setCustomName] = useState("");
  const [customValue, setCustomValue] = useState("");
  const [maturityDate, setMaturityDate] = useState("");

  const isListedCategory = selectedType
    ? LISTED_CATEGORIES.includes(selectedType.id as AssetCategoryId)
    : false;

  function handleClose() {
    router.back();
  }

  function handleBack() {
    setStep("select");
    setSelectedType(null);
    resetForm();
  }

  function resetForm() {
    setTicker("");
    setName("");
    setQuantity("");
    setPurchasePrice("");
    setCustomName("");
    setCustomValue("");
    setMaturityDate("");
  }

  function handleAssetTypePress(assetType: AssetType) {
    setSelectedType(assetType);
    setStep("form");
  }

  async function handleSubmit() {
    if (!selectedType) return;

    try {
      setIsSubmitting(true);

      if (isListedCategory) {
        // Validate listed asset fields
        if (!ticker.trim()) {
          Alert.alert("Error", "Please enter a ticker symbol");
          return;
        }
        if (!quantity.trim() || parseFloat(quantity) <= 0) {
          Alert.alert("Error", "Please enter a valid quantity");
          return;
        }

        await addListedAsset({
          ticker: ticker.trim().toUpperCase(),
          name: name.trim() || ticker.trim().toUpperCase(),
          quantity: parseFloat(quantity),
          purchase_price: purchasePrice ? parseFloat(purchasePrice) : undefined,
          current_price: purchasePrice ? parseFloat(purchasePrice) : 0, // Will be updated by price API later
          asset_category: selectedType.id as AssetCategoryId,
        });
      } else {
        // Validate custom asset fields
        if (!customName.trim()) {
          Alert.alert("Error", "Please enter an asset name");
          return;
        }
        if (!customValue.trim() || parseFloat(customValue) <= 0) {
          Alert.alert("Error", "Please enter a valid value");
          return;
        }

        await addCustomAsset({
          name: customName.trim(),
          current_price: parseFloat(customValue),
          asset_category: selectedType.id as AssetCategoryId,
          maturity_date: maturityDate.trim() || undefined,
        });
      }

      // Success - go back
      router.back();
    } catch (error) {
      console.error("Failed to add asset:", error);
      Alert.alert("Error", "Failed to add asset. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function renderTypeSelection() {
    return (
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.gridContainer}>
          {assetTypes.map((assetType) => (
            <TouchableOpacity
              key={assetType.id}
              style={[
                styles.assetCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
              onPress={() => handleAssetTypePress(assetType)}
              activeOpacity={0.7}
              accessibilityLabel={`${assetType.name}: ${assetType.description}`}
              accessibilityRole="button"
            >
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor: isDark
                      ? `${assetType.iconColor}20`
                      : assetType.bgColor,
                  },
                ]}
              >
                <Text style={styles.icon}>{assetType.icon}</Text>
              </View>
              <Text style={[styles.assetName, { color: colors.text }]}>
                {assetType.name}
              </Text>
              <Text
                style={[styles.assetDescription, { color: colors.textSecondary }]}
              >
                {assetType.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  }

  function renderListedAssetForm() {
    const placeholders: Record<string, { ticker: string; name: string }> = {
      "stock-etf": { ticker: "AAPL", name: "Apple Inc." },
      crypto: { ticker: "BTC", name: "Bitcoin" },
      gold: { ticker: "GOLD", name: "Gold" },
    };
    const placeholder = placeholders[selectedType?.id ?? ""] ?? {
      ticker: "TICKER",
      name: "Asset Name",
    };

    return (
      <ScrollView
        contentContainerStyle={styles.formContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Selected Type Badge */}
        <View style={[styles.selectedBadge, { backgroundColor: colors.surface }]}>
          <Text style={styles.selectedIcon}>{selectedType?.icon}</Text>
          <Text style={[styles.selectedName, { color: colors.text }]}>
            {selectedType?.name}
          </Text>
        </View>

        {/* Ticker */}
        <View style={styles.fieldContainer}>
          <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
            Ticker Symbol *
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
            placeholder={placeholder.ticker}
            placeholderTextColor={colors.textSecondary}
            value={ticker}
            onChangeText={setTicker}
            autoCapitalize="characters"
            autoCorrect={false}
          />
        </View>

        {/* Name */}
        <View style={styles.fieldContainer}>
          <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
            Name (optional)
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
            placeholder={placeholder.name}
            placeholderTextColor={colors.textSecondary}
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Quantity */}
        <View style={styles.fieldContainer}>
          <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
            Quantity *
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
            placeholder="10"
            placeholderTextColor={colors.textSecondary}
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="decimal-pad"
          />
        </View>

        {/* Purchase Price */}
        <View style={styles.fieldContainer}>
          <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
            Purchase Price (optional)
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
            placeholder="150.00"
            placeholderTextColor={colors.textSecondary}
            value={purchasePrice}
            onChangeText={setPurchasePrice}
            keyboardType="decimal-pad"
          />
          <Text style={[styles.fieldHint, { color: colors.textSecondary }]}>
            Used to calculate your gain/loss
          </Text>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            { backgroundColor: colors.primary },
            isSubmitting && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text style={styles.submitButtonText}>
            {isSubmitting ? "Adding..." : "Add to Portfolio"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  function renderCustomAssetForm() {
    const showMaturityDate =
      selectedType?.id === "fixed-income" || selectedType?.id === "cash";

    return (
      <ScrollView
        contentContainerStyle={styles.formContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Selected Type Badge */}
        <View style={[styles.selectedBadge, { backgroundColor: colors.surface }]}>
          <Text style={styles.selectedIcon}>{selectedType?.icon}</Text>
          <Text style={[styles.selectedName, { color: colors.text }]}>
            {selectedType?.name}
          </Text>
        </View>

        {/* Name */}
        <View style={styles.fieldContainer}>
          <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
            Asset Name *
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
            placeholder="e.g., Miami Rental Property"
            placeholderTextColor={colors.textSecondary}
            value={customName}
            onChangeText={setCustomName}
          />
        </View>

        {/* Value */}
        <View style={styles.fieldContainer}>
          <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
            Current Value *
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
            placeholder="250000"
            placeholderTextColor={colors.textSecondary}
            value={customValue}
            onChangeText={setCustomValue}
            keyboardType="decimal-pad"
          />
          <Text style={[styles.fieldHint, { color: colors.textSecondary }]}>
            Enter the total current value of this asset
          </Text>
        </View>

        {/* Maturity Date (for bonds/fixed income) */}
        {showMaturityDate && (
          <View style={styles.fieldContainer}>
            <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
              Maturity Date (optional)
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  color: colors.text,
                },
              ]}
              placeholder="YYYY-MM-DD"
              placeholderTextColor={colors.textSecondary}
              value={maturityDate}
              onChangeText={setMaturityDate}
            />
            <Text style={[styles.fieldHint, { color: colors.textSecondary }]}>
              Get notified when this asset matures
            </Text>
          </View>
        )}

        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            { backgroundColor: colors.primary },
            isSubmitting && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text style={styles.submitButtonText}>
            {isSubmitting ? "Adding..." : "Add to Portfolio"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={["top", "left", "right", "bottom"]}
    >
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={step === "form" ? handleBack : handleClose}
            accessibilityLabel={step === "form" ? "Back" : "Close"}
            accessibilityRole="button"
          >
            <Text style={[styles.headerButtonText, { color: colors.text }]}>
              {step === "form" ? "←" : "✕"}
            </Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            {step === "select" ? "Add an asset" : "Add details"}
          </Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Content */}
        {step === "select" && renderTypeSelection()}
        {step === "form" && isListedCategory && renderListedAssetForm()}
        {step === "form" && !isListedCategory && renderCustomAssetForm()}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerButtonText: {
    fontSize: 20,
    fontWeight: "400",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  headerSpacer: {
    width: 40,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  formContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
  },
  assetCard: {
    width: "47%",
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  icon: {
    fontSize: 24,
  },
  assetName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  assetDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  selectedBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 24,
    gap: 8,
  },
  selectedIcon: {
    fontSize: 20,
  },
  selectedName: {
    fontSize: 16,
    fontWeight: "600",
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
  },
  fieldHint: {
    fontSize: 12,
    marginTop: 6,
  },
  submitButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 12,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
