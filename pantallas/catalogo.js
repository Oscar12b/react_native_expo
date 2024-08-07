// Catalogo.js
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, TextInput } from 'react-native';
import Uniforme from '../componentes/uniforme';
import BackArrow from '../componentes/flecha_regreso'; // Asegúrate de ajustar la ruta
import { useNavigation } from '@react-navigation/native';

const Catalogo = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');

    const uniformes = [
        { nombre: "Camisa mujer", imagenUri: "https://cdn-icons-png.flaticon.com/512/1685/1685558.png" },
        { nombre: "Camisa hombre", imagenUri: "https://cdn-icons-png.flaticon.com/512/1685/1685558.png" },
        { nombre: "Falda mujer", imagenUri: "https://cdn-icons-png.flaticon.com/512/1685/1685558.png" },
        { nombre: "Pantalón niño", imagenUri: "https://cdn-icons-png.flaticon.com/512/1685/1685558.png" },
        // Puedes agregar más uniformes aquí
    ];

    const filteredUniformes = uniformes.filter(uniforme =>
        uniforme.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleBackPress = () => {
        navigation.navigate('Inicio');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <BackArrow onPress={handleBackPress} />
                <TextInput
                    style={styles.searchBar}
                    placeholder="Buscar uniformes..."
                    value={searchQuery}
                    onChangeText={text => setSearchQuery(text)}
                />
            </View>
            <ScrollView>
                {filteredUniformes.map((uniforme, index) => (
                    <Uniforme
                        key={index}
                        nombre={uniforme.nombre}
                        imagenUri={uniforme.imagenUri}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'flex-end', // Alinea los elementos en la parte inferior del contenedor
        padding: 10,
        marginTop: 30, // Espacio entre la barra de búsqueda y la parte superior
    },
    searchBar: {
        flex: 1, // Esto hace que la barra de búsqueda ocupe todo el espacio disponible
        height: 45,
        borderColor: 'gray',
        borderWidth: 1.5,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginLeft: 10, // Espacio entre la flecha y la barra de búsqueda
    },
});

export default Catalogo;
