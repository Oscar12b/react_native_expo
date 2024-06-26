import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

const Conducta = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/150' }} // Reemplaza con tu imagen
                    style={styles.logo}
                />
                <Text style={styles.headerText}>Conducta</Text>
            </View>

            <View style={styles.mainContainer}>
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'stretch',
                        borderWidth: 1,
                        borderRadius: 10
                    }}>
                        <RNPickerSelect
                            placeholder={{ label: "Seleccione un trimestre" }}
                            onValueChange={(valor) => console.log(valor)}
                            items={[
                                { label: 'Primer trimestre', value: 'Primer trimestre' },
                                { label: 'Segundo trimestre', value: 'Segundo trimestre' },
                                { label: 'Tercer trimestre', value: 'Tercer trimestre' },
                            ]}
                        />
                    </View>

                    <Collapse touchableOpacityProps={{ activeOpacity: 1 }}>
                        <CollapseHeader style={styles.headerCollapseFaltas}>
                            <View style={styles.headerCollapseContainer}>
                                <View style={styles.secondaryContainer}>
                                    <View style={styles.imageContainerFaltas}>
                                        <Image
                                            style={styles.headerContentImage}
                                            source={require('../assets/martillo.png')}
                                        />
                                    </View>
                                    <Text style={styles.h5Text}>Faltas</Text>
                                </View>
                                <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
                            </View>
                        </CollapseHeader>
                        <CollapseBody style={styles.collapseBody}>
                            <View style={styles.collapseBodyContainer}>
                                <Text style={styles.semiBoldText}>Ningún código asignado.</Text>
                            </View>
                        </CollapseBody>
                    </Collapse>

                    <Collapse touchableOpacityProps={{ activeOpacity: 1 }}>
                        <CollapseHeader style={styles.headerCollapseInasistencias}>
                            <View style={styles.headerCollapseContainer}>
                                <View style={styles.secondaryContainer}>
                                    <View style={styles.imageContainerInasistencias}>
                                        <AntDesign name="warning" size={30} color="white" />
                                    </View>
                                    <Text style={styles.h5Text}>Inasistencias</Text>
                                </View>
                                <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
                            </View>
                        </CollapseHeader>
                        <CollapseBody style={styles.collapseBody}>
                            <View style={styles.collapseBodyContainer}>
                                <Text style={styles.semiBoldText}>Ningún código asignado.</Text>
                            </View>
                        </CollapseBody>
                    </Collapse>
                </View>
            </View>
            );
};

            const styles = StyleSheet.create({
                container: {
                flex: 1,
            backgroundColor: '#FFFFFF',
    },
            header: {
                flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#ADD8E6',
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
    },
            mainContainer: {
                flex: 1,
            paddingHorizontal: 25,
            paddingTop: 20,
            gap: 30
    },
            logo: {
                width: 50,
            height: 50,
            borderRadius: 25,
    },
            headerText: {
                fontSize: 20,
            fontWeight: 'bold',
            marginLeft: 10,
    },
            h5Text: {
                fontSize: 17,
            fontWeight: '700',
    },
            headerCollapseFaltas: {
                backgroundColor: "#B2FFB0",
            borderRadius: 30,
            height: 75,
    },
            headerCollapseContainer: {
                display: "flex",
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            paddingTop: 17,
            paddingHorizontal: 15,
            flexDirection: "row"
    },
            secondaryContainer:{
                flex: 1,
            flexDirection: "row",
            alignItems: "center",
            gap: 20
    },
            imageContainerFaltas:{
                backgroundColor: "#69ED66",
            borderRadius: 100,
            padding: 5,
            height: 40,
            width: 40,
    },
            headerContentImage:{
                padding: 5,
            height: 30,
            width: 30,
    },
            collapseBody:{
                backgroundColor: "#fff",
            elevation: 10,
            borderRadius: 20,
            height: 150,
            marginTop: -40,
            zIndex: -1
    },
            collapseBodyContainer:{
                display: "flex",
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            marginTop: 50,
            paddingHorizontal: 15,
            flexDirection: "row",
    },
            semiBoldText:{
                fontWeight: "700",
            fontSize: 20
    },
            headerCollapseInasistencias:{
                backgroundColor: "#FED789",
            borderRadius: 30,
            height: 75,
    },
            imageContainerInasistencias:{
                backgroundColor: "#F39C12",
            borderRadius: 100,
            padding: 5,
            height: 40,
            width: 40,
    }
});

export default Conducta;