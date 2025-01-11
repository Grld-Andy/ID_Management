import User from "@/types/User";
import { createContext, Dispatch } from "react";

interface EmployeeContextType {
  employees: Array<User>;
  employeesDispatch: Dispatch<{
    type: string;
    payload: Array<User>;
    id?: string;
  }>;
}

const EmployeeContext = createContext<EmployeeContextType>({
  employees: [],
  employeesDispatch: () => null,
});

export default EmployeeContext;
