import React, { useState } from "react";
import {
  NativeBaseProvider,
  VStack,
  FormControl,
  Input,
  Button,
  Modal,
  HStack,
  Text,
  Center,
} from "native-base";
import { EvilIcons } from "@expo/vector-icons";
import { ScrollView,  Image } from "react-native";
import { connect } from "react-redux";

function PurposeJourney(props) {
  const [weight, setWeight] = useState("");
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [dateJourney, setDateJourney] = useState("");

  const [showModal, setShowModal] = useState(false);

  return (
    <NativeBaseProvider>
      <Image source={require("../assets/beforeGo.png")} style={{flex:1, justifyContent:'center', alignItems:'center',position:"absolute",marginTop:'35%',marginLeft:'35%',opacity:0.8}} width="60%" height="30%"/>
      <Center>
        <Center
          style={{ backgroundColor: "indigo" }}
          _text={{
            color: "#ffffff",
            fontWeight: "600",
            fontSize: "32",
            marginTop: "10%",
          }}
          height={120}
          width="100%"
        >
          Proposer une mission
        </Center>
        <ScrollView>
          <VStack
            width="80%"
            mx="auto"
            marginTop="10%"
            marginBottom="10%"
            justifyContent="center"
            alignItems="center"
          >
            <FormControl isRequired>
              <FormControl.Label _text={{ bold: true }}>
                Départ
              </FormControl.Label>
              <HStack space={2}>
                <Input
                  w={{
                    base: "100%",
                    md: "60%",
                  }}
                  placeholder="Ex : Paris"
                  marginBottom="5"
                  onChangeText={(e) => setDeparture(e)}
                />
              </HStack>
            </FormControl>

            <FormControl isRequired>
              <FormControl.Label _text={{ bold: true }}>
                Arrivée
              </FormControl.Label>
              <Input
                placeholder="Ex : Rome"
                marginBottom="5"
                onChangeText={(e) => setArrival(e)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormControl.Label _text={{ bold: true }}>
                Capacité de transport:
              </FormControl.Label>
              <Input
                placeholder="En kg"
                marginBottom="5"
                onChangeText={(e) => setWeight(e)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormControl.Label _text={{ bold: true }}>
                Date de trajet
              </FormControl.Label>
              <Input
                placeholder="Date"
                onChangeText={(e) => setDateJourney(e)}
              />
            </FormControl>
          </VStack>
          <Button.Group display="flex" flexDirection="column" size="lg" mx="12">
            <Button onPress={() => setShowModal(true)} marginBottom="4">
              Simuler
            </Button>

            <Button
              onPress={() =>
                props.user
                  ? props.navigation.navigate("PurposeDetails", {
                    departure: departure,
                    arrival: arrival,
                    weight: weight,
                    dateJourney: dateJourney,
                  })
                  : props.navigation.navigate("Profil")
              }
              leftIcon={
                <EvilIcons name="arrow-right" size={24} color="white" />
              }
              style={{ backgroundColor: "indigo" }}
            >
              Suivant
            </Button>
          </Button.Group>
        </ScrollView>
      </Center>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>
            Mes gains potentiels
          </Modal.Header>

          <Modal.Body>
            <VStack space={3}>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Kilos disponibles</Text>
                <Text color="blueGray.400">{weight} kg</Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Prix au kg recommandé par KRYER</Text>
                <Text color="blueGray.400">2 €</Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Total</Text>
                <Text color="green.500">{weight * 2} €</Text>
              </HStack>
            </VStack>
          </Modal.Body>

          <Modal.Footer>
            <Button
              flex="1"
              onPress={() => {
                setShowModal(false);
              }}
            >
              Continuer
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

    </NativeBaseProvider>
  );
}

function mapStateToProps(state) {
  return { user: state.userReducer };
}

export default connect(mapStateToProps, null)(PurposeJourney);
