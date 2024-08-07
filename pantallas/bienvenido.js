// Propósito: Pantalla de carga que se muestra al inicio de la aplicación
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoadingScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const loadData = async () => {
      try {
        // Simula una operación asíncrona, como una solicitud de red
        await new Promise(resolve => setTimeout(resolve, 3000)); // Espera 3 segundos
        
        // Navega a la pantalla principal después de la carga
        navigation.navigate('Login'); // Esto hace que después del tiempos de espera de 3 segundos, se navegue a la pantalla de inicio de sesión
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/bienvenide.png')}
        style={styles.image}
      />

      {/* Muestra un indicador de actividad mientras se carga */}
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    </View>
  );
};

// Estos son los estilos de la pantalla de carga
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  image: {
    width: '100%', // Se asegura de que la imagen cubra toda la pantalla
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    position: 'absolute',
    bottom: 300,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// Exporta el componente
export default LoadingScreen;