import { jwtDecode } from 'jwt-decode';
import { User } from '../api/models/user';

interface DotNetJwtPayload {
  [key: string]: any;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'?: string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'?: string;
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'?: string;
  exp?: number;
}

export const extractUserFromToken = (token: string): User | null => {
  if (!token) return null;

  try {
    const decoded = jwtDecode<DotNetJwtPayload>(token);

    const getClaim = (shortName: string) => {
      return decoded[shortName] || 
             Object.keys(decoded).find(key => key.endsWith(`/${shortName}`)) 
             ? decoded[Object.keys(decoded).find(key => key.endsWith(`/${shortName}`))!] 
             : null;
    };

    return {
      id: getClaim('nameidentifier') || '',
      email: getClaim('emailaddress') || '',
      role: getClaim('role') || '',
      token: token
    };
  } catch (error) {
    console.error('Failed to decode JWT token:', error);
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const { exp } = jwtDecode<DotNetJwtPayload>(token);
    if (!exp) return false;
    return Date.now() >= exp * 1000;
  } catch {
    return true;
  }
};
