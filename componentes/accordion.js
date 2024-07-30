import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

// El componente accordion toma como parámetro el título del acordión, ícono, nombre de apartado
// y los datos/información a cargar en el accordion.
const Accordion = ({ titulo, icono, backgroundIcono, apartado, data, colorHeader }) => {

    // Función para renderizar las notas dentro del acordión.
    const renderNotas = ({ item }) => (
        <Text>Nota</Text>
    );

    // Función para renderizar los códigos dentro del acordión.
    const renderCodigos = ({ item }) => (
        <Text>Código</Text>
    );

    // Función para renderizar las inasistencias dentro del acordión.
    const renderInasistencias = ({ item }) => (
        <Text>Inasistencia</Text>
    );

    // Mostrar en consola el objecto con sus propiedades.
    // console.log(data);
    // Mostrar en consola las llaves dentro del objeto.
    // console.log(Object.keys(data));
    // Mostrar en consola los valores dentro del objeto.
    // console.log(Object.values(data));
    // Mostrar en console el valor del mensaje.
    console.log(data["mensaje"]);

    return (
        <>
            {apartado == "Conducta" ?
                <View>
                    <Collapse touchableOpacityProps={{ activeOpacity: 1 }}>
                        <CollapseHeader style={[{ backgroundColor: colorHeader != undefined ? colorHeader : "#fff" }, styles.collapseHeader]}>
                            <View style={styles.headerCollapseContainer}>
                                <View style={styles.secondaryContainer}>
                                    <View style={[styles.iconContainer, { backgroundColor: backgroundIcono }]}>
                                        {icono == "martillo" ?
                                            <Image
                                                style={styles.headerContentImage}
                                                source={require('../assets/martillo.png')} />
                                            : icono == "advertencia" ?
                                                <AntDesign name="warning" size={30} color="white" />
                                                : icono == "check" ?
                                                    <MaterialIcons name="check" size={30} color="white" />
                                                    : <></>
                                        }
                                    </View>
                                    <Text style={styles.h5Text}>{titulo}</Text>
                                </View>
                                <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
                            </View>
                        </CollapseHeader>
                        <CollapseBody style={styles.collapseBody}>
                            <View style={styles.collapseBodyContainer}>
                                <Text style={styles.semiBoldText}>{data.mensaje}</Text>
                            </View>
                        </CollapseBody>
                    </Collapse>
                </View>
                : apartado == "Notas" ?
                    <View>
                        <Collapse touchableOpacityProps={{ activeOpacity: 1 }}>
                            <CollapseHeader style={[{ backgroundColor: colorHeader != undefined ? colorHeader : "#fff" }, styles.collapseHeader]}>
                                <View style={styles.headerCollapseContainer}>
                                    <View style={styles.secondaryContainer}>
                                        <Text style={styles.h5Text}>{data.nombreMateria}</Text>
                                        <View style={styles.simpleFlex}>
                                            <Text style={[styles.textoNota, { backgroundColor: data.colorNota }]}>{data.nota}</Text>
                                        </View>
                                    </View>
                                    <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
                                </View>
                            </CollapseHeader>
                            <CollapseBody style={styles.collapseBody}>
                                <View style={styles.collapseBodyContainer}>
                                    {
                                        data["mensaje"] != undefined ?
                                            <Text style={styles.semiBoldText}>{data.mensaje}</Text>
                                            : <FlatList
                                                data={data}
                                                renderItem={renderNotas}
                                                keyExtractor={(item) => item.id_tabla.toString()}
                                            />
                                    }
                                </View>
                            </CollapseBody>
                        </Collapse>
                    </View>
                    : <></>
            }
        </>
    );
}

export default Accordion;

const styles = StyleSheet.create({
    collapseHeader: {
        borderRadius: 30,
        height: 75,
        elevation: 10
    },
    headerCollapseContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        paddingHorizontal: 15,
        flexDirection: "row",
        flex: 1
    },
    secondaryContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
    },
    iconContainer: {
        borderRadius: 100,
        padding: 5,
        height: 40,
        width: 40,
    },
    headerContentImage: {
        padding: 5,
        height: 30,
        width: 30,
    },
    h5Text: {
        fontSize: 17,
        fontWeight: '700',
        marginLeft: 10
    },
    collapseBody: {
        backgroundColor: "#fff",
        elevation: 10,
        borderRadius: 20,
        height: 150,
        marginTop: -40,
        zIndex: -1
    },
    collapseBodyContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        marginTop: 50,
        paddingHorizontal: 15,
        flexDirection: "row",
    },
    semiBoldText: {
        fontWeight: "700",
        fontSize: 20
    },
    textoNota: {
        marginRight: 20,
        alignSelf: 'flex-end',
        padding: 5,
        paddingHorizontal: 20,
        borderRadius: 20,
        fontWeight: 'bold',
        fontSize: 15
    },
    simpleFlex: {
        flex: 1
    }
});