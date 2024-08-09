import React, { useState, useEffect } from 'react';
import { ScrollView, Dimensions, StyleSheet, View, TextInput, ActivityIndicator, Image, Text } from 'react-native';

import Uniforme from '../componentes/uniforme';
import BackArrow from '../componentes/flecha_regreso';

import { useNavigation } from '@react-navigation/native';
import { fetchData } from '../utilidades/componentes';

import { CATALOGO_API } from '../utilidades/constantes';

import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';
import { FlatList } from 'react-native-gesture-handler';

const Catalogo = () => {

    //declaracion de constantes
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [uniformes, setUniformes] = useState([]);
    const [loading, setLoading] = useState(true);

    //efectos de useEffects
    useEffect(() => {
        const loadUniformes = async () => {
            try {
                const response = await fetchData(CATALOGO_API, 'readAllNombreImagen'); // Acción para obtener todos los uniformes

                //verificacion de la consulta
                if (response && response.status === 1) {
                    setUniformes(response.dataset);
                    Toast.show({
                        type: ALERT_TYPE.SUCCESS,
                        title: 'Catalogo de uniformes',
                        textBody: 'Datos obtenidos correctamente',
                    });
                } else {
                    Dialog.show({
                        type: ALERT_TYPE.DANGER,
                        title: 'Error',
                        textBody: response.error || 'No se pudo obtener los uniformes',
                        button: 'Aceptar',
                    });

                }
            } catch (error) {
                console.error('Error al cargar uniformes:', error);
            } finally {
                setLoading(false);
            }
        };

        loadUniformes();
    }, []);

    //constante para filtrar los datos de uniformes
    const filteredUniformes = uniformes.filter(uniforme =>
        uniforme.nombre_uniforme.toLowerCase().includes(searchQuery.toLowerCase())
    );

    //funcion para regresar a la pantalla de inicio
    const handleBackPress = () => {
        navigation.navigate('Inicio');//navegacion a incico
    };


    //retorno de la vista
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
            {filteredUniformes.length === 0 ? (
                <View style={styles.noUniformes}>
                    <Image source={require('../assets/avertencia.png')} style={styles.noUniformesImage} />
                    <Text style={styles.noUniformesText}>No hay uniformes</Text>
                </View>
            ) : (
                <ScrollView>
                    {filteredUniformes.map((uniforme, index) => (
                        <Uniforme
                            key={index}
                            nombre={uniforme.nombre_uniforme}
                            imagenUri={uniforme.foto}
                            id={uniforme.id_uniforme}
                        />
                    ))}
                </ScrollView>
            )}
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
        alignItems: 'center',
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
    noUniformes: {
        flex: 1,
        height: Dimensions.get('window').height,
        paddingBottom: Dimensions.get('window').height / 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noUniformesImage: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    noUniformesText: {
        fontSize: 18,
        color: '#333',
    },
});

export default Catalogo;
