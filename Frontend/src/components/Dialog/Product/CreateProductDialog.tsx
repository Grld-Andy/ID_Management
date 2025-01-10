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
import { PackagePlus } from "lucide-react";
import { useContext, useState } from "react";
import ProductContext from "@/context/productsContext/context";
import Product from "@/types/Product";

function CreateProductDialog() {
  const { productsDispatch } = useContext(ProductContext);
  const initialProduct: Product = {
    _id: "",
    name: "",
    description: "",
    price: 0,
    createdAt: new Date(),
    createdBy: "",
  };
  const [product, setProduct] = useState<Product>(initialProduct);

  const addProduct = () => {
    const productToAdd = {
      ...product,
      _id: Date.now().toString(),
      createdBy: "Andy",
      createdAt: new Date(),
    };
    setProduct(initialProduct);
    productsDispatch({ type: "ADD_PRODUCT", payload: [productToAdd] });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <p>Add</p>
          <PackagePlus aria-description="add item" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-[20px]">Add Product</DialogTitle>
          <DialogDescription className="text-[16px]">
            Add a new product to the store.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right text-[16px]">
              Name
            </Label>
            <Input
              value={product.name}
              onChange={(e) => {
                setProduct((prev) => {
                  return { ...prev, name: e.target.value };
                });
              }}
              id="name"
              placeholder="Modern Sofa"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="description"
              className="text-right place-items-start pt-1 h-full text-[16px]"
            >
              Description
            </Label>
            <Textarea
              value={product.description}
              onChange={(e) => {
                setProduct((prev) => {
                  return { ...prev, description: e.target.value };
                });
              }}
              id="description"
              placeholder="SOFA RECLINER WITH SWIVEL+ROCKER PU GREY 2027"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right text-[16px]">
              Price
            </Label>
            <Input
              value={product.price}
              onChange={(e) => {
                setProduct((prev) => {
                  return { ...prev, price: Number(e.target.value) };
                });
              }}
              type="number"
              id="price"
              placeholder="100.00"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={addProduct} type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateProductDialog;
