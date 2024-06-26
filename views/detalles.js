import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';

const DetailScreen = ({ route, navigation }) => {
  const { title, price } = route.params;

  return (
    <View style={styles.container}>
      <Card>
        <Card.Title title={title} />
        <Card.Content>
          <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at dolor ac magna auctor.</Text>
          <Text>Precio: ${price.toFixed(2)}</Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => navigation.goBack()}>Volver</Button>
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
  },
});

export default DetailScreen;