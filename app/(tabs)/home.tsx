import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text } from "react-native";
import { useTheme } from "../../contexts/theme-context";
import { StyledContainer, StyledTitle, StyledText } from "../../components/ui";

export default function HomeScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background }}
      edges={["top", "left", "right"]}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          backgroundColor: colors.background,
        }}
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

