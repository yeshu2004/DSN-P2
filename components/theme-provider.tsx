'use client';

import type { ReactNode } from 'react';
import { ThemeProvider as NextThemeProvider, type Attribute } from 'next-themes'; // Import Attribute type

// Define the props interface using the Attribute type
interface ThemeProviderProps {
  children: ReactNode;
  attribute?: Attribute; // Use the Attribute type from next-themes
  defaultTheme?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}

export function ThemeProvider({
  children,
  attribute = 'class', // Default value must be a valid Attribute
  defaultTheme = 'dark',
  enableSystem = false,
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  return (
    <NextThemeProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      disableTransitionOnChange={disableTransitionOnChange}
    >
      {children}
    </NextThemeProvider>
  );
}