interface Order {
  _id?: string;
  clientId: string;
  clientName?: string;
  totalPrice: number;
  status: "pending" | "completed" | "cancelled";
  products: string;
  createdAt: Date;
  createdBy: string;
}

export default Order;
