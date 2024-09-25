import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { NOTAS_API, SERVER_URL } from '../utilidades/constantes';
import { fetchData } from '../utilidades/componentes';
import { controlAcceso } from '../utilidades/servicios';
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';
import { useFocusEffect } from '@react-navigation/native';
import CartaActividad from '../componentes/carta_actividad';

const PantallaInicio = () => {
    // Variables de estado
    const [actividades, setActividades] = useState([]);
    const [imagenEstudiante, setImagenEstudiante] = useState('');
    const [nombreEstudiante, setNombreEstudiante] = useState('');
    const [nota, setNota] = useState('');
    const navigation = useNavigation(); // Hook para la navegación

    const visualizarDatos = (RESPONSE) => {
        if (RESPONSE.status) {
            const { dataset } = RESPONSE;
            if (dataset.length > 0) {
                setActividades(dataset); // Asigna las actividades
            }
        } else {
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: RESPONSE.error || 'No se pudo obtener el promedio global',
                button: 'Aceptar',
            });
        }
    };

    // Visualizar promedio y asignarlo a la variable nota
    const visualizarPromedio = (RESPONSE2) => {
        if (RESPONSE2.status) {
            const DATA_PROMEDIO = RESPONSE2.dataset;
            setNota(DATA_PROMEDIO.promedio_final);
        } else {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: RESPONSE2.error || 'No se pudo obtener el promedio global',
            });
        }
    };

    // Efecto para cargar datos
    useEffect(() => {
        const fetchDataAsync = async () => {
            const RESPONSE = await fetchData(NOTAS_API, 'readInicio');
            if (RESPONSE && RESPONSE.length > 0) {
                visualizarDatos(RESPONSE);
            } else {
                setActividades([]); // Si no hay actividades, se establece un array vacío
            }

            const RESPONSE2 = await fetchData(NOTAS_API, 'promedio');
            visualizarPromedio(RESPONSE2);
        };

        const checkAccess = async () => {
            const DATA_ESTUDIANTE = await controlAcceso(navigation);
            setNombreEstudiante(DATA_ESTUDIANTE.username);
            setImagenEstudiante(DATA_ESTUDIANTE.fileStatus);
        };


        fetchDataAsync();
        checkAccess();
    }, [navigation]);

    return (
        <View style={estilos.contenedor}>
            <View style={estilos.header}>
                <Image
                    source={{ uri: `${SERVER_URL}img/estudiantes/${imagenEstudiante}` }}
                    style={estilos.imagenUser}
                />
                <Text style={estilos.headerText}>Bienvenido, {nombreEstudiante}</Text>
            </View>

            <View style={estilos.contenedorInfo}>
                <View style={estilos.tarjetaPromedio}>
                    <Text style={estilos.tituloPromedio}>Promedio global</Text>
                    <View style={estilos.contenedorPuntaje}>
                        <Icon name="graduation-cap" style={estilos.iconoGraduacion} />
                        <View style={estilos.infoRow}>
                            <Text style={estilos.puntaje}>{nota}</Text>
                        </View>
                    </View>
                    <Image source={require('../assets/trofeo_card.png')} style={estilos.imagenTrofeo} />
                </View>
                <View style={estilos.contenedorUniforme}>
                    <TouchableOpacity
                        style={[estilos.tarjeta, estilos.tarjetaUniformes]}
                        onPress={() => navigation.navigate('Catalogo')}
                    >
                        <Image source={require('../assets/uniforme_card.png')} style={estilos.imagenUniformes} />
                        <Text style={estilos.tituloUniformes}>UNIFORMES</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Text style={estilos.tituloActividades}>Actividades pendientes</Text>
            <ScrollView>
                <View style={estilos.contenedorActividades}>
                    {actividades.length > 0 ? (
                        <ScrollView horizontal={true}>
                            {actividades.map((actividad, index) => (
                                <CartaActividad
                                    key={index}
                                    tipoCard="Nota"
                                    data={{
                                        titulo: actividad.nombre_actividad,
                                        porcentaje: actividad.porcentaje,
                                        descripcion: actividad.descripcion,
                                        nota: actividad.nota,
                                    }}
                                />
                            ))}
                        </ScrollView>
                    ) : (
                        <View style={estilos.cuadroVacio}>
                            <Icon name="check-circle" style={estilos.iconoSinActividades} />
                            <Text style={estilos.textoCuadroVacio}>No hay actividades pendientes</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

const estilos = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: hp('2%'),
        paddingTop: hp('4%'),
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    headerText: {
        paddingLeft: 10,
        fontSize: wp('5%'),
        fontWeight: '600',
    },
    imagenUser: {
        width: 50,
        height: 50,
        paddingRight: 10,
        borderRadius: 25,
        borderWidth: 2,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    contenedorInfo: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: hp('1%'),
    },
    tarjetaPromedio: {
        width: wp('42%'),
        alignItems: 'center',
        padding: wp('4%'),
    },
    tituloPromedio: {
        fontSize: wp('4%'),
        fontWeight: 'bold',
        marginBottom: hp('1%'),
    },
    contenedorPuntaje: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconoGraduacion: {
        fontSize: wp('10%'),
        marginRight: wp('2%'),
    },
    puntaje: {
        fontSize: wp('8%'),
        fontWeight: 'bold',
    },
    imagenTrofeo: {
        width: wp('40%'),
        height: hp('25%'),
        marginTop: hp('1%'),
    },
    tarjetaUniformes: {
        height: hp('42%'),
        justifyContent: 'center',
        backgroundColor: '#00CBFF',
        borderRadius: 10,
    },
    imagenUniformes: {
        width: wp('40%'),
        height: hp('30%'),
        resizeMode: 'contain',
        marginTop: hp('2%'),
    },
    tituloUniformes: {
        fontSize: wp('4.5%'),
        fontWeight: 'bold',
        color: '#fff',
        marginTop: hp('2%'),
    },
    contenedorActividades: {
        padding: wp('2%'),
        paddingBottom: hp('2%'),
    },
    tituloActividades: {
        fontSize: wp('5%'),
        fontWeight: 'bold',
        marginHorizontal: wp('4%'),
    },
    cuadroVacio: {
        justifyContent: 'center',
        alignItems: 'center',
        height: hp('20%'),
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    textoCuadroVacio: {
        fontSize: wp('4.5%'),
        color: '#999',
        fontStyle: 'italic',
        textAlign: 'center',
    },
    iconoSinActividades: {
        fontSize: wp('15%'),
        color: '#4caf50',
        marginBottom: hp('1%'),
    },
});

export default PantallaInicio;
