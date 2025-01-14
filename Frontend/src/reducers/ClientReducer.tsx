import Client from "@/types/Client";

export const ClientReducer = (
  state: Array<Client>,
  action: { type: string; payload: Array<Client>; id?: string }
): Array<Client> => {
  switch (action.type) {
    case "ADD_CLIENT":
      return [...state, ...action.payload];
    case "UPDATE_CLIENT":
      return state.map((client) => {
        if (client._id == action.payload[0]._id) {
          return { ...client, ...action.payload[0] };
        } else {
          return { ...client };
        }
      });
    case "DELETE_CLIENT":
      return state.filter((client) => client._id != action.id);
    case "REFRESH_CLIENTS":
      return action.payload;
    default:
      return state;
  }
};
