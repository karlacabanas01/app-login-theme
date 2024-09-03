/* eslint-disable testing-library/no-unnecessary-act */
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import Login from "./Login";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

describe("Login Component", () => {
  const loginMock = jest.fn();
  const registerMock = jest.fn();
  const setValMock = jest.fn();

  const authContextValue = {
    username: "",
    isLoggedIn: false,
    login: loginMock,
    logout: jest.fn(),
    register: registerMock,
  };

  const themeContextValue = {
    val: false,
    setVal: setValMock,
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("renders the component and allows theme change", () => {
    act(() => {
      render(
        <AuthContext.Provider value={authContextValue}>
          <ThemeContext.Provider value={themeContextValue}>
            <Login />
          </ThemeContext.Provider>
        </AuthContext.Provider>
      );
    });

    const themeButton = screen.getByRole("button", { name: "" });

    expect(themeButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(themeButton);
    });

    expect(setValMock).toHaveBeenCalledWith(expect.any(Function));
  });

  it("handles login correctly", async () => {
    loginMock.mockResolvedValueOnce(true);

    act(() => {
      render(
        <AuthContext.Provider value={authContextValue}>
          <ThemeContext.Provider value={themeContextValue}>
            <Login />
          </ThemeContext.Provider>
        </AuthContext.Provider>
      );
    });

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText(/Username/i), {
        target: { value: "JohnDoe" },
      });
      fireEvent.change(screen.getByPlaceholderText(/Password/i), {
        target: { value: "password123" },
      });

      const loginButton = screen.getByRole("button", { name: /log in/i });
      fireEvent.click(loginButton);
    });

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith("JohnDoe", "password123");
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(screen.getByText(/Login successful!/i)).toBeInTheDocument();
    });
  });

  it("shows error message when username or password is missing during registration", async () => {
    render(
      <AuthContext.Provider value={authContextValue}>
        <ThemeContext.Provider value={themeContextValue}>
          <Login />
        </ThemeContext.Provider>
      </AuthContext.Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    const registerButton = screen.getByRole("button", { name: /register/i });
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Both username and password fields are required./i)
      ).toBeInTheDocument();
    });
  });

  it("handles registration correctly after login", async () => {
    registerMock.mockResolvedValueOnce(true);

    await act(async () => {
      render(
        <AuthContext.Provider value={authContextValue}>
          <ThemeContext.Provider value={themeContextValue}>
            <Login />
          </ThemeContext.Provider>
        </AuthContext.Provider>
      );
    });

    fireEvent.click(
      screen.getByRole("button", { name: /you don't have an account/i })
    );

    await screen.findByPlaceholderText(/Username/i);

    fireEvent.change(screen.getByPlaceholderText(/Username/i), {
      target: { value: "JohnDoe" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(registerMock).toHaveBeenCalledWith("JohnDoe", "password123");
    });

    jest.runAllTimers();

    await waitFor(() => {
      expect(screen.getByText(/Registration successful!/i)).toBeInTheDocument();
    });
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(
      <AuthContext.Provider value={authContextValue}>
        <ThemeContext.Provider value={themeContextValue}>
          <Login />
        </ThemeContext.Provider>
      </AuthContext.Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
