"use client"; // If using React Server Components
import { ThemeProvider as NextThemeProvider } from "next-themes";

export function ThemeProvider({ children }) {
  return <NextThemeProvider attribute="class">{children}</NextThemeProvider>;
}