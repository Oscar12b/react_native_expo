import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CatalogScreen from './views/catalogo';
import DetailScreen from './views/detalles';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CatalogScreen">
        <Stack.Screen name="CatalogScreen" component={CatalogScreen} options={{ title: 'Catálogo' }} />
        <Stack.Screen name="DetailScreen" component={DetailScreen} options={{ title: 'Detalles' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;