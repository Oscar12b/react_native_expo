import React, { useState } from 'react';
import { View, Text } from 'react-native';
import SelectDropdown from '../componentes/select';

const Notas = () => {

    const [valorSelect, setValorSelect] = useState(null);

    const handleValorSelect = (value) => {
        setValorSelect(value);
        console.log("valor cambiado", value);
    };

    return (
        <SelectDropdown
            //es casi lo mismo que un fetch data pero con un select
            filename="services/public/trimestres.php" //nombre del archivo de la api de php pero con importe ej
            action="readALL" //accion de la api de php
            form={{ key: 'value' }} // Pasa el objeto de formulario si es necesario
            onValueChange={handleValorSelect} // Pasar la función callback
        />

    );
};

export default Notas;
