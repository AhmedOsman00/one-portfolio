/**
 * Asset repository - CRUD operations for assets table.
 */

import { getDatabase } from "../db";
import type {
  DbAsset,
  CreateListedAssetInput,
  CreateCustomAssetInput,
  UpdateAssetInput,
} from "../models/asset";
import { generateAssetId } from "../helpers/asset-helpers";

/**
 * Inserts a new listed asset (stock, ETF, crypto) into the database.
 */
export async function insertListedAsset(
  input: CreateListedAssetInput
): Promise<DbAsset> {
  const db = getDatabase();
  const id = generateAssetId();
  const now = new Date().toISOString();

  await db.runAsync(
    `INSERT INTO assets (
      id, type, ticker, name, quantity, purchase_price, 
      current_price, asset_category, maturity_date, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    id,
    "listed",
    input.ticker.toUpperCase(),
    input.name,
    input.quantity,
    input.purchase_price ?? null,
    input.current_price,
    input.asset_category,
    null, // Listed assets don't have maturity dates
    now,
    now
  );

  const asset = await getAssetById(id);
  if (!asset) {
    throw new Error("Failed to insert asset");
  }
  return asset;
}

/**
 * Inserts a new custom asset (real estate, bonds, etc.) into the database.
 */
export async function insertCustomAsset(
  input: CreateCustomAssetInput
): Promise<DbAsset> {
  const db = getDatabase();
  const id = generateAssetId();
  const now = new Date().toISOString();

  await db.runAsync(
    `INSERT INTO assets (
      id, type, ticker, name, quantity, purchase_price, 
      current_price, asset_category, maturity_date, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    id,
    "custom",
    null, // Custom assets don't have tickers
    input.name,
    1, // Custom assets have quantity of 1
    null, // No purchase price for custom assets
    input.current_price,
    input.asset_category,
    input.maturity_date ?? null,
    now,
    now
  );

  const asset = await getAssetById(id);
  if (!asset) {
    throw new Error("Failed to insert asset");
  }
  return asset;
}

/**
 * Gets all assets from the database, sorted by value descending.
 */
export async function getAllAssets(): Promise<DbAsset[]> {
  const db = getDatabase();

  const assets = await db.getAllAsync<DbAsset>(
    `SELECT * FROM assets 
     ORDER BY (quantity * current_price) DESC`
  );

  return assets;
}

/**
 * Gets a single asset by ID.
 */
export async function getAssetById(id: string): Promise<DbAsset | null> {
  const db = getDatabase();

  const asset = await db.getFirstAsync<DbAsset>(
    "SELECT * FROM assets WHERE id = ?",
    id
  );

  return asset ?? null;
}

/**
 * Gets an asset by ticker symbol (for listed assets).
 */
export async function getAssetByTicker(
  ticker: string
): Promise<DbAsset | null> {
  const db = getDatabase();

  const asset = await db.getFirstAsync<DbAsset>(
    "SELECT * FROM assets WHERE ticker = ? COLLATE NOCASE",
    ticker
  );

  return asset ?? null;
}

/**
 * Updates an existing asset.
 */
export async function updateAsset(
  id: string,
  input: UpdateAssetInput
): Promise<DbAsset> {
  const db = getDatabase();
  const now = new Date().toISOString();

  // Build SET clause dynamically based on provided fields
  const updates: string[] = [];
  const values: (string | number | null)[] = [];

  if (input.name !== undefined) {
    updates.push("name = ?");
    values.push(input.name);
  }
  if (input.quantity !== undefined) {
    updates.push("quantity = ?");
    values.push(input.quantity);
  }
  if (input.purchase_price !== undefined) {
    updates.push("purchase_price = ?");
    values.push(input.purchase_price);
  }
  if (input.current_price !== undefined) {
    updates.push("current_price = ?");
    values.push(input.current_price);
  }
  if (input.asset_category !== undefined) {
    updates.push("asset_category = ?");
    values.push(input.asset_category);
  }
  if (input.maturity_date !== undefined) {
    updates.push("maturity_date = ?");
    values.push(input.maturity_date);
  }

  if (updates.length === 0) {
    const existing = await getAssetById(id);
    if (!existing) {
      throw new Error(`Asset not found: ${id}`);
    }
    return existing;
  }

  // Always update updated_at
  updates.push("updated_at = ?");
  values.push(now);

  // Add id for WHERE clause
  values.push(id);

  await db.runAsync(
    `UPDATE assets SET ${updates.join(", ")} WHERE id = ?`,
    ...values
  );

  const asset = await getAssetById(id);
  if (!asset) {
    throw new Error(`Asset not found after update: ${id}`);
  }
  return asset;
}

/**
 * Deletes an asset by ID.
 */
export async function deleteAsset(id: string): Promise<void> {
  const db = getDatabase();

  const result = await db.runAsync("DELETE FROM assets WHERE id = ?", id);

  if (result.changes === 0) {
    throw new Error(`Asset not found: ${id}`);
  }
}

/**
 * Gets the total count of assets.
 */
export async function getAssetCount(): Promise<number> {
  const db = getDatabase();

  const result = await db.getFirstAsync<{ count: number }>(
    "SELECT COUNT(*) as count FROM assets"
  );

  return result?.count ?? 0;
}

/**
 * Deletes all assets (for "Clear All Data" feature).
 */
export async function deleteAllAssets(): Promise<void> {
  const db = getDatabase();
  await db.runAsync("DELETE FROM assets");
}
