/**
 * Database module exports.
 */

// Core database functions
export {
  initializeDatabase,
  getDatabase,
  closeDatabase,
  resetDatabase,
} from "./db";

export { runMigrations, getTargetVersion } from "./migrations";

export { SCHEMA_VERSION } from "./schema";

// Models
export type {
  DbAsset,
  AssetKind,
  AssetCategoryId,
  CreateListedAssetInput,
  CreateCustomAssetInput,
  UpdateAssetInput,
} from "./models/asset";

// Repositories
export {
  insertListedAsset,
  insertCustomAsset,
  getAllAssets,
  getAssetById,
  getAssetByTicker,
  updateAsset,
  deleteAsset,
  getAssetCount,
  deleteAllAssets,
} from "./repositories/asset-repository";

// Helpers
export {
  getAssetUnits,
  getAssetTypeByCategory,
  calculateAssetValue,
  calculateGainLoss,
  generateAssetId,
} from "./helpers/asset-helpers";
