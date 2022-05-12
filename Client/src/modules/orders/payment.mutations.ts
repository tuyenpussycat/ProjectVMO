import { request } from '../../utils/request';
import { paymentCreationPayload, Payment } from './payment.types';

export async function createPayment(paymentPayload: paymentCreationPayload) {
  try {
    const res = await request.post<Payment>('/category', paymentPayload);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
