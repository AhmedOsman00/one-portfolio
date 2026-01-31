/**
 * Database initialization and access for One Portfolio.
 * Uses expo-sqlite for local persistence.
 */

import * as SQLite from "expo-sqlite";
import { runMigrations } from "./migrations";

const DATABASE_NAME = "one_portfolio.db";

let database: SQLite.SQLiteDatabase | null = null;

/**
 * Opens the database connection and runs any pending migrations.
 * Call this once on app startup.
 */
export async function initializeDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (database) {
    return database;
  }

  console.log("[Database] Opening database...");
  database = await SQLite.openDatabaseAsync(DATABASE_NAME);

  // Enable foreign keys
  await database.execAsync("PRAGMA foreign_keys = ON;");

  // Run migrations
  await runMigrations(database);

  console.log("[Database] Database initialized.");
  return database;
}

/**
 * Gets the database instance.
 * Throws if database hasn't been initialized.
 */
export function getDatabase(): SQLite.SQLiteDatabase {
  if (!database) {
    throw new Error(
      "Database not initialized. Call initializeDatabase() first."
    );
  }
  return database;
}

/**
 * Closes the database connection.
 * Call this on app shutdown if needed.
 */
export async function closeDatabase(): Promise<void> {
  if (database) {
    await database.closeAsync();
    database = null;
    console.log("[Database] Database closed.");
  }
}

/**
 * Resets the database by deleting all data.
 * Used for "Clear All Data" feature.
 */
export async function resetDatabase(): Promise<void> {
  const db = getDatabase();

  console.log("[Database] Resetting database...");

  // Delete all data from tables (keep structure)
  await db.execAsync(`
    DELETE FROM assets;
    DELETE FROM price_cache;
    DELETE FROM user_preferences;
  `);

  console.log("[Database] Database reset complete.");
}
