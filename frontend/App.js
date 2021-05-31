
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from './containers/Home';
import Lista from './containers/Lista';
import {Login} from './containers/Login';
import {Register} from './containers/Register';



const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name = "Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Categoria" component={Lista} />
        <Stack.Screen name = "Register" component = {Register} />
      </Stack.Navigator>
    </NavigationContainer>
  ); 
}

export default App;



