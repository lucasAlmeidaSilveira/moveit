import Cookies from 'js-cookie';
import { createContext, FormEvent, ReactNode, useState } from 'react';
import router from 'next/router';
import API from '../services/api';

interface AuthContextData {
  userData: UserDataProps;
  handleSignIn: (e: FormEvent, user: string) => void;
}

interface AuthProviderProps {
  userData: UserDataProps;
  handleSignIn: (e: FormEvent, user: string) => Promise<void>;
  children: ReactNode;
}

interface UserDataProps {
  name: string;
  avatar: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [userData, setUserData] = useState({} as UserDataProps);
  const [error, setError] = useState('');

  async function handleSignIn(e: FormEvent, user: string) {
    e.preventDefault();

    await API.get(`/${user}`)
      .then(response => {
        Cookies.set('user', response.data.name);
        Cookies.set('avatar', response.data.avatar_url);
        setUserData({
          name: Cookies.get('user'),
          avatar: Cookies.get('avatar')
        });
      })
      .catch(error => setError(error));

    router.push('/home');
  }

  return (
    <AuthContext.Provider
      value={{
        userData,
        handleSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
