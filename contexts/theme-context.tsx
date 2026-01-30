import React, { createContext, useContext, useMemo } from "react";
import { useColorScheme } from "react-native";

interface ThemeColors {
  background: string;
  surface: string;
  surfaceSecondary: string;
  text: string;
  textSecondary: string;
  textTertiary: string;
  primary: string;
  primaryLight: string;
  border: string;
  success: string;
  error: string;
  warning: string;
  cardShadow: string;
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
  surface: "rgba(0, 0, 0, 0.03)",
  surfaceSecondary: "rgba(0, 0, 0, 0.02)",
  text: "#000000",
  textSecondary: "#5A6482",
  textTertiary: "#97A1C4",
  primary: "#1E3FAE",
  primaryLight: "rgba(30, 63, 174, 0.1)",
  border: "rgba(0, 0, 0, 0.08)",
  success: "#0BDA62",
  error: "#FF6B6B",
  warning: "#F59E0B",
  cardShadow: "rgba(0, 0, 0, 0.08)",
};

const darkColors: ThemeColors = {
  background: "#121520",
  surface: "rgba(255, 255, 255, 0.05)",
  surfaceSecondary: "rgba(255, 255, 255, 0.03)",
  text: "#FFFFFF",
  textSecondary: "#97A1C4",
  textTertiary: "#5A6482",
  primary: "#1E3FAE",
  primaryLight: "rgba(30, 63, 174, 0.2)",
  border: "rgba(255, 255, 255, 0.1)",
  success: "#0BDA62",
  error: "#FF6B6B",
  warning: "#F59E0B",
  cardShadow: "rgba(0, 0, 0, 0.3)",
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
