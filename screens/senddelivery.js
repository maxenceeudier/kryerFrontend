import React, { useState } from "react";
import {
  NativeBaseProvider,
  Input,
  Stack,
  Center,
  Button,
  FormControl,
  Icon,
  Modal,
  Text,
  View
} from "native-base";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
  FontAwesome5,
} from "@expo/vector-icons";
import DatePicker from "react-native-datepicker";
import { StyleSheet,  Image, ScrollView} from "react-native";
import { connect } from "react-redux";

function SendDelivery(props) {
  //format date
  function formatDate(date) {
    return (
      ("0" + date.getDate()).slice(-2) +
      "/" +
      ("0" + parseInt(date.getMonth() + 1)).slice(-2) +
      "/" +
      date.getFullYear()
    );
  }

  

  const [date, setDate] = useState(formatDate(new Date()));

  const [showModal, setShowModal] = useState(false);
  const [modalIsClose, setModalIsClose] = useState(false);

  //boolen pour mettre une condition pour afficher la date choisie
  const [dateIsChoose, setDateIsChoose] = useState(false);

  // boolen pour savoir quelle modale afficher (est ce que j'ai cliqué sur dimension)
  const [measureClick, setMeasureClick] = useState(false);

  // valeur des input a envoyer dans la route poste
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [weight, setWeight] = useState("");

  //dimensions
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");

  //pour afficher la date selectionnée
  if (modalIsClose){
    var messageDate = dateIsChoose ? `recherche a partir du ${date}` : "";
  }
  

  // function de recherche de Kryer
  async function searchClick() {
  
    var responce = await fetch(`${global.ipa}searchKryer`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `departure=${departure}&arrival=${arrival}&date=${date.split('-').join('/')}&weight=${weight}`,
    });

    responce = await responce.json();

    props.kryerList(responce);
    props.infoDelivery({
      height: height,
      width: width,
      length: length,
      weight: weight,
    });
    props.navigation.navigate("KryerList");
  }

  return (
    <NativeBaseProvider>
      <Image source={require("../assets/sendRocket.png")} style={{flex:1, justifyContent:'center', alignItems:'center',position:"absolute",marginTop:'30%',marginLeft:'40%',opacity:0.5}} width="70%" height="40%"/>
      
      
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
          Rechercher un Kryer
        </Center>
         <ScrollView>
        <Center>
       
        <Stack space={4} w="100%" alignItems="center" marginTop="10%">
          <FormControl.Label>Informations sur votre trajet </FormControl.Label>
          <Input
            isRequired
            w={{
              base: "75%",
              md: "25%",
            }}
            InputLeftElement={
              <Icon
                as={<Ionicons name="location" />}
                size={5}
                ml="2"
                color="indigo.800"
              />
            }
            placeholder="Départ"
            onChangeText={(e) => setDeparture(e)}
            value={departure}
          />
          <Input
            isRequired
            w={{
              base: "75%",
              md: "25%",
            }}
            InputLeftElement={
              <Icon
                as={<Ionicons name="location-outline" />}
                size={5}
                ml="2"
                color="indigo.800"
              />
            }
            placeholder="Arrivée"
            onChangeText={(e) => setArrival(e)}
            value={arrival}
          />

          {/* button pour la modale pour choisir la date + l'affichage du choix de la date */}

          <Button
            onPress={() => {
              setMeasureClick(false);
              setShowModal(true);
              setDateIsChoose(true);
            }}
            style={{ backgroundColor: "indigo" }}
            mx="12"
            size="lg"
          >
            Choisir une date
          </Button>
          <Text>{messageDate}</Text>
        </Stack>

        {/* information sur le colis */}
        
        <Stack space={4} w="100%" alignItems="center" marginTop="10%">
          <FormControl.Label>Informations sur votre Colis</FormControl.Label>
          <Input
            w={{
              base: "75%",
              md: "25%",
            }}
            InputLeftElement={
              <Icon
                as={<MaterialCommunityIcons name="weight-kilogram" />}
                size={5}
                ml="2"
                color="indigo.800"
              />
            }
            placeholder="Poids en Kg"
            onChangeText={(e) => setWeight(e)}
            value={weight}
          />

          <Button
            onPress={() => {
              setMeasureClick(true);
              setShowModal(true);
            }}
            style={{ backgroundColor: "indigo" }}
            mx="12"
            size="lg"
          >
            Dimensions
          </Button>
          <Button
            onPress={() => {
             props.navigation.navigate("CameraScreen")
            }}
            style={{ backgroundColor: "indigo" }}
            mx="12"
            size="lg"
          >
            prendre une photo du colis
          </Button>

          <Icon
            onPress={() => searchClick()}
            as={<AntDesign name="search1" color="#ffffff" />}
            size={8}
            ml="2"
            marginTop="10"
          />
        </Stack>
        
      </Center>
      </ScrollView>

      {/* modale ( affichage selon si je click sur dimension ou sur choisir une date) */}

      <Modal isOpen={showModal} onClose={() => {setShowModal(false);setModalIsClose(true)}}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          {measureClick ? (
            //  dimension

            <View>
              <Modal.Header>Dimensions en cm</Modal.Header>

              <Modal.Body>
                <Input
                  w={{
                    base: "75%",
                    md: "25%",
                  }}
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="height" />}
                      size={5}
                      ml="2"
                      color="indigo.800"
                    />
                  }
                  placeholder="hauteur"
                  onChangeText={(e) => setHeight(e)}
                  value={height}
                />

                <Input
                  w={{
                    base: "75%",
                    md: "25%",
                  }}
                  InputLeftElement={
                    <Icon
                      as={<FontAwesome5 name="arrows-alt-h" />}
                      size={5}
                      ml="2"
                      color="indigo.800"
                    />
                  }
                  placeholder="largeur"
                  onChangeText={(e) => setWidth(e)}
                  value={width}
                />

                <Input
                  w={{
                    base: "75%",
                    md: "25%",
                  }}
                  InputLeftElement={
                    <Icon
                      as={<AntDesign name="arrowsalt" />}
                      size={5}
                      ml="2"
                      color="indigo.800"
                    />
                  }
                  placeholder="longeur"
                  onChangeText={(e) => setLength(e)}
                  value={length}
                />
                <Button
                  onPress={() => {
                    setShowModal(false);
                  }}
                  style={{ width: "75%", marginTop: 10 }}
                  colorScheme="indigo"
                >
                  ok
                </Button>
              </Modal.Body>
            </View>
          ) : (
            // date

            <View>
              <Modal.Header>Choisir une date</Modal.Header>
              <Modal.Body>
                <DatePicker
                  style={styles.datePickerStyle}
                  date={date} // Initial date from state
                  mode="date" // The enum of date, datetime and time
                  placeholder="select date"
                  format="DD-MM-YYYY"
                  minDate={new Date()}
                  maxDate="31-12-2022"
                  confirmBtnText="Confirmer"
                  cancelBtnText="annuler"
                  customStyles={{
                    dateIcon: {
                      //display: 'none',
                      position: "absolute",
                      left: 0,
                      top: 4,
                      marginLeft: 0,
                    },
                    dateInput: {
                      marginLeft: 36,
                      borderWidth: 0,
                    },
                  }}
                  onDateChange={(date) => {
                    setDate(date);
                  }}
                />
              </Modal.Body>
            </View>
          )}
        </Modal.Content>
      </Modal>
     
      
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
  },
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
});

function mapDispatchToProps(dispatch) {
  return {
    kryerList: function (e) {
      dispatch({ type: "kryerList", kryerList: e });
    },
    infoDelivery: function (e) {
      dispatch({ type: "infoDelivery", infoDelivery: e });
    },
  };
}

export default connect(null, mapDispatchToProps)(SendDelivery);
