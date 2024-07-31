import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CartaActividad = ({ titulo, descripcion, nota }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.assignmentContainer}>
        <Text style={styles.assignmentTitle}>{titulo}</Text>
        <Text style={styles.assignmentDescription}>
          {descripcion}
        </Text>
        <View style={styles.assignmentGradeContainer}>
          <Text style={styles.assignmentGrade}>{nota}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    overflow: 'hidden',
    alignSelf: 'stretch', // This makes the container adjust its width according to the parent
  },
  grade: {
    fontSize: 18,
    color: '#155724',
  },
  assignmentContainer: {
    backgroundColor: '#98C0F6',
    padding: 15,
    borderTopWidth: 1,
    borderColor: '#DDD',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  assignmentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  assignmentDescription: {
    fontSize: 16,
    marginTop: 5,
  },
  assignmentGradeContainer: {
    marginTop: 10,
    backgroundColor: '#B2FFB0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  assignmentGrade: {
    fontSize: 18,
    color: '#155724',
},
});

export default CartaActividad;