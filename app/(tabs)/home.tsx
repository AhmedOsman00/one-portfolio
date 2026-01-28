import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet } from "react-native";
import { useTheme } from "../../contexts/theme-context";
import { StyledContainer, StyledTitle, StyledText } from "../../components/ui";

export default function HomeScreen() {
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
          <StyledTitle>Welcome</StyledTitle>
          <StyledText>
            This is the home screen of your portfolio app. Start building your
            amazing portfolio here!
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

