# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

One Portfolio is a React Native portfolio app built with Expo, TypeScript, and Expo Router for file-based navigation. The app follows functional programming patterns with StyleSheet for styling and supports dark mode.

## Development Commands

### Starting the app
- `npm start` - Start Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run web` - Run in web browser

### Code quality
- `npm test` - Run Jest tests with jest-expo preset
- `npm run lint` - Lint TypeScript files with ESLint
- `npm run format` - Format code with Prettier

## Architecture

### Navigation Structure
The app uses **Expo Router** with file-based routing:
- `app/_layout.tsx` - Root layout wrapping the entire app with providers
- `app/(tabs)/` - Tab-based navigation group
- `app/(tabs)/_layout.tsx` - Tabs layout configuration
- Navigation context is automatically managed by Expo Router

### Provider Hierarchy (app/_layout.tsx)
The app is wrapped in this provider order (outermost to innermost):
1. **ErrorBoundary** - Catches and displays runtime errors
2. **SafeAreaProvider** - Manages safe area insets for notches/status bars
3. **ThemeProvider** - Provides theme context (colors, isDark flag)
4. **Stack** (Expo Router) - Navigation container

### Theme System (contexts/theme-context.tsx)
- Automatically responds to system color scheme via `useColorScheme()`
- Provides `useTheme()` hook returning `{ colors, isDark }`
- Light and dark color palettes are predefined
- Theme colors: background, surface, text, textSecondary, primary, border

### Styling Approach
- Use **StyleSheet.create()** from React Native for all component styling
- **Co-locate styles** with components in the same file (styles at bottom)
- Access theme colors via `useTheme()` hook and apply dynamically
- Avoid hardcoded colors or inline styles
- ESLint will automatically detect unused styles with `react-native/no-unused-styles`
- Use Flexbox for layouts
- For safe areas, wrap components with SafeAreaView from react-native-safe-area-context

#### Style Organization Pattern
```typescript
// Component definition
function MyComponent() {
  const { colors } = useTheme();
  return <View style={[styles.container, { backgroundColor: colors.surface }]}>...</View>
}

// Styles at bottom of file
const styles = StyleSheet.create({
  container: { padding: 16 },
  // ... other styles
});
```

## Code Style Conventions

### TypeScript
- Strict mode enabled (`strict: true` in tsconfig.json)
- Use **interfaces over types**
- Avoid enums; use maps instead
- All code must be typed; no implicit any

### Component Structure
- Use **functional components only**; avoid classes (except ErrorBoundary which requires class)
- Use `function` keyword for pure functions
- Prefer named exports
- File structure: exported component → subcomponents → helpers → static content → types

### Naming
- Directories: lowercase-with-dashes (e.g., `auth-wizard`)
- Variables: descriptive with auxiliary verbs (e.g., `isLoading`, `hasError`)
- Use declarative JSX

### State Management
- Minimize `useState` and `useEffect`
- Use Context and `useReducer` for global state
- Memoize with `useMemo` and `useCallback` appropriately

### Error Handling
- Handle errors at beginning of functions
- Use early returns for error conditions
- Avoid deeply nested conditionals
- ErrorBoundary is already set up at root level

## Testing

- Jest is configured with `jest-expo` preset
- React Native Testing Library is available for component tests
- Test files: `components/__tests__/*.test.tsx`
- Coverage collected from `app/**/*.{ts,tsx}` and `components/**/*.{ts,tsx}`

## Key Dependencies

- **expo** ~51.0.0 - React Native framework
- **expo-router** ~3.5.0 - File-based routing
- **react-native-safe-area-context** 4.10.1 - Safe area management
- **TypeScript** ~5.3.3 with strict mode
- **eslint-plugin-react-native** - Detects unused styles and enforces best practices

## Important Notes

- TypeScript strict mode is enabled
- ESLint extends expo and prettier configs
- The app supports iOS, Android, and Web platforms
- Always test on both iOS and Android when making UI changes
- Use Expo's built-in components for common UI patterns
