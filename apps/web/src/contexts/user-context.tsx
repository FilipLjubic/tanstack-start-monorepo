import { createContext, type ReactNode, useContext } from 'react';
import type { User } from '@/types/backend';

// Required user context (for dashboard)
type UserContextType = {
  user: User;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
  user: User;
  children: ReactNode;
};

export const UserProvider = ({ user, children }: UserProviderProps) => {
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
