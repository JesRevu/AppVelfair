import React, {useContext} from 'react';
import {Text, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import LoginScreen from '../screens/Login';
import {AuthContext} from '../context/AuthContext';
import SplashScreen from '../screens/SplashScreen';
import Scanner from '../screens/Scanner';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const {userInfo, splashLoading} = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {splashLoading ? (
          <Stack.Screen
            name="Splash Screen"
            component={SplashScreen}
            options={{headerShown: false}}
          />
        ) : userInfo.access_token ? (
          <Stack.Screen name="Home" component={Home} />         
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown: false}}
            />          
          </>         
        )}
         <Stack.Screen
              name="Scanner"
              component={Scanner}
            /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;