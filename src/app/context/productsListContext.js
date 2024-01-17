"use client";
import { createContext, useState } from "react";

export const ProductsListContext = createContext();

export function ProductsListProvider({ children }) {
  const [productsList, setProductsList] = useState([]);

  return (
    <ProductsListContext.Provider value={{ productsList, setProductsList }}>
      {children}
    </ProductsListContext.Provider>
  );
}
