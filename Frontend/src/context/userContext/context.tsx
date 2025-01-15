import React, { Dispatch, useEffect, useReducer } from "react";
import { createContext } from "react";
import User from "@/types/User";
import { UserReducer } from "@/reducers/UserReducer";

interface Props {
  children: React.ReactNode;
}

interface UserContextType {
  user: null | User;
  userDispatch: Dispatch<{ type: string; payload: null | User }>;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  userDispatch: () => null,
});

const initalState: User | null = null;

const UserContextProvider: React.FC<Props> = (props) => {
  const [user, userDispatch] = useReducer(UserReducer, initalState, () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });

  useEffect(() => {
    localStorage.setItem(
      "user",
      JSON.stringify(
        user || {
          _id: "242334523",
          name: "Andy",
          role: "admin",
          active: true,
          phoneNumber: "0123456789",
          createdAt: new Date("2023-01-01T10:00:00Z"),
        }
      )
    );
    console.log(user);
  }, [user]);

  return (
    <UserContext.Provider value={{ user, userDispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
