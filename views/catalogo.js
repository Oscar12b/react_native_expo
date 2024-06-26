import * as React from 'react';
import { ScrollView, View, StyleSheet, Image } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const categories = [
  { title: 'Camisa hombre', route: 'DetailScreen', price: 10.00 },
  { title: 'Pantalón hombre', route: 'DetailScreen', price: 12.00 },
  { title: 'Calzado masculino', route: 'DetailScreen', price: 15.00 },
  { title: 'Camisa mujer', route: 'DetailScreen', price: 10.00 },
  { title: 'Falda', route: 'DetailScreen', price: 10.00 },
  { title: 'Calzado femenino', route: 'DetailScreen', price: 15.00 },
  { title: 'Camisa parvularia', route: 'DetailScreen', price: 8.00 },
  { title: 'Short parvularia', route: 'DetailScreen', price: 8.00 },
  { title: 'Calzado parvularia', route: 'DetailScreen', price: 10.00 },
];

const CatalogScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      {categories.map((category, index) => (
        <Card style={styles.card} key={index} onPress={() => navigation.navigate(category.route, { title: category.title, price: category.price })}>
          <View style={styles.cardContent}>
            <Image source={require('../assets/camisa.png')} style={styles.image} />
            <Text style={styles.title}>{category.title}</Text>
          </View>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginBottom: 50,
  },
  card: {
    marginVertical: 5,
    borderRadius: 10,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
  },
});

export default CatalogScreen;