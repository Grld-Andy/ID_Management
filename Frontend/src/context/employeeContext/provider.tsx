import React, { useEffect, useReducer } from "react";
import EmployeeContext from "./context";
import { EmployeeReducer } from "@/reducers/EmployeeReducer";
import users from "@/data/users";

interface Props {
  children: React.ReactNode;
}

const EmployeeContextProvider: React.FC<Props> = ({ children }) => {
  const [employees, employeesDispatch] = useReducer(EmployeeReducer, []);

  useEffect(() => {
    employeesDispatch({ type: "REFRESH_EMPLOYEES", payload: users });
  }, []);

  return (
    <EmployeeContext.Provider value={{ employees, employeesDispatch }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeContextProvider;
