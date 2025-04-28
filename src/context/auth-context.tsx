
'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { toast } from '@/hooks/use-toast'; // Import toast for feedback

interface User {
  id: string;
  name: string; // Typically username or display name
  isAdmin: boolean;
}

interface Credentials {
    username: string;
    password?: string; // Password might not always be needed depending on auth flow
}


interface AuthContextType {
  user: User | null;
  login: (credentials: Credentials) => Promise<boolean>; // Return true on success, false on failure
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Add loading state

  // Simulate checking auth state on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      // In a real app, check secure storage (like httpOnly cookie session data)
      // For now, we just start with no user logged in.
      setLoading(false);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const login = async (credentials: Credentials): Promise<boolean> => {
    setLoading(true);
    // Simulate API call / credential check
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

    // **IMPORTANT: Hardcoded credentials are insecure and for demonstration ONLY.**
    // **In a real application, NEVER store plain passwords. Use hashing and secure backend authentication.**
    if (credentials.username === 'Admin' && credentials.password === 'Admin') {
      const adminUser: User = { id: 'admin-001', name: 'Admin', isAdmin: true };
      setUser(adminUser);
      setLoading(false);
      toast({ title: 'Login Successful', description: `Welcome, ${adminUser.name}!` });
      return true;
    }
    // Basic user login simulation (optional) - could be removed if only admin login needed
    // else if (credentials.username && credentials.password) {
    //   const regularUser: User = { id: `user-${Date.now()}`, name: credentials.username, isAdmin: false };
    //   setUser(regularUser);
    //   setLoading(false);
    //   toast({ title: 'Login Successful', description: `Welcome, ${regularUser.name}!` });
    //   return true;
    // }
    else {
      // Failed login
      setLoading(false);
      toast({ title: 'Login Failed', description: 'Invalid username or password.', variant: 'destructive' });
       setUser(null); // Ensure user is null on failed login
      return false;
    }
  };

  const logout = () => {
    setUser(null);
     toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
     // Clear any persisted session info here
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
