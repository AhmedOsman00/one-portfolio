import React, { createContext, useContext, useEffect, useState } from "react";
import { useDatabase } from "./database-context";
import {
  getHasCompletedOnboarding,
  setHasCompletedOnboarding as setHasCompletedOnboardingDb,
  getBaseCurrency,
  setBaseCurrencyPref,
} from "@/database/repositories/preferences-repository";

interface UserPreferences {
  hasCompletedOnboarding: boolean;
  baseCurrency: string | null;
}

interface UserPreferencesContextValue extends UserPreferences {
  setHasCompletedOnboarding: (value: boolean) => Promise<void>;
  setBaseCurrency: (currency: string) => Promise<void>;
  isLoading: boolean;
}

const UserPreferencesContext = createContext<
  UserPreferencesContextValue | undefined
>(undefined);

export function UserPreferencesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isReady: isDbReady } = useDatabase();
  const [isLoading, setIsLoading] = useState(true);
  const [preferences, setPreferences] = useState<UserPreferences>({
    hasCompletedOnboarding: false,
    baseCurrency: null,
  });

  useEffect(() => {
    if (!isDbReady) {
      return;
    }

    async function loadPreferences() {
      try {
        const onboarding = await getHasCompletedOnboarding();
        const currency = await getBaseCurrency();

        setPreferences({
          hasCompletedOnboarding: onboarding,
          baseCurrency: currency,
        });
      } catch (error) {
        console.error("[UserPreferences] Failed to load preferences:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadPreferences();
  }, [isDbReady]);

  async function setHasCompletedOnboarding(value: boolean) {
    try {
      await setHasCompletedOnboardingDb(value);
      setPreferences((prev) => ({ ...prev, hasCompletedOnboarding: value }));
    } catch (error) {
      console.error("[UserPreferences] Failed to set onboarding:", error);
      throw error;
    }
  }

  async function setBaseCurrency(currency: string) {
    try {
      await setBaseCurrencyPref(currency);
      setPreferences((prev) => ({ ...prev, baseCurrency: currency }));
    } catch (error) {
      console.error("[UserPreferences] Failed to set currency:", error);
      throw error;
    }
  }

  return (
    <UserPreferencesContext.Provider
      value={{
        ...preferences,
        setHasCompletedOnboarding,
        setBaseCurrency,
        isLoading,
      }}
    >
      {children}
    </UserPreferencesContext.Provider>
  );
}

export function useUserPreferences() {
  const context = useContext(UserPreferencesContext);
  if (!context) {
    throw new Error(
      "useUserPreferences must be used within UserPreferencesProvider"
    );
  }
  return context;
}
