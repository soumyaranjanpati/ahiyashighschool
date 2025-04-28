
'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Add loading state

  // Simulate checking auth state on initial load (e.g., from localStorage or a cookie)
  useEffect(() => {
    // In a real app, you might check localStorage/sessionStorage or make an API call
    // For simulation, just set loading to false after a short delay
    const timer = setTimeout(() => {
      // Example: Check localStorage
      // const storedUser = localStorage.getItem('campusUser');
      // if (storedUser) {
      //   setUser(JSON.parse(storedUser));
      // }
      setLoading(false);
    }, 50); // Short delay to simulate async check

    return () => clearTimeout(timer);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    // Example: Persist to localStorage
    // localStorage.setItem('campusUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
     // Example: Remove from localStorage
    // localStorage.removeItem('campusUser');
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
