import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/150' }} // Reemplaza con tu imagen
                    style={styles.logo}
                />
                <Text style={styles.headerText}>Inicio</Text>
            </View>

            <Text style={styles.welcomeText}>Bienvenido, Oscar</Text>

            <View style={styles.globalAverageContainer}>
                <Text style={styles.globalAverageText}>Promedio global</Text>
                <View style={styles.globalAverage}>
                    <Image
                        source={{ uri: 'https://via.placeholder.com/150' }} // Reemplaza con tu imagen
                        style={styles.trophyImage}
                    />
                    <Text style={styles.globalAverageNumber}>9.8</Text>
                </View>
            </View>

            <View style={styles.uniformsContainer}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/150' }} // Reemplaza con tu imagen
                    style={styles.uniformsImage}
                />
                <Text style={styles.uniformsText}>UNIFORMES</Text>
            </View>

            <Text style={styles.pendingActivitiesText}>Actividades pendientes</Text>

            <View style={styles.activityContainer}>
                <Text style={styles.activityTitle}>Maqueta ecosistema (35%)</Text>
                <Text style={styles.activityDescription}>
                    Identifica los diferentes componentes del ecosistema y su importancia,
                    mientras desarrollas habilidades de investigación y trabajo en equipo.
                </Text>
            </View>

            <View style={styles.footer}>
                <View style={styles.footerIcon}>
                    <Text>Inicio</Text>
                </View>
                <View style={styles.footerIcon}>
                    <Text>Notas</Text>
                </View>
                <View style={styles.footerIcon}>
                    <Text>Conducta</Text>
                </View>
                <View style={styles.footerIcon}>
                    <Text>Perfil</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
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
    logo: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    welcomeText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 20,
        marginLeft: 15,
    },
    globalAverageContainer: {
        marginHorizontal: 15,
        marginBottom: 20,
    },
    globalAverageText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    globalAverage: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    trophyImage: {
        width: 60,
        height: 60,
        marginRight: 10,
    },
    globalAverageNumber: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    uniformsContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    uniformsImage: {
        width: width * 0.4,
        height: width * 0.4,
    },
    uniformsText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    pendingActivitiesText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 15,
        marginBottom: 10,
    },
    activityContainer: {
        backgroundColor: '#ADD8E6',
        borderRadius: 10,
        marginHorizontal: 15,
        padding: 15,
    },
    activityTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    activityDescription: {
        fontSize: 14,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#DDDDDD',
        paddingVertical: 10,
    },
    footerIcon: {
        alignItems: 'center',
    },
});

export default HomeScreen;
