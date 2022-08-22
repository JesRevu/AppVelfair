import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, useState } from 'react';
import { BASE_URL } from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState({});
    const [productInfo, setProductInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const scanner = (qrCode) => {
        setIsLoading(true);

        axios.get(`${BASE_URL}/api/sat/productos/688691`, {
            qrCode,
        }).then(res => {
            let productInfo = res.data;
            console.log(productInfo);
            setProductInfo(productInfo);
            AsyncStorage.setItem('productInfo', JSON.stringify(productInfo));
            setIsLoading(false);
            console.log(productInfo);
            
            
        }).catch(e => {
        console.log(`product error ${e}`);
        setIsLoading(false);
        });
        
    };

    const login = (username, password) => {
    setIsLoading(true);

        axios.post(`${BASE_URL}/api/login`, {
            username, password,
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
        productInfo,
        login,
        scanner,
      }}>
      {children}
    </AuthContext.Provider>
    );
};