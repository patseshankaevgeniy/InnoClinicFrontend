export type UserRoleType = 'Doctor' | 'Patient' | 'Admin';

export interface User {
  id: string;
  email: string;
  role: UserRoleType;
  token: string;
  avatar?: string | null;
}