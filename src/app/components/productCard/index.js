"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bars } from "react-loader-spinner";
import axios from "axios";
import numberFormat from "z-number-format";
import "./style.css";
import { useProductsListContext } from "@/app/hooks/useProductsListContext";

function CardLoadingAnimation() {
  return (
    <div className="loading-overlay">
      <Bars width="20" height="20" color="#ffffff" />
    </div>
  );
}

export default function ProductCard(props) {
  const [showCardLoadingAnimation, setShowCardLoadingAnimation] =
    useState(false);
  const { productsList, setProductsList } = useProductsListContext();

  async function deleteProduct() {
    try {
      setShowCardLoadingAnimation(true);
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/products/${props.productId}`
      );
      if (res.status == 200) {
        // remove deleted product from productsList so that we can re-render productsList
        // without making a request to server
        const newProductsList = productsList.filter((product) => {
          return product._id != props.productId;
        });
        setProductsList(newProductsList);
      }
    } catch (e) {
      console.log("unsuccessful");
    }
  }

  return (
    <div className="bg-white inline-block p-4 shadow-lg relative">
      {showCardLoadingAnimation && <CardLoadingAnimation />}
      <Image src={props.image} width={230} height={200} />
      <p className="text-lg">{props.productName}</p>
      <p className="font-bold">k{numberFormat(props.price)}</p>
      <div className="flex flex-col gap-1 mt-1">
        <Link href="/products/edit" className="primary-btn">
          Edit
        </Link>
        <button className="primary-btn" onClick={deleteProduct}>
          delete
        </button>
      </div>
    </div>
  );
}
