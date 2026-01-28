import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../contexts/theme-context";

export function StyledContainer({
  children,
  testID,
}: {
  children: React.ReactNode;
  testID?: string;
}) {
  const { colors } = useTheme();
  return (
    <View
      testID={testID}
      style={[styles.container, { backgroundColor: colors.surface }]}
    >
      {children}
    </View>
  );
}

export function StyledTitle({ children }: { children: React.ReactNode }) {
  const { colors } = useTheme();
  return (
    <Text style={[styles.title, { color: colors.text }]}>{children}</Text>
  );
}

export function StyledText({ children }: { children: React.ReactNode }) {
  const { colors } = useTheme();
  return (
    <Text style={[styles.text, { color: colors.textSecondary }]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
});

