import DeleteDialog from "@/components/Dialog/DeleteDialog";
import EditEmployeeDialog from "@/components/Dialog/Employee/EditEmployeeDialog";
import { Button } from "@/components/ui/button";
import EmployeeContext from "@/context/employeeContext/context";
import User from "@/types/User";
import toTitle from "@/utils/ToTitle";
import { Check, UserRoundCheck } from "lucide-react";
import React, { useContext } from "react";

interface Props {
  employee: User;
  selectedEmployees: Array<string>;
  toggleSelected: (id: string) => void;
}

const EmployeeItem: React.FC<Props> = ({
  employee,
  toggleSelected,
  selectedEmployees,
}) => {
  const { employeesDispatch } = useContext(EmployeeContext);

  const deleteEmployee = () => {
    try {
      employeesDispatch({
        type: "DELETE_EMPLOYEE",
        payload: [],
        id: employee._id,
      });
      console.log("Employee deleted successfully.");
    } catch (error) {
      console.error("Error deleting Employee:", error);
    }
  };

  return (
    <div
      className={`grid grid-cols-[50px,repeat(2,1fr),0.5fr,1fr,115px] pr-1 items-center transition-colors duration-200
        ${
          employee.active
            ? "bg-white hover:bg-gray-100"
            : "bg-gray-200 opacity-60 hover:bg-gray-100 hover:opacity-100"
        }`}
    >
      <div className="col-span-1 p-3 grid place-items-center cursor-pointer">
        <div
          onClick={() => toggleSelected(employee._id)}
          className={`border-[1px] w-5 h-5 rounded-sm relative ${
            selectedEmployees.some((id) => id == employee._id)
              ? "bg-[#0099ff] border-[#0099ff]"
              : "border-black"
          }`}
        >
          <Check className="relative right-[3px] bottom-[3px] scale-90 text-white" />
        </div>
      </div>
      <div className="col-span-1 p-2">{employee.name}</div>
      <div className="col-span-1 p-2">{employee.phoneNumber}</div>
      <div className="col-span-1 p-2">{toTitle(employee.role)}</div>
      <div className="col-span-1 p-2">{employee.createdAt.toDateString()}</div>
      <div className="col-span-1 p-2 flex gap-2">
        {employee.active ? (
          <>
            <EditEmployeeDialog employee={employee} />
            <DeleteDialog
              text={employee.name}
              deleteFunction={deleteEmployee}
            />
          </>
        ) : (
          <Button className="w-full bg-green-800 hover:bg-green-500">
            <UserRoundCheck />
            <p>Restore</p>
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmployeeItem;
