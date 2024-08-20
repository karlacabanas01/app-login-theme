import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";

const Login: React.FC = () => {
  const authContext = useContext(AuthContext);
  const { val, setVal } = useTheme();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  if (!authContext) return null;

  const handleLogin = async () => {
    const loginSuccess = await authContext.login(username, password);
    if (loginSuccess) {
      setMessage("Login successful!");
    } else {
      setMessage("Incorrect username or password.");
    }
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handleRegister = async () => {
    if (!username || !password) {
      setMessage("Error: Both username and password fields are required.");
      setTimeout(() => {
        setMessage("");
      }, 2000);
      return;
    }

    const registerSuccess = await authContext.register(username, password);
    if (registerSuccess) {
      setMessage("Registration successful!");
    } else {
      setMessage("Failed, please try again.");
    }

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  return (
    <div className={`container ${val ? "dark" : "light"}`}>
      <button
        className={`buttonTheme ${val ? "Bdark" : "Blight"}`}
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setVal((prev) => !prev);
        }}
      >
        {val ? <FaMoon /> : <FaSun />}
      </button>

      <img src="login.webp" alt="logo" width={220} />
      <h1 className="title">{isRegistering ? "Register" : "Login"}</h1>
      <input
        className={`login ${val ? "loginLight" : "loginDark"}`}
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className={`login ${val ? "loginLight" : "loginDark"}`}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {isRegistering ? (
        <button className="buttonRegister" onClick={handleRegister}>
          Register
        </button>
      ) : (
        <button className="buttonLogin" onClick={handleLogin}>
          Log In
        </button>
      )}
      {message && <p className="message">{message}</p>}
      <button
        className={`buttonRegisterLogin`}
        type="button"
        onClick={() => setIsRegistering((prev) => !prev)}
      >
        {isRegistering
          ? "Do you already have an account?"
          : "You don't have an account. Register!"}
      </button>
    </div>
  );
};

export default Login;
