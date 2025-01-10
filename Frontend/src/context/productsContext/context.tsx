import Product from "@/types/Product";
import { createContext, Dispatch } from "react";

interface ProductContextType {
  products: Array<Product>;
  productsDispatch: Dispatch<{ type: string; payload: Array<Product> }>;
}

const ProductContext = createContext<ProductContextType>({
  products: [],
  productsDispatch: () => null,
});

export default ProductContext;
