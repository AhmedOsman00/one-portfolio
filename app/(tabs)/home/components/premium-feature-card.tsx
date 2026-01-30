import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@/contexts/theme-context";

export default function PremiumFeatureCard() {
  const { colors } = useTheme();

  function handlePress() {
    // TODO: Navigate to premium features
    console.log("Premium feature pressed");
  }

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.surface }]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View>
          <Text style={[styles.badge, { color: colors.primary }]}>
            ⭐ PREMIUM FEATURE
          </Text>
          <Text style={[styles.title, { color: colors.text }]}>
            Deep Risk Analysis
          </Text>
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            Simulate market crashes and see how your portfolio holds up.
          </Text>
        </View>
        <View style={[styles.lockIcon, { backgroundColor: colors.surfaceSecondary }]}>
          <Text style={styles.lockEmoji}>🔒</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  badge: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    maxWidth: "85%",
  },
  lockIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  lockEmoji: {
    fontSize: 18,
  },
});
