"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import type { Locale } from "@/types";

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (en: string, id: string) => string;
}

const LocaleContext = createContext<LocaleContextType>({
  locale: "en",
  setLocale: () => {},
  t: (en: string) => en,
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  const t = useCallback(
    (en: string, id: string) => (locale === "en" ? en : id),
    [locale]
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
