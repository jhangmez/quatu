import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'
import { withUt } from 'uploadthing/tw'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{ts,tsx}',
    './public/**/*.html',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        light: {
          primary: '#353efd',
          onPrimary: '#ffffff',
          primaryContainer: '#e0e0ff',
          onPrimaryContainer: '#00006e',
          primaryFixed: '#e0e0ff',
          onPrimaryFixed: '#00006e',
          primaryFixedDim: '#bfc2ff',
          onPrimaryFixedVariant: '#0c0fe8',
          secondary: '#5c5d72',
          onSecondary: '#ffffff',
          secondaryContainer: '#e1e0f9',
          onSecondaryContainer: '#191a2c',
          secondaryFixed: '#e1e0f9',
          onSecondaryFixed: '#191a2c',
          secondaryFixedDim: '#c5c4dd',
          onSecondaryFixedVariant: '#444559',
          tertiary: '#78536b',
          onTertiary: '#ffffff',
          tertiaryContainer: '#ffd8ee',
          onTertiaryContainer: '#2e1126',
          tertiaryFixed: '#ffd8ee',
          onTertiaryFixed: '#2e1126',
          tertiaryFixedDim: '#e8b9d5',
          onTertiaryFixedVariant: '#5e3c52',
          error: '#ba1a1a',
          errorContainer: '#ffdad6',
          onError: '#ffffff',
          onErrorContainer: '#410002',
          background: '#fffbff',
          onBackground: '#1b1b1f',
          outline: '#777680',
          inverseOnSurface: '#f3eff4',
          inverseSurface: '#303034',
          inversePrimary: '#bfc2ff',
          shadow: '#000000',
          surfaceTint: '#353efd',
          outlineVariant: '#c7c5d0',
          scrim: '#000000',
          surface: '#fcf8fd',
          onSurface: '#1b1b1f',
          surfaceVariant: '#e4e1ec',
          onSurfaceVariant: '#46464f',
          surfaceContainerHighest: '#e5e1e6',
          surfaceContainerHigh: '#eae7ec',
          surfaceContainer: '#f0edf1',
          surfaceContainerLow: '#f6f2f7',
          surfaceContainerLowest: '#ffffff',
          surfaceDim: '#dcd9de',
          surfaceBright: '#fcf8fd'
        },
        dark: {
          primary: '#bfc2ff',
          onPrimary: '#0000ac',
          primaryContainer: '#0c0fe8',
          onPrimaryContainer: '#e0e0ff',
          primaryFixed: '#e0e0ff',
          onPrimaryFixed: '#00006e',
          primaryFixedDim: '#bfc2ff',
          onPrimaryFixedVariant: '#0c0fe8',
          secondary: '#c5c4dd',
          onSecondary: '#2e2f42',
          secondaryContainer: '#444559',
          onSecondaryContainer: '#e1e0f9',
          secondaryFixed: '#e1e0f9',
          onSecondaryFixed: '#191a2c',
          secondaryFixedDim: '#c5c4dd',
          onSecondaryFixedVariant: '#444559',
          tertiary: '#e8b9d5',
          onTertiary: '#46263b',
          tertiaryContainer: '#5e3c52',
          onTertiaryContainer: '#ffd8ee',
          tertiaryFixed: '#ffd8ee',
          onTertiaryFixed: '#2e1126',
          tertiaryFixedDim: '#e8b9d5',
          onTertiaryFixedVariant: '#5e3c52',
          error: '#ffb4ab',
          errorContainer: '#93000a',
          onError: '#690005',
          onErrorContainer: '#ffdad6',
          background: '#1b1b1f',
          onBackground: '#e5e1e6',
          outline: '#918f9a',
          inverseOnSurface: '#1b1b1f',
          inverseSurface: '#e5e1e6',
          inversePrimary: '#353efd',
          shadow: '#000000',
          surfaceTint: '#bfc2ff',
          outlineVariant: '#46464f',
          scrim: '#000000',
          surface: '#131316',
          onSurface: '#c8c5ca',
          surfaceVariant: '#46464f',
          onSurfaceVariant: '#c7c5d0',
          surfaceContainerHighest: '#353438',
          surfaceContainerHigh: '#2a292d',
          surfaceContainer: '#201f23',
          surfaceContainerLow: '#1b1b1f',
          surfaceContainerLowest: '#0e0e11',
          surfaceDim: '#131316',
          surfaceBright: '#39393c'
        }
      },
      opacity: {
        '8': '.08',
        '12': '.12',
        '16': '.16'
      }
    }
  },
  plugins: [
    nextui({
      themes: {
        light: {
          // ...
          colors: {
            primary: '#353efd',
            secondary: '#5c5d72'
          }
        },
        dark: {
          // ...
          colors: {
            primary: '#bfc2ff',
            secondary: '#c5c4dd'
          }
        }
        // ... custom themes
      }
    })
  ]
}
export default withUt(config)
