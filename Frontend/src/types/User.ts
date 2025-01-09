interface User {
  _id: string;
  name: string;
  password?: string;
  confirmPassword?: string;
  role: "admin" | "employee";
  active: boolean;
  phoneNumber: string;
  createdAt: Date;
}

export default User;
