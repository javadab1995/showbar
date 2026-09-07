import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

interface BasketProviderProps {
  children: ReactNode;
}

 interface BasketContextType {
  basket: string[];
  setBasket: React.Dispatch<React.SetStateAction<string[]>>;
}
 const BasketContext = createContext<BasketContextType | null>(null);

export function BasketProvider({ children }: BasketProviderProps) {
  const [basket, setBasket] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("showbar-basket") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("showbar-basket", JSON.stringify(basket));
  }, [basket]);

  return (
    <BasketContext.Provider value={{ basket, setBasket }}>
      {children}
    </BasketContext.Provider>
  );
}

export function useBasket() {
  const context = useContext(BasketContext);

  if (!context) {
    throw new Error("useBasket must be used inside BasketProvider");
  }

  return context;
}
