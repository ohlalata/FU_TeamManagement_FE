import { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const checkStudent = async () => {
      if (user) {
        try {
          const response = await axios.post(
            "https://befuprojectteammanagementdemo.azurewebsites.net/api/Login",
            { email: user.email }
          );
          if (response.data.result.role === "student") {
            localStorage.setItem("stntoken", response.data.result.token);
            localStorage.setItem("stuId", response.data.result.student.stuId);

            setLoggedIn(true);
          } else {
            logOut();
          }
        } catch (error) {
          console.log(error);
          logOut();
        }
      }
    };
    checkStudent();
  }, [user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
