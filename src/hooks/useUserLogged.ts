// src/hooks/useUserLogged.ts
import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { UserPermissions } from "../types/UserPermissions";

export type IUserLogged = {
  id: number;
  name: string;
  roles: string[];
  groups: string;
  permissions: UserPermissions[]; // 👈 adicionando permissions
  isLogged: boolean;
  accessToken: string;
  refreshToken: string;
};

const STORAGE_KEY = "userLogged";

const setUserLogged = (userLogged: IUserLogged) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userLogged));
};

const getUserLogged = (): IUserLogged | null => {
  const userLogged = localStorage.getItem(STORAGE_KEY);
  return userLogged ? JSON.parse(userLogged) : null;
};

// Hook React
export const useUserLogged = () => {
  const [user, setUser] = useState<IUserLogged | null>(null);

  useEffect(() => {
    const storedUser = getUserLogged();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const saveUser = useCallback((newUser: IUserLogged) => {
    setUserLogged(newUser);
    setUser(newUser);
  }, []);

  const clearUser = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    Cookies.remove(STORAGE_KEY);
    setUser(null);
  }, []);

  /** Verifica se o usuário tem uma role */
  const hasRole = useCallback(
    (role: string): boolean => user?.roles.includes(role) ?? false,
    [user]
  );

  /** Verifica se o usuário tem alguma role */
  const hasAnyRole = useCallback(
    (roles: string[]): boolean =>
      roles.some((r) => user?.roles.includes(r)) ?? false,
    [user]
  );

  /** Verifica se o usuário tem uma permissão específica */
  const hasPermission = useCallback(
    (permission: UserPermissions): boolean =>
      user?.permissions.includes(permission) ?? false,
    [user]
  );

  /** Verifica se o usuário tem pelo menos uma permissão da lista */
  const hasAnyPermission = useCallback(
    (permissions: UserPermissions[]): boolean =>
      permissions.some((p) => user?.permissions.includes(p)) ?? false,
    [user]
  );

  return {
    user,
    saveUser,
    clearUser,
    hasRole,
    hasAnyRole,
    hasPermission,
    hasAnyPermission,
  };
};

export { setUserLogged, getUserLogged };
