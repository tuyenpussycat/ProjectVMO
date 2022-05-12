import { request } from '../../utils/request';
import { CategoryCreationPayload } from './category.types';
import { Category } from './category.types';
export async function createCategory(categoryPayload: CategoryCreationPayload, file: any) {
  try {
    var bodyFormData = new FormData();
    bodyFormData.append('img', file);
    bodyFormData.append('name', JSON.stringify(categoryPayload));
    const res = await request.post<Category>('/category', bodyFormData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteCategory(_id: string) {
  try {
    const res = await request.delete<Category>(`/category/delete/${_id}`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function editCategory(_id: string, categoryEditPayload: CategoryCreationPayload) {
  try {
    const res = await request.put<Category>(`/category/${_id}`, categoryEditPayload);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
