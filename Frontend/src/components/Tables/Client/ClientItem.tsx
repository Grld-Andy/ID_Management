import DeleteDialog from "@/components/Dialog/DeleteDialog";
import EditClientDialog from "@/components/Dialog/Client/EditClientDialog";
import Client from "@/types/Client";
import { BookUser, Check } from "lucide-react";
import React, { useContext } from "react";
import ClientContext from "@/context/clientContext/context";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  client: Client;
  selectedClients: Array<string>;
  toggleSelected: (id: string) => void;
}

const ClientItem: React.FC<Props> = ({
  client,
  toggleSelected,
  selectedClients,
}) => {
  const { clientsDispatch } = useContext(ClientContext);

  const deleteClient = () => {
    try {
      clientsDispatch({
        type: "DELETE_CLIENT",
        payload: [],
        id: client._id,
      });
      console.log("Client deleted successfully.");
    } catch (error) {
      console.error("Error deleting Client:", error);
    }
  };

  return (
    <div className="grid grid-cols-[50px,repeat(4,1fr),90px] lg:grid-cols-[50px,repeat(4,1fr),175px] pr-1 items-center transition-colors duration-200">
      <div className="col-span-1 p-3 grid place-items-center cursor-pointer">
        <div
          onClick={() => toggleSelected(client._id)}
          className={`border-[1px] w-5 h-5 rounded-sm relative ${
            selectedClients.some((id) => id == client._id)
              ? "bg-color2 border-color2"
              : "border-black"
          }`}
        >
          <Check className="relative right-[3px] bottom-[3px] scale-90 text-white" />
        </div>
      </div>
      <div className="col-span-1 p-2">{client.name}</div>
      <div className="col-span-1 p-2">{client.phoneNumber}</div>
      <div className="col-span-1 p-2">{client.address}</div>
      <div className="col-span-1 p-2">{client.createdAt.toDateString()}</div>

      <div className="col-span-1 p-2 gap-2 hidden lg:flex">
        <>
          <Link to={`/clients/${client._id}`}>
            <Button className="bg-addButton hover:opacity-50 hover:bg-addButton">
              <BookUser />
            </Button>
          </Link>
          <EditClientDialog client={client} />
          <DeleteDialog text={client.name} deleteFunction={deleteClient} />
        </>
      </div>

      <div className="col-span-1 p-2 flex lg:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger className="text-white border px-2 py-1 rounded-md bg-editButton">
            Actions
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to={`/clients/${client._id}`}>
                <Button className="bg-addButton hover:opacity-50 hover:bg-addButton">
                  <span>Add Order</span>
                  <BookUser />
                </Button>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <EditClientDialog client={client} />
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DeleteDialog text={client.name} deleteFunction={deleteClient} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ClientItem;
