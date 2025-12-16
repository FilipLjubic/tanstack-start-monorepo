import { createContext, type ReactNode, useContext } from 'react';
import type { User } from '@/types/backend';

// Optional user context (for root)
type OptionalUserContextType = {
  user: User | null;
};

const OptionalUserContext = createContext<OptionalUserContextType | undefined>(
  undefined
);

type OptionalUserProviderProps = {
  user: User | null;
  children: ReactNode;
};

export const OptionalUserProvider = ({
  user,
  children,
}: OptionalUserProviderProps) => {
  return (
    <OptionalUserContext.Provider value={{ user }}>
      {children}
    </OptionalUserContext.Provider>
  );
};

export const useOptionalUser = () => {
  const context = useContext(OptionalUserContext);
  if (context === undefined) {
    throw new Error('useOptionalUser must be used within OptionalUserProvider');
  }
  return context;
};
