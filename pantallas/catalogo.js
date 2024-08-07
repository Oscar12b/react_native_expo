import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, TextInput, ActivityIndicator } from 'react-native';
import Uniforme from '../componentes/uniforme';
import BackArrow from '../componentes/flecha_regreso';
import { useNavigation } from '@react-navigation/native';
import { fetchData } from '../utilidades/componentes'; // Ajusta la ruta según tu estructura de archivos

const Catalogo = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [uniformes, setUniformes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUniformes = async () => {
            try {
                const response = await fetchData(
                    'services/public/uniformes.php', // Ajusta el nombre del archivo según tu API
                    'readAllNombreImagen' // Acción para obtener todos los uniformes
                );

                if (response && response.status === 1) {
                    setUniformes(response.dataset);
                } else {
                    console.error('Error al obtener uniformes:', response.exception);
                }
            } catch (error) {
                console.error('Error al cargar uniformes:', error);
            } finally {
                setLoading(false);
            }
        };

        loadUniformes();
    }, []);

    const filteredUniformes = uniformes.filter(uniforme =>
        uniforme.nombre_uniforme.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleBackPress = () => {
        navigation.navigate('Inicio');
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
    }

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
                        nombre={uniforme.nombre_uniforme}
                        imagenUri={uniforme.foto} // Asegúrate de que esto coincida con tu estructura de datos
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
        alignItems: 'center', // Cambiado de 'flex-end' a 'center' para centrar la flecha y la barra de búsqueda
        padding: 10,
        marginTop: 30,
    },
    searchBar: {
        flex: 1,
        height: 45,
        borderColor: 'gray',
        borderWidth: 1.5,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginLeft: 10,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
});

export default Catalogo;
