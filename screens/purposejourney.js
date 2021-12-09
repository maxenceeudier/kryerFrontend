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
} from "native-base";
import { EvilIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";

function PurposeJourney(props) {
  const [weight, setWeight] = useState("");
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [dateJourney, setDateJourney] = useState("");

  const [showModal, setShowModal] = useState(false);

  return (
    <NativeBaseProvider>
      <ScrollView>
        <VStack
          width="80%"
          mx="auto"
          marginTop="40%"
          marginBottom="50"
          justifyContent="center"
          alignItems="center"
        >
          <FormControl isRequired>
            <FormControl.Label _text={{ bold: true }}>Départ</FormControl.Label>
            <Input
              placeholder="Ex : Paris"
              marginBottom="5"
              onChangeText={(e) => setDeparture(e)}
            />
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
            leftIcon={<EvilIcons name="arrow-right" size={24} color="white" />}
            style={{ backgroundColor: "indigo" }}
          >
            Suivant
          </Button>
        </VStack>
      </ScrollView>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>Mes gains potentiels</Modal.Header>
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
