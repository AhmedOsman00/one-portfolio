/**
 * Database migrations for One Portfolio.
 * Each migration has a version number and an up function.
 * Migrations are applied in order and tracked in schema_migrations table.
 */

import type { SQLiteDatabase } from "expo-sqlite";
import { ALL_TABLES, SCHEMA_VERSION } from "./schema";

interface Migration {
  version: number;
  up: (db: SQLiteDatabase) => Promise<void>;
}

/**
 * Migration 1: Initial schema
 * Creates all base tables for the app.
 */
const migration1: Migration = {
  version: 1,
  up: async (db: SQLiteDatabase) => {
    for (const createStatement of ALL_TABLES) {
      await db.execAsync(createStatement);
    }
  },
};

/**
 * All migrations in order.
 * Add new migrations here as the schema evolves.
 */
const migrations: Migration[] = [migration1];

/**
 * Gets the current schema version from the database.
 * Returns 0 if no migrations have been applied.
 */
async function getCurrentVersion(db: SQLiteDatabase): Promise<number> {
  try {
    const result = await db.getFirstAsync<{ version: number }>(
      "SELECT MAX(version) as version FROM schema_migrations"
    );
    return result?.version ?? 0;
  } catch {
    // Table doesn't exist yet
    return 0;
  }
}

/**
 * Records a migration as applied.
 */
async function recordMigration(
  db: SQLiteDatabase,
  version: number
): Promise<void> {
  await db.runAsync(
    "INSERT INTO schema_migrations (version) VALUES (?)",
    version
  );
}

/**
 * Runs all pending migrations.
 * Returns the number of migrations applied.
 */
export async function runMigrations(db: SQLiteDatabase): Promise<number> {
  // First, ensure migrations table exists
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      version INTEGER PRIMARY KEY NOT NULL,
      applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  const currentVersion = await getCurrentVersion(db);
  let appliedCount = 0;

  for (const migration of migrations) {
    if (migration.version > currentVersion) {
      console.log(`[Database] Applying migration ${migration.version}...`);
      await migration.up(db);
      await recordMigration(db, migration.version);
      appliedCount++;
      console.log(`[Database] Migration ${migration.version} applied.`);
    }
  }

  if (appliedCount === 0) {
    console.log(`[Database] Schema is up to date (version ${currentVersion}).`);
  } else {
    console.log(`[Database] Applied ${appliedCount} migration(s).`);
  }

  return appliedCount;
}

/**
 * Gets the target schema version.
 */
export function getTargetVersion(): number {
  return SCHEMA_VERSION;
}
