"use client";
import { useState, useEffect } from "react";
import OrdersContainerForUser from "../components/ordersContainerForUser";
import { useLoadingAnimationContext } from "../hooks/useLoadingAnimationContext";

async function getOrders() {
  const api_url = process.env.NEXT_PUBLIC_SERVER_URL;
  try {
    const res = await fetch(`${api_url}/orders/admin`, { cache: "no-store" });
    return res.json();
  } catch (e) {
    throw e;
  }
}

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const { setShowLoadingAnimation } = useLoadingAnimationContext();
  const [errorOccured, setErrorOccured] = useState(false);

  useEffect(() => {
    setErrorOccured(false);
    setShowLoadingAnimation(true);
    getOrders()
      .then((res) => {
        if (res.success == true) {
          console.log("successs!!!!!!!!!!");
          setOrders(res.orders);
          console.log(orders);
          console.log(orders);
        } else {
          setErrorOccured(true);
        }
        setShowLoadingAnimation(false);
      })
      .catch((e) => {
        console.log(e);
        setErrorOccured(true);
        setShowLoadingAnimation(false);
      });
  }, []);

  if (errorOccured) {
    return (
      <main className="h-full flex flex-col justify-center items-center">
        <p className="large_n_bold_text">
          Sorry! Somthing went wrong. Failed to get the list of orders
        </p>
        <p>Maybe try refreshing the page</p>
      </main>
    );
  } else {
    return (
      <main>
        {orders.map((usersOrder) => (
          <OrdersContainerForUser
            usersOrders={usersOrder}
            key={usersOrder._id}
          />
        ))}
      </main>
    );
  }
}
