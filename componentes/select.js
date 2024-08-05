import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { fetchData } from '../utilidades/componentes';

const SelectDropdown = ({ filename, action, form = null, busqueda = true, onValueChange, setValor, valor }) => {

    const [data, setData] = useState([]);
    // const [selectedValue, setSelectedValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [loading, setLoading] = useState(true);

    const lista = [
        { label: 'Trimestre 1', value: '1' },
        { label: 'Trimestre 2', value: '2' },
        { label: 'Trimestre 3', value: '3' },
        { label: 'Trimestre 4', value: '4' },
        { label: 'Trimestre 5', value: '5' },
    ];

    useEffect(() => {

        const CargarDatos = async () => {
            try {
                const RESPONSE_API = await fetchData(filename, action, form);
                if (RESPONSE_API !== null) {
                    // const LISTA = await RESPONSE_API.dataset.json();
                    const DATA_SET = RESPONSE_API.dataset;
                    const DATA_FORMATEADA = DATA_SET.map(item => ({
                        label: item['nombre_trimestre'], // Ajusta esto según la estructura de tu respuesta API
                        value: item['id_trimestre'], // Ajusta esto según la estructura de tu respuesta API
                    }));
                    // Se almacena la fecha actual en la variable.
                    fecha_actual = new Date();
                    // Se itera el conjunto de datos.
                    DATA_SET.forEach(row => {
                        // Se almacena la fecha de inicio del trimestre en la variable.
                        fecha_inicio = new Date(row.fecha_inicio);
                        // Se almacena la fecha de finalización en la variable.
                        fecha_fin = new Date(row.fecha_fin);
                        // Si la fecha actual se encuentra en el rango del trimestre se asigna el valor del dropdown.
                        if(fecha_inicio.getTime()<=fecha_actual.getTime() && fecha_actual.getTime()<=fecha_fin.getTime()){
                            // Se asigna el valor del dropdown.
                            setValor(row.id_trimestre);
                        }
                    });
                    setData(DATA_FORMATEADA);
                    setLoading(false);

                } else {
                    setData(lista);
                    setLoading(false);
                }
            } catch (error) {
                setData(lista);
                console.error(error);
                setLoading(false);
            }
        };

        CargarDatos();
    }, [filename, action, form]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search={busqueda}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Elija una opción' : '...'}
                searchPlaceholder="Buscar..."
                value={valor}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setValor(item.value);
                    setIsFocus(false);
                    console.log("Selected value:", item.value); // Muestra el valor seleccionado en la consola
                    if (onValueChange) {
                        onValueChange(item.value); // Llama a la función callback si está definida
                    }
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 16,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});

export default SelectDropdown;
