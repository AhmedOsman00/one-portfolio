import { Tabs, useRouter } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@/contexts/theme-context";

export default function TabsLayout() {
  const { colors } = useTheme();
  const router = useRouter();

  function handleAddPress() {
    router.push("/add-asset");
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          height: 80,
          paddingBottom: 20,
          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Dashboard",
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ color }) => (
            <Text style={[styles.tabIcon, { color }]}>⊞</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "Add",
          tabBarButton: () => (
            <TouchableOpacity
              style={styles.addButtonContainer}
              onPress={handleAddPress}
              activeOpacity={0.8}
            >
              <View
                style={[styles.addButton, { backgroundColor: colors.primary }]}
              >
                <Text style={styles.addButtonText}>+</Text>
              </View>
              <Text style={[styles.addButtonLabel, { color: colors.primary }]}>
                Add
              </Text>
            </TouchableOpacity>
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            handleAddPress();
          },
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "Settings",
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => (
            <Text style={[styles.tabIcon, { color }]}>⚙</Text>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabIcon: {
    fontSize: 24,
  },
  addButtonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 4,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "500",
    marginTop: -2,
  },
  addButtonLabel: {
    fontSize: 10,
    fontWeight: "600",
  },
});
