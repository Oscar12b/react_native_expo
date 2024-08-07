// NotaCard.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{nombre_actividad}</Text>
            <Text style={styles.description}>{descripcion}</Text>
            <View style={styles.row}>
                <Text style={styles.label}>Porcentaje:</Text>
                <Text style={styles.value}>{porcentaje}%</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Fecha Inicio:</Text>
                <Text style={styles.value}>{fecha_inicio}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Fecha Finalización:</Text>
                <Text style={styles.value}>{fecha_finalizacion}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Estado:</Text>
                <Text style={[styles.value, { color: estado_asignacion === 'completado' ? 'green' : 'red' }]}>
                    {estado_asignacion}
                </Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Tipo de Asignación:</Text>
                <Text style={styles.value}>{nombre_tipo_asignacion}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Nota:</Text>
                <Text style={styles.value}>{nota}</Text>
            </View>
        </View>
    );
};

export default NotaCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 15,
        marginVertical: 5,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 10,
        color: '#333',
    },
    description: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
    },
    value: {
        fontSize: 14,
        color: '#333',
    },
});
