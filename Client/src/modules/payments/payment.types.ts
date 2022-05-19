export interface Payment {
  _id: string;
  numberPhone: string;
  address: string;
  total: Number;
  name: Object;
  quantity: Object;
}
export type paymentCreationPayload = Pick<
  Payment,
  'name' | 'address' | 'numberPhone' | 'total' | 'quantity'
>;
