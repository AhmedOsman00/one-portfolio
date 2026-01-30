import { View, Text, StyleSheet, Image } from "react-native";
import { useTheme } from "@/contexts/theme-context";
import OnboardingFooter from "./components/footer";
import OnboardingContainer from "./components/container";

export default function PremiumInsightsTab() {
  const { colors } = useTheme();

  return (
    <OnboardingContainer>
      <View style={styles.illustrationContainer}>
        {/* Risk Level Badge */}
        <View style={styles.riskBadge}>
          <View style={styles.riskDot} />
          <Text style={styles.riskText}>RISK LEVEL: LOW</Text>
        </View>

        {/* Concentric Circles */}
        <View style={styles.circlesContainer}>
          <View style={styles.circleOuter}>
            <View style={styles.circleMiddle}>
              <View style={styles.circleInner}>
                <Image
                  source={require("@/assets/insights.png")}
                  style={styles.insightsIcon}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Diversification Card */}
        <View style={styles.diversificationCard}>
          <Text style={styles.diversificationLabel}>Diversification</Text>
          <View style={styles.progressBarBg}>
            <View
              style={[
                styles.progressBarFill,
                { backgroundColor: colors.primary },
              ]}
            />
          </View>
          <Text style={styles.diversificationValue}>85% Optimal</Text>
        </View>
      </View>

      <OnboardingFooter
        title="Unlock Risk Insights with Premium"
        description="Get deep analytics and diversification recommendations to protect and grow your wealth."
      />
    </OnboardingContainer>
  );
}

const styles = StyleSheet.create({
  illustrationContainer: {
    height: 350,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  riskBadge: {
    position: "relative",
    top: 10,
    right: -70,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 8,
  },
  riskDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#0BDA62",
  },
  riskText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "600",
  },
  circlesContainer: {
    width: 260,
    height: 260,
    justifyContent: "center",
    alignItems: "center",
  },
  circleOuter: {
    width: 260,
    height: 260,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 130,
    borderWidth: 12,
    borderColor: "rgba(30, 63, 174, 0.15)",
  },
  circleMiddle: {
    width: 190,
    height: 190,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 95,
    borderWidth: 12,
    borderColor: "rgba(30, 63, 174, 0.35)",
  },
  circleInner: {
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60,
    borderWidth: 12,
    borderColor: "#1E3FAE",
  },
  insightsIcon: {
    width: 62,
    height: 48,
  },
  diversificationCard: {
    position: "relative",
    bottom: 20,
    left: -80,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    padding: 16,
    width: 180,
  },
  diversificationLabel: {
    color: "#97A1C4",
    fontSize: 12,
    marginBottom: 10,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 3,
    marginBottom: 8,
    overflow: "hidden",
  },
  progressBarFill: {
    width: "85%",
    height: "100%",
    borderRadius: 3,
  },
  diversificationValue: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});
