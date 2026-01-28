import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserPreferences {
  hasCompletedOnboarding: boolean;
  baseCurrency: string | null;
}

interface UserPreferencesContextValue extends UserPreferences {
  setHasCompletedOnboarding: (value: boolean) => Promise<void>;
  setBaseCurrency: (currency: string) => Promise<void>;
  isLoading: boolean;
}

const STORAGE_KEY = '@one_portfolio_preferences';

const UserPreferencesContext = createContext<UserPreferencesContextValue | undefined>(
  undefined
);

export function UserPreferencesProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [preferences, setPreferences] = useState<UserPreferences>({
    hasCompletedOnboarding: false,
    baseCurrency: null,
  });

  useEffect(() => {
    loadPreferences();
  }, []);

  async function loadPreferences() {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as UserPreferences;
        setPreferences(parsed);
      }
    } catch (error) {
      console.error('Failed to load user preferences:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function savePreferences(newPreferences: UserPreferences) {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newPreferences));
      setPreferences(newPreferences);
    } catch (error) {
      console.error('Failed to save user preferences:', error);
    }
  }

  async function setHasCompletedOnboarding(value: boolean) {
    await savePreferences({ ...preferences, hasCompletedOnboarding: value });
  }

  async function setBaseCurrency(currency: string) {
    await savePreferences({ ...preferences, baseCurrency: currency });
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
    throw new Error('useUserPreferences must be used within UserPreferencesProvider');
  }
  return context;
}
