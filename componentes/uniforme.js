import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Uniforme = ({ nombre, imagenUri }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{nombre}</Text>
            <Image source={{ uri: imagenUri }} style={styles.image} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#E0F7FA',
        padding: 10,
        borderRadius: 20,
        margin: 5,
        marginLeft: 10,
        marginRight: 10,
    },
    text: {
        fontSize: 18,
        color: '#000',
        marginLeft: 20,
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 30,
    },
});

export default Uniforme;