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
import { UserPlus } from "lucide-react";
import { useContext } from "react";
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
import ClientContext from "@/context/clientContext/context";
import Client from "@/types/Client";
import { Textarea } from "@/components/ui/textarea";

const ClientSchema = z.object({
  name: z.string().nonempty("Name is required"),
  phoneNumber: z
    .string()
    .regex(/^\d+$/, "Contact must be numeric")
    .min(10, "Contact must be at least 10 digits"),
  address: z.string(),
  extraDetails: z.string().optional(),
});
type ClientFormValues = z.infer<typeof ClientSchema>;

function CreateClientDialog() {
  const { clientsDispatch } = useContext(ClientContext);
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(ClientSchema),
    defaultValues: {
      name: "",
      phoneNumber: "0123456789",
      address: "Ghana, Western Region",
      extraDetails: "",
    },
  });

  const addClient = (values: ClientFormValues) => {
    const clientToAdd: Client = {
      ...values,
      _id: Date.now().toString(),
      createdAt: new Date(),
      createdBy: "Andy",
      ordersId: [],
    };
    clientsDispatch({ type: "ADD_Client", payload: [clientToAdd] });
    form.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button title="Add Client">
          <p className="hidden xl:block">Add</p>
          <UserPlus aria-description="add Client" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-[20px]">Add Client</DialogTitle>
          <DialogDescription className="text-[16px]">
            Add a new Client.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="grid gap-4 pb-4"
            onSubmit={form.handleSubmit((values) => addClient(values))}
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
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Ghana, Western Region" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="extraDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Extra Details</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Ghana, Western Region" {...field} />
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

export default CreateClientDialog;
