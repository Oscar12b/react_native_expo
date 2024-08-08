import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import BackArrow from '../componentes/flecha_regreso';
import { useNavigation } from '@react-navigation/native';
import DetalleCard from '../componentes/carta_detalle_u';
import Uniforme from '../componentes/uniforme';


export default function detalle_uniforme() {
const navigation = useNavigation();
const [uniformes, setUniformes] = useState([]);
const handleBackPress = () => {
    navigation.navigate('Catalogo');
};
const filteredUniformes = uniformes.filter(uniforme =>
    uniforme.nombre_uniforme.toLowerCase().includes(searchQuery.toLowerCase())
);

useEffect(() => {
    const loadUniformes = async () => {
        try {
            const response = await fetchData(
                'services/public/uniformes.php',
                'readAllNombreImagen' // Acción para obtener todos los uniformes
            );

            if (response && response.status === 1) {
                setUniformes(response.dataset);
            } else {
                console.error('Error al obtener uniformes:', response.exception);
            }
        } catch (error) {
            console.error('Error al cargar uniformes:', error);
        } finally {
            setLoading(false);
        }
    };

    loadUniformes();
}, []);

return (
    
    <View>
        <BackArrow onPress={handleBackPress} />

        <TouchableOpacity key={uniforme.id_uniforme} onPress={() => handleUniformePress(uniforme.id_uniforme)}>
        <DetalleCard
         nombre={uniforme.nombre_uniforme}
         imagenUri={uniforme.foto}
         cuerpo={uniforme.descripcion}
         price={uniforme.precio}
        />
         </TouchableOpacity>
     </View>
  )
}


