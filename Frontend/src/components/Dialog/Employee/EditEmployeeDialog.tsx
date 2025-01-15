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
import { Textarea } from "@/components/ui/textarea";
import { Pencil } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import User from "@/types/User";
import EmployeeContext from "@/context/employeeContext/context";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useContext, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const employeeSchema = z.object({
  name: z.string().nonempty("Name is required"),
  role: z.enum(["employee", "admin"]),
  phoneNumber: z
    .string()
    .regex(/^\d+$/, "Phone number must be numeric")
    .min(10, "Phone number must be at least 10 digits")
    .optional(),
});

type EmployeeFormValues = z.infer<typeof employeeSchema>;

interface Props {
  employee: User;
}

const EditEmployeeDialog: React.FC<Props> = ({ employee }) => {
  const { employeesDispatch } = useContext(EmployeeContext);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: employee.name,
      role: employee.role,
      phoneNumber: employee.phoneNumber,
    },
  });
  const saveEmployeeUpdate = (values: EmployeeFormValues) => {
    const updatedEmployee = {
      ...employee,
      ...values,
    };
    employeesDispatch({ type: "UPDATE_EMPLOYEE", payload: [updatedEmployee] });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-editButton hover:bg-editButton hover:opacity-60"
          title="Edit"
        >
          <Pencil aria-description="edit employee" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-[20px]">Edit Employee</DialogTitle>
          <DialogDescription className="text-[16px]">
            Edit details for {employee.name}.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(saveEmployeeUpdate)}
            className="grid gap-4 pb-4"
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
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="0123456789" {...field} />
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
};

export default EditEmployeeDialog;
