import Order from "@/types/Order";
import { createContext, Dispatch } from "react";

interface OrderContextType {
  orders: Array<Order>;
  ordersDispatch: Dispatch<{
    type: string;
    payload: Array<Order>;
    id?: string;
  }>;
}

const OrderContext = createContext<OrderContextType>({
  orders: [],
  ordersDispatch: () => null,
});

export default OrderContext;
