import User from "@/types/User";

export const EmployeeReducer = (
  state: Array<User>,
  action: { type: string; payload: Array<User> }
): Array<User> => {
  switch (action.type) {
    case "ADD_EMPLOYEE":
      return [...state, ...action.payload];
    case "UPDATE_EMPLOYEE":
      return state.map((user) => {
        if (user._id == action.payload[0]._id) {
          return { ...user, ...action.payload[0] };
        } else {
          return { ...user };
        }
      });
    case "DELETE_EMPLOYEE":
      return state.map((user) => {
        const shouldDeactivate = action.payload.some(
          (deletedUser) => deletedUser._id === user._id
        );
        return shouldDeactivate ? { ...user, isActive: false } : user;
      });
    case "DELETE_ALL_EMPLOYEES":
      return state.map((user) => {
        return user._id != state[0]._id ? { ...user, isActive: false } : user;
      });
    case "REFRESH_EMPLOYEES":
      return { ...action.payload };
    default:
      return state;
  }
};
