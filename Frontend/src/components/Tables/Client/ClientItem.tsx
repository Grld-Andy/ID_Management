import DeleteDialog from "@/components/Dialog/DeleteDialog";
import EditClientDialog from "@/components/Dialog/Client/EditClientDialog";
import Client from "@/types/Client";
import { Check, UserRoundCheck } from "lucide-react";
import React, { useContext } from "react";
import ClientContext from "@/context/clientContext/context";

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
    <div className="grid grid-cols-[50px,repeat(2,1fr),0.5fr,1fr,115px] pr-1 items-center transition-colors duration-200">
      <div className="col-span-1 p-3 grid place-items-center cursor-pointer">
        <div
          onClick={() => toggleSelected(client._id)}
          className={`border-[1px] w-5 h-5 rounded-sm relative ${
            selectedClients.some((id) => id == client._id)
              ? "bg-[#0099ff] border-[#0099ff]"
              : "border-black"
          }`}
        >
          <Check className="relative right-[3px] bottom-[3px] scale-90 text-white" />
        </div>
      </div>
      <div className="col-span-1 p-2">{client.name}</div>
      <div className="col-span-1 p-2">{client.phoneNumber}</div>
      <div className="col-span-1 p-2">{client.createdAt.toDateString()}</div>
      <div className="col-span-1 p-2 flex gap-2">
        <>
          <EditClientDialog client={client} />
          <DeleteDialog text={client.name} deleteFunction={deleteClient} />
        </>
      </div>
    </div>
  );
};

export default ClientItem;
