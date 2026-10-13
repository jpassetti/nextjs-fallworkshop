"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type HomeHeaderVariant =
  | "v1"
  | "v2"
  | "v3"
  | "v4"
  | "v5"
  | "v6"
  | "v7"
  | "v8"
  | "v9"
  | "v10";

type HomeHeaderVariantContextValue = {
  variant: HomeHeaderVariant;
  setVariant: (variant: HomeHeaderVariant) => void;
};

const HomeHeaderVariantContext = createContext<HomeHeaderVariantContextValue | null>(
  null
);

export const HomeHeaderVariantProvider = ({ children }: { children: ReactNode }) => {
  const [variant, setVariant] = useState<HomeHeaderVariant>("v1");
  const value = useMemo(() => ({ variant, setVariant }), [variant]);
  return (
    <HomeHeaderVariantContext.Provider value={value}>
      {children}
    </HomeHeaderVariantContext.Provider>
  );
};

export const useHomeHeaderVariant = () => {
  const context = useContext(HomeHeaderVariantContext);
  if (!context) {
    return { variant: "v1" as HomeHeaderVariant, setVariant: () => {} };
  }
  return context;
};
