import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/theme-context";

export default function EmptyState() {
  const { colors } = useTheme();
  const router = useRouter();

  function handleAddAsset() {
    router.push("/add-asset");
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Illustration */}
        <View
          style={[styles.illustration, { backgroundColor: colors.surface }]}
        >
          <Text style={styles.illustrationEmoji}>📊</Text>
        </View>

        {/* Text */}
        <Text style={[styles.title, { color: colors.text }]}>
          Start Building Your Portfolio
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Add your first investment to see live tracking and insights
        </Text>

        {/* CTA Button */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleAddAsset}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Add Your First Asset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingBottom: 100,
  },
  content: {
    alignItems: "center",
  },
  illustration: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },
  illustrationEmoji: {
    fontSize: 48,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  button: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
