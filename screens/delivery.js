import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  NativeBaseProvider,
  Text,
  Center,
  Box,
  Heading,
  Icon,
  Pressable,
} from "native-base";

//import styles from "../vglobal/styles";

import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

function MyDelivery(props) {
  const [dataDelivery, setDataDelivery] = useState("");

  useEffect(() => {
    async function loadDelivery() {
      var response = await fetch(`${global.ipa}loadMyDeliveries`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `userId=${props.user._id}`,
      });

      response = await response.json();

      console.log("response.deliveries", response.deliveries);
      setDataDelivery(response.deliveries);
    }
    loadDelivery();
  }, []);

  const data = dataDelivery;

  /* const handleDeliveryClick=(sendata)=>{
        props.navigation.navigate('DeliveryStatus',{deliveryStatus:
            {verifcode:sendata.verifCode,delivery_status:sendata.delivery_status}});
    } */

  const handleDeliveryClick = (sendata) => {
    props.navigation.navigate("DeliveryStatus", {
      deliveryStatus: {
        verifcode: sendata.verifCode,
        delivery_status: "supportedDelivery",
      },
    });
  };

  var iconName = "";
  const selectIcon = (status) => {
    if (status == "notYet") {
      iconName = "schedule-send";
      return iconName;
    } else if (status == "validate") {
      iconName = "send";
      return iconName;
    } else if (status == "cancel") {
      iconName = "cancel-schedule-send";
      return iconName;
    }
  };

  var deliveryList = "";
  if (data.length == 0) {
    deliveryList = (
      <Text style={{ textAlign: "center" }}>
        Vous n'avez pas encore envoyé un colis!
      </Text>
    );
  } else {
    deliveryList = (
      <Box>
        {data.map((item) => (
          <Pressable
            onPress={() => handleDeliveryClick(item)}
            key={item._id}
            marginBottom="5"
            p={2}
            borderWidth={1}
            borderRadius="md"
            bgColor="cyan.200"
            borderColor="cyan.200"
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: 5,
            }}
          >
            <Icon
              as={<MaterialCommunityIcons name="cube-send" />}
              size={8}
              mr="5"
              color="indigo.800"
            />
            <Text>
              {" "}
              {item.departure_journey} / {item.arrival_journey} - {item.weight}
              kg - {item.price}€{" "}
            </Text>
            <Icon
              as={<MaterialIcons name={selectIcon(item.status_mission)} />}
              size={6}
              ml="5"
              color="indigo.800"
            />
          </Pressable>
        ))}
      </Box>
    );
  }

  return (
    <NativeBaseProvider>
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
        Suivre mes colis
      </Center>

      <Center flex={1} px="3">
        {deliveryList}
      </Center>
    </NativeBaseProvider>
  );
}

function mapStateToProps(state) {
  return { user: state.userReducer };
}

export default connect(mapStateToProps, null)(MyDelivery);