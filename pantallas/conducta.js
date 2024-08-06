import { View, StyleSheet, ScrollView, Animated, ActivityIndicator } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Accordion from '../componentes/accordion';
import SelectDropdown from '../componentes/select';
import { React, useEffect, useState } from 'react';
import { fetchData } from '../utilidades/componentes';


// Pantalla de conducta
// Muestra las faltas e inasistencias del alumno
// Selecciona un trimestre y muestra las faltas e inasistencias correspondientes
const Conducta = ({ navigation }) => {

    const [cargando, setCargando] = useState(true);
    const [valorSelect, setValorSelect] = useState(null);
    const [faltas, setFaltas] = useState([])
    const [tiposFaltas, setTiposFaltas] = useState([]);
    const [inasistencias, setInasistencias] = useState([]);
    const [iconoFaltas, setIconoFaltas] = useState('');
    const [colorFaltas, setColorFaltas] = useState([]);
    const [iconoInasistencias, setIconoInasistencias] = useState('');
    const [colorInasistencias, setColorInasistencias] = useState([]);

    // Hook que se ejecuta al cambiar el valor de la constante valorSelect.
    useEffect(() => {
        // Se muestra el spinner de carga.
        setCargando(true);
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
        // Función que obtiene las inasistencias del estudiante en un trimestre específico.
        async function cargarInasistencias() {
            // Se verifica que se haya seleccionado un trimestre.
            if (valorSelect != null) {
                // Se inicializa la constante donde se almacenará el id del trimestre.
                const FORM = new FormData();
                // Se almacena el id del trimestre en el form.
                FORM.append('idTrimestre', valorSelect);
                // Se realiza la petición para obtener las inasistencias a clase del estudiante en el trimestre seleccionado.
                const RESPONSE_API = await fetchData('services/public/asistencias.php', 'readInasistencias', FORM);
                // Si se ha asignado alguna inasistencia se ejecuta el código.
                if (RESPONSE_API.dataset.length > 0) {
                    // Se configura el color del acordeón de faltas.
                    setIconoInasistencias('advertencia');
                    setColorInasistencias(['#FED789', '#F39C12']);
                } else {
                    // Se configura el color del acordeón de inasistencia.
                    setIconoInasistencias('check');
                    setColorInasistencias(['#B2FFB0', '#69ED66']);
                }
                // Se asigna el valor de la constante.
                setInasistencias(RESPONSE_API.dataset);
            }
        }
        // Se configura un timer de 250 milisegundos antes de mostrar los datos.
        setTimeout(
            function () {
                // Se obtienen las faltas del estudiante.
                cargarFaltas();
                // Se obtienen las inasistencias del estudiante.
                cargarInasistencias();
                // Se oculta el spinner de carga.
                setCargando(false);
            },
            250
        );
    }, [valorSelect]);

    return (
        // Contenedor principal.
        <View style={styles.mainContainer}>
            {/* Select con los trimestres del año */}
            <SelectDropdown
                //es casi lo mismo que un fetch data pero con un select
                filename="services/public/trimestre.php" //nombre del archivo de la api de php pero con importe ej
                action="readAll" //accion de la api de php
                valor={valorSelect}
                setValor={setValorSelect}
            />
            {/* Contenedor con scroll con la información de faltas e inasistencias del estudiante */}
            <ScrollView contentContainerStyle={{ rowGap: 15, padding: 13 }}>

                {/* Para contraste verde: acordeón - #B2FFB0, ícono #69ED66, 
                    para contraste naranja: acordeón - #FED789, ícono - #F39C12 
                    para contraste rojo: acordeón - #ff6f61, ícono - #d32f2f */}

                {
                    // Si no se está cargando la información se muestran los acordeones.
                    !cargando ?
                        <>
                            <Accordion
                                tipo={"Falta"}
                                colorHeader={colorFaltas}
                                icono={iconoFaltas}
                                titulo={"Faltas"}
                                data={{ mensaje: "Ningún código asignado", dataset: [faltas, tiposFaltas] }}
                            />

                            <Accordion
                                tipo={"Inasistencia"}
                                colorHeader={colorInasistencias}
                                icono={iconoInasistencias}
                                titulo={"Inasistencias"}
                                data={{ mensaje: "Ninguna inasistencia a clase", dataset: inasistencias }}
                            />
                        </>
                        : ""
                }
                {/* Spinner de carga */}
                <ActivityIndicator size="large" color="#2D88D4" animating={cargando} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 20,
    },
});

export default Conducta;