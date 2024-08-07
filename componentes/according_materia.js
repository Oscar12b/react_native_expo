import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { NOTAS_API } from '../utilidades/constantes';
import { fetchData } from '../utilidades/componentes';

const AccordionNota = ({ id, title, promedio_final, colorHeader }) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchDataNotas = async () => {
            const FORM = new FormData();
            FORM.append('idMateriaProfesor', id);
            const RESPONSE = await fetchData(NOTAS_API, 'readNotasMateria', FORM);
            if (RESPONSE.status) {
                setData(RESPONSE.dataset || []);
            }
        }
        fetchDataNotas();
    }, [id]);

    return (
        <View style={styles.container}>
            <Collapse touchableOpacityProps={{ activeOpacity: 1 }}>
                <CollapseHeader style={[{ backgroundColor: colorHeader || "#f0f8ff" }, styles.collapseHeader]}>
                    <View style={styles.headerCollapseContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleText}>{title}</Text>
                            <View style={styles.badgeContainer}>
                                <View style={[styles.badge, { backgroundColor: '#e0f7fa' }]}>
                                    <Text style={styles.badgeText}>{promedio_final}</Text>
                                </View>
                            </View>
                        </View>
                        <MaterialIcons name="keyboard-arrow-down" size={24} color="#00796b" />
                    </View>
                </CollapseHeader>
                <CollapseBody style={styles.collapseBody}>
                    <View style={styles.collapseBodyContainer}>
                        <FlatList
                            data={data}
                            keyExtractor={(item) => item.id_asignacion.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.cardContainer}>
                                    <Text style={styles.cardTitle}>{item.nombre_actividad}</Text>
                                    <Text style={styles.cardSubtitle}>Descripción:</Text>
                                    <Text style={styles.cardText}>{item.descripcion}</Text>
                                    <Text style={styles.cardSubtitle}>Porcentaje:</Text>
                                    <Text style={styles.cardText}>{item.porcentaje}%</Text>
                                    <Text style={styles.cardSubtitle}>Fechas:</Text>
                                    <Text style={styles.cardText}>Inicio: {item.fecha_inicio}</Text>
                                    <Text style={styles.cardText}>Finalización: {item.fecha_finalizacion}</Text>
                                    <Text style={styles.cardSubtitle}>Estado:</Text>
                                    <Text style={[styles.cardText, { color: item.estado_asignacion === 'Completado' ? 'green' : 'red' }]}>{item.estado_asignacion}</Text>
                                    <Text style={styles.cardSubtitle}>Tipo de Asignación:</Text>
                                    <Text style={styles.cardText}>{item.nombre_tipo_asignacion}</Text>
                                    <Text style={styles.cardSubtitle}>Nota:</Text>
                                    <Text style={[styles.cardText, { fontWeight: 'bold' }]}>{item.nota}</Text>
                                </View>
                            )}
                        />
                    </View>
                </CollapseBody>
            </Collapse>
        </View>
    );
};

export default AccordionNota;

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
        marginHorizontal: 10,
    },
    collapseHeader: {
        borderRadius: 15,
        height: 65,
        elevation: 5,
        padding: 10,
    },
    headerCollapseContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    titleText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        flex: 1,
    },
    badgeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    badge: {
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#b2dfdb',
        marginLeft: 10,
    },
    badgeText: {
        fontWeight: '600',
        fontSize: 20,
        color: '#00796b',
    },
    collapseBody: {
        backgroundColor: "#fff",
        elevation: 10,
        minHeight: 150,
        borderRadius: 20,
        marginTop: -40,
        zIndex: -1,
        padding: 10,
    },
    collapseBodyContainer: {
        flex: 1,
    },
    cardContainer: {
        marginTop: 30,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#f5f5f5',
        elevation: 2,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    cardSubtitle: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 10,
        marginBottom: 5,
    },
    cardText: {
        fontSize: 14,
        color: '#333',
    },
});
