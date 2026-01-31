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

// Preferences repository
export type { PreferenceKey } from "./repositories/preferences-repository";
export {
  getPreference,
  setPreference,
  deletePreference,
  getAllPreferences,
  deleteAllPreferences,
  getHasCompletedOnboarding,
  setHasCompletedOnboarding,
  getBaseCurrency,
  setBaseCurrencyPref,
  getNotificationsEnabled,
  setNotificationsEnabled,
  getAutoRefreshEnabled,
  setAutoRefreshEnabled,
} from "./repositories/preferences-repository";
