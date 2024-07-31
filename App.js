import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pantallas/login';
import TabNavigator from './navegacion/tab_navigator';
import PantallaInicio from './pantallas/inicio';
import Catalogo from './pantallas/catalogo';

const Stack = createStackNavigator();

// FUNCITION APP NAVEGACION
// Función que retorna un componente de navegación verifica
function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="Inicio" component={PantallaInicio} />
        <Stack.Screen name="Catalogo" component={Catalogo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
