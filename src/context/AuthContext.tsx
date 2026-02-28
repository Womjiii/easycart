import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string, remember?: boolean) => Promise<{ success: boolean; message?: string }>;
  register: (data: { name: string; email: string; password: string; phone?: string; address?: string }) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session from localStorage
    const savedUser = localStorage.getItem('easycart_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('easycart_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, remember?: boolean): Promise<{ success: boolean; message?: string }> => {
    try {
      // Simulate login - in production, this would call the PHP backend
      // For demo purposes, we'll use a mock login
      const mockUsers: User[] = [
        {
          id: 1,
          name: 'Admin User',
          email: 'admin@easycart.com',
          password: 'admin123',
          phone: '09123456789',
          address: '123 Admin Street, Manila, Philippines',
          role: 'admin',
          created_at: new Date().toISOString()
        },
        {
          id: 2,
          name: 'John Doe',
          email: 'john@example.com',
          password: 'customer123',
          phone: '09987654321',
          address: '456 Customer Ave, Quezon City, Philippines',
          role: 'customer',
          created_at: new Date().toISOString()
        }
      ];

      const foundUser = mockUsers.find(u => u.email === email);
      
      if (!foundUser) {
        return { success: false, message: 'User not found' };
      }

      // Simple password check (in production, use proper hashing)
      if (foundUser.password !== password) {
        return { success: false, message: 'Invalid password' };
      }

      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      
      if (remember) {
        localStorage.setItem('easycart_user', JSON.stringify(userWithoutPassword));
      }
      
      sessionStorage.setItem('easycart_user', JSON.stringify(userWithoutPassword));
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'Login failed' 
      };
    }
  };

  const register = async (data: { name: string; email: string; password: string; phone?: string; address?: string }): Promise<{ success: boolean; message?: string }> => {
    try {
      // Simulate registration
      const newUser: User = {
        id: Date.now(),
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        address: data.address,
        role: 'customer',
        created_at: new Date().toISOString()
      };

      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem('easycart_user', JSON.stringify(userWithoutPassword));
      sessionStorage.setItem('easycart_user', JSON.stringify(userWithoutPassword));
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'Registration failed' 
      };
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('easycart_user');
    sessionStorage.removeItem('easycart_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
