import authApi from '../../../shared/api/auth-api';
import { LoginResponse } from '../../../shared/api/models/login-response';

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await authApi.post<LoginResponse>('/auth/sign-in', {
      Email: email,
      Password: password,
    });
    return response.data;
  },
};
