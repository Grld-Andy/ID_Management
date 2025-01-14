interface Order {
  _id?: string;
  clientId: string;
  clientName?: string;
  total: number;
  status: "pending" | "completed" | "cancelled";
  request: string;
  createdAt: Date;
  createdBy: string;
}

export default Order;
