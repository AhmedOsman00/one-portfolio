import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@/contexts/theme-context";

interface OnboardingFooterProps {
  title: string;
  description: string;
}

export default function OnboardingFooter({
  title,
  description,
}: OnboardingFooterProps) {
  const { colors } = useTheme();

  return (
    <View>
      <Text style={[styles.bottomTitle, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.bottomDescription, { color: colors.textSecondary }]}>
        {description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomTitle: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  bottomDescription: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 12,
  },
});
