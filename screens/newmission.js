import React, { useState, useEffect } from "react";
import {
    VStack, Box, Divider, extendTheme, NativeBaseProvider,
    Button, Center, ScrollView, StatusBar, FlatList, Text
} from 'native-base';
import {connect} from 'react-redux';


// Extend the theme to include custom colors, fonts, etc
const newColorTheme = {
    brand: {
        900: '#8287af',
        800: '#7c83db',
        700: '#b3bef6',
    },
};

const theme = extendTheme({ colors: newColorTheme, px: "20px" });

function NewMission(props) {
    const [dataNewMission, setDataNewMission] = useState([]);

    useEffect(() => {

        async function loadMission() {
            const rawResponse = await fetch('http://192.168.1.33:3000/getMission');
            const response = await rawResponse.json();
            setDataNewMission(response.missions);

            // console.log("response", response.missions)
        }
        loadMission()
    }, []);

    const data = dataNewMission;
    /* console.log(data); */
    return (
        <NativeBaseProvider>
            <Center
                    style={{ backgroundColor: "indigo" }}
                    _text={{
                        color: "#ffffff",
                        fontWeight: "600",
                        fontSize: "32",
                        marginTop: "10%"

                    }}
                    height={120}
                    width="100%">
                    Nouvelles missions
                </Center>
                
            <StatusBar backgroundColor="#3700B3" barStyle="light-content" />

            <VStack 
            marginTop="10%"
            space="4" divider={<Divider />}>
                <FlatList
                    data={data}

                    renderItem={({ item }) =>

                        <Button variant="outline"
                            mx="12"
                            size="lg"
                            marginBottom="5"
                            onPress={() => {props.navigation.navigate("NewMissionDetails"); props.saveidmission(item._id)}}

                        >
                            <Text>
                                {item.departure_journey} / {item.arrival_journey} le {item.date_journey}
                            </Text>
                        </Button>}
                    keyExtractor={(item) => item._id}
                />
            </VStack>

        </NativeBaseProvider>
    );
}

function mapDispatchToProps(dispatch) {
    return {
      saveidmission: function(idmission) {
          dispatch( {type: 'saveidmission', idmission: idmission} )
      }
    }
   }
  
   export default connect(
    null,
    mapDispatchToProps
  )(NewMission);




// import React, { useState, useEffect } from "react";
// import {
//     VStack,
//     Box,
//     Divider,
//     extendTheme,
//     NativeBaseProvider,
//     Button,
//     Center,
//     ScrollView,
//     StatusBar,
//     Text
// } from 'native-base';

// //


// // Extend the theme to include custom colors, fonts, etc
// const newColorTheme = {
//     brand: {
//         900: '#8287af',
//         800: '#7c83db',
//         700: '#b3bef6',
//     },
// };

// const theme = extendTheme({ colors: newColorTheme, px: "20px" });

// export default function CurrentMission(props) {
//     const [dataCurrentMission, setDataCurrentMission] = useState([]);

//     useEffect(() => {

//         async function loadMission() {
//             const rawResponse = await fetch('172.17.1.42:3000/getMission');
//             const response = await rawResponse.json();          
//             setDataCurrentMission(response);
//         }
//         loadMission()
//     }, []);

//     const data = dataCurrentMission;
//     /* console.log(data); */
//     return (
//         <NativeBaseProvider theme={theme} style={{ flex: 1 }}>
//             <Center
//                 style={{ backgroundColor: "indigo" }}
//                 _text={{
//                     color: "#ffffff",
//                     fontWeight: "600",
//                     fontSize: "32",
//                     marginTop: "10%"

//                 }}
//                 height={120}
//                 width="100%">
//                 Missions en cours
//             </Center>

//             <StatusBar backgroundColor="#3700B3" barStyle="light-content" />

//             <ScrollView _contentContainerStyle={{
//                 px: "20px",
//                 mb: "4",
//                 minW: "72",
//                 flex: 1,
//             }}>


//                 <Center style={{ flex: 1 }}>
//                     <Box border="1" borderRadius="md" size="sm" width="80%">

//                         <VStack space="4" divider={<Divider />}>
//                             <Button
//                                 borderWidth="3"
//                                 borderColor="#581c87"
//                                 variant="outline"
//                                 onPress={() => props.navigation.navigate("CurrentMissionClient")}
//                             >
//                                 <Text
//                                 fontSize="md"
//                                 fontWeight="bold"
//                                 style={{
//                                     color: "black",                                    
//                                 }}>
//                                     Paris / Martinique le 26/12/2021
//                                 </Text>
//                             </Button>

//                             <Button
//                                 borderWidth="3"
//                                 borderColor="#581c87"
//                                 variant="outline"
//                                 onPress={() => props.navigation.navigate("CurrentMissionClient")}
//                             >
//                                 <Text                                
//                                 fontSize="md"
//                                 fontWeight="bold" style={{
//                                     color: "black",
//                                 }}>
//                                     Paris / Martinique le 26/12/2021
//                                 </Text>
//                             </Button>
//                             <Button
//                                 borderWidth="3"
//                                 borderColor="#581c87"
//                                 variant="outline"
//                                 onPress={() => props.navigation.navigate("CurrentMissionClient")}
//                             >
//                                 <Text
//                                 fontSize="md"
//                                 fontWeight="bold"
//                                  style={{
//                                     color: "black",
//                                 }}>
//                                     Martinque / Paris le 06/01/2021
//                                     </Text>
//                             </Button>
//                             <Button
//                                 borderWidth="3"
//                                 borderColor="#581c87"
//                                 variant="outline"
//                                 onPress={() => props.navigation.navigate("CurrentMissionClient")}
//                             >
//                                 <Text
//                                 fontSize="md"
//                                 fontWeight="bold"
//                                  style={{
//                                     color: "black",
//                                 }}>
//                                     Martinque / Paris le 06/01/2021
//                                     </Text>
//                             </Button>
//                             <Button
//                                 borderWidth="3"
//                                 borderColor="#581c87"
//                                 variant="outline"
//                                 onPress={() => props.navigation.navigate("CurrentMissionClient")}
//                             >
//                                 <Text
//                                 fontSize="md"
//                                 fontWeight="bold"
//                                  style={{
//                                     color: "black",
//                                 }}>
//                                     Martinque / Paris le 06/01/2021
//                                     </Text>
//                             </Button>
//                         </VStack>

//                     </Box>
//                 </Center>
//             </ScrollView>
//         </NativeBaseProvider>
//     );
// }


