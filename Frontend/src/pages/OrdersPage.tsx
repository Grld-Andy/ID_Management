import { PaginationList } from "@/components/Layout/PaginationList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation, useNavigate } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import React, { useContext, useMemo, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import DeleteDialog from "@/components/Dialog/DeleteDialog";
import OrderContext from "@/context/orderContext/context";
import CreateOrderDialog from "@/components/Dialog/Order/CreateOrderDialog";
import OrdersTable from "@/components/Tables/Order/OrderTable";

interface OrderFilters {
  minPrice: number;
  maxPrice: number;
}

const StocksPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get("page") || "1", 10);
  const { orders, ordersDispatch } = useContext(OrderContext);
  const [search, setSearch] = useState<string>("");
  const [selectedOrders, setSelectedOrders] = useState<Array<string>>([]);
  const [sortBy, setSortBy] = useState<string>("name");
  const [filters, setFilters] = useState<OrderFilters>({
    minPrice: 0,
    maxPrice: 0,
  });

  const filteredOrders = useMemo(() => {
    let filtered = orders.filter((item) =>
      item.clientName?.toLowerCase().includes(search.toLowerCase())
    );
    // if (filters.minPrice) {
    //   filtered = filtered.filter(
    //     (order) => order.price >= filters.minPrice
    //   );
    // }
    // if (filters.maxPrice && filters.maxPrice > filters.minPrice) {
    //   filtered = filtered.filter(
    //     (order) => order.price <= filters.maxPrice
    //   );
    // }
    // if (sortBy.startsWith("-")) {
    //   const key = sortBy.slice(1);
    //   filtered = filtered.sort((a: any, b: any) => {
    //     if (typeof b[key] === "number" && typeof a[key] === "number") {
    //       return b[key] - a[key];
    //     } else if (b[key] instanceof Date && a[key] instanceof Date) {
    //       return b[key].getTime() - a[key].getTime();
    //     } else if (typeof b[key] === "string" && typeof a[key] === "string") {
    //       return b[key].localeCompare(a[key]);
    //     }
    //     return 0;
    //   });
    // } else {
    //   filtered = filtered.sort((a: any, b: any) => {
    //     if (typeof b[sortBy] === "number" && typeof a[sortBy] === "number") {
    //       return a[sortBy] - b[sortBy];
    //     } else if (b[sortBy] instanceof Date && a[sortBy] instanceof Date) {
    //       return a[sortBy].getTime() - b[sortBy].getTime();
    //     } else if (
    //       typeof b[sortBy] === "string" &&
    //       typeof a[sortBy] === "string"
    //     ) {
    //       return a[sortBy].localeCompare(b[sortBy]);
    //     }
    //     return 0;
    //   });
    // }
    return filtered;
  }, [orders, search, filters, sortBy, currentPage]);

  const itemsPerPage = 10;
  const totalItems = filteredOrders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedOrders = useMemo(() => {
    let startIndex = (currentPage - 1) * itemsPerPage;
    if (startIndex > filteredOrders.length) {
      navigate("/orders?page=1");
    }
    const endIndex = startIndex + itemsPerPage;
    return filteredOrders.slice(startIndex, endIndex);
  }, [filteredOrders, currentPage]);

  const deleteSelectedOrders = async () => {
    await Promise.all(
      selectedOrders.map(async (orderId) => {
        try {
          ordersDispatch({
            type: "DELETE_ORDER",
            payload: [],
            id: orderId,
          });
        } catch (error) {
          console.error(`Error deleting order with ID ${orderId}:`, error);
        }
      })
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between align-center">
        <div className="flex gap-2 align-center">
          <h1 className="text-[28px] font-bold">Orders</h1>
          <span
            title="Total Orders"
            className="relative font-medium top-2 rounded-xl px-1 bg-blue-700 text-white h-7 grid place-items-center"
          >
            <p>{orders.length}</p>
          </span>
        </div>
      </div>
      <div className="grid items-center gap-5 grid-cols-[1fr,190px]">
        <div className="flex items-center gap-4 w-full">
          <div className="flex align-center relative w-full max-w-[500px]">
            <Input
              placeholder="Order Name..."
              type="text"
              name="search"
              id="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className="pr-8 w-full"
            />
            <Search className="h-full absolute right-2 cursor-pointer" />
          </div>
        </div>

        <div className="flex gap-2 place-content-end">
          {selectedOrders.length > 0 && (
            <>
              <DeleteDialog
                text={" selected Orders."}
                buttonText={"Delete"}
                deleteFunction={deleteSelectedOrders}
              />
            </>
          )}
          <Popover>
            <PopoverTrigger>
              <Button title="Filter">
                <p className="hidden xl:block" aria-description="filter Orders">
                  Filter
                </p>
                <Filter />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="width">Min. Price</Label>
                  <Input
                    id="width"
                    type="number"
                    placeholder="100"
                    value={filters.minPrice}
                    onChange={(e) => {
                      setFilters((prev) => {
                        return { ...prev, minPrice: Number(e.target.value) };
                      });
                    }}
                    className="col-span-2 h-8"
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxWidth">Max. Price</Label>
                  <Input
                    id="maxWidth"
                    type="number"
                    placeholder="300"
                    value={filters.maxPrice}
                    onChange={(e) => {
                      setFilters((prev) => {
                        return { ...prev, maxPrice: Number(e.target.value) };
                      });
                    }}
                    className="col-span-2 h-8"
                  />
                </div>
                {/* <div className="grid grid-cols-3 items-center gap-4">
                  <Button className="col-end-4" onClick={filterByPrice}>
                    Filter
                  </Button>
                </div> */}
              </div>
            </PopoverContent>
          </Popover>
          <CreateOrderDialog />
        </div>
      </div>

      <OrdersTable
        orders={paginatedOrders}
        sortBy={sortBy}
        selectedOrders={selectedOrders}
        setSelectedOrders={setSelectedOrders}
        setSortBy={setSortBy}
      />
      {paginatedOrders.length ? (
        <PaginationList
          totalPages={totalPages}
          baseUrl={"/orders"}
          length={orders.length}
          currentPage={currentPage}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default StocksPage;
