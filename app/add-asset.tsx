import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/theme-context";
import { assetTypes } from "@/models/asset-type";

export default function AddAssetScreen() {
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");


  const filteredAssetTypes = assetTypes.filter(
    (asset) =>
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function handleClose() {
    router.back();
  }

  function handleAssetTypePress(assetTypeId: string) {
    // TODO: Navigate to asset creation form for the selected type
    console.log("Selected asset type:", assetTypeId);
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={["top", "left", "right", "bottom"]}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={handleClose}
          accessibilityLabel="Close"
          accessibilityRole="button"
        >
          <Text style={[styles.headerButtonText, { color: colors.text }]}>
            ✕
          </Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Add an asset
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* Asset Types Grid */}
        <View style={styles.gridContainer}>
          {filteredAssetTypes.map((assetType) => (
            <TouchableOpacity
              key={assetType.id}
              style={[
                styles.assetCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
              onPress={() => handleAssetTypePress(assetType.id)}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
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
  infoButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  infoButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginBottom: 24,
  },
  paginationDot: {
    width: 24,
    height: 6,
    borderRadius: 3,
  },
  paginationDotInactive: {
    width: 6,
    height: 6,
    borderRadius: 3,
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
  ctaBanner: {
    marginTop: 24,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  ctaDecorCircle: {
    position: "absolute",
    top: 16,
    left: 24,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(30, 63, 174, 0.15)",
  },
  ctaText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 26,
  },
  ctaDecorTriangle: {
    position: "absolute",
    bottom: 16,
    right: 24,
    width: 0,
    height: 0,
    borderLeftWidth: 24,
    borderRightWidth: 24,
    borderBottomWidth: 40,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "rgba(30, 63, 174, 0.1)",
  },
});
