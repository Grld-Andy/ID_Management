import DeleteDialog from "@/components/Dialog/DeleteDialog";
import EditProductDialog from "@/components/Dialog/Product/EditProductDialog";
import ProductContext from "@/context/productsContext/context";
import Product from "@/types/Product";
import { Check } from "lucide-react";
import React, { useContext } from "react";

interface Props {
  product: Product;
  selectedProducts: Array<string>;
  toggleSelected: (id: string) => void;
}

const ProductItem: React.FC<Props> = ({
  product,
  toggleSelected,
  selectedProducts,
}) => {
  const { productsDispatch } = useContext(ProductContext);

  const deleteProduct = () => {
    try {
      productsDispatch({
        type: "DELETE_PRODUCT",
        payload: [],
        id: product._id,
      });
      console.log("Product deleted successfully.");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="grid grid-cols-[50px,1fr,2fr,repeat(2,1fr),115px] pr-1 bg-white items-center hover:bg-gray-100 transition-colors duration-200">
      <div className="col-span-1 p-3 grid place-items-center hover:bg-gray-100 cursor-pointer">
        <div
          onClick={() => toggleSelected(product._id)}
          className={`border-[1px] w-5 h-5 rounded-sm relative ${
            selectedProducts.some((id) => id == product._id)
              ? "bg-[#0099ff] border-[#0099ff]"
              : "border-black"
          }`}
        >
          <Check className="relative right-[3px] bottom-[3px] scale-90 text-white" />
        </div>
      </div>
      <div className="col-span-1 p-2">{product.name}</div>
      <div className="col-span-1 p-2">{product.description}</div>
      <div className="col-span-1 p-2">{product.price}</div>
      <div className="col-span-1 p-2">{product.createdAt.toDateString()}</div>
      <div className="col-span-1 p-2 flex gap-2">
        <EditProductDialog product={product} />
        <DeleteDialog text={product.name} deleteFunction={deleteProduct} />
      </div>
    </div>
  );
};

export default ProductItem;
