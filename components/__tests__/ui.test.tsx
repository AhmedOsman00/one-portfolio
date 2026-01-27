import React from "react";
import { render } from "@testing-library/react-native";
import { ThemeProvider } from "../../contexts/theme-context";
import { StyledContainer, StyledTitle, StyledText } from "../ui";

describe("UI Components", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider>{children}</ThemeProvider>
  );

  it("renders StyledContainer", () => {
    const { getByTestId } = render(
      <StyledContainer testID="container">Test Content</StyledContainer>,
      { wrapper }
    );
    expect(getByTestId("container")).toBeTruthy();
  });

  it("renders StyledTitle", () => {
    const { getByText } = render(<StyledTitle>Test Title</StyledTitle>, {
      wrapper,
    });
    expect(getByText("Test Title")).toBeTruthy();
  });

  it("renders StyledText", () => {
    const { getByText } = render(<StyledText>Test Text</StyledText>, {
      wrapper,
    });
    expect(getByText("Test Text")).toBeTruthy();
  });
});

