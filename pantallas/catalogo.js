// Se importan las librerias y hooks necesarios
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

// Se importa el componente Uniforme
import Uniforme from '../componentes/uniforme';

// Se crea el componente Catalogo
const Catalogo = () => {
    return (

        // Se crea el contenedor con el ScrollView
        <ScrollView style={styles.container}>
            <Uniforme
                nombre="Camisa hombre"
                imagenLocal={require('../assets/sueter.webp')}
            />
            <Uniforme
                nombre="Falda mujer"
                imagenLocal={require('../assets/sueter.webp')}
            />
            <Uniforme
                nombre="Pantalón niño"
                imagenLocal={require('../assets/sueter.webp')}
            />
        </ScrollView>
    );
};

// Se asignan los estilos con StyleSheet
const styles = StyleSheet.create({

    // Se le asignan los estilos al contenedor
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
});

// Se exporta el componente
export default Catalogo;
