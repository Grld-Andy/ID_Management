import {
  ArrowDown01,
  ArrowDown10,
  ArrowDownAZ,
  ArrowDownZA,
  Check,
} from "lucide-react";
import React from "react";
import Client from "@/types/Client";
import ClientItem from "./ClientItem";

interface Props {
  clients: Array<Client>;
  sortBy: string;
  setSortBy: (val: string) => void;
  selectedClients: Array<string>;
  setSelectedClients: React.Dispatch<React.SetStateAction<string[]>>;
}

const clientsTable: React.FC<Props> = ({
  clients,
  sortBy,
  setSortBy,
  selectedClients,
  setSelectedClients,
}) => {
  const toggleSelected = (itemId: string) => {
    if (selectedClients.some((id) => id == itemId)) {
      removeFromSelected(itemId);
    } else {
      addToSelected(itemId);
    }
  };

  const toggleAll = () => {
    if (selectedClients.length == clients.length) {
      setSelectedClients([]);
    } else {
      const allclientIds = clients.map((client) => client._id);
      setSelectedClients(allclientIds);
    }
  };

  const addToSelected = (itemId: string) => {
    setSelectedClients((prev) => [...prev, itemId]);
  };

  const removeFromSelected = (itemId: string) => {
    setSelectedClients((prev) => prev.filter((id) => id != itemId));
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
      {clients.length > 0 ? (
        <div className="min-h-[580px] bg-white rounded-lg overflow-hidden border-2 border-border1">
          <div className="w-full rounded-md overflow-hidden">
            <div className="grid grid-cols-[50px,repeat(4,1fr),175px] bg-gradient-to-r from-color1 to-color2 font-bold text-white rounded-t-md">
              <div
                className={`col-span-1 p-3 ${
                  selectedClients.length == clients.length ? "" : "opacity-0"
                } hover:opacity-100 transition-opacity duration-300 grid place-items-center`}
              >
                <div
                  onClick={toggleAll}
                  className={`border-[1px] w-5 h-5 rounded-sm relative cursor-pointer ${
                    selectedClients.length == clients.length
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
                className="col-span-1 p-3 flex hover:bg-[#fff5] cursor-pointer"
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
                  toggleSortOrder("address");
                }}
                className="col-span-1 p-3 flex hover:bg-[#fff5] cursor-pointer"
              >
                <p>Address</p>
                {sortBy == "address" && (
                  <div>
                    <ArrowDown01 className="text-green-700" />
                  </div>
                )}
                {sortBy == "-address" && (
                  <div>
                    <ArrowDown10 className="text-red-900" />
                  </div>
                )}
              </div>
              <div
                onClick={() => {
                  toggleSortOrder("createdAt");
                }}
                className="col-span-1 p-3 flex hover:bg-[#fff5] cursor-pointer"
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
              <div className="col-span-1 p-3 flex justify-center">
                <p>Actions</p>
              </div>
            </div>
            <div className="divide-y divide-gray-300">
              {clients.map((client, index) => (
                <ClientItem
                  key={index}
                  client={client}
                  selectedClients={selectedClients}
                  toggleSelected={toggleSelected}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-[20px] font-medium text-gray-700">
          No clients found
        </h1>
      )}
    </>
  );
};

export default clientsTable;
