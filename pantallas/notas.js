import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Accordion from '../componentes/accordion';

const Notas = () => {
    const cartasData = [
        { titulo: "Maqueta ecosistema (35%)", descripcion: "Identifica los diferentes componentes del ecosistema y su importancia.", nota: "9.6" },
        { titulo: "Proyecto matemáticas (40%)", descripcion: "Realiza un proyecto sobre la teoría de números.", nota: "9.8" },
        { titulo: "Informe biología (25%)", descripcion: "Escribe un informe sobre la fotosíntesis.", nota: "9.7" },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'stretch',
                        borderWidth: 1,
                        borderRadius: 10,
                        marginTop: 20
                    }}>
                    <RNPickerSelect
                        placeholder={{ label: "Seleccione un trimestre" }}
                        onValueChange={(valor) => console.log(valor)}
                        items={[
                            { label: 'Primer trimestre', value: 'Primer trimestre' },
                            { label: 'Segundo trimestre', value: 'Segundo trimestre' },
                            { label: 'Tercer trimestre', value: 'Tercer trimestre' },
                        ]}
                    />
                </View>
                <ScrollView contentContainerStyle={{ rowGap: 15, padding: 13 }}>
                    <Accordion
                        apartado={"Notas"}
                        colorHeader={"#B2FFB0"}
                        data={{ nombreMateria: "Matemáticas", nota: "9.6", colorNota: '#88ceeb', mensaje: cartasData }}
                    />
                    <Accordion
                        apartado={"Notas"}
                        colorHeader={"#D1EDF5"}
                        data={{ nombreMateria: "Lenguaje", nota: "9.8", colorNota: '#88ceeb', mensaje: cartasData }}
                    />
                </ScrollView>
            </View>
        </View>
    );
};

export default Notas;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    mainContainer: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 20,
    },
});
