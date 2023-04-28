import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    const storedUser = localStorage.getItem("user");

    if (jwt && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const setIsLoggedIn = (loggedIn, userData) => {
    if (loggedIn) {
      setUser(userData.user);
      localStorage.setItem("jwt", userData.jwt);
      localStorage.setItem("user", JSON.stringify(userData.user));
    } else {
      setUser(null);
      localStorage.removeItem("jwt");
      localStorage.removeItem("user");
    }
  };

  return (
    <AuthContext.Provider value={{ user, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
