/**
 * Asset database model.
 * Represents an asset as stored in the SQLite database.
 */

/**
 * Asset type: listed (has live prices) or custom (user-entered value)
 */
export type AssetKind = "listed" | "custom";

/**
 * Asset category IDs - must match AssetType.id from models/asset-type.ts
 */
export type AssetCategoryId =
  | "stock-etf"
  | "gold"
  | "fixed-income"
  | "real-estate"
  | "cash"
  | "physical-asset"
  | "crypto";

/**
 * Asset as stored in the database.
 */
export interface DbAsset {
  id: string;
  type: AssetKind;
  ticker: string | null;
  name: string;
  quantity: number;
  purchase_price: number | null;
  current_price: number;
  asset_category: AssetCategoryId;
  maturity_date: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Data required to create a new listed asset (stock, ETF, crypto).
 */
export interface CreateListedAssetInput {
  ticker: string;
  name: string;
  quantity: number;
  purchase_price?: number;
  current_price: number;
  asset_category: AssetCategoryId;
}

/**
 * Data required to create a new custom asset (real estate, bonds, etc.).
 */
export interface CreateCustomAssetInput {
  name: string;
  current_price: number; // This is the total value for custom assets
  asset_category: AssetCategoryId;
  maturity_date?: string;
}

/**
 * Data for updating an existing asset.
 */
export interface UpdateAssetInput {
  name?: string;
  quantity?: number;
  purchase_price?: number | null;
  current_price?: number;
  asset_category?: AssetCategoryId;
  maturity_date?: string | null;
}
