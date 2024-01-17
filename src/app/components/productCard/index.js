"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bars } from "react-loader-spinner";
import "./style.css";

function LoadingComponent() {
  return (
    <div className="loading-overlay">
      <Bars width="20" height="20" color="#ffffff" />
    </div>
  );
}

export default function ProductCard(props) {
  const [showLoadingComponent, setShowLoadingComponent] = useState(false);

  async function deleteProduct(productId) {
    try {
      console.log("deleting");
      setShowLoadingComponent(true);
      const res = axios.delete(
        `${process.env.SERVER_URL}/products/${productId}`
      );
    } catch (e) {}
  }

  return (
    <div className="bg-white inline-block p-4 shadow-lg relative">
      {showLoadingComponent && <LoadingComponent />}
      <Image src={props.image} width={230} height={200} />
      <p className="font-bold">{props.productName}</p>
      <p className="font-bold">k{props.price}</p>
      <div className="flex flex-col gap-1">
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
