import { PaginationList } from "@/components/Layout/PaginationList";
import { Input } from "@/components/ui/input";
import { useLocation, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import React, { useContext, useMemo, useState } from "react";
import ClientContext from "@/context/clientContext/context";
import CreateClientDialog from "@/components/Dialog/Client/CreateClientDialog";
import ClientTable from "@/components/Tables/Client/ClientTable";
import DeleteDialog from "@/components/Dialog/DeleteDialog";
const ClientsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get("page") || "1", 10);
  const { clients, clientsDispatch } = useContext(ClientContext);
  const [search, setSearch] = useState<string>("");
  const [selectedClients, setSelectedClients] = useState<Array<string>>([]);
  const [sortBy, setSortBy] = useState<string>("createdAt");

  const filteredClients = useMemo(() => {
    let filtered = clients.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
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
  }, [clients, search, sortBy, currentPage]);

  const itemsPerPage = 10;
  const totalItems = filteredClients.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedClients = useMemo(() => {
    let startIndex = (currentPage - 1) * itemsPerPage;
    if (startIndex > filteredClients.length) {
      navigate("/Clients?page=1");
    }
    const endIndex = startIndex + itemsPerPage;
    return filteredClients.slice(startIndex, endIndex);
  }, [filteredClients, currentPage]);

  const deleteSelectedClients = async () => {
    await Promise.all(
      selectedClients.map(async (ClientId) => {
        try {
          clientsDispatch({
            type: "DELETE_Client",
            payload: [],
            id: ClientId,
          });
        } catch (error) {
          console.error(`Error deleting Client with ID ${ClientId}:`, error);
        }
      })
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between align-center">
        <div className="flex gap-2 align-center">
          <h1 className="text-[28px] font-bold">Clients</h1>
          <span
            title="Total Clients"
            className="relative font-medium top-2 rounded-xl px-1 bg-blue-700 text-white h-7 grid place-items-center"
          >
            <p>{clients.length}</p>
          </span>
        </div>
      </div>
      <div className="grid items-center gap-5 grid-cols-[1fr,190px]">
        <div className="flex items-center gap-4 w-full">
          <div className="flex align-center relative w-full max-w-[500px]">
            <Input
              placeholder="Client Name..."
              type="text"
              name="search"
              id="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className="pr-8 w-full"
            />
            <Search className="h-full absolute right-2 cursor-pointer" />
          </div>
        </div>

        <div className="flex gap-2 place-content-end">
          {selectedClients.length > 0 && (
            <>
              <DeleteDialog
                text={" selected Clients."}
                buttonText={"Delete"}
                deleteFunction={deleteSelectedClients}
              />
            </>
          )}
          <CreateClientDialog />
        </div>
      </div>

      <ClientTable
        clients={paginatedClients}
        sortBy={sortBy}
        selectedClients={selectedClients}
        setSelectedClients={setSelectedClients}
        setSortBy={setSortBy}
      />
      {paginatedClients.length ? (
        <PaginationList
          totalPages={totalPages}
          baseUrl={"/clients"}
          length={clients.length}
          currentPage={currentPage}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default ClientsPage;
