import {
  ArrowDown01,
  ArrowDown10,
  ArrowDownAZ,
  ArrowDownZA,
  Check,
} from "lucide-react";
import React from "react";
import EmployeeItem from "./EmployeeItem";
import User from "@/types/User";

interface Props {
  employees: Array<User>;
  sortBy: string;
  setSortBy: (val: string) => void;
  selectedEmployees: Array<string>;
  setSelectedEmployees: React.Dispatch<React.SetStateAction<string[]>>;
}

const EmployeesTable: React.FC<Props> = ({
  employees,
  sortBy,
  setSortBy,
  selectedEmployees,
  setSelectedEmployees,
}) => {
  const toggleSelected = (itemId: string) => {
    if (selectedEmployees.some((id) => id == itemId)) {
      removeFromSelected(itemId);
    } else {
      addToSelected(itemId);
    }
  };

  const toggleAll = () => {
    if (selectedEmployees.length == employees.length) {
      setSelectedEmployees([]);
    } else {
      const allEmployeeIds = employees.map((employee) => employee._id);
      setSelectedEmployees(allEmployeeIds);
    }
  };

  const addToSelected = (itemId: string) => {
    setSelectedEmployees((prev) => [...prev, itemId]);
  };

  const removeFromSelected = (itemId: string) => {
    setSelectedEmployees((prev) => prev.filter((id) => id != itemId));
  };

  const toggleSortOrder = (val: string) => {
    if (sortBy != val) {
      setSortBy(val);
    } else {
      setSortBy(sortBy.startsWith("-") ? sortBy.slice(1) : `-${val}`);
    }
  };

  return (
    <>
      {employees.length > 0 ? (
        <div className="min-h-[650px]">
          <div className="w-full border-2 border-border1 rounded-md overflow-hidden">
            <div className="grid grid-cols-[50px,repeat(2,1fr),0.5fr,1fr,115px] bg-gradient-to-r from-color1 to-color2 font-bold text-white">
              <div
                className={`col-span-1 p-3 ${
                  selectedEmployees.length == employees.length
                    ? ""
                    : "opacity-0"
                } hover:opacity-100 transition-opacity duration-300 grid place-items-center`}
              >
                <div
                  onClick={toggleAll}
                  className={`border-[1px] w-5 h-5 rounded-sm relative cursor-pointer ${
                    selectedEmployees.length == employees.length
                      ? "bg-color2 border-color2"
                      : "border-black"
                  }`}
                >
                  <Check className="relative right-[3px] bottom-[3px] scale-90 text-white" />
                </div>
              </div>
              <div
                onClick={() => {
                  toggleSortOrder("name");
                }}
                className="col-span-1 flex cursor-pointer p-3 hover:bg-[#fff5]"
              >
                <p>Name</p>
                {sortBy == "name" && (
                  <div>
                    <ArrowDownAZ className="text-green-700" />
                  </div>
                )}
                {sortBy == "-name" && (
                  <div>
                    <ArrowDownZA className="text-red-900" />
                  </div>
                )}
              </div>
              <div
                onClick={() => {
                  toggleSortOrder("phoneNumber");
                }}
                className="col-span-1 flex cursor-pointer p-3 hover:bg-[#fff5]"
              >
                <p>Contact</p>
                {sortBy == "phoneNumber" && (
                  <div>
                    <ArrowDown01 className="text-green-700" />
                  </div>
                )}
                {sortBy == "-phoneNumber" && (
                  <div>
                    <ArrowDown10 className="text-red-900" />
                  </div>
                )}
              </div>
              <div
                onClick={() => {
                  toggleSortOrder("role");
                }}
                className="col-span-1 flex cursor-pointer p-3 hover:bg-[#fff5]"
              >
                <p>Role</p>
                {sortBy == "role" && (
                  <div>
                    <ArrowDown01 className="text-green-700" />
                  </div>
                )}
                {sortBy == "-role" && (
                  <div>
                    <ArrowDown10 className="text-red-900" />
                  </div>
                )}
              </div>
              <div
                onClick={() => {
                  toggleSortOrder("createdAt");
                }}
                className="col-span-1 flex cursor-pointer p-3 hover:bg-[#fff5]"
              >
                <p>Joined</p>
                {sortBy == "createdAt" && (
                  <div>
                    <ArrowDown01 className="text-green-700" />
                  </div>
                )}
                {sortBy == "-createdAt" && (
                  <div>
                    <ArrowDown10 className="text-red-900" />
                  </div>
                )}
              </div>
              <div className="col-span-1 p-3 flex">
                <p>Actions</p>
              </div>
            </div>
            <div className="divide-y divide-gray-300">
              {employees.map((employee, index) => (
                <EmployeeItem
                  key={index}
                  employee={employee}
                  selectedEmployees={selectedEmployees}
                  toggleSelected={toggleSelected}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-[20px] font-medium text-gray-700">
          No Employees found
        </h1>
      )}
    </>
  );
};

export default EmployeesTable;
