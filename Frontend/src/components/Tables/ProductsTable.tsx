import { ArrowUpAz, Pencil, Trash } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import products from "@/data/products";

const ProductsTable: React.FC = () => {
  return (
    <div className="w-full border rounded-md overflow-hidden">
      <div className="grid grid-cols-[repeat(4,1fr),110px] bg-gray-200 font-bold text-gray-700 rounded-t-md">
        <div className="col-span-1 flex cursor-pointer p-3 hover:bg-gray-100">
          <p>Name</p>
          <div>
            <ArrowUpAz />
          </div>
        </div>
        <div className="col-span-1 p-3 flex hover:bg-gray-100 cursor-pointer">
          <p>Description</p>
        </div>
        <div className="col-span-1 p-3 flex hover:bg-gray-100 cursor-pointer">
          <p>Price</p>
        </div>
        <div className="col-span-1 p-3 flex hover:bg-gray-100 cursor-pointer">
          <p>Added</p>
        </div>
        <div className="col-span-1 p-3 flex">
          <p>Actions</p>
        </div>
      </div>
      <div className="divide-y divide-gray-300">
        {products.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-[repeat(4,1fr),115px] p-1 bg-white items-center hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="col-span-1 p-2">{product.name}</div>
            <div className="col-span-1 p-2">{product.description}</div>
            <div className="col-span-1 p-2">{product.price}</div>
            <div className="col-span-1 p-2">
              {product.createdAt.toDateString()}
            </div>
            <div className="col-span-1 p-2 flex gap-2">
              <Button>
                <Pencil />
              </Button>
              <Button variant={"destructive"}>
                <Trash />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsTable;
