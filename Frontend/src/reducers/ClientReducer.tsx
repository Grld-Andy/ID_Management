import Client from "@/types/Client";

export const ClientReducer = (
  state: Array<Client>,
  action: { type: string; payload: Array<Client>; id?: string }
): Array<Client> => {
  switch (action.type) {
    case "ADD_EMPLOYEE":
      return [...state, ...action.payload];
    case "UPDATE_EMPLOYEE":
      return state.map((client) => {
        if (client._id == action.payload[0]._id) {
          return { ...client, ...action.payload[0] };
        } else {
          return { ...client };
        }
      });
    case "DELETE_EMPLOYEE":
      return state.map((client) => {
        return client._id == action.id ? { ...client, active: false } : client;
      });
    case "REFRESH_EMPLOYEES":
      return action.payload;
    default:
      return state;
  }
};
