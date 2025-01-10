import { ArrowUpAz, Pencil, Trash } from "lucide-react";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import EmployeeContext from "@/context/employeeContext/context";

const EmployeeTable: React.FC = () => {
  const { employees } = useContext(EmployeeContext);

  return (
    <>
      {employees.length > 0 ? (
        <div className="w-full border rounded-md overflow-hidden">
          <div className="grid grid-cols-[repeat(4,1fr),115px] bg-gray-200 font-bold text-gray-700 rounded-t-md">
            <div className="col-span-1 flex cursor-pointer p-3 hover:bg-gray-100">
              <p>Name</p>
              <div>
                <ArrowUpAz />
              </div>
            </div>
            <div className="col-span-1 p-3 flex hover:bg-gray-100 cursor-pointer">
              <p>Contact</p>
            </div>
            <div className="col-span-1 p-3 flex hover:bg-gray-100 cursor-pointer">
              <p>Role</p>
            </div>
            <div className="col-span-1 p-3 flex hover:bg-gray-100 cursor-pointer">
              <p>Created</p>
            </div>
            <div className="col-span-1 p-3 flex">
              <p>Actions</p>
            </div>
          </div>
          <div className="divide-y divide-gray-300">
            {employees.map((user, index) => (
              <div
                key={index}
                className="grid grid-cols-[repeat(4,1fr),115px] p-1 bg-white items-center hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="col-span-1 p-2">{user.name}</div>
                <div className="col-span-1 p-2">{user.phoneNumber}</div>
                <div className="col-span-1 p-2">{user.role}</div>
                <div className="col-span-1 p-2">
                  {user.createdAt.toDateString()}
                </div>
                <div className="col-span-1 p-2 flex gap-2">
                  <Button>
                    <Pencil />
                  </Button>
                  <Button variant={"destructive"}>
                    <Trash />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h1 className="text-[20px] font-medium text-gray-700">
          No employees added yet
        </h1>
      )}
    </>
  );
};

export default EmployeeTable;
