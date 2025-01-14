import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom"; // Assuming you're using React Router for navigation
import { Trash, Edit, Plus } from "lucide-react"; // Lucide icons for trash, edit, and add new order
import clients from "@/data/clients"; // The list of clients (can be fetched from a server)
import orders from "@/data/orders"; // The list of orders (can be fetched from a server)
import ClientContext from "@/context/clientContext/context";

const ClientPage = () => {
  const clientId = useParams().id;
  const { clients } = useContext(ClientContext);

  // Find the client by ID
  const client = clients.find((client) => client._id === clientId);

  if (!client) {
    return <h1>Not found</h1>;
  }

  // Find the orders for the client
  const clientOrders = orders.filter((order) => order.clientId === clientId);

  //   const handleEdit = () => {
  //     // Redirect to edit client page
  //     history.push(`/edit-client/${clientId}`);
  //   };

  const handleDelete = () => {
    // Handle client deletion (e.g., call an API to delete)
    alert(`Deleting client: ${client.name}`);
  };

  //   const handleAddOrder = () => {
  //     // Handle adding a new order (e.g., redirect to new order page)
  //     history.push(`/add-order/${clientId}`);
  //   };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      {/* Client Details Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{client.name}</h1>
        <div className="space-x-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            <Edit className="inline mr-2" /> Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            <Trash className="inline mr-2" /> Delete
          </button>
        </div>
      </div>

      {/* Client Information */}
      <div className="mb-6">
        <p>
          <strong>Phone Number:</strong> {client.phoneNumber}
        </p>
        <p>
          <strong>Address:</strong> {client.address}
        </p>
        <p>
          <strong>Extra Details:</strong> {client.extraDetails}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(client.createdAt).toLocaleDateString()}
        </p>
        <p>
          <strong>Created By:</strong> {client.createdBy}
        </p>
      </div>

      {/* Add Order Button */}
      <div className="mb-6">
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          <Plus className="inline mr-2" /> Add New Order
        </button>
      </div>

      {/* Client Orders List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Client Orders</h2>
        <div className="space-y-4">
          {clientOrders.length > 0 ? (
            clientOrders.map((order) => (
              <div key={order._id} className="p-4 border rounded-lg shadow-sm">
                <p>
                  <strong>Order ID:</strong> {order._id}
                </p>
                <p>
                  <strong>Status:</strong> {order.status}
                </p>
                <p>
                  <strong>Total:</strong> ${order.total}
                </p>
                <p>
                  <strong>Request:</strong> {order.request}
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p>No orders found for this client.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientPage;
