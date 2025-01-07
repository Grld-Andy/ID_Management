interface User extends Document {
  _id: string;
  name: string;
  password: string;
  confirmPassword: string;
  role: "admin" | "employee";
  active: boolean;
  phoneNumber: string;
  comparePasswords: (pass: string, passInDb: string) => boolean;
}

export default User;
