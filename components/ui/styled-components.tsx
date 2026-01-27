import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "../../contexts/theme-context";

interface StyledContainerProps {
  theme: ReturnType<typeof useTheme>;
}

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
      style={{
        padding: 16,
        backgroundColor: colors.surface,
        borderRadius: 8,
        marginBottom: 16,
      }}
    >
      {children}
    </View>
  );
}

export function StyledTitle({ children }: { children: React.ReactNode }) {
  const { colors } = useTheme();
  return (
    <Text
      style={{
        fontSize: 24,
        fontWeight: "bold",
        color: colors.text,
        marginBottom: 8,
      }}
    >
      {children}
    </Text>
  );
}

export function StyledText({ children }: { children: React.ReactNode }) {
  const { colors } = useTheme();
  return (
    <Text
      style={{
        fontSize: 16,
        color: colors.textSecondary,
        lineHeight: 24,
      }}
    >
      {children}
    </Text>
  );
}

