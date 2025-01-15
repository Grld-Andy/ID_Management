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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PackagePlus } from "lucide-react";
import Order from "@/types/Order";
import { useContext } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import OrderContext from "@/context/orderContext/context";

const OrderSchema = z.object({
  name: z.string().nonempty("Order name is required"),
  description: z.string().optional(),
  price: z
    .number({
      invalid_type_error: "Price must be a number",
    })
    .positive("Price must be greater than zero"),
});

type OrderFormValues = z.infer<typeof OrderSchema>;

function CreateOrderDialog() {
  const { ordersDispatch } = useContext(OrderContext);

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
    },
  });

  const addOrder = (values: OrderFormValues) => {
    const newOrder: Order = {
      ...values,
      totalPrice: 0,
      clientName: "someone",
      status: "pending",
      products: "[{something: 30}]",
      clientId: "someone",
      createdAt: new Date(),
      createdBy: "Andy",
    };
    ordersDispatch({ type: "ADD_ORDER", payload: [newOrder] });
    form.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-addButton hover:bg-addButton hover:opacity-50"
          title="Add Order"
        >
          <p className="hidden xl:block">Add</p>
          <PackagePlus aria-description="add Order" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-[20px]">Add Order</DialogTitle>
          <DialogDescription className="text-[16px]">
            Add a new Order to the store.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(addOrder)}
            className="grid gap-4 pb-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Modern Sofa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="SOFA RECLINER WITH SWIVEL+ROCKER PU GREY 2027"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="100.00" {...field} />
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

export default CreateOrderDialog;
