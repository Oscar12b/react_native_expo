import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, TextInput } from 'react-native';
import Uniforme from '../componentes/uniforme';

const Catalogo = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const uniformes = [
    { nombre: "Camisa hombre", imagenUri: "https://example.com/camisa_hombre.jpg" },
    { nombre: "Falda mujer", imagenUri: "https://example.com/falda_mujer.jpg" },
    { nombre: "Pantalón niño", imagenUri: "https://example.com/pantalon_nino.jpg" },
    // Puedes agregar más uniformes aquí
  ];

  const filteredUniformes = uniformes.filter(uniforme =>
    uniforme.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar uniformes..."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      <ScrollView>
        {filteredUniformes.map((uniforme, index) => (
          <Uniforme
            key={index}
            nombre={uniforme.nombre}
            imagenUri={uniforme.imagenUri}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  searchBar: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 10,
    margin: 10,
    marginTop: 40,
  },
});

export default Catalogo;