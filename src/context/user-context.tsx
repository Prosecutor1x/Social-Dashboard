import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { IProfileUser } from "@/models/user-profile";
import { useAuth } from "./auth-context";
import { CircularProgress } from "@chakra-ui/react";
import { db } from "@/utils/firebase.config";
import {
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  DocumentData,
  updateDoc,
} from "firebase/firestore";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

interface IUserContext {
  user: IProfileUser | null;
  setUser: Dispatch<SetStateAction<IProfileUser | null>>;
  updateUser: (uid: string, data: Partial<IProfileUser>) => Promise<void>;
  createUser: (uid: string, data: Partial<IProfileUser>) => Promise<void>;
  deleteUser: (uid: string) => Promise<void>;
  getUserData: () => Promise<void>;
}

const defaultValues: IUserContext = {
  user: null,
  setUser: () => {},
  updateUser: () => Promise.resolve(),
  createUser: () => Promise.resolve(),
  deleteUser: () => Promise.resolve(),
  getUserData: () => Promise.resolve(),
};

const userContext = createContext<IUserContext>(defaultValues);

export function useUserContext() {
  return useContext(userContext);
}

export const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<IProfileUser | null>(defaultValues.user);
  const { authUser } = useAuth();
  const [loader, setLoader] = useState(false);

  const updateUser = async (uid: string, data: Partial<IProfileUser>) => {
    try {
      await updateDoc(doc(db, "users", uid), data);
      console.log(`Updated user data for ${uid}`, data);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const createUser = async (uid: string, data: Partial<IProfileUser>) => {
    try {
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, {
        firstName: data.firstName || null,
        lastName: data.lastName || null,
        displayName: data.displayName || null,
        phone: data.phone || null,
        address: data.address || null,
        photoURL: data.photoURL || null,
        influencers_in: data.influencers_in || null,
        influencers_yt: data.influencers_yt || null,
        isProfileComplete: true,
      });
      console.log(`Created user ${uid}`, data);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const getUserData = useCallback(async () => {
    setLoader(true);
    try {
      if (authUser) {
        const uid = authUser.uid;
        onSnapshot(doc(db, "users", uid), (doc) => {
          if (doc.exists()) {
            const userData = doc.data() as IProfileUser;
            setUser(userData);
          }
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
    setLoader(false);
  }, [authUser]);

  const deleteUser = useCallback(async (uid: string) => {
    try {
      await deleteDoc(doc(db, "users", uid));
      console.log(`Deleted user ${uid}`);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }, []);

  const value: IUserContext = {
    user,
    setUser,
    updateUser,
    createUser,
    deleteUser,
    getUserData,
  };

  useEffect(() => {
    getUserData();
  }, [authUser, getUserData]);

  return loader ? (
    <div className="h-screen flex justify-center items-center">
      <CircularProgress />
    </div>
  ) : (
    <userContext.Provider value={value}>{children}</userContext.Provider>
  );
};
