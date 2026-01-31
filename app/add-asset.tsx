import React, { useState, useMemo } from "react";
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
  Modal,
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

// Validation helpers
function isValidNumber(value: string): boolean {
  if (!value.trim()) return false;
  const num = parseFloat(value);
  return !isNaN(num) && num > 0;
}

function parseNumber(value: string): number {
  return parseFloat(value.trim());
}

function filterNumericInput(text: string): string {
  // Allow digits, one decimal point, and nothing else
  let result = "";
  let hasDecimal = false;
  for (const char of text) {
    if (char >= "0" && char <= "9") {
      result += char;
    } else if (char === "." && !hasDecimal) {
      result += char;
      hasDecimal = true;
    }
  }
  return result;
}

function filterTickerInput(text: string): string {
  // Allow only letters and numbers, uppercase
  return text.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
}

interface FieldError {
  ticker?: string;
  quantity?: string;
  purchasePrice?: string;
  customName?: string;
  customValue?: string;
  maturityDate?: string;
}

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
  const [maturityDate, setMaturityDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Track which fields have been touched (for showing errors)
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const isListedCategory = selectedType
    ? LISTED_CATEGORIES.includes(selectedType.id as AssetCategoryId)
    : false;

  // Real-time validation
  const errors = useMemo<FieldError>(() => {
    const errs: FieldError = {};

    if (isListedCategory) {
      if (touched.ticker && !ticker.trim()) {
        errs.ticker = "Ticker symbol is required";
      }
      if (touched.quantity) {
        if (!quantity.trim()) {
          errs.quantity = "Quantity is required";
        } else if (!isValidNumber(quantity)) {
          errs.quantity = "Enter a valid number greater than 0";
        }
      }
      if (touched.purchasePrice && purchasePrice.trim() && !isValidNumber(purchasePrice)) {
        errs.purchasePrice = "Enter a valid price";
      }
    } else {
      if (touched.customName && !customName.trim()) {
        errs.customName = "Asset name is required";
      }
      if (touched.customValue) {
        if (!customValue.trim()) {
          errs.customValue = "Value is required";
        } else if (!isValidNumber(customValue)) {
          errs.customValue = "Enter a valid number greater than 0";
        }
      }
    }

    return errs;
  }, [isListedCategory, ticker, quantity, purchasePrice, customName, customValue, touched]);

  // Check if form is valid
  const isFormValid = useMemo(() => {
    if (isListedCategory) {
      return ticker.trim().length > 0 && isValidNumber(quantity);
    } else {
      return customName.trim().length > 0 && isValidNumber(customValue);
    }
  }, [isListedCategory, ticker, quantity, customName, customValue]);

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
    setMaturityDate(null);
    setTouched({});
  }

  function handleAssetTypePress(assetType: AssetType) {
    setSelectedType(assetType);
    setStep("form");
  }

  function markTouched(field: string) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  // Input handlers with filtering
  function handleTickerChange(text: string) {
    setTicker(filterTickerInput(text));
  }

  function handleQuantityChange(text: string) {
    setQuantity(filterNumericInput(text));
  }

  function handlePurchasePriceChange(text: string) {
    setPurchasePrice(filterNumericInput(text));
  }

  function handleCustomValueChange(text: string) {
    setCustomValue(filterNumericInput(text));
  }

  // Date picker handlers
  function handleDateSelect(date: Date) {
    setMaturityDate(date);
    setShowDatePicker(false);
  }

  function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  async function handleSubmit() {
    if (!selectedType || !isFormValid) return;

    try {
      setIsSubmitting(true);

      if (isListedCategory) {
        const tickerValue = ticker.trim().toUpperCase();
        const quantityValue = parseNumber(quantity);
        const purchasePriceValue = purchasePrice.trim()
          ? parseNumber(purchasePrice)
          : undefined;

        await addListedAsset({
          ticker: tickerValue,
          name: name.trim() || tickerValue,
          quantity: quantityValue,
          purchase_price: purchasePriceValue,
          current_price: purchasePriceValue ?? 0,
          asset_category: selectedType.id as AssetCategoryId,
        });
      } else {
        const nameValue = customName.trim();
        const valueNum = parseNumber(customValue);

        await addCustomAsset({
          name: nameValue,
          current_price: valueNum,
          asset_category: selectedType.id as AssetCategoryId,
          maturity_date: maturityDate ? formatDate(maturityDate) : undefined,
        });
      }

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
                borderColor: errors.ticker ? colors.error : colors.border,
                color: colors.text,
              },
            ]}
            placeholder={placeholder.ticker}
            placeholderTextColor={colors.textSecondary}
            value={ticker}
            onChangeText={handleTickerChange}
            onBlur={() => markTouched("ticker")}
            autoCapitalize="characters"
            autoCorrect={false}
            maxLength={10}
          />
          {errors.ticker && (
            <Text style={[styles.errorText, { color: colors.error }]}>
              {errors.ticker}
            </Text>
          )}
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
            maxLength={100}
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
                borderColor: errors.quantity ? colors.error : colors.border,
                color: colors.text,
              },
            ]}
            placeholder="10"
            placeholderTextColor={colors.textSecondary}
            value={quantity}
            onChangeText={handleQuantityChange}
            onBlur={() => markTouched("quantity")}
            keyboardType="decimal-pad"
            maxLength={15}
          />
          {errors.quantity && (
            <Text style={[styles.errorText, { color: colors.error }]}>
              {errors.quantity}
            </Text>
          )}
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
                borderColor: errors.purchasePrice ? colors.error : colors.border,
                color: colors.text,
              },
            ]}
            placeholder="150.00"
            placeholderTextColor={colors.textSecondary}
            value={purchasePrice}
            onChangeText={handlePurchasePriceChange}
            onBlur={() => markTouched("purchasePrice")}
            keyboardType="decimal-pad"
            maxLength={15}
          />
          {errors.purchasePrice ? (
            <Text style={[styles.errorText, { color: colors.error }]}>
              {errors.purchasePrice}
            </Text>
          ) : (
            <Text style={[styles.fieldHint, { color: colors.textSecondary }]}>
              Used to calculate your gain/loss
            </Text>
          )}
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            { backgroundColor: colors.primary },
            (!isFormValid || isSubmitting) && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={!isFormValid || isSubmitting}
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
                borderColor: errors.customName ? colors.error : colors.border,
                color: colors.text,
              },
            ]}
            placeholder="e.g., Miami Rental Property"
            placeholderTextColor={colors.textSecondary}
            value={customName}
            onChangeText={setCustomName}
            onBlur={() => markTouched("customName")}
            maxLength={100}
          />
          {errors.customName && (
            <Text style={[styles.errorText, { color: colors.error }]}>
              {errors.customName}
            </Text>
          )}
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
                borderColor: errors.customValue ? colors.error : colors.border,
                color: colors.text,
              },
            ]}
            placeholder="250000"
            placeholderTextColor={colors.textSecondary}
            value={customValue}
            onChangeText={handleCustomValueChange}
            onBlur={() => markTouched("customValue")}
            keyboardType="decimal-pad"
            maxLength={15}
          />
          {errors.customValue ? (
            <Text style={[styles.errorText, { color: colors.error }]}>
              {errors.customValue}
            </Text>
          ) : (
            <Text style={[styles.fieldHint, { color: colors.textSecondary }]}>
              Enter the total current value of this asset
            </Text>
          )}
        </View>

        {/* Maturity Date (for bonds/fixed income) */}
        {showMaturityDate && (
          <View style={styles.fieldContainer}>
            <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
              Maturity Date (optional)
            </Text>
            <TouchableOpacity
              style={[
                styles.input,
                styles.dateInput,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
              onPress={() => setShowDatePicker(true)}
            >
              <Text
                style={[
                  styles.dateText,
                  { color: maturityDate ? colors.text : colors.textSecondary },
                ]}
              >
                {maturityDate ? formatDate(maturityDate) : "Select date"}
              </Text>
              <Text style={[styles.dateIcon, { color: colors.textSecondary }]}>
                📅
              </Text>
            </TouchableOpacity>
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
            (!isFormValid || isSubmitting) && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={!isFormValid || isSubmitting}
        >
          <Text style={styles.submitButtonText}>
            {isSubmitting ? "Adding..." : "Add to Portfolio"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  function renderDatePickerModal() {
    const today = new Date();
    const years = Array.from({ length: 30 }, (_, i) => today.getFullYear() + i);
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];

    const [tempYear, setTempYear] = useState(
      maturityDate?.getFullYear() ?? today.getFullYear() + 1
    );
    const [tempMonth, setTempMonth] = useState(
      maturityDate?.getMonth() ?? today.getMonth()
    );
    const [tempDay, setTempDay] = useState(maturityDate?.getDate() ?? 1);

    const daysInMonth = new Date(tempYear, tempMonth + 1, 0).getDate();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    function handleConfirm() {
      const selected = new Date(tempYear, tempMonth, tempDay);
      handleDateSelect(selected);
    }

    return (
      <Modal visible={showDatePicker} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View
            style={[styles.modalContent, { backgroundColor: colors.background }]}
          >
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                <Text style={[styles.modalButton, { color: colors.textSecondary }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                Select Date
              </Text>
              <TouchableOpacity onPress={handleConfirm}>
                <Text style={[styles.modalButton, { color: colors.primary }]}>
                  Done
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.pickerContainer}>
              {/* Month */}
              <ScrollView style={styles.pickerColumn} showsVerticalScrollIndicator={false}>
                {months.map((month, index) => (
                  <TouchableOpacity
                    key={month}
                    style={[
                      styles.pickerItem,
                      tempMonth === index && {
                        backgroundColor: colors.primaryLight,
                      },
                    ]}
                    onPress={() => setTempMonth(index)}
                  >
                    <Text
                      style={[
                        styles.pickerText,
                        { color: tempMonth === index ? colors.primary : colors.text },
                      ]}
                    >
                      {month}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Day */}
              <ScrollView style={styles.pickerColumn} showsVerticalScrollIndicator={false}>
                {days.map((day) => (
                  <TouchableOpacity
                    key={day}
                    style={[
                      styles.pickerItem,
                      tempDay === day && { backgroundColor: colors.primaryLight },
                    ]}
                    onPress={() => setTempDay(day)}
                  >
                    <Text
                      style={[
                        styles.pickerText,
                        { color: tempDay === day ? colors.primary : colors.text },
                      ]}
                    >
                      {day}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Year */}
              <ScrollView style={styles.pickerColumn} showsVerticalScrollIndicator={false}>
                {years.map((year) => (
                  <TouchableOpacity
                    key={year}
                    style={[
                      styles.pickerItem,
                      tempYear === year && { backgroundColor: colors.primaryLight },
                    ]}
                    onPress={() => setTempYear(year)}
                  >
                    <Text
                      style={[
                        styles.pickerText,
                        { color: tempYear === year ? colors.primary : colors.text },
                      ]}
                    >
                      {year}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {maturityDate && (
              <TouchableOpacity
                style={styles.clearDateButton}
                onPress={() => {
                  setMaturityDate(null);
                  setShowDatePicker(false);
                }}
              >
                <Text style={[styles.clearDateText, { color: colors.error }]}>
                  Clear Date
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
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

      {/* Date Picker Modal */}
      {renderDatePickerModal()}
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
  errorText: {
    fontSize: 12,
    marginTop: 6,
  },
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateText: {
    fontSize: 16,
  },
  dateIcon: {
    fontSize: 18,
  },
  submitButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 12,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: "600",
  },
  modalButton: {
    fontSize: 17,
    fontWeight: "500",
  },
  pickerContainer: {
    flexDirection: "row",
    height: 200,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  pickerColumn: {
    flex: 1,
  },
  pickerItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginVertical: 2,
  },
  pickerText: {
    fontSize: 16,
    textAlign: "center",
  },
  clearDateButton: {
    alignItems: "center",
    paddingVertical: 12,
    marginTop: 10,
  },
  clearDateText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
