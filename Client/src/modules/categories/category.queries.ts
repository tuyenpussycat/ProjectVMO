import { request } from '../../utils/request';
import { ListResponse } from '../shared/common.types';
import { Category } from './category.types';
export async function fetchCategory(): Promise<any> {
  try {
    const res = await request.get<ListResponse<Category>>('/category');
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchCategoryDetails(_id: string) {
  try {
    const res = await request.get(`/category/${_id}`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
