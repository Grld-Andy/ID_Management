import Product from "@/types/Product";

const products: Array<Product> = [
  {
    _id: "1",
    name: "Modern Sofa",
    description:
      "A sleek, modern sofa with comfortable cushions and durable fabric.",
    price: 599.99,
    createdAt: new Date("2023-01-01T10:00:00Z"),
    createdBy: "Alice Johnson",
  },
  {
    _id: "2",
    name: "Dining Table Set",
    description:
      "A wooden dining table with six matching chairs, perfect for family meals.",
    price: 899.99,
    createdAt: new Date("2023-01-01T10:00:00Z"),
    createdBy: "Alice Johnson",
  },
  {
    _id: "3",
    name: "Floor Lamp",
    description:
      "A minimalist floor lamp to add warmth and elegance to your living space.",
    price: 129.99,
    createdAt: new Date("2023-01-01T10:00:00Z"),
    createdBy: "Alice Johnson",
  },
  {
    _id: "4",
    name: "Wall Art",
    description:
      "Abstract wall art with vibrant colors, ideal for contemporary interiors.",
    price: 79.99,
    createdAt: new Date("2023-01-01T10:00:00Z"),
    createdBy: "Alice Johnson",
  },
  {
    _id: "5",
    name: "Rug",
    description:
      "A soft, patterned rug to enhance the look and feel of your room.",
    price: 199.99,
    createdAt: new Date("2023-01-01T10:00:00Z"),
    createdBy: "Alice Johnson",
  },
];

export default products;
