interface Client {
  _id: string;
  name: string;
  phone: number;
  address: string;
  extraDetails: string;
  ordersId: Array<string>;
}

export default Client;
