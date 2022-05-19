import { OrderStatus } from '../products.types';
import { MOCK_ORDER_DETAILS_RESPONSE } from './orders.queries';

export async function createOrder() {
  return Promise.resolve(() => MOCK_ORDER_DETAILS_RESPONSE);
}

export async function cancelOrder() {
  return Promise.resolve(() => ({ ...MOCK_ORDER_DETAILS_RESPONSE, status: OrderStatus.ONE_STAR }));
}
