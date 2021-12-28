import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import styles from '../styles/pages/index.module.scss';
import { AiFillGithub, AiOutlineArrowRight } from 'react-icons/ai';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { ChallengeBox } from '../components/ChallengeBox';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';

export default function Home() {
  return (
    <main className={styles.background}>
      <div className={styles.container}>
        <div className={styles.left}>
          <img src="/simbolo.svg" alt="Simbolo moveit" />
        </div>
        <div className={styles.right}>
          <img src='/logo-full-white.svg' alt='Logo moveit' />
          <h2>Bem-vindo</h2>
          <div className={styles.login}>
            <AiFillGithub />
            <p>Faça login com seu Github para começar</p>
          </div>

          <form>
            <input type='text' placeholder='Digite seu username' />
            <button type='submit'>
              <AiOutlineArrowRight />
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
