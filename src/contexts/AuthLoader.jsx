import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../Database/firebase.config';

const AuthUserContext = createContext(null);

export function useAuthUser() {
  return useContext(AuthUserContext);
}

export default function AuthLoader({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthUserContext.Provider value={user}>
      {children}
    </AuthUserContext.Provider>
  );
}
