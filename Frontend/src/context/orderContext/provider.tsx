import React, { useEffect, useReducer } from "react";
import OrderContext from "./context";
import { OrderReducer } from "@/reducers/OrderReducer";
import currentOrders from "@/data/orders";

interface Props {
  children: React.ReactNode;
}

const OrderContextProvider: React.FC<Props> = ({ children }) => {
  const [orders, ordersDispatch] = useReducer(OrderReducer, []);

  useEffect(() => {
    ordersDispatch({ type: "REFRESH_ORDERS", payload: currentOrders });
  }, []);

  return (
    <OrderContext.Provider value={{ orders, ordersDispatch }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;
