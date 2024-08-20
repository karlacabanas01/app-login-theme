import { createContext, useState, ReactNode, useContext } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  username: string;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (username: string, password: string) => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [users, setUsers] = useState<{ username: string; password: string }[]>(
    []
  );

  const login = async (username: string, password: string) => {
    const userExists = users.find(
      (user) => user.username === username && user.password === password
    );
    if (userExists) {
      setIsLoggedIn(true);
      setUsername(username);
      return true;
    } else {
      console.log("Usuario o contraseña incorrectos");
      return false;
    }
  };

  const register = async (username: string, password: string) => {
    const userExists = users.find((user) => user.username === username);
    if (!userExists) {
      setUsers([...users, { username, password }]);
      console.log("Usuario registrado exitosamente");
      return true;
    } else {
      console.log("El nombre de usuario ya está en uso");
      return false;
    }
  };

  const logout = async () => {
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, username, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
