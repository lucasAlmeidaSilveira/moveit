import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';
import { useSession } from 'next-auth/react';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  activeChallenges: Challenge;
  experienceToNextLevel: number;
  user_name: string;
  user_image: string;
  user_email: string;
  resetChallenge: () => void;
  levelUp: () => void;
  startNewChallenge: () => void;
  completeChallenges: () => void;
  closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  user_name: string;
  user_image: string;
  user_email: string;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({
  children,
  ...rest
}: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(
    rest.currentExperience ?? 0,
  );
  const [challengesCompleted, setChallengesCompleted] = useState(
    rest.challengesCompleted ?? 0,
  );

  const [activeChallenges, setActiveChallenges] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);

  const { data: session } = useSession();

  let user_name;
  let user_image;
  let user_email;

  if (session !== undefined) {
    user_name = session.user.name;
    user_image = session.user.image;
    user_email = session.user.email;

    Cookies.set('user_name', user_name);
    Cookies.set('user_image', user_image);
    Cookies.set('user_email', user_email);
    console.log(session);
  }

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenges(challenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio ✨'),
        {
          body: `Valendo ${challenge.amount}xp!`,
        };
    }
  }

  function resetChallenge() {
    setActiveChallenges(null);
  }

  function completeChallenges() {
    if (!activeChallenges) return;

    const { amount } = activeChallenges;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenges(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return (
    <ChallengesContext.Provider
      value={{
        startNewChallenge,
        level,
        currentExperience,
        challengesCompleted,
        levelUp,
        activeChallenges,
        resetChallenge,
        experienceToNextLevel,
        completeChallenges,
        closeLevelUpModal,
        user_name,
        user_image,
        user_email,
      }}
    >
      {children}
      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}
