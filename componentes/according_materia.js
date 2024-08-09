import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import NotaCard from './carta_notas'

import { NOTAS_API } from '../utilidades/constantes';
import { fetchData } from '../utilidades/componentes';

const AccordionNota = ({ id, title, promedio_final, colorHeader, trimestre }) => {

    const [data, setData] = useState([]);
    const [colorBage, setColorBage] = useState('#ffffff');

    useEffect(() => {
        if (promedio_final >= 7) {
            setColorBage('#57D737');
        }
        else if (promedio_final >= 4) {
            setColorBage('#FFC93F');
        }
        else {
            setColorBage('#DF4343');
        }
    }, [promedio_final]);


    useEffect(() => {
        const fetchDataNotas = async () => {
            const FORM = new FormData();
            FORM.append('idMateriaProfesor', id);
            FORM.append('idTrimestre', trimestre);

            const RESPONSE = await fetchData(NOTAS_API, 'readNotasMateria', FORM);
            if (RESPONSE.status) {
                setData(RESPONSE.dataset || []);
            }
        }
        fetchDataNotas();
    }, [id]);

    return (

        <Collapse touchableOpacityProps={{ activeOpacity: 1 }} style={styles.container}>
            <CollapseHeader style={[{ backgroundColor: 'white' }, styles.collapseHeader]}>
                <View style={styles.headerCollapseContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={[styles.titleText]}>{title}</Text>
                        <View style={styles.badgeContainer}>
                            <View style={[styles.badge, { borderColor: colorBage }]}>
                                <Text style={styles.badgeText}>{promedio_final}</Text>
                            </View>
                        </View>
                    </View>
                    <MaterialIcons name="keyboard-arrow-down" size={24} color="#00796b" />
                </View>
            </CollapseHeader>
            <CollapseBody style={styles.collapseBody}>

                <FlatList style={styles.collapseBodyContainer}
                    data={data}
                    keyExtractor={(item) => item.id_asignacion.toString()}
                    renderItem={({ item }) => (
                        <NotaCard
                            id_asignacion={item.id_asignacion}
                            nombre_actividad={item.nombre_actividad}
                            descripcion={item.descripcion}
                            porcentaje={item.porcentaje}
                            estado_asignacion={item.estado_asignacion}
                            fecha_inicio={item.fecha_inicio}
                            fecha_finalizacion={item.fecha_finalizacion}
                            nombre_tipo_asignacion={item.nombre_tipo_asignacion}
                            nota={item.nota}
                        />
                    )}
                />

            </CollapseBody>
        </Collapse>

    );
};

export default AccordionNota;

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
        marginHorizontal: 0,
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
        borderWidth: 4,
        marginLeft: 10,
    },
    badgeText: {
        fontWeight: '600',
        fontSize: 20,
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
        paddingTop: 40,
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
