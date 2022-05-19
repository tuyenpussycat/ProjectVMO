import { request } from '../../utils/request';
import { LoginPayload, Login } from './login.types';

export async function LoginUser(loginPayload: LoginPayload) {
  try {
    const res = await request.post<Login>('/auth/login', loginPayload);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
