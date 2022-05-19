import { request } from '../../utils/request';
import { paymentCreationPayload, Payment } from './payment.types';

export async function createPayment(paymentPayload: paymentCreationPayload) {
  try {
    const res = await request.post<Payment>('/payment', paymentPayload);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deletePayment(_id: string) {
  try {
    const res = await request.delete<Payment>(`/payment/delete/${_id}`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
