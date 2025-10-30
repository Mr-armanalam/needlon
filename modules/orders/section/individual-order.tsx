import React from "react";
import OrderDetails from "../components/oder-details";
import OrderStatus from "../components/order-status";

const IndividualOrder = () => {
  return (
    <div className="px-6">
      <h1 className="text-3xl mb-2 font-garamond font-semibold text-gray-900">Order Details</h1>
      <OrderDetails />
      <OrderStatus />
    </div>
  );
};

export default IndividualOrder;
