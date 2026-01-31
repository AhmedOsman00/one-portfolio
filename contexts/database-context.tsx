/**
 * Database context provider.
 * Initializes the database on app startup and provides access to it.
 */

import React, { createContext, useContext, useEffect, useState } from "react";
import type { SQLiteDatabase } from "expo-sqlite";
import { initializeDatabase, resetDatabase } from "@/database";

interface DatabaseContextValue {
  db: SQLiteDatabase | null;
  isReady: boolean;
  error: Error | null;
  clearAllData: () => Promise<void>;
}

const DatabaseContext = createContext<DatabaseContextValue | undefined>(
  undefined
);

interface DatabaseProviderProps {
  children: React.ReactNode;
}

export function DatabaseProvider({ children }: DatabaseProviderProps) {
  const [db, setDb] = useState<SQLiteDatabase | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function init() {
      try {
        const database = await initializeDatabase();
        setDb(database);
        setIsReady(true);
      } catch (err) {
        console.error("[DatabaseProvider] Failed to initialize database:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
        // Still mark as ready so app can show error state
        setIsReady(true);
      }
    }

    init();
  }, []);

  async function clearAllData() {
    try {
      await resetDatabase();
    } catch (err) {
      console.error("[DatabaseProvider] Failed to clear data:", err);
      throw err;
    }
  }

  return (
    <DatabaseContext.Provider value={{ db, isReady, error, clearAllData }}>
      {children}
    </DatabaseContext.Provider>
  );
}

/**
 * Hook to access the database context.
 * Returns the database instance, ready state, and any initialization error.
 */
export function useDatabase(): DatabaseContextValue {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error("useDatabase must be used within DatabaseProvider");
  }
  return context;
}
