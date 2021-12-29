import styles from '../styles/pages/index.module.scss';
import { AiFillGithub } from 'react-icons/ai';
import Head from 'next/head';
import { signIn, useSession } from 'next-auth/react';
import { AuthProvider } from '../contexts/AuthContext';
import router from 'next/router';
import { useEffect } from 'react';

interface LoginProps {
  user_name: string;
  user_image: string;
  user_email: string;
}

export default function Login(props: LoginProps) {
  const { data: session } = useSession();
  
  useEffect(() => {
    if (session) {
      router.push('/home');
    }
    
  }, [session])

  return (
    <AuthProvider
      user_name={props.user_name}
      user_image={props.user_image}
      user_email={props.user_email}
    >
      <main className={styles.background}>
        <Head>
          <title>Bem-vindo | move.it</title>
        </Head>
        <div className={styles.container}>
          <div className={styles.left}>
            <img src='/simbolo.svg' alt='Simbolo moveit' />
          </div>
          <div className={styles.right}>
            <img src='/logo-full-white.svg' alt='Logo moveit' />
            <h2>Bem-vindo</h2>

            <button type='button' onClick={() => signIn('github')}>
              <AiFillGithub /> Fazer Login com o Github
            </button>
          </div>
        </div>
      </main>
    </AuthProvider>
  );
}
