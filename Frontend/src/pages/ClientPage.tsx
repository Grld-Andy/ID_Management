import ClientContext from "@/context/clientContext/context";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditClientDialog from "@/components/Dialog/Client/EditClientDialog";
import DeleteDialog from "@/components/Dialog/DeleteDialog";
import OrderContext from "@/context/orderContext/context";

const ClientPage: React.FC = () => {
  const { id } = useParams();
  const { clients, clientsDispatch } = useContext(ClientContext);
  const { orders } = useContext(OrderContext);
  const client = clients.find((c) => c._id == id);
  const clientOrders = orders.filter((o) => o.clientId == id);

  if (!client || !clientOrders) {
    return <div>Client not found</div>;
  }

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
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium">{client.name}</h1>
        <div className="space-x-4">
          <EditClientDialog client={client} />
          <DeleteDialog text={client.name} deleteFunction={deleteClient} />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Products</TableHead>
                <TableHead className="text-center">Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientOrders.map((clientOrder, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {clientOrder._id}
                  </TableCell>
                  <TableCell
                    key={index}
                    className="flex flex-col gap-2 border-r border-l"
                  >
                    {JSON.parse(clientOrder.products).map(
                      (
                        product: { productName: string; price: number },
                        index: number
                      ) => (
                        <div
                          key={index}
                          className="flex w-full justify-between"
                        >
                          <p>{product.productName}</p>
                          <p>{product.price}</p>
                        </div>
                      )
                    )}
                  </TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell>
                    <div className="col-span-1 p-2 flex justify-center">
                      <span
                        className={`flex items-center w-[75px] text-sm justify-center text-white rounded-2xl ${
                          clientOrder.status == "cancelled"
                            ? "bg-red-600 "
                            : clientOrder.status == "completed"
                            ? "bg-green-500"
                            : "bg-yellow-600"
                        }`}
                      >
                        {clientOrder.status}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {clientOrder.totalPrice}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientPage;
