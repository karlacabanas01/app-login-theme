import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { GrLogout } from "react-icons/gr";

const LoggedInPage: React.FC = () => {
  const authContext = useContext(AuthContext);
  const { val, setVal } = useTheme();

  if (!authContext) return null;

  const handleLogout = () => {
    authContext.logout();
    setVal(true);
    console.log("Tema claro", val);
  };

  return (
    <div className={`container ${val ? "dark" : "light"}`}>
      <div>
        <h1>Welcome, {authContext.username}! You are logged in.</h1>
        <div className="img">
          <img src="homero.gif" alt="Avatar" className="img" />
        </div>
        <button className="buttonLogOuth" onClick={handleLogout}>
          Log Out <GrLogout className="icon" />
        </button>
      </div>
    </div>
  );
};

export default LoggedInPage;
