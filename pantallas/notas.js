import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, FlatList } from 'react-native';
import AccordionNota from '../componentes/according_materia';
import SelectDropdown from '../componentes/select';

import { NOTAS_API } from '../utilidades/constantes';
import { controlAcceso } from '../utilidades/servicios';
import { fetchData } from '../utilidades/componentes';
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';

const Notas = ({ navigation }) => {

    ////*********************************************************************
    // declaracion de variables 
    const [valorSelect, setValorSelect] = useState(null);
    const [datosAcordeones, setDatosAcordeones] = useState([]);

    ////********************************************************************* */
    //se manda a llamar las materias
    useEffect(() => {
        const checkAccess = async () => {
            await controlAcceso(navigation);//control de accesso
        };
        checkAccess();
    }, [navigation]);

    ////*********************************************************************
    //use effects se mandan allamar 
    useEffect(() => {
        async function fetchDataNotas() {
            //se manda a llamar el valor 
            if (valorSelect != null) {
                const FORM = new FormData();
                FORM.append('idTrimestre', valorSelect);//se setea el valor el el form
                const RESPONSE = await fetchData(NOTAS_API, 'readMateriasPromedio', FORM);//se manda para leer la masterias 
                //se verifica el response
                if (RESPONSE.status) {
                    Toast.show({
                        type: ALERT_TYPE.SUCCESS,
                        title: 'Datos obtenidos',
                        textBody: 'Datos obtenidos correctamente',
                    });
                    setDatosAcordeones(RESPONSE.dataset || []);
                } else {
                    Dialog.show({
                        type: ALERT_TYPE.DANGER,
                        title: 'Error',
                        textBody: RESPONSE.error || 'No se pudo conectar al servidor',
                        button: 'Aceptar',
                    });

                    setDatosAcordeones([]);//se manda llamar
                }
            }
        }
        fetchDataNotas();
    }, [valorSelect]);//se cambia cuando esa variable cambia

    ////*********************************************************************

    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <SelectDropdown
                    filename="services/public/trimestre.php"
                    action="readAll"
                    valor={valorSelect}
                    setValor={setValorSelect}
                />

                {datosAcordeones.length === 0 ? (
                    <View style={styles.noActivitiesContainer}>
                        <Image source={require('../assets/avertencia.png')} style={styles.noActivitiesImage} />
                        <Text style={styles.noActivitiesText}>No hay actividades</Text>
                    </View>
                ) : (
                    <FlatList
                        data={datosAcordeones}
                        keyExtractor={(item) => item.id_profesor_materia.toString()}
                        renderItem={({ item }) => (
                            <AccordionNota
                                id={item.id_profesor_materia}
                                title={item.nombre_materia}
                                promedio_final={item.promedio_final}
                                colorHeader={"#D1EDF5"}
                                trimestre={valorSelect}
                            />
                        )}
                        contentContainerStyle={{ padding: 13 }}
                    />
                )}
            </View>
        </View>
    );
};

export default Notas;

////*********************************************************************
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1F1F7',
    },
    mainContainer: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 20,
    },
    noActivitiesContainer: {
        flex: 1,
        height: 400,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noActivitiesImage: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    noActivitiesText: {
        fontSize: 18,
        color: '#333',
    },
});
