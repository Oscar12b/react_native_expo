import * as React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Card, Text } from 'react-native-paper';

const DetalleCard = ({ nombre, imagenLocal, cuerpo, imagenUri, price }) => {
    return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text></Text>
        <Card.Title title={nombre} titleStyle={styles.nombre} />
        <Card.Content>
          <Text style={styles.cuerpo}>{cuerpo}</Text>
          {imagenLocal ? (
                <Image source={imagenLocal} style={styles.image} />
            ) : (
                <Image source={{ uri: imagenUri }} style={styles.image} />
            )}
          <Text style={styles.precio}>Precio: ${price.toFixed(2)}</Text>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({


  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    Color: '#D1EDF5'
  },
  image: {
    width: 100,
    height: 100,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  card: {
    marginVertical: 5,
    borderRadius: 20,
    backgroundColor: '#D1EDF5',
  },
  precio: {
      fontWeight: 'bold',
      fontSize: 17
  },

  cuerpo: {
      fontSize: 16,
      textAlign: 'justify'
  },

  nombre: {
      textAlign: 'center',  
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,

  }

    

});

export default DetalleCard;