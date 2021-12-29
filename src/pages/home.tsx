import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import styles from '../styles/pages/Home.module.css';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { ChallengeBox } from '../components/ChallengeBox';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { AuthProvider } from '../contexts/AuthContext';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  user_name: string;
  user_image: string;
  user_email: string;
}

export default function Home(props: HomeProps) {
  return (
    <AuthProvider
      user_name={props.user_name}
      user_email={props.user_email}
      user_image={props.user_image}
    >
      <ChallengesProvider
        level={props.level}
        currentExperience={props.currentExperience}
        challengesCompleted={props.challengesCompleted}
      >
        <div className={styles.container}>
          <Head>
            <title>Início | move.it</title>
          </Head>

          <ExperienceBar />

          <CountdownProvider>
            <section>
              <div>
                <Profile />
                <CompletedChallenges />
                <Countdown />
              </div>
              <div>
                <ChallengeBox />
              </div>
            </section>
          </CountdownProvider>
        </div>
      </ChallengesProvider>
    </AuthProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const {
    level,
    currentExperience,
    challengesCompleted,
    user_name,
    user_image,
    user_email,
  } = ctx.req.cookies;
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
      user_name: String(user_name),
      user_image: String(user_image),
      user_email: String(user_email),
    },
  };
};
