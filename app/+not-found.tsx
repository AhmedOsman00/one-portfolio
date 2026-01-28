import { Link, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native";
import { useTheme } from "../contexts/theme-context";

export default function NotFoundScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background }}
      edges={["top", "left", "right", "bottom"]}
    >
      <Stack.Screen options={{ title: "Oops! Not Found" }} />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: colors.text }}>
          This screen doesn&apos;t exist.
        </Text>
        <Link
          href="/"
          style={{
            marginTop: 15,
            paddingVertical: 15,
            color: colors.primary,
          }}
        >
          <Text style={{ color: colors.primary }}>Go to home screen!</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}

