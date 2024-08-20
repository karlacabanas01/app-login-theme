import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const LoggedInPage: React.FC = () => {
  const authContext = useContext(AuthContext);
  const { val, setVal } = useTheme();

  if (!authContext) return null;

  const handleLogout = () => {
    authContext.logout();
    setVal(true); // Cambiar a modo claro al desloguearse
    console.log("Tema claro", val);
  };

  return (
    <div className={`container ${val ? `dark` : `light`}`}>
      <div>
        <h1>Welcome, {authContext.username}! You are logged in.</h1>
        <button
          className={`button ${val ? "Blight" : "Bdark"}`}
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default LoggedInPage;
