import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, useState } from 'react';
import { BASE_URL } from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const login = (username, password) => {
    setIsLoading(true);

        axios.post(`${BASE_URL}/api/login`, {
            username, password
        }).then(res => {
            let userInfo = res.data;
            console.log(userInfo);
            setUserInfo(userInfo);
            AsyncStorage.setItem('userIfo', JSON.stringify(userInfo));
            setIsLoading(false);
            console.log(userInfo);
        }).catch(e => {
            console.log(`login error ${e}`);
            setIsLoading(false);
        });
    };
    
    return (
        <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        login,
      }}>
      {children}
    </AuthContext.Provider>
    );
};