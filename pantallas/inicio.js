import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const PantallaInicio = () => {
    const navigation = useNavigation();
    return (
        <View style={estilos.contenedor}>
            <View style={estilos.header}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/150' }} // Reemplaza con tu imagen
                    style={estilos.logo}
                />
                <Text style={estilos.headerText}>Inicio</Text>
            </View>
            <Text style={estilos.textoBienvenida}>Bienvenido, Oscar</Text>

            <View style={estilos.contenedorInfo}>
                <View style={estilos.tarjetaPromedio}>
                    <Text style={estilos.tituloPromedio}>Promedio global</Text>
                    <View style={estilos.contenedorPuntaje}>
                        <Icon name="graduation-cap" style={estilos.iconoGraduacion} />
                        <Text style={estilos.puntaje}>9.8</Text>
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

            <View style={estilos.contenedorActividades}>
                <Text style={estilos.tituloActividades}>Actividades pendientes</Text>
                <View style={estilos.tarjetaActividad}>
                    <Text style={estilos.tituloActividad}>Maqueta ecosistema (35%)</Text>
                    <Text style={estilos.descripcionActividad}>
                        Identifica los diferentes componentes del ecosistema y su importancia, mientras desarrollas habilidades de investigación y trabajo en equipo.
                    </Text>
                </View>
            </View>
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
        justifyContent: 'space-between',
        marginBottom: hp('3%'),
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
        alignContent: 'center',
        backgroundColor: '#00CBFF',
    },

    tituloUniformes: {
        fontSize: wp('4.5%'),
        fontWeight: 'bold',
        color: '#fff',
        marginTop: hp('0%'),
    },
    contenedorActividades: {
        marginTop: hp('3%'),
    },
    tituloActividades: {
        fontSize: wp('5%'),
        fontWeight: 'bold',
        marginBottom: hp('2%'),
    },
    tarjetaActividad: {
        backgroundColor: '#ADD8E6',
        borderRadius: 10,
        padding: wp('4%'),
    },
    tituloActividad: {
        fontSize: wp('4%'),
        fontWeight: 'bold',
        marginBottom: hp('1%'),
    },
    descripcionActividad: {
        fontSize: wp('3.5%'),
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
});

export default PantallaInicio;
