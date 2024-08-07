import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NotaCard = ({
    id_asignacion,
    nombre_actividad,
    descripcion,
    porcentaje,
    fecha_inicio,
    fecha_finalizacion,
    estado_asignacion,
    nombre_tipo_asignacion,
    nota,
}) => {

    const [backgroundColorNota, setBackgroundColor] = useState('#fff');

    useEffect(() => {
        if (nota >= 7) {
            setBackgroundColor('#57D737');
        } else if (nota >= 5) {
            setBackgroundColor('#FFC93F');
        } else {
            setBackgroundColor('#D75A5A');
        }
    }, []);

    return (
        <View style={styles.card}>
            <View style={styles.content}>
                <Text style={styles.nombreActividad}>{`${nombre_actividad} (${porcentaje}%)`}</Text>
                <Text style={styles.descripcion}>{descripcion}</Text>
                <View style={styles.datesContainer}>
                    <View style={styles.dateBox}>
                        <Text style={styles.dateText}>{fecha_inicio}</Text>
                    </View>
                    <View style={styles.dateBox}>
                        <Text style={styles.dateText}>{fecha_finalizacion}</Text>
                    </View>
                </View>
                <View style={[styles.estadoBox, estado_asignacion === 'Activo' ? styles.estadoActivo : styles.estadoInactivo]}>
                    <Text style={styles.estadoText}>{estado_asignacion}</Text>
                </View>
            </View>
            <View style={[styles.notaContainer, { backgroundColor: backgroundColorNota }]}>
                <Text style={styles.nombreTipoAsignacion}>{nombre_tipo_asignacion}</Text>
                <Text style={styles.nota}>{nota}</Text>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    card: {
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
        flexDirection: 'row',
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#fff',
        marginVertical: 10,
    },
    content: {
        flex: 3,
        padding: 15,
    },
    nombreActividad: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    descripcion: {
        fontSize: 14,
        marginBottom: 15,
    },
    datesContainer: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    dateBox: {
        backgroundColor: '#E0E0E0',
        borderRadius: 10,
        padding: 10,
        flex: 1,
        alignItems: 'center',
    },
    dateText: {
        fontSize: 14,
    },
    estadoBox: {
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
    },
    estadoActivo: {
        backgroundColor: '#89FF6B',
    },
    estadoInactivo: {
        backgroundColor: '#DF4343',
    },
    estadoText: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
    },
    notaContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nombreTipoAsignacion: {
        fontSize: 12,
        color: '#000',
        marginBottom: 5,
    },
    nota: {
        fontSize: 32,
        fontWeight: 'bold',
    },
});

export default NotaCard;
