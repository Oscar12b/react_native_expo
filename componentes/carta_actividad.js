import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const CartaActividad = ({ tipoCard, data }) => {

  // Función que permite formatear un dato de tipo DATETIME en un string de formato DIA MES AÑO a las HORA:MINUTOS. RETORNO: Fecha y hora completa.
  const formatearFechaHora = (fecha) => {
    // Arrays que almacenan los días de la semana y los meses del año.
    var dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    var meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    // Se separa la fecha y la hora y se almacenan en el array.
    var fecha_hora = fecha.split(" ");
    // Se almacena la fecha completa en el string.
    var fecha_string = dias[new Date(fecha_hora[0]).getDay()] + " " + fecha_hora[0].substr(5, 2) + " de " + meses[new Date(fecha_hora[0]).getMonth()] + " del " + fecha_hora[0].substr(0, 4);
    // Se almacena la hora en número entero (En formato de 24 horas).
    var hora_entera = new Date(fecha).getHours();
    // Se almacenan los minutos en la variable.
    var minutos = new Date(fecha).getMinutes();
    // Si los minutos son menores que 10 se agrega un 0 antes del minúto (Números que aplican: 01, 02, 03, 04, 05, 06, 07, 08, 09).
    if (minutos < 10)
      // Se agrega el 0 antes del minuto.
      minutos = "0" + minutos;
    // Se declara la variable donde se almacenará la hora.
    var hora;
    // Se verifica si la hora es mayor a las 12 del mediodía.
    if (hora_entera > 12) {
      // Si la hora es mayor a las 12 del mediodía se restan 12 horas y se almacena el resultado en la variable. (24 - 12 = 12 PM).
      hora = hora_entera - 12 + ":" + minutos + " PM";
    } else {
      // Se almacena la hora en la variable.
      hora = hora_entera + ":" + minutos + " AM";
    }
    // Se retorna la fecha completa junto con la hora.
    return fecha_string + " a las " + hora;
  }

  // Función que permite dar formato de tipo DIA MES AÑO a una fecha. RETORNO: Fecha completa.
  const formatearFecha = (fecha) => {
    // Arrays que almacenan los días de la semana y los meses del año.
    var dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    var meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    // Se almacena la fecha completa en el string.
    var fecha_string = dias[new Date(fecha).getDay()] + " " + fecha.substr(5, 2) + " de " + meses[new Date(fecha).getMonth()] + " del " + fecha.substr(0, 4);
    // Se retorna la fecha completa.
    return fecha_string;
  }

  // Función que permite dar formato de tipo HORA:MINUTOS a una hora. RETORNO: Hora completa.
  const formatearHora = (hora) => {
    // Se almacena la hora en la variable.
    var hora_entera = hora.substr(0, 2);
    // Se almacenan los minutos en la variable.
    var minutos = hora.substr(3, 2);
    // Se declara la variable donde se almacenará la hora completa.
    var hora_final;
    // Se verifica si la hora es mayor a las 12 del mediodía.
    if (hora_entera > 12) {
      // Si la hora es mayor a las 12 del mediodía se restan 12 horas y se almacena el resultado en la variable. (24 - 12 = 12 PM).
      hora_final = hora_entera - 12 + ":" + minutos + " PM";
    } else {
      // Se almacena la hora en la variable.
      hora_final = hora_entera + ":" + minutos + " AM";
    }
    // Se retorna la hora.
    return hora_final;
  }

  // Función que permite capitalizar nombres y apellidos, RETORNO: Nombre completo en formato PascalCase.
  const capitalizarNombre = (nombre, apellido) => {
    // Se almacenan los nombres en el array (Se separan los nombres por cada espacio).
    let nombreArray = nombre.split(" ");
    // Se inicializa la variable dónde se almacenarán los nombres capitalizados.
    let nombreCapitalizado = "";
    // Se itera el array con los nombres.
    for (var i = 0; i < nombreArray.length; i++) {
      // Se almacena en la variable el nombre con la primera letra en mayúscula.
      nombreCapitalizado += " " + nombreArray[i].charAt(0).toUpperCase() + nombreArray[i].substring(1);
    }

    // Se almacenan los apellidos en el array (Se separan los apellidos por cada espacio).
    let apellidoArray = apellido.split(" ");
    // Se inicializa la variable dónde se almacenarán los apellidos capitalizados.
    let apellidoCapitalizado = "";
    // Se itera el array con los apellidos.
    for (var i = 0; i < apellidoArray.length; i++) {
      // Se almacena en la variable el apellido con la primera letra en mayúscula.
      apellidoCapitalizado += " " + apellidoArray[i].charAt(0).toUpperCase() + apellidoArray[i].substring(1);
    }

    // Se retorna el nombre junto con el apellido.
    return nombreCapitalizado + apellidoCapitalizado;
  }

  return (
    <>
      {tipoCard == "Nota" ?
        <View style={styles.container}>
          <View style={styles.assignmentContainer}>
            <Text style={styles.assignmentTitle}>{data['titulo']} {data['porcentaje']}%</Text>
            <Text style={styles.assignmentDescription}>
              {data['descripcion']}
            </Text>
            <View style={styles.assignmentGradeContainer}>
              <Text style={styles.assignmentGrade}>{data['nota']}</Text>
            </View>
          </View>
        </View>
        : tipoCard == "Falta" ?
          <View style={{ paddingVertical: 25, gap: 20 }}>
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
              <Text style={{ fontSize: 17, textAlign: 'right', width: Dimensions.get('window').width / 1.7 }}>{formatearFechaHora(data.fecha_falta)}</Text>
            </View>
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
          </View>
          : tipoCard == "Inasistencia" ?
            <View style={{ gap: 25, paddingVertical: 10 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Fecha</Text>
                <Text style={{ fontSize: 17, textAlign: 'right', width: Dimensions.get('window').width / 1.5 }}>{formatearFecha(data.fecha_asistencia)}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Horario</Text>
                <Text style={{ fontSize: 17, textAlign: 'right', width: Dimensions.get('window').width / 2 }}>{formatearHora(data.inicio_bloque)} - {formatearHora(data.final_bloque)}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Docente</Text>
                <Text style={{ fontSize: 17, textAlign: 'right', width: Dimensions.get('window').width / 1.7 }}>{capitalizarNombre(data.nombre_profesor, data.apellido_profesor)}</Text>
              </View>
              <View
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: StyleSheet.hairlineWidth,
                }}
              />
            </View>
            : <></>
      }
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    overflow: 'hidden',
    paddingVertical: 15,
    justifyContent: 'center',
  },
  assignmentContainer: {
    borderWidth: 1,
    borderColor: '#DDD',
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    width: Dimensions.get('window').width - 35,
    padding: 15,
    borderTopWidth: 1,
    borderColor: '#DDD',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,

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