export interface Login {
  accessToken: any;
  username: string;
  password: string;
}
export type LoginPayload = Pick<Login, 'username' | 'password'>;
