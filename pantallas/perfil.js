import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';

// Pantalla de perfil
// Muestra la información del perfil del alumno
// Nombre, correo, grado y sección

const Perfil = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={styles.header}>
                    <Image source={require('../assets/rosita.webp')} style={styles.profilePicture} />
                </View>
                <View>
                    <View>
                        <Text style={styles.label}>Nombre:</Text>
                        <View style={styles.infoRow}>
                            <Text style={styles.info}>Óscar Daniel Ramírez Martínez</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.label}>Correo:</Text>
                        <View style={styles.infoRow}>
                            <Text style={styles.info}>oscarito_ramirez@gmail.com</Text>
                        </View>
                    </View>
                    <View style={styles.gradeSectionContainer}>
                        <View style={styles.gradeSection}>
                            <Text style={styles.label}>Grado:</Text>
                            <View style={styles.infoRow2}>
                                <Text style={styles.info}>8º</Text>
                            </View>
                        </View>
                        <View style={styles.gradeSection}>
                            <Text style={styles.label}>Sección:</Text>
                            <View style={styles.infoRow2}>
                                <Text style={styles.info}>B</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
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
        width: '90%',
        backgroundColor: '#E0E0E0',
        padding: 20,
        borderRadius: 15,
        justifyContent: 'center',
    },
    infoRow2: {
        marginLeft: '5%',
        marginBottom: 15,
        width: '90%',
        backgroundColor: '#E0E0E0',
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
    info: {
        fontSize: 16,
        color: '#666',
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
});

export default Perfil;
