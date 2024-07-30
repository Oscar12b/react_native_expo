// Importamos las librerias y hooks necesarios
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

// Se crea el componente Uniforme
const Uniforme = ({ nombre, imagenUri, imagenLocal }) => {
    return (
        
        // Se crea el contenedor con el texto y la imagen
        <View style={styles.container}>
            <Text style={styles.text}>{nombre}</Text>
            {imagenLocal ? (
                <Image source={imagenLocal} style={styles.image} />
            ) : (
                <Image source={{ uri: imagenUri }} style={styles.image} />
            )}
        </View>
    );
};

//Se asignan lso estilos con StyleSheet
const styles = StyleSheet.create({

    // Se le asignan los estilos al contenador
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#E0F7FA',
        padding: 10,
        borderRadius: 20,
        margin: 5,
    },

    // Se le asignan los estilos al texto
    text: {
        fontSize: 18,
        color: '#000',
        marginLeft: 20,
    },

    // Se le asignan los estilos a la imagen
    image: {
        width: 50,
        height: 50,
        marginRight: 30,
    },
});

// Se exporta el componente
export default Uniforme;
