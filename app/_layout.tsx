import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { ThemeProvider } from "@/contexts/theme-context";
import { UserPreferencesProvider } from "@/contexts/user-preferences-context";
import { DatabaseProvider } from "@/contexts/database-context";
import { ErrorBoundary } from "@/components/error-boundary";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <DatabaseProvider>
          <ThemeProvider>
            <UserPreferencesProvider>
              <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
              <Stack
                screenOptions={{
                  headerShown: false,
                  contentStyle: { backgroundColor: "transparent" },
                }}
              >
                <Stack.Screen name="index" />
                <Stack.Screen
                  name="onboarding/index"
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="currency-selection" />
                <Stack.Screen
                  name="add-asset"
                  options={{ presentation: "modal" }}
                />
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="+not-found" />
              </Stack>
            </UserPreferencesProvider>
          </ThemeProvider>
        </DatabaseProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

