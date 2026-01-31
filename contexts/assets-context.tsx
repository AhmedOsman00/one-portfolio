/**
 * Assets context provider.
 * Manages portfolio assets state and provides methods to add/update/delete.
 */

import React, { createContext, useContext, useEffect, useState } from "react";
import { useDatabase } from "./database-context";
import {
  getAllAssets,
  insertListedAsset,
  insertCustomAsset,
  updateAsset,
  deleteAsset as deleteAssetDb,
  getAssetCount,
} from "@/database/repositories/asset-repository";
import type {
  DbAsset,
  CreateListedAssetInput,
  CreateCustomAssetInput,
  UpdateAssetInput,
} from "@/database/models/asset";

interface AssetsContextValue {
  assets: DbAsset[];
  assetCount: number;
  isLoading: boolean;
  error: Error | null;
  refreshAssets: () => Promise<void>;
  addListedAsset: (input: CreateListedAssetInput) => Promise<DbAsset>;
  addCustomAsset: (input: CreateCustomAssetInput) => Promise<DbAsset>;
  updateAsset: (id: string, input: UpdateAssetInput) => Promise<DbAsset>;
  deleteAsset: (id: string) => Promise<void>;
}

const AssetsContext = createContext<AssetsContextValue | undefined>(undefined);

interface AssetsProviderProps {
  children: React.ReactNode;
}

export function AssetsProvider({ children }: AssetsProviderProps) {
  const { isReady: isDbReady } = useDatabase();
  const [assets, setAssets] = useState<DbAsset[]>([]);
  const [assetCount, setAssetCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (isDbReady) {
      loadAssets();
    }
  }, [isDbReady]);

  async function loadAssets() {
    try {
      setIsLoading(true);
      setError(null);

      const [loadedAssets, count] = await Promise.all([
        getAllAssets(),
        getAssetCount(),
      ]);

      setAssets(loadedAssets);
      setAssetCount(count);
    } catch (err) {
      console.error("[AssetsContext] Failed to load assets:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
  }

  async function refreshAssets() {
    await loadAssets();
  }

  async function addListedAsset(input: CreateListedAssetInput): Promise<DbAsset> {
    const newAsset = await insertListedAsset(input);
    await refreshAssets();
    return newAsset;
  }

  async function addCustomAsset(input: CreateCustomAssetInput): Promise<DbAsset> {
    const newAsset = await insertCustomAsset(input);
    await refreshAssets();
    return newAsset;
  }

  async function handleUpdateAsset(
    id: string,
    input: UpdateAssetInput
  ): Promise<DbAsset> {
    const updated = await updateAsset(id, input);
    await refreshAssets();
    return updated;
  }

  async function handleDeleteAsset(id: string): Promise<void> {
    await deleteAssetDb(id);
    await refreshAssets();
  }

  return (
    <AssetsContext.Provider
      value={{
        assets,
        assetCount,
        isLoading,
        error,
        refreshAssets,
        addListedAsset,
        addCustomAsset,
        updateAsset: handleUpdateAsset,
        deleteAsset: handleDeleteAsset,
      }}
    >
      {children}
    </AssetsContext.Provider>
  );
}

export function useAssets(): AssetsContextValue {
  const context = useContext(AssetsContext);
  if (!context) {
    throw new Error("useAssets must be used within AssetsProvider");
  }
  return context;
}
