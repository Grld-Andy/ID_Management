import {
  ArrowDown01,
  ArrowDown10,
  ArrowDownAZ,
  ArrowDownZA,
  Check,
} from "lucide-react";
import React from "react";
import clientItem from "./ClientItem";
import Client from "@/types/Client";

interface Props {
  clients: Array<Client>;
  sortBy: string;
  setSortBy: (val: string) => void;
  selectedclients: Array<string>;
  setSelectedclients: React.Dispatch<React.SetStateAction<string[]>>;
}

const clientsTable: React.FC<Props> = ({
  clients,
  sortBy,
  setSortBy,
  selectedclients,
  setSelectedclients,
}) => {
  const toggleSelected = (itemId: string) => {
    if (selectedclients.some((id) => id == itemId)) {
      removeFromSelected(itemId);
    } else {
      addToSelected(itemId);
    }
  };

  const toggleAll = () => {
    if (selectedclients.length == clients.length) {
      setSelectedclients([]);
    } else {
      const allclientIds = clients.map((client) => client._id);
      setSelectedclients(allclientIds);
    }
  };

  const addToSelected = (itemId: string) => {
    setSelectedclients((prev) => [...prev, itemId]);
  };

  const removeFromSelected = (itemId: string) => {
    setSelectedclients((prev) => prev.filter((id) => id != itemId));
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
        <div className="min-h-[650px]">
          <div className="w-full border rounded-md overflow-hidden">
            <div className="grid grid-cols-[50px,repeat(2,1fr),0.5fr,1fr,115px] pr-1 bg-gray-200 font-bold text-gray-700 rounded-t-md">
              <div
                className={`col-span-1 border p-3 ${
                  selectedclients.length == clients.length
                    ? ""
                    : "opacity-0"
                } hover:opacity-100 transition-opacity duration-300 grid place-items-center`}
              >
                <div
                  onClick={toggleAll}
                  className={`border-[1px] w-5 h-5 rounded-sm relative cursor-pointer ${
                    selectedclients.length == clients.length
                      ? "bg-[#0099ff] border-[#0099ff]"
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
                className="col-span-1 flex cursor-pointer p-3 hover:bg-gray-100"
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
                className="col-span-1 p-3 flex hover:bg-gray-100 cursor-pointer"
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
                className="col-span-1 p-3 flex hover:bg-gray-100 cursor-pointer"
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
                className="col-span-1 p-3 flex hover:bg-gray-100 cursor-pointer"
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
              {clients.map((client, index) => (
                <clientItem
                  key={index}
                  client={client}
                  selectedclients={selectedclients}
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
