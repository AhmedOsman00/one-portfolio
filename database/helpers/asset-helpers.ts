/**
 * Helper functions for asset data derivation and display.
 */

import type { DbAsset, AssetCategoryId } from "../models/asset";
import { assetTypes } from "@/models/asset-type";
import type AssetType from "@/models/asset-type";

/**
 * Map of asset category to default units label.
 */
const UNITS_BY_CATEGORY: Record<AssetCategoryId, string> = {
  "stock-etf": "shares",
  crypto: "units", // Will be overridden by ticker
  gold: "oz",
  "real-estate": "property",
  "fixed-income": "bond",
  cash: "account",
  "physical-asset": "item",
};

/**
 * Gets the display units for an asset.
 * For crypto, uses the ticker symbol (BTC, ETH).
 * For other types, uses a predefined label.
 */
export function getAssetUnits(asset: DbAsset): string {
  // Crypto uses ticker as unit (e.g., "BTC", "ETH")
  if (asset.asset_category === "crypto" && asset.ticker) {
    return asset.ticker.toUpperCase();
  }

  return UNITS_BY_CATEGORY[asset.asset_category] ?? "units";
}

/**
 * Gets the AssetType metadata for an asset category.
 * Returns undefined if category not found.
 */
export function getAssetTypeByCategory(
  category: AssetCategoryId
): AssetType | undefined {
  return assetTypes.find((t) => t.id === category);
}

/**
 * Calculates the total value of an asset.
 * For listed assets: quantity × current_price
 * For custom assets: current_price IS the total value
 */
export function calculateAssetValue(asset: DbAsset): number {
  if (asset.type === "custom") {
    // Custom assets store total value in current_price
    return asset.current_price;
  }
  // Listed assets: multiply quantity by per-unit price
  return asset.quantity * asset.current_price;
}

/**
 * Calculates gain/loss for an asset.
 * Returns null if purchase_price is not set.
 */
export function calculateGainLoss(asset: DbAsset): {
  amount: number;
  percentage: number;
} | null {
  if (asset.purchase_price === null || asset.purchase_price === 0) {
    return null;
  }

  const totalValue = calculateAssetValue(asset);
  const totalCost = asset.quantity * asset.purchase_price;
  const amount = totalValue - totalCost;
  const percentage = (amount / totalCost) * 100;

  return { amount, percentage };
}

/**
 * Generates a UUID v4 for new assets.
 */
export function generateAssetId(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
