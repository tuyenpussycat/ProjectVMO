import { request } from '../../utils/request';
import { ListResponse } from '../shared/common.types';
import { Order } from './products.types';

export async function fetchOrders({
  page,
  sortPrice,
  filterStatus,
  valueSearch,
  valueParams,
}: any): Promise<any> {
  try {
    const res = await request.get<ListResponse<Order>>('/posts', {
      params: {
        page,
        status: filterStatus,
        sort: sortPrice,
        title: valueSearch,
        classify: valueParams,
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
