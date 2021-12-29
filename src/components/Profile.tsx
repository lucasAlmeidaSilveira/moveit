import { signOut, useSession } from 'next-auth/react';
import router from 'next/router';
import { useContext, useEffect } from 'react';
import { ImExit } from 'react-icons/im';
import { AuthContext } from '../contexts/AuthContext';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.scss';

export function Profile() {
  const { level } = useContext(ChallengesContext);
  const { user_name, user_image } = useContext(AuthContext);
  const { data: session } = useSession();
  
  useEffect(() => {
    if(!session) {
      router.push('/');
    }
  }, [])

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
      <div className={styles.link}>
        <button onClick={()=> signOut()}>
          <ImExit />
        </button>
      </div>
    </div>
  );
}
