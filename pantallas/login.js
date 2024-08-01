import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    ImageBackground
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';


import { useNavigation } from '@react-navigation/native';
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';

import CustomInput from '../componentes/input_custom';
import BotonConCarga from '../componentes/boton_custom';

import { ESTUDIANTES_API } from '../utilidades/constantes';
import { controlAcceso } from '../utilidades/servicios';


const LoginScreen = () => {

    //********************************************************************************************
    // Estados para los campos de usuario y contraseña
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [errorUsuario, setErrorUsuario] = useState('');
    const [errorContraseña, setErrorContraseña] = useState('');

    const FORM_DATA = new FormData();
    const navigation = useNavigation();


    //********************************************************************************************
    // Control de acceso a login y main por medio de session
    const checkAccess = async () => {
        await controlAcceso(navigation);
    };

    useEffect(() => {
        checkAccess(); //funcion para verificar el acceso

        return () => {
        };
    }, []);

    useFocusEffect(
        useCallback(() => {
            checkAccess();
        }, [])
    );



    //******************************************************************************************** */
    // Función que se ejecuta al completar la petición a la API
    const handleFetchComplete = async (data) => {
        if (!data.status) {
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: data.error || 'Credenciales incorrectas',
                textBody: 'Contraseña o usuario incorrecto',
            });

            setErrorUsuario('Usuario incorrecto');
            setErrorContraseña('Contraseña incorrecta');

            setTimeout(() => {
                setErrorUsuario('');
                setErrorContraseña('');
            }, 2000);

        } else {
            await Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Credenciales correctas',
                textBody: 'Ingreso al sistema exitoso',
                button: 'Ingresar',
            });
            navigation.navigate('Main'); // Navega a la pantalla principal o la deseada
        }
    };


    //******************************************************************************************** */
    // Función que se ejecuta al presionar el botón de login
    const handledPressValidacion = () => {

        if (!usuario) {
            setErrorUsuario('Debe ingresar un usuario');
            return false;
        } else {
            setErrorUsuario('');
        }

        if (!contraseña) {
            setErrorContraseña('Debe ingresar una contraseña');
            return false;
        } else {
            setErrorContraseña('');
        }

        if (usuario && contraseña) {
            if (usuario.length < 8) {
                setErrorUsuario('El usuario debe tener al menos 9 caracteres');
                return
            } else if (contraseña.length < 6) {
                setErrorContraseña('La contraseña debe tener al menos 5 caracteres');
                return false;
            } else {
                setErrorUsuario('');
                setErrorContraseña('');

                // Se crea un objeto FormData para enviar los datos al servidor
                FORM_DATA.append('alias_estudiante', usuario);
                FORM_DATA.append('clave_estudiante', contraseña);

                return true;
            }

        }
    };


    //******************************************************************************************** */
    // Renderizado de la pantalla de login
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ImageBackground
                source={require('../assets/fondo_login_movil.png')}
                style={styles.backgroundImage}
            >
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.loginContainer}>
                        <View style={styles.imageContainer}>
                            <Image source={require('../assets/logo_fondo_azul_colegio.png')} style={styles.logo} />
                        </View>
                        <Text style={styles.title}>Inicio Sesión</Text>
                        <CustomInput
                            style={styles.title}
                            containerStyle={{ marginHorizontal: 10, marginBottom: 20 }}
                            placeholder={'Usuario'}
                            error={errorUsuario}
                            onChangeText={setUsuario}
                            value={usuario}
                        />
                        <CustomInput
                            style={styles.title}
                            containerStyle={{ marginHorizontal: 10, marginBottom: 20 }}
                            placeholder={'Contraseña'}
                            onChangeText={setContraseña}
                            error={errorContraseña}
                            value={contraseña}
                            secureTextEntry
                        />
                        <BotonConCarga
                            filename={ESTUDIANTES_API}
                            action="logIn"
                            form={FORM_DATA}
                            colorId={1}
                            onPress={handledPressValidacion}
                            onFetchComplete={handleFetchComplete}
                            label='Ingresar'
                        />
                    </View>
                </ScrollView>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    loginContainer: {
        marginHorizontal: 30,
        borderRadius: 10,
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.95)', // Fondo semitransparente
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    title: {
        fontSize: 30,
        fontWeight: 'semi-bold',
        textAlign: 'center',
        marginBottom: 40,
    },
});

export default LoginScreen;
