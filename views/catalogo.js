import * as React from 'react';
import { ScrollView, View, StyleSheet, Image } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const categories = [
    { title: 'Camisa hombre', route: 'DetailScreen', price: 10.00 },
    { title: 'Camisa hombre', route: 'DetailScreen', price: 12.00 },
    { title: 'Camisa hombre', route: 'DetailScreen', price: 15.00 },
    { title: 'Camisa hombre', route: 'DetailScreen', price: 10.00 },
    { title: 'Camisa hombre', route: 'DetailScreen', price: 10.00 },
    { title: 'Camisa hombre', route: 'DetailScreen', price: 15.00 },
    { title: 'Camisa hombre', route: 'DetailScreen', price: 8.00 },
    { title: 'Camisa hombre', route: 'DetailScreen', price: 8.00 },
    { title: 'Camisa hombre', route: 'DetailScreen', price: 10.00 },
];

const CatalogScreen = () => {
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.container}>
            {categories.map((category, index) => (
                <Card style={styles.card} key={index} onPress={() => navigation.navigate(category.route, { title: category.title, price: category.price })}>
                    <View style={styles.cardContent}>
                        <Text style={styles.title}>{category.title}</Text>
                        <Image source={require('../assets/camisa.png')} style={styles.image} />
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
        borderRadius: 30,
        backgroundColor: '#D1EDF5',
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    image: {
        width: 70,
        height: 70,
        marginLeft: 50,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 110
    },
});

export default CatalogScreen;