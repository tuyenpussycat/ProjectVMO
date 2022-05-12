export interface Payment {
  phoneNumber: string;
  address: string;
  total: Number;
  list: Object;
}
export type paymentCreationPayload = Pick<Payment, 'phoneNumber' | 'address' | 'list' | 'total'>;
