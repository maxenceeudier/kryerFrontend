import React, {useEffect, useState} from "react"
import { connect } from 'react-redux';
import {
  Box,
  FlatList,
  Heading,
  Avatar,
  HStack,
  VStack,
  Text,
  Spacer,
  Center,
  NativeBaseProvider,
} from "native-base"
import { TouchableOpacity } from "react-native-gesture-handler";

function Tchat(props){
    const [dataMessages, setDataMessages] = useState();

    useEffect(() => {
        
        async function loadMessages() {
            var response = await fetch(`${global.ipa}loadLastMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `token=${props.user.token}`
            });

            response = await response.json();
            setDataMessages(response.messages);
            //console.log("response", response.messages);
        }
        loadMessages()
        
    }, []);

    const data = dataMessages;
  return (
    <NativeBaseProvider>
    <Box
      w={{
        base: "100%",
        md: "25%",
      }}
    >
      <Heading paddingTop="10" fontSize="xl" p="4" pb="3">
        Mes messages
      </Heading>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => 
              props.navigation.navigate('TchatDetails',{idRecipient:item.id_dest,name_dest:item.lastName_dest+" "+item.firstName_dest})
            }
          >
          <Box
            borderBottomWidth="1"
            _dark={{
              borderColor: "gray.600",
            }}
            borderColor="coolGray.200"
            pl="4"
            pr="5"
            py="2"
          >
            <HStack space={3} justifyContent="space-between">
              <Avatar
                size="48px"
                source={{
                  uri: item.avatarUrl,
                }}
              />
              <VStack>
                <Text
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="coolGray.800"
                  bold
                >
                  {item.firstName_dest} {item.lastName_dest}
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  {item.msg}
                </Text>
              </VStack>
              <Spacer />
              <Text
                fontSize="xs"
                _dark={{
                  color: "warmGray.50",
                }}
                color="coolGray.800"
                alignSelf="flex-start"
              >
                {item.timeStamp}
              </Text>
            </HStack>
          </Box>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id_dest}
      />
    </Box>
    </NativeBaseProvider>
  )
}

function mapStateToProps(state) {
    return { user: state.userReducer }
}

export default connect(
    mapStateToProps,
    null
)(Tchat);
