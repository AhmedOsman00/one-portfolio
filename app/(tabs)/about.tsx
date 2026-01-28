import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet } from "react-native";
import { useTheme } from "../../contexts/theme-context";
import { StyledContainer, StyledTitle, StyledText } from "../../components/ui";

export default function AboutScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={["top", "left", "right"]}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { backgroundColor: colors.background },
        ]}
      >
        <StyledContainer>
          <StyledTitle>About</StyledTitle>
          <StyledText>
            This portfolio app is built with Expo, React Native, and TypeScript,
            following best practices for mobile development.
          </StyledText>
        </StyledContainer>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
});

