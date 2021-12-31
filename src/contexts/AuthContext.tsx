import Cookies from 'js-cookie';
import {
  createContext,
  FormEvent,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import router from 'next/router';

interface AuthContextData {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  userData: UserDataProps;
  setUserData?: React.Dispatch<React.SetStateAction<UserDataProps>>;
  handleSignIn: (e: FormEvent) => void;
}

interface AuthProviderProps {
  user?: string;
  setUser?: React.Dispatch<React.SetStateAction<string>>;
  userData: UserDataProps;
  setUserData?: React.Dispatch<React.SetStateAction<UserDataProps>>;
  handleSignIn: (e: FormEvent) => Promise<void>;
  children: ReactNode;
}

interface UserDataProps {
  name: string;
  avatar: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState('');
  const [userData, setUserData] = useState({} as UserDataProps);

  async function handleSignIn(e: FormEvent) {
    e.preventDefault();

    if (user.trim() === '') {
      return;
    }
    await fetch(`https://api.github.com/users/diego3g`).then(response =>
      response.json().then(data => {
        if (data.message === 'Not Found') {
          return;
        }
        setUserData(data);
      }),
    );

    Cookies.set('user', userData.name);
    Cookies.set('avatar', userData.avatar);

    router.push('/home');
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        userData,
        setUserData,
        handleSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
