import Client from "@/types/Client";

const clients: Array<Client> = [
  {
    _id: "1",
    name: "John Smith",
    phoneNumber: "1234567890",
    address: "123 Elm Street, Springfield",
    extraDetails: "Preferred delivery time: mornings",
    ordersId: ["101", "102"],
    createdAt: new Date("2025-01-01"),
    createdBy: "admin",
  },
  {
    _id: "2",
    name: "Emily Johnson",
    phoneNumber: "9876543210",
    address: "456 Oak Avenue, Riverside",
    extraDetails: "Requires wheelchair-accessible deliveries",
    ordersId: ["103"],
    createdAt: new Date("2025-01-02"),
    createdBy: "manager",
  },
  {
    _id: "3",
    name: "Michael Brown",
    phoneNumber: "1122334455",
    address: "789 Maple Drive, Gotham",
    extraDetails: "Frequent buyer of electronics",
    ordersId: ["104", "105", "106"],
    createdAt: new Date("2025-01-03"),
    createdBy: "admin",
  },
  {
    _id: "4",
    name: "Sarah Davis",
    phoneNumber: "2233445566",
    address: "321 Birch Lane, Star City",
    extraDetails: "Requests eco-friendly packaging",
    ordersId: ["107"],
    createdAt: new Date("2025-01-04"),
    createdBy: "admin",
  },
  {
    _id: "5",
    name: "David Wilson",
    phoneNumber: "3344556677",
    address: "654 Pine Road, Metropolis",
    extraDetails: "VIP customer with priority shipping",
    ordersId: ["108", "109"],
    createdAt: new Date("2025-01-05"),
    createdBy: "manager",
  },
  {
    _id: "6",
    name: "Sophia Martinez",
    phoneNumber: "4455667788",
    address: "987 Cedar Street, Central City",
    extraDetails: "Allergic to certain chemicals in products",
    ordersId: ["110"],
    createdAt: new Date("2025-01-06"),
    createdBy: "admin",
  },
  {
    _id: "7",
    name: "James Taylor",
    phoneNumber: "5566778899",
    address: "246 Spruce Boulevard, Coast City",
    extraDetails: "Prefers evening deliveries",
    ordersId: ["111", "112", "113"],
    createdAt: new Date("2025-01-07"),
    createdBy: "manager",
  },
  {
    _id: "8",
    name: "Olivia Garcia",
    phoneNumber: "6677889900",
    address: "135 Redwood Court, Keystone",
    extraDetails: "Loyal customer since 2018",
    ordersId: ["114"],
    createdAt: new Date("2025-01-08"),
    createdBy: "admin",
  },
  {
    _id: "9",
    name: "William Anderson",
    phoneNumber: "7788990011",
    address: "864 Cypress Drive, Smallville",
    extraDetails: "Regularly orders home appliances",
    ordersId: ["115", "116"],
    createdAt: new Date("2025-01-09"),
    createdBy: "manager",
  },
  {
    _id: "10",
    name: "Emma Thomas",
    phoneNumber: "8899001122",
    address: "975 Aspen Way, Blüdhaven",
    extraDetails: "Provides detailed feedback for each purchase",
    ordersId: ["117"],
    createdAt: new Date("2025-01-10"),
    createdBy: "admin",
  },
  {
    _id: "11",
    name: "Alexander Moore",
    phoneNumber: "9900112233",
    address: "741 Fir Street, Hub City",
    extraDetails: "Requests updates via SMS",
    ordersId: ["118", "119"],
    createdAt: new Date("2025-01-11"),
    createdBy: "manager",
  },
];

export default clients;
