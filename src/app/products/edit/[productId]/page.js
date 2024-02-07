"use client";

import ProductForm from "@/app/components/form";
import { useEffect, useState } from "react";
import axios from "axios";
import { useProductsListContext } from "@/app/hooks/useProductsListContext";

export default function ProductEditPage({ params }) {
  const productId = params.productId;
  const [product, setProduct] = useState();
  const { productsList } = useProductsListContext();

  // get info about product
  // we will populate the ProductForm with this information
  async function getProductInfo() {
    try {
      console.log("feting product info");
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/products/id/${productId}`
      );
      console.log(res.data);
      setProduct(res.data);
    } catch (e) {
      //if failed, try getting the product information from existing products list
      const foundProduct = productsList.filter(
        (product) => product._id == productId
      );
      setProduct(foundProduct);
    }
  }

  useEffect(() => {
    getProductInfo();
    console.log(product);
  }, []);

  // check if product exists before accessing it
  const isEditing = product?.hasOwnProperty("_id");
  if (!isEditing) {
    return <></>;
  }

  return (
    <ProductForm
      isEditing={isEditing}
      productId={product._id}
      price={product.price}
      quantity={product.quantity}
      productName={product.productName}
      description={product.description}
      sizes={product.sizes}
      categories={product.categories}
      imagesUrl={product.imagesUrl}
    />
  );
}
