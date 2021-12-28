import Cookies from 'js-cookie';
import { useSession } from 'next-auth/react';
import { createContext, ReactNode, useEffect } from 'react';

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
  const { data: session } = useSession();

  useEffect(() => {
    if (session !== undefined) {
      Cookies.set('user_name', session.user.name);
      Cookies.set('user_image', session.user.image);
      Cookies.set('user_email', session.user.email);
      console.log(user_name, user_image);
    }
  }, [session]);

  const user_name = Cookies.get('user_name');
  const user_image = Cookies.get('user_image');
  const user_email = Cookies.get('user_email');

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
