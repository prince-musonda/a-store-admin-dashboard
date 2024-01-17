"use client";

import { createContext, useState } from "react";

export const LoadingAnimationContext = createContext();

export function LoadingAnimationContextProvider({ children }) {
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);

  return (
    <LoadingAnimationContext.Provider
      value={{ showLoadingAnimation, setShowLoadingAnimation }}
    >
      {children}
    </LoadingAnimationContext.Provider>
  );
}
