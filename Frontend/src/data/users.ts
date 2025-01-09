import User from "@/types/User";

const users: Array<User> = [
  {
    _id: "1",
    name: "Alice Johnson",
    password: "secureAdminPassword123",
    confirmPassword: "secureAdminPassword123",
    role: "admin",
    active: true,
    phoneNumber: "123-456-7890",
    createdAt: new Date("2023-01-01T10:00:00Z"),
  },
  {
    _id: "2",
    name: "Bob Smith",
    password: "employeePass456",
    confirmPassword: "employeePass456",
    role: "employee",
    active: true,
    phoneNumber: "987-654-3210",
    createdAt: new Date("2023-01-15T14:30:00Z"),
  },
  {
    _id: "3",
    name: "Clara Davis",
    password: "employeePassword789",
    confirmPassword: "employeePassword789",
    role: "employee",
    active: false,
    phoneNumber: "456-789-0123",
    createdAt: new Date("2023-02-10T09:15:00Z"),
  },
  {
    _id: "4",
    name: "David Brown",
    role: "employee",
    active: true,
    phoneNumber: "321-654-0987",
    createdAt: new Date("2023-03-05T11:45:00Z"),
  },
  {
    _id: "5",
    name: "Evelyn Harris",
    role: "employee",
    active: true,
    phoneNumber: "654-321-1234",
    createdAt: new Date("2023-03-20T16:00:00Z"),
  },
];

export default users;
