import { StyleSheet, } from 'react-native';
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Inicio from '../pantallas/inicio';
import Conducta from '../pantallas/conducta';
import Perfil from '../pantallas/perfil';
import Notas from '../pantallas/notas';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Inicio') {
            iconName = focused ? 'school' : 'school-outline';
          } else if (route.name === 'Notas') {
            iconName = focused ? 'library' : 'library-outline';
          } else if (route.name === 'Conducta') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        headerShown: false
      })}
    >
      <Tab.Screen name="Inicio" component={Inicio} />
      <Tab.Screen name="Notas" component={Notas} />
      <Tab.Screen name="Conducta" component={Conducta} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}

export default TabNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
});