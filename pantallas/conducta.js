import { View, StyleSheet, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Accordion from '../componentes/accordion';
import SelectDropdown from '../componentes/select';
import { React, useEffect, useState } from 'react';
import { fetchData } from '../utilidades/componentes';


// Pantalla de conducta
// Muestra las faltas e inasistencias del alumno
// Selecciona un trimestre y muestra las faltas e inasistencias correspondientes
const Conducta = ({ navigation }) => {

    const [valorSelect, setValorSelect] = useState(null);
    const [faltas, setFaltas] = useState([])
    const [tiposFaltas, setTiposFaltas] = useState([]);
    const [inasistencias, setInasistencias] = useState([]);
    const [iconoFaltas, setIconoFaltas] = useState('');
    const [colorFaltas, setColorFaltas] = useState([]);


    const handleValorSelect = (value) => {
        // console.log(value);
        // console.log("valor cambiado", value);
    };

    // Hook que se ejecuta al cambiar el valor de la constante valorSelect.
    useEffect(() => {
        // Función que obtiene las faltas asignadas al estudiante en un trimestre específico.
        async function cargarFaltas() {
            // Se verifica que se haya seleccionado un trimestre.
            if (valorSelect != null) {
                // Se inicializa la constante donde se almacenará el id del trimestre.
                const FORM = new FormData();
                // Se almacena el id del trimestre en el form.
                FORM.append('idTrimestre', valorSelect);
                // Se realiza la petición para obtener las faltas del estudiante en el trimestre seleccionado.
                const RESPONSE_API = await fetchData('services/public/faltas.php', 'readFromStudent', FORM);
                // Si se ha asignado alguna falta se ejecuta el código.
                if (RESPONSE_API.dataset.length > 0) {
                    // Se configura el color del acordeón de faltas.
                    setIconoFaltas('martillo');
                    setColorFaltas(['#ff6f61', '#d32f2f']);
                } else {
                    // Se configura el color del acordeón de faltas.
                    setIconoFaltas('check');
                    setColorFaltas(['#B2FFB0', '#69ED66']);
                }
                // Se asigna el valor de las constantes. 
                setFaltas(RESPONSE_API.dataset);
                var tipos_faltas = RESPONSE_API.dataset.map((item) => { return { tipo_falta: item.tipo_falta } });
                // Se almacena en la variable los tipos de faltas que se encuentran en el conjunto de datos.
                var array_faltas = RESPONSE_API.dataset.map(item => item.tipo_falta);
                // Se remueven los duplicados del array y se almacena el conjunto de datos en la variable.
                var faltas_filtrado = tipos_faltas.filter(({ tipo_falta }, index) => !array_faltas.includes(tipo_falta, index + 1));
                // Se almacena en la constante los tipos de faltas encontrados en las faltas del estudiante;
                setTiposFaltas(faltas_filtrado);
            }
        }

        async function cargarInasistencias() {
            if (valorSelect != null) {
                // console.log(valorSelect);
            }
        }

        cargarFaltas();
        cargarInasistencias();
    }, [valorSelect]);

    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <SelectDropdown
                    //es casi lo mismo que un fetch data pero con un select
                    filename="services/public/trimestre.php" //nombre del archivo de la api de php pero con importe ej
                    action="readAll" //accion de la api de php
                    onValueChange={handleValorSelect} // Pasar la función callback
                    valor={valorSelect}
                    setValor={setValorSelect}
                />
                <ScrollView contentContainerStyle={{ rowGap: 15, padding: 13 }}>

                    {/* Para contraste verde: acordeón - #B2FFB0, ícono #69ED66, 
                    para contraste naranja: acordeón - #FED789, ícono - #F39C12 
                    para contraste rojo: acordeón - #ff6f61, ícono - #d32f2f */}

                    <Accordion
                        tipo={"Falta"}
                        colorHeader={colorFaltas}
                        icono={iconoFaltas}
                        backgroundIcono={"#69ED66"}
                        titulo={"Faltas"}
                        data={{ mensaje: "Ningún código asignado", dataset: [faltas, tiposFaltas] }}
                    />

                    {/* <Accordion
                        tipo={"Inasistencia"}
                        colorHeader={"#FED789"}
                        icono={"advertencia"}
                        backgroundIcono={"#F39C12"}
                        titulo={"Inasistencias"}
                        data={{ mensaje: "Ninguna inasistencia registrada"}}
                    />

                    <Accordion
                        tipo={"Falta"}
                        colorHeader={"#ff6f61"}
                        icono={"martillo"}
                        backgroundIcono={"#d32f2f"}
                        titulo={"Códigos"}
                        data={{ mensaje: "Ningún código asignado" }}
                    />

                    <Accordion
                        tipo={"Falta"}
                        colorHeader={"#B2FFB0"} //DEBE CAMBIAR
                        icono={"check"} // DEBE CAMBIAR
                        backgroundIcono={"#69ED66"} // DEBE CAMBIAR
                        titulo={"Códigos"}
                        data={{ mensaje: "Ningún código asignado" }}
                    /> */}
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