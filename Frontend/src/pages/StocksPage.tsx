import CreateProductDialog from "@/components/Dialog/Product/CreateProductDialog";
import { PaginationList } from "@/components/Layout/PaginationList";
import ProductsTable from "@/components/Tables/ProductsTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductContext from "@/context/productsContext/context";
import { Search, Filter } from "lucide-react";
import React, { useContext, useMemo, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

interface ProductFilters {
  minPrice: number;
  maxPrice: number;
}

const StocksPage: React.FC = () => {
  const { products } = useContext(ProductContext);
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("name");
  const [filters, setFilters] = useState<ProductFilters>({
    minPrice: 0,
    maxPrice: 0,
  });

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    if (filters.minPrice) {
      filtered = filtered.filter(
        (product) => product.price >= filters.minPrice
      );
    }
    if (filters.maxPrice && filters.maxPrice > filters.minPrice) {
      filtered = filtered.filter(
        (product) => product.price <= filters.maxPrice
      );
    }
    if (sortBy.startsWith("-")) {
      const key = sortBy.slice(1);
      filtered = filtered.sort((a: any, b: any) => {
        if (typeof b[key] === "number" && typeof a[key] === "number") {
          return b[key] - a[key]; // Numeric sorting
        } else if (b[key] instanceof Date && a[key] instanceof Date) {
          return b[key].getTime() - a[key].getTime(); // Date sorting
        } else if (typeof b[key] === "string" && typeof a[key] === "string") {
          return b[key].localeCompare(a[key]); // String sorting (descending)
        }
        return 0; // Default case if types don't match
      });
    } else {
      filtered = filtered.sort((a: any, b: any) => {
        if (typeof b[sortBy] === "number" && typeof a[sortBy] === "number") {
          return a[sortBy] - b[sortBy]; // Numeric sorting
        } else if (b[sortBy] instanceof Date && a[sortBy] instanceof Date) {
          return a[sortBy].getTime() - b[sortBy].getTime(); // Date sorting
        } else if (
          typeof b[sortBy] === "string" &&
          typeof a[sortBy] === "string"
        ) {
          return a[sortBy].localeCompare(b[sortBy]); // String sorting (ascending)
        }
        return 0; // Default case if types don't match
      });
    }
    return filtered;
  }, [products, search, filters, sortBy]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between align-center">
        <div className="flex gap-2 align-center">
          <h1 className="text-[28px] font-bold">Products</h1>
          <span className="relative font-medium top-2 rounded-full bg-blue-700 text-white w-7 h-7 grid place-items-center">
            <p>{products.length}</p>
          </span>
        </div>
      </div>

      <div className="grid items-center gap-5 grid-cols-[1fr,190px]">
        <div className="flex items-center gap-4 w-full">
          <div className="flex align-center relative w-full max-w-[500px]">
            <Input
              placeholder="Product Name..."
              type="text"
              name="search"
              id="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className="pr-8 w-full"
            />
            <Search className="h-full absolute right-2 cursor-pointer" />
          </div>
        </div>

        <div className="flex gap-2 place-content-end">
          <Popover>
            <PopoverTrigger>
              <Button>
                <p>Filter</p>
                <Filter />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="width">Min. Price</Label>
                  <Input
                    id="width"
                    type="number"
                    placeholder="100"
                    value={filters.minPrice}
                    onChange={(e) => {
                      setFilters((prev) => {
                        return { ...prev, minPrice: Number(e.target.value) };
                      });
                    }}
                    className="col-span-2 h-8"
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxWidth">Max. Price</Label>
                  <Input
                    id="maxWidth"
                    type="number"
                    placeholder="300"
                    value={filters.maxPrice}
                    onChange={(e) => {
                      setFilters((prev) => {
                        return { ...prev, maxPrice: Number(e.target.value) };
                      });
                    }}
                    className="col-span-2 h-8"
                  />
                </div>
                {/* <div className="grid grid-cols-3 items-center gap-4">
                  <Button className="col-end-4" onClick={filterByPrice}>
                    Filter
                  </Button>
                </div> */}
              </div>
            </PopoverContent>
          </Popover>
          <CreateProductDialog />
        </div>
      </div>

      <ProductsTable
        products={filteredProducts}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      {filteredProducts.length ? <PaginationList /> : <></>}
    </div>
  );
};

export default StocksPage;
