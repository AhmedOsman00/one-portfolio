import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { useTheme } from "@/contexts/theme-context";

const { width } = Dimensions.get("window");

export default function PremiumInsightsTab() {
  const { colors } = useTheme();

  return (
    <View style={styles.slide}>
      {/* SVG Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require("@/assets/premium-insights.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Text Content */}
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: colors.text }]}>
          Unlock Risk Insights{"\n"}with Premium
        </Text>
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          Get deep analytics and diversification recommendations to protect and
          grow your wealth.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 40,
    width,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    maxWidth: 400,
    maxHeight: 500,
  },
  textContainer: {
    width: "100%",
    alignItems: "center",
    gap: 16,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 36,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 8,
  },
});
