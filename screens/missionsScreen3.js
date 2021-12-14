import React, { useState } from "react";
import { Box, Heading,NativeBaseProvider, Center, Avatar, 
 Image, Button, Text, HStack, Spacer, VStack, Modal} from 'native-base';
import { connect } from "react-redux";

function MissionsScreen3(props){


    var info = props.route.params;

    console.log(info)
    
    
    const logo = require("../assets/download.jpeg");
  
    const [showModal, setShowModal] = useState(false);
    const [err, setErr] = useState(false)
    const [cancelIsClick, setCancelIsClick] = useState(false);

    async function acceptClick(){
        
        setCancelIsClick(false);

        if(info.isValidate == "accept"){
            props.navigation.navigate("TerminateMission",info)
        }else{
                var  responce = await fetch("http://10.5.49.160:3000/changeStatusValidate", {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: `idMission=${props.missionId}&weigth=${info.weigth}&idDelivery=${info._id}`
                });

            responce = await responce.json();

            console.log(responce.err)
            if(responce == true){
                props.navigation.navigate('JourneyScreen')
            }

            if (responce.err){
                setErr(true);
                setShowModal(true);
            }
        }

       
    }


    async function cancelClick(){

        setCancelIsClick(true);

        var  responce = await fetch("http://10.5.49.160:3000/changeStatusCancel", {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `idDelivery=${info._id}&idMission=${props.missionId}&weigth=${info.weigth}`
            });

        responce = await responce.json();
        if(responce == true){
            props.navigation.navigate('JourneyScreen')
        }
    }

    return ( 
    <NativeBaseProvider>
    <Center flex={1} px="3" >
        <Center>
            <Box >
            <HStack space={3} justifyContent="space-between"  style={{marginBottom:'5%'}}>
                <Avatar 
                    size="48px"
                    source={{
                        uri: info.infoExpeditor.avatar,
                    }}
                    bg='transparent'
                />
                <VStack>
                    <Text 
                        _dark={{
                            color: "warmGray.50",
                        }}
                        color="coolGray.800"
                        bold
                        >
                        {info.infoExpeditor.firstName} {info.infoExpeditor.lastName}
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
                    {info.infoExpeditor.note} 
                </Text>
            </HStack>
            </Box>
            
            
            <Box style={{   flexDirection:'row', 
                            paddingVertical: 0, 
                            justifyContent:'space-between',
                            padding: 10,
                            margin:5}}
            >

                    <Box p="3">
                        <Image
                        source={logo}
                        alt="image"
                        width="110" height="110" />
                    </Box>
           
                    <Box p="3">
                        <Text>Information Colis</Text>
                        <Text>Poids : {info.weigth}</Text>
                        <Text>Hauteur : {info.measures.heigth} </Text>
                        <Text>Longueur : {info.measures.length}</Text>
                        <Text>Largeur : {info.measures.width} </Text>
                    </Box>
            </Box> 
            <Box p="3">
                <Text>Coordonnées du receveur</Text>
                <Text>Nom : {info.coordinates_recipient.lastName}</Text>
                <Text>Prenom : {info.coordinates_recipient.firstName}</Text>
                <Text>Email : {info.coordinates_recipient.email}</Text>
                <Text>Telephone : {info.coordinates_recipient.phone}</Text>
            </Box>                
           

        </Center>
        {(info.delivery_status == "delivered") ? 
        <Button variant="outline" colorScheme='indigo' style={{marginRight:50}} onPress={()=>props.navigation.navigate('JourneyScreen')}>retour aux missions</Button>
        : 
        <Center marginTop="5%">
            
                <Button.Group
                display="flex"
                flexDirection="row"
                size="lg"
                marginTop="4"
                marginBottom="4"
                mx="12"
                >
                    <Button style={{width:'50%'}}
                    onPress={()=>setShowModal(true)}>
                    { (info.isValidate == "accept") ? "Annuler" : "Refuser"} 
                    </Button> 

                    <Button 
                    style={{backgroundColor:"indigo",width:'50%'}}
                    onPress={() => acceptClick()}
                    >
                      { (info.isValidate == "accept") ? "Terminer" : "accepter"} 
                    </Button>   
                </Button.Group> 
        </Center>   }                  
    </Center>
    
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        { (err  && cancelIsClick == false)? 
         <Modal.Content maxWidth="400px">
         <Modal.CloseButton />
         
         <Modal.Body>
           <Text>Tu n'as maleureusement pas assez de place dans tes bagages pour accepter cette mission</Text>
         </Modal.Body>
         <Modal.Footer>
             <Button
               variant="outline"
               colorScheme="indigo"
               onPress={() => {
                 props.navigation.navigate("JourneyScreen")
               }}
             >
               retour sur mes missions
             </Button>
            
         </Modal.Footer>
       </Modal.Content> 
       :
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          
          <Modal.Body>
            <Text>tu es sur de vouloir {info.isValidate == "accept" ? "annuler" : "refuser" } cette demande ?</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="outline"
                colorScheme="indigo"
                onPress={() => {
                  setShowModal(false)
                }}
              >
                non
              </Button>
              <Button
                onPress={() => {
                  cancelClick()
                }}
              >
                oui
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content> 
        
        
       }
       
      </Modal>

</NativeBaseProvider>)
   
}

function mapStateToProps(state){
    return { missionId: state.missionIdReducer}
  }
  


  export default connect(
    mapStateToProps,
    null
  )(MissionsScreen3);