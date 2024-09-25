import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

import { SERVER_URL } from '../utilidades/constantes';
import { fetchData } from '../utilidades/componentes';
import BackArrow from '../componentes/flecha_regreso';

import { useNavigation } from '@react-navigation/native';
import { CATALOGO_API } from '../utilidades/constantes';

import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';

const DetalleUniforme = ({ route }) => {

    // Declaración de constantes
    const navigation = useNavigation();
    const { id } = route.params; // Obtener el id desde los parámetros
    const [uniforme, setUniforme] = useState(null);

    useEffect(() => {
        const fetchUniformeData = async () => { // Función para obtener los datos del uniforme

            const FORM = new FormData();
            //FORM CONST new 
            FORM.append('idUniforme', id);
            console.log(id);

            //llamada a la api por medio de fetch data
            const DATA_DETALLES = await fetchData(CATALOGO_API, 'readUniforme', FORM);
            console.log(DATA_DETALLES);
            if (DATA_DETALLES.status) {
                Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Uniforme',
                    textBody: 'Cargado correctamente',
                });
                setUniforme(DATA_DETALLES.dataset);
            } else {
                Dialog.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Error',
                    textBody: DATA_DETALLES.error || 'No se pudo obtener los detalles del uniforme',
                    button: 'Aceptar',
                });
            }
        };
        fetchUniformeData();//funcion para llamar a al fecth
    }, [id]);


    //saber cuando se carga la del unifrome se termina
    if (!uniforme) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#333" />
            </View>
        );
    }

    // Función para regresar a la pantalla de catálogo
    const handleBackPress = () => {
        // Se regresa a la pantalla anterior.
        navigation.goBack();
    };

    return (
        <ScrollView style={styles.container}>
            <BackArrow onPress={handleBackPress} />
            <Image source={{ uri: `${SERVER_URL}img/uniformes/${uniforme.foto}` }} style={styles.image} />
            <Text style={styles.title}>{uniforme.nombre_uniforme}</Text>
            <Text style={styles.description}>{uniforme.descripcion}</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>Tipo:</Text>
                <Text style={styles.infoValue}>{uniforme.tipo_uniforme}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>Talla:</Text>
                <Text style={styles.infoValue}>{uniforme.talla}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>Precio:</Text>
                <Text style={styles.infoValue}>${uniforme.precio}</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    image: {
        width: '100%',
        height: 250,
        borderRadius: 10,
        marginBottom: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,

    },
    infoContainer: {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 10,
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoLabel: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333',
        width: 100,
    },
    infoValue: {
        fontSize: 16,
        color: '#666',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
});

export default DetalleUniforme;
