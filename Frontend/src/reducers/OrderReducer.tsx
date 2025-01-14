import Order from "@/types/Order";

export const OrderReducer = (
  state: Array<Order>,
  action: { type: string; payload: Array<Order>; id?: string }
): Array<Order> => {
  switch (action.type) {
    case "ADD_ORDER":
      return [...state, ...action.payload];
    case "UPDATE_ORDER":
      return state.map((ORDER) => {
        console.log("here");
        if (ORDER._id == action.payload[0]._id) {
          console.log("update item");
          return { ...ORDER, ...action.payload[0] };
        } else {
          return { ...ORDER };
        }
      });
    case "DELETE_ORDER":
      return state.filter((ORDER) => ORDER._id != action.id);
    case "REFRESH_ORDERS":
      return action.payload;
    case "DELETE_ALL_ORDERS":
      return [];
    default:
      return state;
  }
};
