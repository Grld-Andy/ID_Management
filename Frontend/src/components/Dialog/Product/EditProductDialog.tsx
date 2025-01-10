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

interface Props {
  product: Product;
}

const EditProductDialog: React.FC<Props> = ({ product }) => {
  return (
    <Dialog>
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
              defaultValue={product.price}
              placeholder="100.00"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;
