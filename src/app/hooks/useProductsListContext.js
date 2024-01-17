import { useContext } from "react";
import { ProductsListContext } from "../context/productsListContext";

export function useProductsListContext() {
  const { productsList, setProductsList } = useContext(ProductsListContext);
  return { productsList, setProductsList };
}
