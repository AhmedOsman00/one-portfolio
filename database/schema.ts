/**
 * Database schema definitions for One Portfolio.
 * Each table is defined with its CREATE statement.
 */

export const SCHEMA_VERSION = 1;

/**
 * Assets table - stores both listed (stocks, crypto) and custom assets
 */
export const CREATE_ASSETS_TABLE = `
  CREATE TABLE IF NOT EXISTS assets (
    id TEXT PRIMARY KEY NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('listed', 'custom')),
    ticker TEXT,
    name TEXT NOT NULL,
    quantity REAL NOT NULL DEFAULT 0,
    purchase_price REAL,
    current_price REAL NOT NULL DEFAULT 0,
    asset_category TEXT NOT NULL,
    maturity_date TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`;

/**
 * Price cache table - caches fetched prices with TTL
 */
export const CREATE_PRICE_CACHE_TABLE = `
  CREATE TABLE IF NOT EXISTS price_cache (
    ticker TEXT PRIMARY KEY NOT NULL,
    price REAL NOT NULL,
    change_amount REAL,
    change_percentage REAL,
    fetched_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`;

/**
 * User preferences table - app settings and user choices
 */
export const CREATE_USER_PREFERENCES_TABLE = `
  CREATE TABLE IF NOT EXISTS user_preferences (
    key TEXT PRIMARY KEY NOT NULL,
    value TEXT NOT NULL
  );
`;

/**
 * Schema migrations table - tracks applied migrations
 */
export const CREATE_MIGRATIONS_TABLE = `
  CREATE TABLE IF NOT EXISTS schema_migrations (
    version INTEGER PRIMARY KEY NOT NULL,
    applied_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`;

/**
 * All table creation statements in order
 */
export const ALL_TABLES = [
  CREATE_MIGRATIONS_TABLE,
  CREATE_ASSETS_TABLE,
  CREATE_PRICE_CACHE_TABLE,
  CREATE_USER_PREFERENCES_TABLE,
];
