import React, { useEffect, useReducer } from "react";
import ProductContext from "./context";
import { ProductReducer } from "@/reducers/ProductReducer";
import currentProducts from "@/data/products";

interface Props {
  children: React.ReactNode;
}

const ProductContextProvider: React.FC<Props> = ({ children }) => {
  const [products, productsDispatch] = useReducer(ProductReducer, []);

  useEffect(() => {
    productsDispatch({ type: "REFRESH_PRODUCTS", payload: currentProducts });
  }, []);

  return (
    <ProductContext.Provider value={{ products, productsDispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
