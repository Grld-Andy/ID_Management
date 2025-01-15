import DeleteDialog from "@/components/Dialog/DeleteDialog";
import EditOrderDialog from "@/components/Dialog/Order/EditOrderDialog";
import OrderContext from "@/context/orderContext/context";
import Order from "@/types/Order";
import { Check } from "lucide-react";
import React, { useContext } from "react";

interface Props {
  order: Order;
  selectedOrders: Array<string>;
  toggleSelected: (id: string) => void;
}

const OrderItem: React.FC<Props> = ({
  order,
  toggleSelected,
  selectedOrders,
}) => {
  const { ordersDispatch } = useContext(OrderContext);

  const deleteOrder = () => {
    try {
      ordersDispatch({
        type: "DELETE_ORDER",
        payload: [],
        id: order._id,
      });
      console.log("Order deleted successfully.");
    } catch (error) {
      console.error("Error deleting Order:", error);
    }
  };

  return (
    <div className="grid grid-cols-[50px,70px,repeat(2,1fr),0.5fr,1fr,115px] pr-1 bg-white items-center hover:bg-gray-100 transition-colors duration-200">
      <div className="col-span-1 p-3 grid place-items-center hover:bg-gray-100 cursor-pointer">
        <div
          onClick={() => toggleSelected(order._id || "")}
          className={`border-[1px] w-5 h-5 rounded-sm relative ${
            selectedOrders.some((id) => id == order._id)
              ? "bg-[#0099ff] border-[#0099ff]"
              : "border-black"
          }`}
        >
          <Check className="relative right-[3px] bottom-[3px] scale-90 text-white" />
        </div>
      </div>
      <div className="col-span-1 p-2">{order._id}</div>
      <div className="col-span-1 p-2">{order.clientName}</div>
      <div className="col-span-1 p-2">{order.totalPrice}</div>
      <div className="col-span-1 p-2 flex justify-center">
        <span
          className={`flex items-center w-[75px] text-sm justify-center text-white rounded-2xl ${
            order.status == "cancelled"
              ? "bg-red-600 "
              : order.status == "completed"
              ? "bg-green-500"
              : "bg-yellow-600"
          }`}
        >
          {order.status}
        </span>
      </div>
      <div className="col-span-1 p-2">{order.createdAt.toDateString()}</div>
      <div className="col-span-1 p-2 flex gap-2">
        <EditOrderDialog order={order} />
        <DeleteDialog
          text={`${order.clientName || ""}'s order`}
          deleteFunction={deleteOrder}
        />
      </div>
    </div>
  );
};

export default OrderItem;
