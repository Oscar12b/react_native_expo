import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import CartaActividad from '../componentes/carta_actividad';
import { ScrollView } from 'react-native-gesture-handler';

const Accordion = ({ titulo, icono, tipo, data, colorHeader }) => {

    return (
        <>
            {tipo == "Falta" || tipo == "Inasistencia" ?
                <View>
                    <Collapse touchableOpacityProps={{ activeOpacity: 1 }}>
                        <CollapseHeader style={[{ backgroundColor: colorHeader != undefined ? colorHeader[0] : "#fff" }, styles.collapseHeader]}>
                            <View style={styles.headerCollapseContainer}>
                                <View style={styles.secondaryContainer}>
                                    <View style={[{ backgroundColor: colorHeader != undefined ? colorHeader[1] : "#fff" }, styles.iconContainer]}>
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
                                {
                                    tipo == "Falta" && data.dataset[0].length != undefined && data.dataset[0].length != 0 ?
                                        <FlatList
                                            data={data.dataset[1]}
                                            scrollEnabled={false}
                                            renderItem={({ item }) => (
                                                <View style={{ marginTop: 20, gap: 2 }}>
                                                    <View style={{ height: 50, justifyContent: 'center', flexDirection: 'row', justifyContent: 'start', alignItems: 'center', gap: 5, marginLeft: 10 }}>
                                                        <Image source={require('../assets/punto_rojo.png')} style={{ width: 15, height: 15 }} />
                                                        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Faltas {item.tipo_falta.toLowerCase()}</Text>
                                                    </View>
                                                    <View
                                                        style={{
                                                            borderBottomColor: 'black',
                                                            borderBottomWidth: 1,
                                                        }}
                                                    />
                                                    <FlatList
                                                        data={data.dataset[0].filter((row) => { if (row.tipo_falta == item.tipo_falta) { return row } })}
                                                        scrollEnabled={false}
                                                        renderItem={({ item }) => (
                                                            <CartaActividad
                                                                data={item}
                                                                tipoCard={tipo}
                                                            />
                                                        )}
                                                        contentContainerStyle={styles.collapseBodyContainer}
                                                    />
                                                </View>
                                            )}
                                        />
                                        : tipo == "Inasistencia" && data.dataset.length != undefined && data.dataset.length != 0 ?
                                            <FlatList
                                                data={data.dataset}
                                                scrollEnabled={false}
                                                style={{ marginTop: 20 }}
                                                renderItem={({ item }) => (
                                                    <CartaActividad
                                                        data={item}
                                                        tipoCard={tipo}
                                                    />
                                                )}
                                            />
                                            : <Text style={styles.h5Text}>{data.mensaje}</Text>
                                }
                            </View>
                        </CollapseBody>
                    </Collapse>
                </View>
                : tipo == "Nota" ?
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
                                    {/* <FlatList
                                        showsVerticalScrollIndicator={false}
                                        data={data.dataset}
                                        renderItem={({ item }) => (
                                            <CartaActividad
                                                data={item}
                                                tipoCard={tipo}
                                            />
                                        )}
                                        contentContainerStyle={styles.collapseBodyContainer}
                                    /> */}
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
        alignItems: 'center',
    },
    iconContainer: {
        borderRadius: 15,
        padding: 5,
        height: 40,
        width: 40,
        overflow: 'hidden'
    },
    headerContentImage: {
        padding: 5,
        height: 30,
        width: 30,
    },
    h5Text: {
        fontSize: 17,
        fontWeight: '700',
        alignSelf: 'center'
    },
    collapseBody: {
        backgroundColor: "#fff",
        elevation: 10,
        minHeight: 150,
        borderRadius: 20,
        marginTop: -40,
        zIndex: -1
    },
    collapseBodyContainer: {
        marginTop: 25,
        paddingHorizontal: 5,
        paddingVertical: 5,
        gap: 5,
        flex: 1,
        justifyContent: 'center',
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