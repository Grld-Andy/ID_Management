import Client from "@/types/Client";
import { createContext, Dispatch } from "react";

interface ClientContextType {
  clients: Array<Client>;
  clientsDispatch: Dispatch<{
    type: string;
    payload: Array<Client>;
    id?: string;
  }>;
}

const ClientContext = createContext<ClientContextType>({
  clients: [],
  clientsDispatch: () => null,
});

export default ClientContext;
