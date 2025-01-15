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
import Client from "@/types/Client";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useContext, useState } from "react";
import ClientContext from "@/context/clientContext/context";

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

interface Props {
  client: Client;
}

const EditClientDialog: React.FC<Props> = ({ client }) => {
  const { clientsDispatch } = useContext(ClientContext);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(ClientSchema),
    defaultValues: {
      name: client.name,
      phoneNumber: client.phoneNumber,
      address: client.address,
      extraDetails: client.extraDetails,
    },
  });
  const saveClientUpdate = (values: ClientFormValues) => {
    const updatedClient = {
      ...client,
      ...values,
    };
    clientsDispatch({ type: "UPDATE_CLIENT", payload: [updatedClient] });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-editButton hover:bg-editButton hover:opacity-60"
          title="Edit"
        >
          <Pencil aria-description="edit client" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-[20px]">Edit Client</DialogTitle>
          <DialogDescription className="text-[16px]">
            Edit details for {client.name}.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(saveClientUpdate)}
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
};

export default EditClientDialog;
