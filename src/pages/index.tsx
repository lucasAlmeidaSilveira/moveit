import styles from '../styles/pages/index.module.scss';
import { AiFillGithub, AiOutlineArrowRight } from 'react-icons/ai';
import Head from 'next/head';
import { signIn, useSession } from 'next-auth/react';
import { AuthContext } from '../contexts/AuthContext';
import router from 'next/router';
import { useEffect, useState, FormEvent, useContext } from 'react';

interface LoginProps {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  userData: User;
  handleSignIn: (e: FormEvent) => Promise<void>;
}

interface User {
  name: string;
  avatar: string;
}

// const { avatar_url, name, email } = data;

export default function Login(props: LoginProps) {
  const { handleSignIn, setUser, user } = useContext(AuthContext);

  return (
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

          <p>
            <AiFillGithub /> Faça seu login com seu Github para começar
          </p>

          <form onSubmit={handleSignIn}>
            <input
              type='text'
              placeholder='Digite seu username'
              onChange={event => setUser(event.target.value)}
              value={user}
            />
            <button type='submit'>
              <AiOutlineArrowRight />
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
