export interface Category {
  _id: string;
  img: string;
  name: string;
}
export type CategoryCreationPayload = Pick<Category, 'name'>;
