import Cookies from 'js-cookie';
import router from 'next/router';
import { useContext, useEffect } from 'react';
import { ImExit } from 'react-icons/im';
import { AuthContext } from '../contexts/AuthContext';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.scss';

export function Profile() {
  const { level } = useContext(ChallengesContext);

  const userName = Cookies.get('user')
  const avatar = Cookies.get('avatar')

  console.log(avatar)

  function signOut(){
    router.push('/'); 
  }

  return (
    <div className={styles.profileContainer}>
      <img
        src={avatar}
        alt={userName}
      />
      <div>
        <strong>{userName}</strong>
        <p>
          <img src='icons/level.svg' alt='Level' />
          Level {level}
        </p>
      </div>
        <button onClick={()=> signOut()}>
          <ImExit />
        </button>
    </div>
  );
}
