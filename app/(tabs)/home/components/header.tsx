import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@/contexts/theme-context";

export default function HomeHeader() {
  const { colors } = useTheme();

  function handleNotificationPress() {
    // TODO: Navigate to notifications
    console.log("Notifications pressed");
  }

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <View style={[styles.avatar, { backgroundColor: colors.surface }]}>
          <Text style={styles.avatarText}>👤</Text>
        </View>
        <View>
          <Text style={[styles.welcomeText, { color: colors.textSecondary }]}>
            Welcome back
          </Text>
          <Text style={[styles.title, { color: colors.text }]}>
            Portfolio Overview
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.notificationButton, { backgroundColor: colors.surface }]}
        onPress={handleNotificationPress}
      >
        <Text style={styles.notificationIcon}>🔔</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 24,
  },
  welcomeText: {
    fontSize: 14,
    marginBottom: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationIcon: {
    fontSize: 20,
  },
});
