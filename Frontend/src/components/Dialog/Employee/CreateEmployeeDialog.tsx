import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserPlus } from "lucide-react";
import { useContext } from "react";
import User from "@/types/User";
import EmployeeContext from "@/context/employeeContext/context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const employeeSchema = z.object({
  name: z.string().nonempty("Name is required"),
  phoneNumber: z
    .string()
    .regex(/^\d+$/, "Contact must be numeric")
    .min(10, "Contact must be at least 10 digits"),
  role: z.enum(["employee", "admin"]),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
type EmployeeFormValues = z.infer<typeof employeeSchema>;

function CreateEmployeeDialog() {
  const { employeesDispatch } = useContext(EmployeeContext);
  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: "",
      phoneNumber: "0123456789",
      role: "employee",
      password: "12345678",
    },
  });

  const addEmployee = (values: EmployeeFormValues) => {
    const employeeToAdd: User = {
      ...values,
      _id: Date.now().toString(),
      createdAt: new Date(),
      active: true,
    };
    employeesDispatch({ type: "ADD_EMPLOYEE", payload: [employeeToAdd] });
    form.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button title="Add Employee">
          <p className="hidden xl:block">Add</p>
          <UserPlus aria-description="add Employee" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-[20px]">Add Employee</DialogTitle>
          <DialogDescription className="text-[16px]">
            Add a new Employee.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="grid gap-4 pb-4"
            onSubmit={form.handleSubmit((values) => addEmployee(values))}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact</FormLabel>
                  <FormControl>
                    <Input placeholder="0123456789" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="employee">Employee</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateEmployeeDialog;
