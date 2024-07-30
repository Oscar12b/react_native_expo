import React from 'react';
import { View, Text } from 'react-native';
import SelectDropdown from '../componentes/select';

const Notas = () => {
    return (
        <SelectDropdown
            //es casi lo mismo que un fetch data pero con un select
            filename="services/public/trimestres.php" //nombre del archivo de la api de php pero con importe ej
            action="readALL" //accion de la api de php
            form={{ key: 'value' }} // Pasa el objeto de formulario si es necesario
            busqueda={true} //si es true se puede buscar en el select y si es false no
        />
    );
};

export default Notas;
