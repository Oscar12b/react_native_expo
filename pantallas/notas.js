import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Accordion from '../componentes/accordion';
import SelectDropdown from '../componentes/select';


const Notas = () => {
  
    const [valorSelect, setValorSelect] = useState(null);

    const handleValorSelect = (value) => {
        setValorSelect(value);
        console.log("valor cambiado", value);
    };
  
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
                     <SelectDropdown
                          //es casi lo mismo que un fetch data pero con un select
                          filename="services/public/trimestres.php" //nombre del archivo de la api de php pero con importe ej
                          action="readALL" //accion de la api de php
                          form={{ key: 'value' }} // Pasa el objeto de formulario si es necesario
                          onValueChange={handleValorSelect} // Pasar la función callback
                      />
                </View>
                <ScrollView contentContainerStyle={{ rowGap: 15, padding: 13 }}>
                    <Accordion
                        apartado={"Notas"}
                        colorHeader={"#B2FFB0"}
                        data={{ nombreMateria: "Matemáticas", nota: "9.6", colorNota: '#88ceeb', dataset: cartasData }}
                    />
                    <Accordion
                        apartado={"Notas"}
                        colorHeader={"#D1EDF5"}
                        data={{ nombreMateria: "Lenguaje", nota: "9.8", colorNota: '#88ceeb', dataset: cartasData }}
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
