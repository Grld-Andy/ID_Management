import { PaginationList } from "@/components/Layout/PaginationList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { Filter, Search, UserPlus } from "lucide-react";
import EmployeeTable from "@/components/Tables/EmployeeTable";

const EmployeesPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between align-center">
        <div className="flex gap-2 align-center">
          <h1 className="text-[28px] font-bold">Employees</h1>
          <span className="relative font-medium top-2 rounded-full bg-blue-700 text-white w-7 h-7 grid place-items-center">
            <p>100</p>
          </span>
        </div>
      </div>

      <div className="grid items-center gap-5 grid-cols-[1fr,250px]">
        <div className="flex items-center gap-4 w-full">
          <div className="flex align-center relative w-full max-w-[500px]">
            <Input
              placeholder="Employee Name..."
              type="text"
              name="search"
              id="search"
              className="pr-8 w-full"
            />
            <Search className="h-full absolute right-2 cursor-pointer" />
          </div>
        </div>

        <div className="flex gap-2 place-content-end">
          <Button>
            <p>Filter</p>
            <Filter />
          </Button>
          <Button>
            <p>Add</p>
            <UserPlus aria-description="add user" />
          </Button>
        </div>
      </div>

      <EmployeeTable />
      <PaginationList />
    </div>
  );
};

export default EmployeesPage;
