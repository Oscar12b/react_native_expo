import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const CartaActividad = ({ tipoCard, data }) => {

  const formatearFecha = (fecha) => {

    var dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    var meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    var fecha_hora = fecha.split(" ");

    var fecha_string = dias[new Date(fecha_hora[0]).getDay()] + " " + fecha_hora[0].substr(5, 2) + " de " + meses[new Date(fecha_hora[0]).getMonth()] + " del " + fecha_hora[0].substr(0, 4);

    var hora_entera = new Date(fecha).getHours();

    var minutos = new Date(fecha).getMinutes();

    if(minutos < 10)
      minutos = "0"+minutos;

    var hora;

    if(hora_entera > 12){

      hora = hora_entera - 12 +":"+ minutos +" PM";
    } else{
      
      hora = hora_entera +":"+ minutos + " AM";
    }

    return fecha_string + " a las " + hora;
  }

  return (
    <>
      {tipoCard == "Nota" ?
        <View style={styles.container}>
          <View style={styles.assignmentContainer}>
            <Text style={styles.assignmentTitle}>{data['titulo']}</Text>
            <Text style={styles.assignmentDescription}>
              {data['descripcion']}
            </Text>
            <View style={styles.assignmentGradeContainer}>
              <Text style={styles.assignmentGrade}>{data['nota']}</Text>
            </View>
          </View>
        </View>
        : tipoCard == "Falta" ?
          <View style={{ paddingVertical: 20, gap: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Falta</Text>
              <Text style={{ fontSize: 17, textAlign: 'right', width: Dimensions.get('window').width / 1.5 }}>{data.nombre_falta}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Asignado por</Text>
              <Text style={{ fontSize: 17, textAlign: 'right', width: Dimensions.get('window').width / 2 }}>{data.nombre_profesor}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Asignado el </Text>
              <Text style={{ fontSize: 17, textAlign: 'right', width: Dimensions.get('window').width / 1.7 }}>{formatearFecha(data.fecha_falta)}</Text>
            </View>
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
          </View>
          : tipoCard == "Inasistencia" ?
            <View style={styles.container}>
              <View style={styles.assignmentContainer}>
                <Text style={styles.assignmentTitle}>{titulo}</Text>
                <Text style={styles.assignmentDescription}>
                  {descripcion}
                </Text>
                <View style={styles.assignmentGradeContainer}>
                  <Text style={styles.assignmentGrade}>{nota}</Text>
                </View>
              </View>
            </View>
            : <></>
      }
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    overflow: 'hidden',
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