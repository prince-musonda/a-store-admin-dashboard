import Image from "next/image";
export default function OrderedProductCard(orderedProduct) {
  return (
    <div
      className="bg-slate-200 text-center  rounded p-1 shadow"
      key={orderedProduct._id}
    >
      <div className="flex justify-center">
        <Image
          width={200}
          height={200}
          alt={orderedProduct.productName}
          src={orderedProduct.image}
        />
      </div>
      {/* product Name */}
      <p className="text-center">{orderedProduct.productName}</p>
      {/* price */}
      <p>k{orderedProduct.price}</p>
      {/* quantity */}
      <p>quantity: {orderedProduct.quantity}</p>
      <p className="font-bold">
        total price: k{+orderedProduct.quantity * +orderedProduct.price}
      </p>
      {/* product size */}
      {orderedProduct.size && <p>size: {orderedProduct.size}</p>}
      {/* delivery status */}
      {orderedProduct.delivered == false ? (
        <p>
          Delivery: <span className="text-red-600">Not yet Delivered</span>
        </p>
      ) : (
        <p className="text-green-600">Successfully delivered</p>
      )}
      {orderedProduct.paymentReceived && <p>Payment Received</p>}
      {/* delivery location */}
      <p>To be delivered to: {orderedProduct.deliveryLocation}</p>
      <p>Contact info: {orderedProduct.contactDetail}</p>
      <div>
        <button className="primary-btn mb-1">Mark as delivered</button>
        <button className="primary-btn">Mark payment received</button>
      </div>
    </div>
  );
}
