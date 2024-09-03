import { render, screen, fireEvent } from "@testing-library/react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import LoggedInPage from "./Logged";

describe("LoggedInPage Component", () => {
  const logoutMock = jest.fn();
  const setValMock = jest.fn();

  const authContextValue = {
    username: "JohnDoe",
    isLoggedIn: true,
    login: jest.fn(),
    logout: logoutMock,
    register: jest.fn(),
  };

  const themeContextValue = {
    val: false,
    setVal: setValMock,
  };

  it("renders the component with the correct username and theme", () => {
    render(
      <AuthContext.Provider value={authContextValue}>
        <ThemeContext.Provider value={themeContextValue}>
          <LoggedInPage />
        </ThemeContext.Provider>
      </AuthContext.Provider>
    );

    expect(screen.getByText(/Welcome, JohnDoe!/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /log out/i })
    ).toBeInTheDocument();
  });

  it("calls the logout function and sets the theme to dark when logout button is clicked", () => {
    render(
      <AuthContext.Provider value={authContextValue}>
        <ThemeContext.Provider value={themeContextValue}>
          <LoggedInPage />
        </ThemeContext.Provider>
      </AuthContext.Provider>
    );

    const logoutButton = screen.getByRole("button", { name: /log out/i });
    fireEvent.click(logoutButton);

    expect(logoutMock).toHaveBeenCalledTimes(1); // Ahora esto debería funcionar
    expect(setValMock).toHaveBeenCalledWith(true); // Ahora esto debería funcionar
  });
});
