import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pantallas/login';
import TabNavigator from './utilidades/TabNavigator';

const Stack = createStackNavigator();

// FUNCITION APP NAVEGACION
// Función que retorna un componente de navegación verifica
function App() {
  return (
    <NavigationContainer> 
      
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
