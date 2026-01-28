# Style Organization Guide

## Overview

This guide explains how to organize and manage styles in the One Portfolio React Native app. Following these conventions will keep your code maintainable, prevent unused styles, and make it easy to track down styling issues.

## Core Principles

### 1. Co-locate Styles with Components

**Always** keep styles in the same file as the component that uses them. This makes it:
- Easy to see which styles are used
- Simple to remove unused styles when deleting components
- Clear where to add new styles

```typescript
// ✅ GOOD: Styles in same file
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/theme-context';

export function ProfileCard() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
```

```typescript
// ❌ BAD: Styles in separate file
import { View, Text } from 'react-native';
import styles from './profile-styles'; // Hard to track usage!

export function ProfileCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
    </View>
  );
}
```

### 2. File Organization Pattern

Every component file should follow this structure:

```typescript
// 1. Imports
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/theme-context';

// 2. Interfaces/Types
interface ProfileCardProps {
  name: string;
  bio: string;
}

// 3. Component
export function ProfileCard({ name, bio }: ProfileCardProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <Text style={[styles.name, { color: colors.text }]}>{name}</Text>
      <Text style={[styles.bio, { color: colors.textSecondary }]}>{bio}</Text>
    </View>
  );
}

// 4. Helper functions (if needed)
function formatName(name: string): string {
  return name.toUpperCase();
}

// 5. Styles (always at the bottom)
const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bio: {
    fontSize: 14,
    lineHeight: 20,
  },
});
```

### 3. Theme Integration

Use the `useTheme()` hook to access theme colors dynamically:

```typescript
import { useTheme } from '../contexts/theme-context';

function MyComponent() {
  const { colors, isDark } = useTheme();

  return (
    <View style={[styles.container, {
      backgroundColor: colors.surface,
      borderColor: colors.border
    }]}>
      {/* Component content */}
    </View>
  );
}

// Static styles (spacing, layout, typography)
const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
});
```

**Key Points:**
- Apply **static styles** (spacing, layout) via `StyleSheet.create()`
- Apply **dynamic colors** from theme as inline style objects
- Combine using array syntax: `style={[styles.static, { color: colors.dynamic }]}`

### 4. Avoid Color Literals

ESLint will warn about hardcoded colors. Use theme colors instead:

```typescript
// ❌ BAD: Hardcoded colors
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF', // ESLint warning!
    color: '#000000',
  },
});

// ✅ GOOD: Theme colors
function MyComponent() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, {
      backgroundColor: colors.background,
      color: colors.text
    }]}>
      {/* ... */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
  },
});
```

**Exception:** Special accent colors (like success green, error red) can be hardcoded if they don't change with theme:

```typescript
const styles = StyleSheet.create({
  successBadge: {
    backgroundColor: '#00D66B', // OK for accent colors
  },
  errorBadge: {
    backgroundColor: '#FF3B30',
  },
});
```

### 5. Avoid Inline Styles

ESLint will warn about inline styles. Use `StyleSheet.create()` instead:

```typescript
// ❌ BAD: Inline styles
<View style={{ padding: 16, marginBottom: 8 }}>
  {/* ESLint warning! */}
</View>

// ✅ GOOD: StyleSheet
<View style={styles.container}>
  {/* ... */}
</View>

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 8,
  },
});
```

**Exception:** Dynamic theme colors are OK as inline styles when combined with StyleSheet:

```typescript
// ✅ OK: Dynamic colors with StyleSheet
const { colors } = useTheme();
<View style={[styles.container, { backgroundColor: colors.surface }]}>
```

## ESLint Rules

The project has automatic style linting configured:

### `react-native/no-unused-styles` (error)
Detects unused styles in `StyleSheet.create()`:

```typescript
const styles = StyleSheet.create({
  container: { padding: 16 },
  unused: { margin: 8 }, // ❌ Error: unused style!
});
```

### `react-native/no-inline-styles` (warning)
Warns when using inline style objects:

```typescript
<View style={{ padding: 16 }}> // ⚠️ Warning
```

### `react-native/no-color-literals` (warning)
Warns about hardcoded color values:

```typescript
const styles = StyleSheet.create({
  text: { color: '#FF0000' }, // ⚠️ Warning
});
```

### `react-native/no-single-element-style-arrays` (warning)
Warns about unnecessary style arrays:

```typescript
<View style={[styles.container]}> // ⚠️ Warning (remove array)
<View style={styles.container}> // ✅ Better
```

## Running Linter

Check for style issues:

```bash
npm run lint
```

This will catch:
- Unused styles
- Inline styles
- Hardcoded colors
- Invalid style patterns

## Common Patterns

### Pattern 1: Simple Component

```typescript
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/theme-context';

export function Header() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        Welcome
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
```

### Pattern 2: Conditional Styles

```typescript
export function StatusBadge({ isActive }: { isActive: boolean }) {
  const { colors } = useTheme();

  return (
    <View style={[
      styles.badge,
      { backgroundColor: colors.surface },
      isActive && styles.activeBadge
    ]}>
      <Text style={[styles.text, { color: colors.text }]}>
        {isActive ? 'Active' : 'Inactive'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  activeBadge: {
    borderWidth: 2,
    borderColor: '#00D66B',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});
```

### Pattern 3: Dimensions and Responsive

```typescript
import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export function FullWidthCard() {
  return <View style={styles.card}>{/* ... */}</View>;
}

const styles = StyleSheet.create({
  card: {
    width: width - 32, // Account for padding
    minHeight: 200,
  },
});
```

## Migration from Separate Style Files

If you have existing style files (e.g., `component-styles.ts`):

1. **Open the component file and the style file side by side**
2. **Copy styles to bottom of component file**
3. **Verify all styles are used** (run `npm run lint`)
4. **Remove unused styles** flagged by ESLint
5. **Delete the separate style file**
6. **Run tests** to ensure nothing broke

## Best Practices Summary

✅ **DO:**
- Co-locate styles with components
- Use `StyleSheet.create()` for all static styles
- Use `useTheme()` for dynamic colors
- Keep styles at the bottom of the file
- Use descriptive style names
- Run `npm run lint` to catch issues

❌ **DON'T:**
- Create separate style files
- Use inline style objects for static styles
- Hardcode colors (use theme)
- Leave unused styles in `StyleSheet.create()`
- Use deeply nested style conditionals

## Questions?

Refer to `CLAUDE.md` for the full project guidelines, or check the example components in:
- `app/(tabs)/home.tsx`
- `app/(tabs)/about.tsx`
- `components/ui/styled-components.tsx` (legacy example)
