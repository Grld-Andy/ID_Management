interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  createdAt: Date;
  createdBy: string;
}

export default Product;
