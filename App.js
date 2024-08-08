import * as React from 'react';

//MAIN imports raíz del proyecto
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AlertNotificationRoot } from 'react-native-alert-notification';

import WelcomeScreen from './pantallas/bienvenido';
import Login from './pantallas/login';
import TabNavigator from './navegacion/tab_navigator';
import PantallaInicio from './pantallas/inicio';
import Catalogo from './pantallas/catalogo';
import Detalle from './pantallas/detalle_uniforme';

const Stack = createStackNavigator();

// FUNCITION APP NAVEGACION
// Función que retorna un componente de navegación verifica
function App() {
  return (
    <AlertNotificationRoot>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen name="Inicio" component={PantallaInicio} />
          <Stack.Screen name="Catalogo" component={Catalogo} />
          <Stack.Screen name="Detalle" component={Detalle} />
        </Stack.Navigator>
      </NavigationContainer>
    </AlertNotificationRoot>

  );
};

export default App;
