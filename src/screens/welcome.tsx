import React, {useEffect, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  Box,
  Button,
  FormControl,
  Image,
  Input,
  Modal,
  NativeBaseProvider,
  Spacer,
  Stack,
  Text,
  View,
  VStack,
} from 'native-base';
import {getUserDetails, setUserDetails} from '../lib/async-storage';
import {I18nManager} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const WelcomeScreen = () => {
  const insets = useSafeAreaInsets();
  const [user, setUser] = useState();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation();
  I18nManager.forceRTL(true);
  useEffect(() => {
    const fetchUserDetails = async () => {
      const user = await getUserDetails();
      if (user) {
        setUser(user);
        //@ts-ignore
        navigation.navigate('Home');
      }
    };
    fetchUserDetails();
  }, []);
  const handleNavigation = () => {
    if (user) {
      //@ts-ignore
      navigation.navigate('Home');
    } else {
      setShowModal(true);
    }
  };
  const handleSubmit = async () => {
    try {
      const res = await setUserDetails({name, phoneNumber});
      if (res) {
        setShowModal(false);
      }
    } catch (error) {
      console.log('Error setting user details', error);
    }
  };
  return (
    <NativeBaseProvider>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: insets.top,
        }}>
        <Box>
          <Image
            source={require('../assets/QPMatrix.png')}
            alt="logo"
            size="2xl"
          />
        </Box>
        <VStack space={4} alignItems="center" flex="1" safeArea>
          <Text fontSize="2xl">ברוך הבא למערכת ההזמנות של</Text>
          <Text fontSize="4xl">מקור הפרופיל</Text>
          <Spacer />
          <Button
            onPress={() => handleNavigation()}
            colorScheme={'success'}
            textAlign="center"
            size="lg"
            rounded="md">
            להתחלה
          </Button>
          <Spacer />
          <Text color={'gray.800'}>Powered By QPMatrix</Text>
        </VStack>
      </View>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        textAlign="right">
        <Modal.Content maxW="400px">
          <Modal.Header textAlign="right">נא למלא הפרטים שלכה</Modal.Header>
          <Modal.Body>
            <FormControl isRequired>
              <Stack space={4}>
                <FormControl.Label>שם מלא</FormControl.Label>
                <Input
                  placeholder="שם מלא"
                  onChangeText={text => setName(text)}
                />
                <FormControl.Label>מספר טלפון</FormControl.Label>
                <Input
                  placeholder="מספר טלפון"
                  inputMode="tel"
                  onChangeText={text => setPhoneNumber(text)}
                />
              </Stack>
            </FormControl>
            <Modal.Footer>
              <Button.Group variant="ghost" space={2}>
                <Button onPress={() => setShowModal(false)}>ביטול</Button>
                <Button onPress={() => handleSubmit()} colorScheme="success">
                  שמירה
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </NativeBaseProvider>
  );
};

export default WelcomeScreen;
