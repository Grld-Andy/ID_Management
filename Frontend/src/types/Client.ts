interface Client {
  _id: string;
  name: string;
  phoneNumber: string;
  address: string;
  extraDetails?: string;
  ordersId: Array<string>;
  createdAt: Date;
  createdBy: string;
}

export default Client;
