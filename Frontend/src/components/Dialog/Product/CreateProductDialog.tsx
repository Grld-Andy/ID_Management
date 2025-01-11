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
import ProductContext from "@/context/productsContext/context";
import Product from "@/types/Product";
import { useContext } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

const productSchema = z.object({
  name: z.string().nonempty("Product name is required"),
  description: z.string().optional(),
  price: z
    .number({
      invalid_type_error: "Price must be a number",
    })
    .positive("Price must be greater than zero"),
});

type ProductFormValues = z.infer<typeof productSchema>;

function CreateProductDialog() {
  const { productsDispatch } = useContext(ProductContext);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
    },
  });

  const addProduct = (values: ProductFormValues) => {
    const newProduct: Product = {
      ...values,
      _id: Date.now().toString(),
      createdAt: new Date(),
      createdBy: "Andy",
    };
    productsDispatch({ type: "ADD_PRODUCT", payload: [newProduct] });
    form.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button title="Add Product">
          <p className="hidden xl:block">Add</p>
          <PackagePlus aria-description="add product" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-[20px]">Add Product</DialogTitle>
          <DialogDescription className="text-[16px]">
            Add a new product to the store.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(addProduct)}
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

export default CreateProductDialog;
