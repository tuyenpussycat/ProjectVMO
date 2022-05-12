import { request } from '../../utils/request';
import { ListResponse, PaginationParams } from '../shared/common.types';
import { Order } from './orders.types';

export async function fetchOrders({ page }: PaginationParams): Promise<any> {
  try {
    const res = await request.get<ListResponse<Order>>('/posts', {
      params: {
        page,
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchOrderDetails(_id: string) {
  try {
    const res = await request.get<Order>(`/posts/${_id}`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
