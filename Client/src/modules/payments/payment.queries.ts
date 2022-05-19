import { request } from '../../utils/request';
import { ListResponse } from '../shared/common.types';
import { Payment } from './payment.types';

export async function fetchPayments(): Promise<any> {
  try {
    const res = await request.get<ListResponse<Payment>>('/payment');
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchPaymentDetails(_id: string) {
  try {
    const res = await request.get<Payment>(`/payment/${_id}`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
