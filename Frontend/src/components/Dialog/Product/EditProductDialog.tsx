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
import Product from "@/types/Product";
import ProductContext from "@/context/productsContext/context";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useContext, useState } from "react";

const productSchema = z.object({
  name: z.string().nonempty("Product name is required"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .optional(),
  price: z
    .number({
      invalid_type_error: "Price must be a number",
    })
    .positive("Price must be greater than zero"),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface Props {
  product: Product;
}

const EditProductDialog: React.FC<Props> = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { productsDispatch } = useContext(ProductContext);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
    },
  });

  const saveProductUpdate = (values: ProductFormValues) => {
    const updatedProduct = {
      ...product,
      ...values,
    };
    productsDispatch({ type: "UPDATE_PRODUCT", payload: [updatedProduct] });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-editButton hover:bg-editButton hover:opacity-60">
          <Pencil aria-description="edit product" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-[20px]">Edit Product</DialogTitle>
          <DialogDescription className="text-[16px]">
            Edit {product.name}.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(saveProductUpdate)}
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
};

export default EditProductDialog;
