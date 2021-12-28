import { useContext } from 'react';
import { RiSettings5Fill } from 'react-icons/ri';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.scss';

export function Profile() {
  const { level } = useContext(ChallengesContext);
  return (
    <div className={styles.profileContainer}>
      <img
        src='https://github.com/lucasAlmeidaSilveira.png'
        alt='Lucas Almeida'
      />
      <div>
        <strong>Lucas Almeida</strong>
        <p>
          <img src='icons/level.svg' alt='Level' />
          Level {level}
        </p>
      </div>
      <button type='button'>
        <RiSettings5Fill />
      </button>
    </div>
  );
}
