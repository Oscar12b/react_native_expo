import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import AccordionNota from '../componentes/according_materia';
import SelectDropdown from '../componentes/select';
import { NOTAS_API } from '../utilidades/constantes';
import { controlAcceso } from '../utilidades/servicios';
import { fetchData } from '../utilidades/componentes'; // Asegúrate de importar correctamente la función fetchData
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';

const Notas = ({ navigation }) => { // Asegúrate de pasar navigation como prop si es necesario
    const [valorSelect, setValorSelect] = useState(null);
    const [datosAcordeones, setDatosAcordeones] = useState([]);

    useEffect(() => {
        const checkAccess = async () => {
            await controlAcceso(navigation);
        };

        checkAccess();
        return () => { };
    }, [navigation]);

    useEffect(() => {
        async function fetchDataNotas() {
            console.log(valorSelect);
            if (valorSelect != null) {
                const FORM = new FormData();
                FORM.append('idTrimestre', valorSelect);
                const RESPONSE = await fetchData(NOTAS_API, 'readMateriasPromedio', FORM);
                console.log(RESPONSE);
                if (RESPONSE.status) {
                    Toast.show({
                        type: ALERT_TYPE.SUCCESS,
                        title: 'Datos obtenidos',
                        textBody: 'Datos obtenidos correctamente',
                    });
                    console.log(RESPONSE.dataset);
                    setDatosAcordeones(RESPONSE.dataset || []); // Asegúrate de que datosAcordeones sea siempre un array
                } else {
                    Dialog.show({
                        type: ALERT_TYPE.DANGER,
                        title: 'Error',
                        textBody: RESPONSE.error || 'No se pudo conectar al servidor',
                        button: 'Aceptar',
                    });
                    setDatosAcordeones([]); // Asegúrate de que datosAcordeones sea siempre un array

                }
            }
        }
        fetchDataNotas();
    }, [valorSelect]);

    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <SelectDropdown
                    // Es casi lo mismo que un fetch data pero con un select
                    filename="services/public/trimestre.php" // Nombre del archivo de la API de PHP
                    action="readAll" // Acción de la API de PHP
                    valor={valorSelect}
                    setValor={setValorSelect}
                />
                <ScrollView contentContainerStyle={{ rowGap: 15, padding: 13 }}>
                    {datosAcordeones.map(({ id_profesor_materia, nombre_materia, promedio_final }) => (
                        <AccordionNota
                            key={id_profesor_materia}
                            id={id_profesor_materia}
                            title={nombre_materia}
                            promedio_final={promedio_final}
                            colorHeader={"#D1EDF5"}
                        />
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

export default Notas;

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
});
