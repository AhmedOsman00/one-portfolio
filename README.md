# One Portfolio

A React Native portfolio app built with Expo, TypeScript, and following best practices for mobile development.

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Expo CLI (optional, can use npx)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on iOS:
```bash
npm run ios
```

4. Run on Android:
```bash
npm run android
```

5. Run on Web:
```bash
npm run web
```

## Project Structure

```
one-portfolio/
├── app/                    # Expo Router app directory
│   ├── (tabs)/            # Tab navigation screens
│   ├── _layout.tsx        # Root layout with SafeAreaProvider
│   └── index.tsx          # Entry point
├── components/            # Reusable UI components
│   └── ui/               # UI primitives
├── contexts/             # React Context providers
│   └── theme-context.tsx # Theme management
├── assets/               # Images, fonts, etc.
└── package.json
```

## Features

- ✅ TypeScript with strict mode
- ✅ Expo Router for navigation
- ✅ Dark mode support
- ✅ Safe area handling
- ✅ Styled components
- ✅ Error boundaries
- ✅ Jest testing setup
- ✅ ESLint and Prettier

## Development

### Running Tests

```bash
npm test
```

### Linting

```bash
npm run lint
```

### Formatting

```bash
npm run format
```

## Tech Stack

- **Expo** - React Native framework
- **TypeScript** - Type safety
- **Expo Router** - File-based routing
- **Styled Components** - Component styling
- **React Native Safe Area Context** - Safe area management
- **Jest** - Testing framework
- **React Native Testing Library** - Component testing

## License

ISC

