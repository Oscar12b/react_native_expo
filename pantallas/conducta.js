import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Accordion from '../componentes/accordion';


// Pantalla de conducta
// Muestra las faltas e inasistencias del alumno
// Selecciona un trimestre y muestra las faltas e inasistencias correspondientes
const Conducta = ({ navigation }) => {
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

                    {/* Para contraste verde: acordeón - #B2FFB0, ícono #69ED66, 
                    para contraste naranja: acordeón - #FED789, ícono - #F39C12 
                    para contraste rojo: acordeón - #ff6f61, ícono - #d32f2f */}

                    <Accordion
                        tipo={"Falta"}
                        colorHeader={"#B2FFB0"}
                        icono={"check"}
                        backgroundIcono={"#69ED66"}
                        titulo={"Códigos"}
                        data={{ mensaje: "Ningún código asignado" }}
                    />

                    <Accordion
                        tipo={"Inasistencia"}
                        colorHeader={"#FED789"}
                        icono={"advertencia"}
                        backgroundIcono={"#F39C12"}
                        titulo={"Inasistencias"}
                        data={{ mensaje: "Ninguna inasistencia registrada" }}
                    />

                    <Accordion
                        tipo={"Falta"}
                        colorHeader={"#ff6f61"}
                        icono={"martillo"}
                        backgroundIcono={"#d32f2f"}
                        titulo={"Códigos"}
                        data={{ mensaje: "Ningún código asignado" }}
                    />
                </ScrollView>
            </View>
        </View >
    );
};

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

export default Conducta;