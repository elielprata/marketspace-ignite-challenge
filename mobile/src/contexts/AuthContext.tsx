import { createContext, ReactNode, useEffect, useState } from "react";

import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from "@storage/storageUser";

export type AuthContextDataProps = {
  user: UserDTO;
  isLoadingUserData: boolean;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [isLoadingUserData, setIsLoadingUserData] = useState(true);
  const [user, setUser] = useState<UserDTO>({} as UserDTO);

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post("/sessions", { email, password });

      if (data.user) {
        setUser(data.user);
        storageUserSave(data.user);
      }
    } catch (error) {
      throw error;
    }
  }

  async function signOut() {
    try {
      setUser({} as UserDTO);
      await storageUserRemove();
    } catch (error) {
      throw error;
    }
  }

  async function loadUserData() {
    const userLogged = await storageUserGet();
    if (userLogged) {
      setUser(userLogged);
    }

    setIsLoadingUserData(false);
  }

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoadingUserData, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
