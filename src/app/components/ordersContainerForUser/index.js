import OrderedProductCard from "../orderedProductCard";
import "./styling.css";

export default function OrdersContainerForUser({ usersOrders }) {
  return (
    <div className="shadow-xl rounded bg-white p-2" key={usersOrders._id}>
      <h1>
        Orders by{" "}
        <span className="large_n_bold_text text-blue-600">
          {usersOrders.firstName} {usersOrders.lastName}
        </span>
      </h1>

      {/* orders */}
      <div className="grid">
        {usersOrders.orderedProducts.map((orderedProduct) => {
          return <OrderedProductCard {...orderedProduct} />;
        })}
      </div>
    </div>
  );
}
