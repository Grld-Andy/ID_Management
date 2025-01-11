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
import { Label } from "@/components/ui/label";
import Product from "@/types/Product";
import { Pencil } from "lucide-react";
import ProductContext from "@/context/productsContext/context";
import { useContext, useState } from "react";

interface Props {
  product: Product;
}

const EditProductDialog: React.FC<Props> = ({ product }) => {
  const { productsDispatch } = useContext(ProductContext);
  const [updateProduct, setUpdateProduct] = useState<Product>(product);
  const [isOpen, setIsOpen] = useState(false);

  const saveProductUpdate = () => {
    console.log("updating products");
    productsDispatch({ type: "UPDATE_PRODUCT", payload: [updateProduct] });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Pencil aria-description="add item" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-[20px]">Edit Product</DialogTitle>
          <DialogDescription className="text-[16px]">
            Edit {product.name}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right text-[16px]">
              Name
            </Label>
            <Input
              id="name"
              onChange={(e) => {
                setUpdateProduct((prev) => {
                  return { ...prev, name: e.target.value };
                });
              }}
              defaultValue={product.name}
              placeholder="Modern Sofa"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="description"
              className="text-right place-items-start pt-1 text-[16px]"
            >
              Description
            </Label>
            <Textarea
              id="description"
              onChange={(e) => {
                setUpdateProduct((prev) => {
                  return { ...prev, description: e.target.value };
                });
              }}
              defaultValue={product.description}
              placeholder="SOFA RECLINER WITH SWIVEL+ROCKER PU GREY 2027"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right text-[16px]">
              Price
            </Label>
            <Input
              type="number"
              id="price"
              onChange={(e) => {
                setUpdateProduct((prev) => {
                  return { ...prev, price: parseInt(e.target.value, 10) };
                });
              }}
              defaultValue={product.price}
              placeholder="100.00"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={saveProductUpdate} type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;
