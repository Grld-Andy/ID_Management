import {
  ArrowDown01,
  ArrowDown10,
  ArrowDownAZ,
  ArrowDownZA,
  Check,
} from "lucide-react";
import React from "react";
import Order from "@/types/Order";
import OrderItem from "./OrderItem";

interface Props {
  orders: Array<Order>;
  sortBy: string;
  setSortBy: (val: string) => void;
  selectedOrders: Array<string>;
  setSelectedOrders: React.Dispatch<React.SetStateAction<string[]>>;
}

const OrdersTable: React.FC<Props> = ({
  orders,
  sortBy,
  setSortBy,
  selectedOrders,
  setSelectedOrders,
}) => {
  const toggleSelected = (itemId: string) => {
    if (selectedOrders.some((id) => id == itemId)) {
      removeFromSelected(itemId);
    } else {
      addToSelected(itemId);
    }
  };

  const toggleAll = () => {
    if (selectedOrders.length == orders.length) {
      setSelectedOrders([]);
    } else {
      const allOrderIds = orders.map((order) => order._id || "");
      setSelectedOrders(allOrderIds);
    }
  };

  const addToSelected = (itemId: string) => {
    setSelectedOrders((prev) => [...prev, itemId]);
  };

  const removeFromSelected = (itemId: string) => {
    setSelectedOrders((prev) => prev.filter((id) => id != itemId));
  };

  const toggleSortOrder = (val: string) => {
    if (sortBy != val) {
      setSortBy(val);
    } else {
      setSortBy(sortBy.startsWith("-") ? sortBy.slice(1) : `-${val}`);
    }
  };

  return (
    <>
      {orders.length > 0 ? (
        <div className="min-h-[650px]">
          <div className="w-full border-2 border-border1 rounded-md overflow-hidden">
            <div className="grid grid-cols-[50px,70px,repeat(2,1fr),0.5fr,1fr,115px] bg-gradient-to-r from-color1 to-color2 font-bold text-white">
              <div
                className={`col-span-1 p-3 ${
                  selectedOrders.length == orders.length ? "" : "opacity-0"
                } hover:opacity-100 transition-opacity duration-300 grid place-items-center`}
              >
                <div
                  onClick={toggleAll}
                  className={`border-[1px] w-5 h-5 rounded-sm relative cursor-pointer ${
                    selectedOrders.length == orders.length
                      ? "bg-color2 border-color2"
                      : "border-black"
                  }`}
                >
                  <Check className="relative right-[3px] bottom-[3px] scale-90 text-white" />
                </div>
              </div>
              <div className="col-span-1 flex p-3">
                <p>ID</p>
              </div>
              <div
                onClick={() => {
                  toggleSortOrder("client");
                }}
                className="col-span-1 flex cursor-pointer p-3 hover:bg-[#fff5]"
              >
                <p>Client</p>
                {sortBy == "client" && (
                  <div>
                    <ArrowDownAZ className="text-green-700" />
                  </div>
                )}
                {sortBy == "-client" && (
                  <div>
                    <ArrowDownZA className="text-red-900" />
                  </div>
                )}
              </div>
              <div
                onClick={() => {
                  toggleSortOrder("price");
                }}
                className="col-span-1 flex cursor-pointer p-3 hover:bg-[#fff5]"
              >
                <p>Price</p>
                {sortBy == "price" && (
                  <div>
                    <ArrowDown01 className="text-green-700" />
                  </div>
                )}
                {sortBy == "-price" && (
                  <div>
                    <ArrowDown10 className="text-red-900" />
                  </div>
                )}
              </div>
              <div
                onClick={() => {
                  toggleSortOrder("status");
                }}
                className="col-span-1 flex cursor-pointer p-3 hover:bg-[#fff5] justify-center"
              >
                <p>Status</p>
                {sortBy == "status" && (
                  <div>
                    <ArrowDown01 className="text-green-700" />
                  </div>
                )}
                {sortBy == "-status" && (
                  <div>
                    <ArrowDown10 className="text-red-900" />
                  </div>
                )}
              </div>
              <div
                onClick={() => {
                  toggleSortOrder("createdAt");
                }}
                className="col-span-1 flex cursor-pointer p-3 hover:bg-[#fff5]"
              >
                <p>Added</p>
                {sortBy == "createdAt" && (
                  <div>
                    <ArrowDown01 className="text-green-700" />
                  </div>
                )}
                {sortBy == "-createdAt" && (
                  <div>
                    <ArrowDown10 className="text-red-900" />
                  </div>
                )}
              </div>
              <div className="col-span-1 p-3 flex">
                <p>Actions</p>
              </div>
            </div>
            <div className="divide-y divide-gray-300">
              {orders.map((order, index) => (
                <OrderItem
                  key={index}
                  order={order}
                  selectedOrders={selectedOrders}
                  toggleSelected={toggleSelected}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-[20px] font-medium text-gray-700">
          No Orders found
        </h1>
      )}
    </>
  );
};

export default OrdersTable;
