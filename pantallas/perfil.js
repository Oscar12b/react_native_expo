import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

import BotonConCarga from '../componentes/boton_custom';
import { SERVER_URL } from '../utilidades/constantes';

import { ESTUDIANTES_API } from '../utilidades/constantes';
import { controlAcceso } from '../utilidades/servicios';
import { fetchData } from '../utilidades/componentes'; // Asegúrate de importar correctamente la función fetchData

import { useNavigation } from '@react-navigation/native';

import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';


// Función para determinar el color del badge según el estado del estudiante
const getBadgeStyle = (estado) => {
    return {
        backgroundColor: estado === 'Habilitado' ? 'green' : 'red',
    };
};

const Perfil = () => {


    //********************************************************************************************
    const [aliasEstudiante, setAliasEstudiante] = useState('');
    const [nombreCompleto, setNombreCompleto] = useState('');
    const [imagen, setImagen] = useState('');
    const [fechaMatriculacion, setFechaMatriculacion] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [grado, setGrado] = useState('');
    const [seccion, setSeccion] = useState('');
    const [estado, setEstado] = useState('');
    const [horario, setHorario] = useState('');
    const [nie, setNie] = useState('');
    const navigation = useNavigation();


    //********************************************************************************************
    // Control de acceso a login y main por medio de session
    const checkAccess = async () => {
        await controlAcceso(navigation);
    };

    //********************************************************************************************
    //function para visualizar los datos de los estudiantes el perfil 
    const visualizarDatos = (response) => {
        console.warn(response);
        if (response.status) {

            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: response.message || 'Datos obtenidos correctamente',
                textBody: 'Perfil cargado correctamente',
            });

            try {

                const DATA = response.dataset;
                setAliasEstudiante(DATA.alias_estudiante);
                setNombreCompleto(DATA.nombre_completo);
                setImagen(DATA.imagen_estudiante);
                setFechaMatriculacion(DATA.fecha_matriculacion);
                setFechaNacimiento(DATA.fecha_nacimiento);
                setEstado(DATA.estado_estudiante);
                setHorario(DATA.horario);
                setNie(DATA.nie_estudiante);
                setGrado(DATA.nombre_grado);
                setSeccion(DATA.nombre_seccion);
            } catch (error) {
                Dialog.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Error fatal',
                    textBody: 'No se pudieron obtener los datos del perfil',
                    button: 'Aceptar',
                });
            }

        } else {
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: response.error || 'Error al consultar al servidor',
                textBody: 'No se pudo obtener los datos de la sesión',
            });
        }
    };

    //********************************************************************************************
    //useEffect manda a traer los datos ademas de checkacceso
    useEffect(() => {
        const fetchPerfil = async () => {
            const RESPONSE = await fetchData(ESTUDIANTES_API, 'readProfile');
            visualizarDatos(RESPONSE);
        };
        const checkAccess = async () => {
            await controlAcceso(navigation);
        };

        checkAccess();
        fetchPerfil();

        return () => {
            // Cleanup code here
        };
    }, []);


    //********************************************************************************************
    // Verifica si se ha completado el fetch de la llamada a la api 
    const handleFetchComplete = (response) => {
        if (response.status === 1) {
            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: response.message || 'Sesión cerrada',
                textBody: 'Sesión cerrada correctamente',
            });
            navigation.navigate('Login');
        } else {
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: response.error || 'Error al cerrar sesión',
                textBody: 'No se pudo cerrar la sesión',
            });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.header}>
                    <Image source={{ uri: `${SERVER_URL}img/estudiantes/${imagen}` }} style={styles.profilePicture} />
                </View>
                <View>
                    <View>
                        <View style={[styles.infoRow, getBadgeStyle(estado)]}>
                            <Text style={styles.info2}>{estado}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.label}>Alias:</Text>
                        <View style={styles.infoRow}>
                            <Text style={styles.info}>{aliasEstudiante}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.label}>Nombre:</Text>
                        <View style={styles.infoRow}>
                            <Text style={styles.info}>{nombreCompleto}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.label}>Fecha de Matriculación:</Text>
                        <View style={styles.infoRow}>
                            <Text style={styles.info}>{fechaMatriculacion}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.label}>Fecha de Nacimiento:</Text>
                        <View style={styles.infoRow}>
                            <Text style={styles.info}>{fechaNacimiento}</Text>
                        </View>
                    </View>
                    <View style={styles.gradeSectionContainer}>
                        <View style={styles.gradeSection}>
                            <Text style={styles.label}>Grado:</Text>
                            <View style={styles.infoRow2}>
                                <Text style={styles.info}>{grado}</Text>
                            </View>
                        </View>
                        <View style={styles.gradeSection}>
                            <Text style={styles.label}>Sección:</Text>
                            <View style={styles.infoRow2}>
                                <Text style={styles.info}>{seccion}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.twoColumnContainer}>
                        <View style={styles.columnItem}>
                            <Text style={styles.label}>Horario:</Text>
                            <View style={styles.infoRow}>
                                <Text style={styles.info}>{horario}</Text>
                            </View>
                        </View>
                        <View style={styles.columnItem}>
                            <Text style={styles.label}>NIE:</Text>
                            <View style={styles.infoRow}>
                                <Text style={styles.info}>{nie}</Text>
                            </View>
                        </View>

                    </View>

                    <View style={styles.contenedorBoton}>
                        <BotonConCarga
                            filename={ESTUDIANTES_API}
                            action="logOut"
                            colorId={2}
                            onFetchComplete={handleFetchComplete}
                            label='Cerrar Sesión'
                        />
                    </View>

                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },
    scrollViewContent: {
        paddingBottom: 20,
    },
    header: {
        marginTop: 20,
        paddingVertical: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    logo: {
        width: 50,
        height: 50,
        position: 'absolute',
        left: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    profilePicture: {
        width: 140,
        height: 140,
        borderRadius: 80,
        marginBottom: 20,
    },
    infoRow: {
        marginLeft: '5%',
        marginBottom: 15,
        textAlign: 'center',
        width: '90%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 15,
        justifyContent: 'center',
    },
    infoRow2: {
        marginLeft: '5%',
        marginBottom: 15,
        width: '90%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 15,
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 5,
        marginLeft: '5%',
    },
    contenedorBoton: {
        margin: 20,
    },
    info: {
        fontSize: 16,
        color: '#666',
        justifyContent: 'center',
    }, info2: {
        fontSize: 16,
        textAlign: 'center',
        color: 'white',
        justifyContent: 'center',
    },
    gradeSectionContainer: {
        width: '95%',
        marginLeft: '3%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    gradeSection: {
        alignItems: 'left',
        flex: 1,
    },
    twoColumnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '95%',
        marginLeft: '3%',
    },
    columnItem: {
        width: '45%',
    },
});

export default Perfil;
