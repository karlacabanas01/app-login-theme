import { AuthContext, AuthProvider } from "./context/AuthContext";
import LoggedInPage from "./components/Logged";
import { ThemeProvider } from "./context/ThemeContext";
import Login from "./components/Login";
import "./App.css";
const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AuthContext.Consumer>
          {(authContext) =>
            authContext?.isLoggedIn ? <LoggedInPage /> : <Login />
          }
        </AuthContext.Consumer>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
