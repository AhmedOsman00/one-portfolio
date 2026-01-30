import { View, StyleSheet, Dimensions } from "react-native";
import { ReactNode } from "react";

interface OnboardingContainerProps {
  children: ReactNode;
}

const { width } = Dimensions.get("window");

export default function OnboardingContainer({
  children,
}: OnboardingContainerProps) {
  return <View style={styles.slideContent}>{children}</View>;
}

const styles = StyleSheet.create({
  slideContent: {
    flex: 1,
    paddingHorizontal: 24,
    gap: 16,
    justifyContent: "center",
    alignItems: "center",
    width,
  },
});
