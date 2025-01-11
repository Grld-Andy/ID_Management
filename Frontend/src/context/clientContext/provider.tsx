import React, { useEffect, useReducer } from "react";
import ClientContext from "./context";
import allClients from "@/data/clients";
import { ClientReducer } from "@/reducers/ClientReducer";

interface Props {
  children: React.ReactNode;
}

const ClientContextProvider: React.FC<Props> = ({ children }) => {
  const [clients, clientsDispatch] = useReducer(ClientReducer, allClients);

  useEffect(() => {
    clientsDispatch({ type: "REFRESH_CLIENTS", payload: allClients });
  }, []);

  return (
    <ClientContext.Provider value={{ clients, clientsDispatch }}>
      {children}
    </ClientContext.Provider>
  );
};

export default ClientContextProvider;
