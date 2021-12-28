import { useSession } from 'next-auth/react';
import { useContext } from 'react';
import { RiSettings5Fill } from 'react-icons/ri';
import { AuthContext } from '../contexts/AuthContext';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.scss';

export function Profile() {
  const { level } = useContext(ChallengesContext);
  const { user_name, user_image } = useContext(AuthContext);
  return (
    <div className={styles.profileContainer}>
      <img
        src={user_image}
        alt={user_name}
      />
      <div>
        <strong>{user_name}</strong>
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
