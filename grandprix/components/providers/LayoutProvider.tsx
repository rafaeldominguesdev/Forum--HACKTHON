"use client";

import React, { createContext, useContext, useState } from "react";

interface LayoutContextType {
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (val: boolean) => void;
}

const LayoutContext = createContext<LayoutContextType>({
  isSidebarCollapsed: false,
  setIsSidebarCollapsed: () => {},
});

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <LayoutContext.Provider value={{ isSidebarCollapsed, setIsSidebarCollapsed }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  return useContext(LayoutContext);
}
