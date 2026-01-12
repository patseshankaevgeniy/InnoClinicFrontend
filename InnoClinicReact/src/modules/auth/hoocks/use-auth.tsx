import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User } from '../../../shared/api/models/user';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  id?: string;
  role?: string;
  email?: string;
}

interface AuthContextType {
  user: JwtPayload | null;
  login: (data: any) => void; 
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser) as User);
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (data: any) => {
  const token = data.AccessToken || data.accessToken;
  
  if (token) {
    const decoded: any = jwtDecode(token);

    const getClaim = (shortName: string) => {
      return decoded[shortName] || 
             Object.keys(decoded).find(key => key.endsWith(`/${shortName}`)) 
             ? decoded[Object.keys(decoded).find(key => key.endsWith(`/${shortName}`))!] 
             : null;
    };

    const userData: User = {
      id: getClaim('nameidentifier'),
      email: getClaim('emailaddress'),
      role: getClaim('role'),
      token: token
    };

    setUser(userData);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
  }
};

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
