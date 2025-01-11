import {
  ArrowDown01,
  ArrowDown10,
  ArrowDownAZ,
  ArrowDownZA,
  Check,
} from "lucide-react";
import React from "react";
import Product from "@/types/Product";
import ProductItem from "./ProductItem";

interface Props {
  products: Array<Product>;
  sortBy: string;
  setSortBy: (val: string) => void;
  selectedProducts: Array<string>;
  setSelectedProducts: React.Dispatch<React.SetStateAction<string[]>>;
}

const ProductsTable: React.FC<Props> = ({
  products,
  sortBy,
  setSortBy,
  selectedProducts,
  setSelectedProducts,
}) => {
  const toggleSelected = (itemId: string) => {
    if (selectedProducts.some((id) => id == itemId)) {
      removeFromSelected(itemId);
    } else {
      addToSelected(itemId);
    }
  };

  const toggleAll = () => {
    if (selectedProducts.length == products.length) {
      setSelectedProducts([]);
    } else {
      const allProductIds = products.map((product) => product._id);
      setSelectedProducts(allProductIds);
    }
  };

  const addToSelected = (itemId: string) => {
    setSelectedProducts((prev) => [...prev, itemId]);
  };

  const removeFromSelected = (itemId: string) => {
    setSelectedProducts((prev) => prev.filter((id) => id != itemId));
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
      {products.length > 0 ? (
        <div className="min-h-[650px]">
          <div className="w-full border rounded-md overflow-hidden">
            <div className="grid grid-cols-[50px,1fr,2fr,repeat(2,1fr),115px] pr-1 bg-gray-200 font-bold text-gray-700 rounded-t-md">
              <div
                className={`col-span-1 border p-3 ${
                  selectedProducts.length == products.length ? "" : "opacity-0"
                } hover:opacity-100 transition-opacity duration-300 grid place-items-center`}
              >
                <div
                  onClick={toggleAll}
                  className={`border-[1px] w-5 h-5 rounded-sm relative cursor-pointer ${
                    selectedProducts.length == products.length
                      ? "bg-[#0099ff] border-[#0099ff]"
                      : "border-black"
                  }`}
                >
                  <Check className="relative right-[3px] bottom-[3px] scale-90 text-white" />
                </div>
              </div>
              <div
                onClick={() => {
                  toggleSortOrder("name");
                }}
                className="col-span-1 flex cursor-pointer p-3 hover:bg-gray-100"
              >
                <p>Name</p>
                {sortBy == "name" && (
                  <div>
                    <ArrowDownAZ className="text-green-700" />
                  </div>
                )}
                {sortBy == "-name" && (
                  <div>
                    <ArrowDownZA className="text-red-900" />
                  </div>
                )}
              </div>
              <div className="col-span-1 p-3 flex hover:bg-gray-100 cursor-pointer">
                <p>Description</p>
              </div>
              <div
                onClick={() => {
                  toggleSortOrder("price");
                }}
                className="col-span-1 p-3 flex hover:bg-gray-100 cursor-pointer"
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
                  toggleSortOrder("createdAt");
                }}
                className="col-span-1 p-3 flex hover:bg-gray-100 cursor-pointer"
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
              {products.map((product, index) => (
                <ProductItem
                  key={index}
                  product={product}
                  selectedProducts={selectedProducts}
                  toggleSelected={toggleSelected}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-[20px] font-medium text-gray-700">
          No products found
        </h1>
      )}
    </>
  );
};

export default ProductsTable;
