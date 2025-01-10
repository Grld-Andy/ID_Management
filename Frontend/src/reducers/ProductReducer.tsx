import Product from "@/types/Product";

export const ProductReducer = (
  state: Array<Product>,
  action: { type: string; payload: Array<Product> }
): Array<Product> => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return [...state, ...action.payload];
    case "UPDATE_PRODUCT":
      return state.map((product) => {
        if (product._id == action.payload[0]._id) {
          return { ...product, ...action.payload[0] };
        } else {
          return { ...product };
        }
      });
    case "DELETE_PRODUCT":
      return state.filter((product) => product._id != action.payload[0]._id);
    case "REFRESH_PRODUCTS":
      return action.payload;
    case "DELETE_ALL_PRODUCTS":
      return [];
    default:
      return state;
  }
};
