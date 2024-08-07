// PantallaInicio.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { NOTAS_API } from '../utilidades/constantes';
import { fetchData } from '../utilidades/componentes';
import { controlAcceso } from '../utilidades/servicios';
import { SERVER_URL } from '../utilidades/constantes';
import CartaActividad from '../componentes/carta_actividad';

const PantallaInicio = () => {
    const [actividades, setActividades] = useState([]);
    const [imagenEstudiante, setImagenEstudiante] = useState('');
    const [nombreEstudiante, setNombreEstudiante] = useState('');
    const [nota, setNota] = useState('');
    const navigation = useNavigation();

    const checkAccess = async () => {
        await controlAcceso(navigation);
    };

    const visualizarDatos = (RESPONSE) => {
        if (RESPONSE.status) {
            const { dataset } = RESPONSE;
            if (dataset.length > 0) {
                const estudiante = dataset[0]; // Asumiendo que todos los datos son del mismo estudiante
                setActividades(dataset);
                setImagenEstudiante(estudiante.imagen_estudiante);
                setNombreEstudiante(estudiante.nombre_estudiante);
                setNota(estudiante.nota); // Asigna la primera nota que encuentres
            }
        } else {
            console.error(RESPONSE.error);
        }
    };

    useEffect(() => {
        const fetchDataAsync = async () => {
            const RESPONSE = await fetchData(NOTAS_API, 'readInicio');
            visualizarDatos(RESPONSE);
            console.log("hola: ", RESPONSE);
        };

        const checkAccess = async () => {
            await controlAcceso(navigation);
        };

        checkAccess();
        fetchDataAsync();

        return () => {
            // Cleanup code here
        };
    }, [navigation]);

    return (
        <View style={estilos.contenedor}>
            <View style={estilos.header}>
                <Image
                    source={{ uri: `${SERVER_URL}img/estudiantes/${imagenEstudiante}` }} // Usando la imagen obtenida del API
                    style={estilos.logo}
                />
                <Text style={estilos.headerText}>Inicio</Text>
            </View>
            <Text style={estilos.textoBienvenida}>Bienvenido, {nombreEstudiante}</Text>

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
                <View style={[estilos.contenedor]}>
                    <TouchableOpacity
                        style={[estilos.tarjeta, estilos.tarjetaUniformes]}
                        onPress={() => navigation.navigate('Catalogo')}
                    >
                        <Image source={require('../assets/uniforme_card.png')} style={estilos.imagenUniformes} />
                        <Text style={estilos.tituloUniformes}>UNIFORMES</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView>
                <View style={estilos.contenedorActividades}>
                    <Text style={estilos.tituloActividades}>Actividades pendientes</Text>
                    <ScrollView>
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
                </View>
            </ScrollView>
        </View>
    );
};

const estilos = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: '#fff',
    },
    textoBienvenida: {
        fontSize: wp('6%'),
        fontWeight: 'bold',
        marginBottom: hp('2%'),
    },
    contenedorInfo: {
        flexDirection: 'row',
        justifyContent: 'center', // Centrado horizontal
        alignItems: 'center', // Centrado vertical
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
        fontSize: wp('5%'),
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
    tarjeta: {
        width: wp('42%'),
        height: hp('36.9%'),
        alignItems: 'center',
        borderRadius: 10,
    },
    tarjetaUniformes: {
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#00CBFF',
    },
    imagenUniformes: {
        width: wp('30%'),
        height: hp('20%'),
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
        marginTop: hp('3%'),
        padding: wp('4%'),
    },
    tituloActividades: {
        fontSize: wp('5%'),
        fontWeight: 'bold',
        marginBottom: hp('2%'),
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ADD8E6',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    headerText: {
        fontSize: wp('6%'),
        marginLeft: wp('2%'),
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
});

export default PantallaInicio;
