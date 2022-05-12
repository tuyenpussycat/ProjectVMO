import { request } from '../../utils/request';
import { Order, OrderCreationPayload } from './orders.types';

export async function createOrder(orderPayload: OrderCreationPayload, file: any) {
  try {
    // console.log(orderPayload);
    var bodyFormData = new FormData();
    bodyFormData.append('img', file);
    bodyFormData.append('dataOrder', JSON.stringify(orderPayload));
    const res = await request.post<Order>('/posts', bodyFormData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function cancelOrder(_id: string) {
  try {
    const res = await request.delete<Order>(`/posts/delete/${_id}`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function editOrder(_id: string, orderEditPayload: OrderCreationPayload) {
  try {
    const res = await request.put<Order>(`/posts/${_id}`, orderEditPayload);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
