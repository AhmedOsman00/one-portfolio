/**
 * Preferences repository - CRUD operations for user_preferences table.
 * Uses a key-value store pattern for flexible preference storage.
 */

import { getDatabase } from "../db";

/**
 * Known preference keys for type safety.
 */
export type PreferenceKey =
  | "hasCompletedOnboarding"
  | "baseCurrency"
  | "notificationsEnabled"
  | "autoRefreshEnabled";

/**
 * Gets a preference value by key.
 * Returns null if the key doesn't exist.
 */
export async function getPreference(key: PreferenceKey): Promise<string | null> {
  const db = getDatabase();

  const result = await db.getFirstAsync<{ value: string }>(
    "SELECT value FROM user_preferences WHERE key = ?",
    key
  );

  return result?.value ?? null;
}

/**
 * Sets a preference value.
 * Uses INSERT OR REPLACE to upsert.
 */
export async function setPreference(
  key: PreferenceKey,
  value: string
): Promise<void> {
  const db = getDatabase();

  await db.runAsync(
    "INSERT OR REPLACE INTO user_preferences (key, value) VALUES (?, ?)",
    key,
    value
  );
}

/**
 * Deletes a preference by key.
 */
export async function deletePreference(key: PreferenceKey): Promise<void> {
  const db = getDatabase();
  await db.runAsync("DELETE FROM user_preferences WHERE key = ?", key);
}

/**
 * Gets all preferences as a record.
 */
export async function getAllPreferences(): Promise<Record<string, string>> {
  const db = getDatabase();

  const rows = await db.getAllAsync<{ key: string; value: string }>(
    "SELECT key, value FROM user_preferences"
  );

  const preferences: Record<string, string> = {};
  for (const row of rows) {
    preferences[row.key] = row.value;
  }

  return preferences;
}

/**
 * Deletes all preferences (for "Clear All Data" feature).
 */
export async function deleteAllPreferences(): Promise<void> {
  const db = getDatabase();
  await db.runAsync("DELETE FROM user_preferences");
}

// ============================================
// Typed helper functions for common preferences
// ============================================

/**
 * Gets hasCompletedOnboarding as a boolean.
 */
export async function getHasCompletedOnboarding(): Promise<boolean> {
  const value = await getPreference("hasCompletedOnboarding");
  return value === "true";
}

/**
 * Sets hasCompletedOnboarding.
 */
export async function setHasCompletedOnboarding(value: boolean): Promise<void> {
  await setPreference("hasCompletedOnboarding", value.toString());
}

/**
 * Gets baseCurrency (defaults to null if not set).
 */
export async function getBaseCurrency(): Promise<string | null> {
  return getPreference("baseCurrency");
}

/**
 * Sets baseCurrency.
 */
export async function setBaseCurrencyPref(currency: string): Promise<void> {
  await setPreference("baseCurrency", currency);
}

/**
 * Gets notificationsEnabled as a boolean (defaults to true).
 */
export async function getNotificationsEnabled(): Promise<boolean> {
  const value = await getPreference("notificationsEnabled");
  return value !== "false"; // Default to true
}

/**
 * Sets notificationsEnabled.
 */
export async function setNotificationsEnabled(value: boolean): Promise<void> {
  await setPreference("notificationsEnabled", value.toString());
}

/**
 * Gets autoRefreshEnabled as a boolean (defaults to false).
 */
export async function getAutoRefreshEnabled(): Promise<boolean> {
  const value = await getPreference("autoRefreshEnabled");
  return value === "true"; // Default to false
}

/**
 * Sets autoRefreshEnabled.
 */
export async function setAutoRefreshEnabled(value: boolean): Promise<void> {
  await setPreference("autoRefreshEnabled", value.toString());
}
