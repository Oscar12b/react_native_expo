import * as React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';

const DetailScreen = ({ route, navigation }) => {
  const { title, price } = route.params;

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text></Text>
        <Card.Title title={title} titleStyle={styles.titulo} />
        <Card.Content>
          <Text style={styles.cuerpo}>Lorem ipsum dolor sit amet consectetur adipiscing elit quisque odio magnis auctor class, donec id phasellus vestibulum etiam aliquet molestie platea vivamus viverra. Varius nam gravida ante volutpat ornare iaculis inceptos fusce lacinia, placerat dis felis neque himenaeos massa ridiculus a quis, nullam vel vestibulum mollis sociosqu velit erat ut.</Text>
          <Text></Text>
          <Text></Text>
          <Image source={require('../assets/camisa.png')} style={styles.image} />
          <Text></Text>
          <Text></Text>
          <Text style={styles.precio}>Precio: ${price.toFixed(2)}</Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => navigation.goBack()} style={styles.boton} labelStyle={styles.etiquetaBoton}>Volver</Button>
        </Card.Actions>
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

titulo: {
    textAlign: 'center',  
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,

},
boton: {
    backgroundColor: '#73B0E2', 
    borderRadius: 10, 
},

etiquetaBoton: {
    color: 'white',  
  },

  

});

export default DetailScreen;