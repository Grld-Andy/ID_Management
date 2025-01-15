import CreateEmployeeDialog from "@/components/Dialog/Employee/CreateEmployeeDialog";
import { PaginationList } from "@/components/Layout/PaginationList";
import EmployeesTable from "@/components/Tables/Employee/EmployeeTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation, useNavigate } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import React, { useContext, useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import DeleteDialog from "@/components/Dialog/DeleteDialog";
import EmployeeContext from "@/context/employeeContext/context";
import { Checkbox } from "@/components/ui/checkbox";

interface EmployeeFilters {
  show: string;
  deactivated: boolean;
}

const EmployeesPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get("page") || "1", 10);
  const { employees, employeesDispatch } = useContext(EmployeeContext);
  const [search, setSearch] = useState<string>("");
  const [selectedEmployees, setSelectedEmployees] = useState<Array<string>>([]);
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const initialFilters = {
    show: "all",
    deactivated: false,
  };
  const [filters, setFilters] = useState<EmployeeFilters>(
    JSON.parse(
      localStorage.getItem("employeeFilters") ||
        `${JSON.stringify(initialFilters)}`
    )
  );

  const filteredEmployees = useMemo(() => {
    localStorage.setItem(
      "employeeFilters",
      JSON.stringify(filters || initialFilters)
    );
    let filtered = employees.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    if (filters.show != "all") {
      filtered = filtered.filter((employee) => employee.role == filters.show);
    }
    if (!filters.deactivated) {
      filtered = filtered.filter((employee) => employee.active);
    }
    if (sortBy.startsWith("-")) {
      const key = sortBy.slice(1);
      filtered = filtered.sort((a: any, b: any) => {
        if (typeof b[key] === "number" && typeof a[key] === "number") {
          return b[key] - a[key];
        } else if (b[key] instanceof Date && a[key] instanceof Date) {
          return b[key].getTime() - a[key].getTime();
        } else if (typeof b[key] === "string" && typeof a[key] === "string") {
          return b[key].localeCompare(a[key]);
        }
        return 0;
      });
    } else {
      filtered = filtered.sort((a: any, b: any) => {
        if (typeof b[sortBy] === "number" && typeof a[sortBy] === "number") {
          return a[sortBy] - b[sortBy];
        } else if (b[sortBy] instanceof Date && a[sortBy] instanceof Date) {
          return a[sortBy].getTime() - b[sortBy].getTime();
        } else if (
          typeof b[sortBy] === "string" &&
          typeof a[sortBy] === "string"
        ) {
          return a[sortBy].localeCompare(b[sortBy]);
        }
        return 0;
      });
    }
    return filtered;
  }, [employees, search, filters, sortBy, currentPage]);

  const itemsPerPage = 10;
  const totalItems = filteredEmployees.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedEmployees = useMemo(() => {
    let startIndex = (currentPage - 1) * itemsPerPage;
    if (startIndex > filteredEmployees.length) {
      navigate("/employees?page=1");
    }
    const endIndex = startIndex + itemsPerPage;
    return filteredEmployees.slice(startIndex, endIndex);
  }, [filteredEmployees, currentPage]);

  const deleteSelectedEmployees = async () => {
    await Promise.all(
      selectedEmployees.map(async (EmployeeId) => {
        try {
          employeesDispatch({
            type: "DELETE_Employee",
            payload: [],
            id: EmployeeId,
          });
        } catch (error) {
          console.error(
            `Error deleting Employee with ID ${EmployeeId}:`,
            error
          );
        }
      })
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between align-center">
        <div className="flex gap-2 align-center">
          <h1 className="text-[28px] font-medium">Employees</h1>
          <span
            title="Total Employees"
            className="relative font-medium top-2 rounded-xl px-1 bg-color1 text-white h-7 grid place-items-center"
          >
            <p>{employees.length}</p>
          </span>
        </div>
      </div>
      <div className="grid items-center gap-5 grid-cols-[1fr,190px]">
        <div className="flex items-center gap-4 w-full">
          <div className="flex align-center relative w-full max-w-[500px]">
            <Input
              placeholder="Employee Name..."
              type="text"
              name="search"
              id="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className="pr-8 w-full bg-white"
            />
            <Search className="h-full absolute right-2 cursor-pointer" />
          </div>
        </div>

        <div className="flex gap-2 place-content-end">
          {selectedEmployees.length > 0 && (
            <>
              <DeleteDialog
                text={" selected Employees."}
                buttonText={"Delete"}
                deleteFunction={deleteSelectedEmployees}
              />
            </>
          )}
          <Popover>
            <PopoverTrigger>
              <Button
                title="Filter"
                className="bg-color2 hover:bg-color2 hover:opacity-50"
              >
                <p
                  className="hidden xl:block"
                  aria-description="filter Employees"
                >
                  Filter
                </p>
                <Filter />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="grid gap-2">
                <div className="grid grid-cols-[1fr,1fr] items-center gap-4">
                  <Label htmlFor="width">Disabled Accounts</Label>
                  <Checkbox
                    checked={filters.deactivated}
                    onCheckedChange={(checked) => {
                      return checked
                        ? setFilters((prev) => {
                            return { ...prev, deactivated: true };
                          })
                        : setFilters((prev) => {
                            return { ...prev, deactivated: false };
                          });
                    }}
                  />
                </div>
                <div className="grid grid-cols-[1fr,1fr] items-center gap-4">
                  <Label htmlFor="maxWidth">Admin</Label>
                  <Select
                    onValueChange={(value) =>
                      setFilters((prev) => {
                        return { ...prev, show: value };
                      })
                    }
                    defaultValue={filters.show}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="employee">Employees Only</SelectItem>
                      <SelectItem value="admin">Admins Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <CreateEmployeeDialog />
        </div>
      </div>

      <EmployeesTable
        employees={paginatedEmployees}
        sortBy={sortBy}
        selectedEmployees={selectedEmployees}
        setSelectedEmployees={setSelectedEmployees}
        setSortBy={setSortBy}
      />
      {paginatedEmployees.length ? (
        <PaginationList
          totalPages={totalPages}
          baseUrl={"/employees"}
          length={employees.length}
          currentPage={currentPage}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default EmployeesPage;
