import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../pantallas/login';
import InicioPantalla from '../pantallas/inicio'

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Inicio" component={InicioPantalla} />
        </Stack.Navigator>
    );
};

export default StackNavigator;