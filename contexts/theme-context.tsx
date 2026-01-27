import React, { createContext, useContext, useMemo } from "react";
import { useColorScheme } from "react-native";

interface ThemeColors {
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  primary: string;
  border: string;
}

interface Theme {
  colors: ThemeColors;
  isDark: boolean;
}

interface ThemeContextValue extends Theme {
  toggleTheme?: () => void;
}

const lightColors: ThemeColors = {
  background: "#FFFFFF",
  surface: "#F5F5F5",
  text: "#000000",
  textSecondary: "#666666",
  primary: "#007AFF",
  border: "#E0E0E0",
};

const darkColors: ThemeColors = {
  background: "#000000",
  surface: "#1C1C1E",
  text: "#FFFFFF",
  textSecondary: "#999999",
  primary: "#0A84FF",
  border: "#38383A",
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const theme: Theme = useMemo(
    () => ({
      colors: isDark ? darkColors : lightColors,
      isDark,
    }),
    [isDark]
  );

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

