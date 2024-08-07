import React from 'react'
import { Card, StyleSheet, Image, View } from 'react-native';

export default function detalle_uniforme() {




    // Se crea el componente informacion
    const Detalle = () => {
        return (
    
            // Se crea el contenedor con el card
            <Card style={styles.container}>
            </Card>
        );
    };
    
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 10,
            marginBottom: 50,
        }
    });
    
}

