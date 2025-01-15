import CreateProductDialog from "@/components/Dialog/Product/CreateProductDialog";
import { PaginationList } from "@/components/Layout/PaginationList";
import ProductsTable from "@/components/Tables/Product/ProductsTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductContext from "@/context/productsContext/context";
import { useLocation, useNavigate } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import React, { useContext, useMemo, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import DeleteDialog from "@/components/Dialog/DeleteDialog";

interface ProductFilters {
  minPrice: number;
  maxPrice: number;
}

const StocksPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get("page") || "1", 10);
  const { products, productsDispatch } = useContext(ProductContext);
  const [search, setSearch] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<Array<string>>([]);
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
          return b[key] - a[key];
        } else if (b[key] instanceof Date && a[key] instanceof Date) {
          return b[key].getTime() - a[key].getTime();
        } else if (typeof b[key] === "string" && typeof a[key] === "string") {
          return b[key].localeCompare(a[key]);
        }
        return 0;
      });
    } else {
      filtered = filtered.sort((a: any, b: any) => {
        if (typeof b[sortBy] === "number" && typeof a[sortBy] === "number") {
          return a[sortBy] - b[sortBy];
        } else if (b[sortBy] instanceof Date && a[sortBy] instanceof Date) {
          return a[sortBy].getTime() - b[sortBy].getTime();
        } else if (
          typeof b[sortBy] === "string" &&
          typeof a[sortBy] === "string"
        ) {
          return a[sortBy].localeCompare(b[sortBy]);
        }
        return 0;
      });
    }
    return filtered;
  }, [products, search, filters, sortBy, currentPage]);

  const itemsPerPage = 10;
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedProducts = useMemo(() => {
    let startIndex = (currentPage - 1) * itemsPerPage;
    if (startIndex > filteredProducts.length) {
      navigate("/products?page=1");
    }
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);

  const deleteSelectedProducts = async () => {
    await Promise.all(
      selectedProducts.map(async (productId) => {
        try {
          productsDispatch({
            type: "DELETE_PRODUCT",
            payload: [],
            id: productId,
          });
        } catch (error) {
          console.error(`Error deleting product with ID ${productId}:`, error);
        }
      })
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between align-center">
        <div className="flex gap-2 align-center">
          <h1 className="text-[28px] font-medium">Products</h1>
          <span
            title="Total Products"
            className="relative font-medium top-2 rounded-xl px-1 bg-blue-700 text-white h-7 grid place-items-center"
          >
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
          {selectedProducts.length > 0 && (
            <>
              <DeleteDialog
                text={" selected products."}
                buttonText={"Delete"}
                deleteFunction={deleteSelectedProducts}
              />
            </>
          )}
          <Popover>
            <PopoverTrigger>
              <Button title="Filter">
                <p
                  className="hidden xl:block"
                  aria-description="filter products"
                >
                  Filter
                </p>
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
        products={paginatedProducts}
        sortBy={sortBy}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
        setSortBy={setSortBy}
      />
      {paginatedProducts.length ? (
        <PaginationList
          totalPages={totalPages}
          baseUrl={"/products"}
          length={products.length}
          currentPage={currentPage}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default StocksPage;
