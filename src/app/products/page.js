"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/productCard/index.js";
import Link from "next/link.js";
import { useLoadingAnimationContext } from "../hooks/useLoadingAnimationContext.js";

export default function ProductsPage() {
  const [productsList, setProductsList] = useState([]);
  const [showLoadingAnimation, setShowLoadingAnimation] =
    useLoadingAnimationContext();

  async function getAllProducts() {
    // get all products from database
    try {
      setShowLoadingAnimation(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/products`
      );
      console.log(res.data);
      if (res.status == 200) {
        setProductsList(res.data);
      }
    } catch (e) {}
    setShowLoadingAnimation(false);
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      {/* Add new products button */}
      <Link
        href="/products/add"
        className="bg-black text-white font-medium py-1 px-3 rounded"
      >
        Add New Product
      </Link>

      {/*show products list */}
      <p className="mt-5 mb-3 text-gray-500 text-xl font-black">
        Your Products:
      </p>
      {/* when no products exist */}
      {!productsList && (
        <p className="text-lg">Couln't find any products in your database</p>
      )}
      {/* when products exist */}
      <div className="flex flex-wrap justify-center gap-2">
        {productsList &&
          productsList.map((product) => {
            const { productName, _id: productId, price, imagesUrl } = product;
            const image = imagesUrl[0];
            return (
              <ProductCard
                productName={productName}
                productId={productId}
                price={price}
                image={image}
                key={productId}
              />
            );
          })}
      </div>
    </>
  );
}
