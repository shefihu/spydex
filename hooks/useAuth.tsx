import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { useRouter } from "next/router";
import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useMemo,
  Children,
} from "react";
import { auth } from "../firebase";
interface Auth {
  user: User | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  error: string | null;
  loading: boolean;
}
const AuthContext = createContext<Auth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logOut: async () => {},
  error: null,
  loading: false,
});
interface AuthProviderProps {
  children: React.ReactNode;
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const router = useRouter();
  //perssisting user
  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Logged in...
          setUser(user);
          setLoading(false);
        } else {
          // Not logged in...
          setUser(null);
          setLoading(true);
          router.push("/login");
          //   setLoading(false);
        }

        setInitialLoading(false);
      }),
    [auth]
  );
  const signUp = async (email: string, password: string) => {
    setLoading(true);
    try {
      const data = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).then((userCredential) => {
        setUser(userCredential.user);
        router.push("/");
        setLoading(false);
      });
    } catch (error: any) {
      alert(error);
      console.log(error);
      setLoading(false);
    }
  };
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const data = await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          setUser(userCredential.user);
          router.push("/");
          setLoading(false);
        }
      );
    } catch (error: any) {
      alert(error);
      setLoading(false);
    }
  };
  const logOut = async () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false));
  };
  const memdValue = useMemo(
    () => ({ user, signIn, signUp, loading, logOut, error }),
    [user, loading]
  );
  return (
    <AuthContext.Provider value={memdValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};
export default function useAuth() {
  return useContext(AuthContext);
}
