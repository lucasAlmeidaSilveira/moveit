import '../styles/global.css';
import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '../contexts/AuthContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider
      userData={pageProps.userData}
      handleSignIn={pageProps.handleSignIn}
    >
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
