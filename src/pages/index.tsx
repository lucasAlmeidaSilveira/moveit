import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import styles from '../styles/pages/index.module.scss';
import { AiFillGithub, AiOutlineArrowRight } from 'react-icons/ai';
import Head from 'next/head';
import { signIn, signOut, SessionProvider, useSession } from 'next-auth/react';

import { GetServerSideProps } from 'next';
import { ChallengeBox } from '../components/ChallengeBox';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

export default function Login() {


  return (
    <main className={styles.background}>
      <Head>
        <title>Login | move.it</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.left}>
          <img src='/simbolo.svg' alt='Simbolo moveit' />
        </div>
        <div className={styles.right}>
          <img src='/logo-full-white.svg' alt='Logo moveit' />
          <h2>Bem-vindo</h2>

          <button type='button' onClick={() => signIn('github')}>
            <AiFillGithub /> Faça Login com o Github
          </button>
        </div>
      </div>
    </main>
  );
}
