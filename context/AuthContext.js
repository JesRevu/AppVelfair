import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, useState } from 'react';
import { BASE_URL } from '../config';



export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    
    const [userInfo, setUserInfo] = useState({});
    const [productInfo, setProductInfo] = useState({});
    const [token, setToken] = useState({});
    const [nombre, setNombre] = useState({});
    
    const [isLoading, setIsLoading] = useState(false);


    
    const scanner = (qrCode) => {
        setIsLoading(true);

        axios.get(`${BASE_URL}/api/sat/productos/${qrCode}`, {
            headers: {"Authorization" : `Bearer ${token}`}
        
          }).then(res => {
            let productInfo = res.data;
            // console.log(productInfo);
            setProductInfo(productInfo);
            AsyncStorage.setItem('productInfo', JSON.stringify(productInfo));
            setIsLoading(false);
            let nombre = productInfo['description'];
            console.log(nombre);
            setNombre(nombre);

            
            
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
            
            let token = userInfo['access_token'];
            console.log(token); 
            setToken(token);
    
            setIsLoading(false);
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
        scanner,
        login,
        nombre,
      }}>
      {children}
    </AuthContext.Provider>
    );
};