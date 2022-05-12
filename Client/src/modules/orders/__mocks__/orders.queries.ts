import { ListResponse } from '../../shared/common.types';
import { Item, Order, OrderStatus } from '../orders.types';

export const MOCK_ITEMS: Item[] = [
  {
    name: 'AMD Ryzen 7 5800X 3.8 GHz 8-Core',
    quantity: 1,
    unitPrice: 9,
    totalAmount: 9,
  },
  {
    name: 'Asus ROG STRIX B550-F GAMING (WI-FI) ATX AM4',
    quantity: 1,
    unitPrice: 10,
    totalAmount: 9,
  },
  {
    name: 'G.Skill Trident Z RGB 32 GB (2 x 16 GB) DDR4-3600 CL16',
    quantity: 2,
    unitPrice: 11,
    totalAmount: 9,
  },
  {
    name: 'Zotac GeForce RTX 3070 Ti 8 GB GAMING AMP Holo',
    quantity: 1,
    unitPrice: 90,
    totalAmount: 9,
  },
  {
    name: 'Fractal Design Meshify 2 Compact TG Light Tint ATX Mid Tower',
    quantity: 1,
    unitPrice: 99,
    totalAmount: 9,
  },
  {
    name: 'Corsair RMx (2021) 850 W 80+ Gold Certified Fully Modular ATX',
    quantity: 1,
    unitPrice: 39,
    totalAmount: 9,
  },
];

export const MOCK_ORDER_DETAILS_RESPONSE: Order = {
  _id: '1234',
  createdAt: '2022-02-22T09:31:56.037Z',
  updatedAt: '2022-02-22T09:31:56.037Z',
  customerName: 'John Doe',
  customerEmail: 'johndoe@example.com',
  status: OrderStatus.CREATED,
  amount: 9,
  shippingAddress: '10000 Tu Liem, HN, VN',
  items: [
    {
      name: 'Beef',
      quantity: 1,
      unitPrice: 9,
      totalAmount: 9,
    },
  ],
};

export const MOCK_ORDERS_RESPONSE: ListResponse<Order> = {
  docs: [
    {
      _id: '1234',
      createdAt: '2022-02-22T09:31:56.037Z',
      updatedAt: '2022-02-22T09:31:56.037Z',
      customerName: 'John Doe',
      customerEmail: 'johndoe@example.com',
      status: OrderStatus.CREATED,
      amount: 9,
      shippingAddress: '10000 Tu Liem, HN, VN',
      items: [
        {
          name: 'Beef',
          quantity: 1,
          unitPrice: 9,
          totalAmount: 9,
        },
      ],
    },
    {
      _id: '1235',
      createdAt: '2022-02-22T09:31:56.037Z',
      updatedAt: '2022-02-22T09:31:56.037Z',
      customerName: 'John Doe',
      customerEmail: 'johndoe@example.com',
      status: OrderStatus.TWO_STAR,
      amount: 9,
      shippingAddress: '10000 Tu Liem, HN, VN',
      items: [
        {
          name: 'Beef',
          quantity: 1,
          unitPrice: 9,
          totalAmount: 9,
        },
      ],
    },
    {
      _id: '1236',
      createdAt: '2022-02-22T09:31:56.037Z',
      updatedAt: '2022-02-22T09:31:56.037Z',
      customerName: 'John Doe',
      customerEmail: 'johndoe@example.com',
      status: OrderStatus.ONE_STAR,
      amount: 9,
      shippingAddress: '10000 Tu Liem, HN, VN',
      items: [
        {
          name: 'Beef',
          quantity: 1,
          unitPrice: 9,
          totalAmount: 9,
        },
      ],
    },
  ],
  limit: 10,
  page: 1,
  totalCount: 24,
  pageCount: 3,
};

export async function createOrder() {
  return Promise.resolve(() => MOCK_ORDER_DETAILS_RESPONSE);
}

export async function fetchOrders() {
  return Promise.resolve(() => MOCK_ORDERS_RESPONSE);
}

export async function fetchOrderDetails() {
  return Promise.resolve(() => MOCK_ORDER_DETAILS_RESPONSE);
}

export async function cancelOrder() {
  return Promise.resolve(() => ({ ...MOCK_ORDER_DETAILS_RESPONSE, status: OrderStatus.ONE_STAR }));
}
