import Cookies from 'js-cookie';
import { useSession } from 'next-auth/react';
import { createContext, ReactNode, useEffect, useState } from 'react';

interface AuthContextData {
  user_name: string;
  user_image: string;
  user_email: string;
}

interface AuthProviderProps {
  children: ReactNode;
  user_name: string;
  user_image: string;
  user_email: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const { data: session, status } = useSession();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  let user_name;
  let user_image;
  let user_email;

  useEffect(() => {
    if (status === 'authenticated') {
      setIsAuthenticated(true);
      Cookies.set('user_name', session.user.name);
      Cookies.set('user_image', session.user.image);
      Cookies.set('user_email', session.user.email);
    }
  }, [session]);

  if(isAuthenticated) {
    user_name = Cookies.get('user_name');
    user_image = Cookies.get('user_image');
    user_email = Cookies.get('user_email');
  }

  return (
    <AuthContext.Provider
      value={{
        user_name,
        user_image,
        user_email,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
