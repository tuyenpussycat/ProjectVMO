/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */

export interface Order {
  post: any;
  img: string;
  posts: string;
  _id: string;
  status: OrderStatus;
  items: Item[];
  title: string;
  description: string;
  price: number;
  quantity: number;
  classify: string;
  id: string;
  comments: any;
}
export interface posts {
  posts: object;
}

export enum OrderStatus {
  ONE_STAR = 'ONE_STAR',
  TWO_STAR = 'TWO_STAR',
  THREE_STAR = 'THREE_STAR',
  NO_RATE = 'NO_RATE',
  FOUR_STAR = 'FOUR_STAR',
  FIVE_STAR = 'FIVE_STAR',
}

export interface Item {
  name: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
}

export type OrderCreationPayload = Pick<
  Order,
  'title' | 'description' | 'classify' | 'quantity' | 'price'
>;
