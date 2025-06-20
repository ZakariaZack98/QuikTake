import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../Database/firebase.config';
import { AuthUserContext } from './AuthUserContext';

export default function AuthLoader({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthUserContext.Provider value={user}>
      {children}
    </AuthUserContext.Provider>
  );
}
