import React, { createContext, useContext, useState, useEffect } from "react";
import apiService from "../network/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

/*@ts-ignore*/
const UserContext = createContext();

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [authData, setAuthData] = useState(null);

  const userLogin = async (email: string, password: string) => {
    const response = await apiService.post("user/login", {
      email: email,
      password: password,
    });
    if (response) {
      setAuthData(response?.data);
      //console.log('Auth',response?.data)
      const auth = response?.data?.data?.token;
      console.log(auth)
      setToken(auth)
      const user = await fetchUserData(auth);
      setUser(user?.data)
      await AsyncStorage.setItem("auth", auth);
    }
  };

  const checkUserExists = async () => {
    const localToken = await AsyncStorage.getItem("auth");
    if (localToken) {
      setToken(localToken as any);
      await fetchUserData(localToken);
    }
    else{
      setUser(null)
    }
  };

  const fetchUserData = async (token: string) => {
    const response = await apiService.get("user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response?.data) {
      setUser(response?.data?.data);
      return response?.data;
    } else {
      return null;
    }
  };

  const logoutUser = async () => {
    console.log(token)
    const response = await apiService.post("user/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Re',response?.data)
    if (response?.data) {
      setUser(null);
      setToken(null);
      return response?.data;
    } else {
      return null;
    }
  };

  useEffect(() => {
    checkUserExists();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userLogin,
        token,
        fetchUserData,
        user,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
