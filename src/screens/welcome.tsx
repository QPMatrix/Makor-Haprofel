import {
  ImageBackground,
  Dimensions,
  View,
  I18nManager,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Image,
  Input,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import Footer from '../components/footer';
import Loader from '../components/loader';
import {createUser} from '../services/user';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WelcomeScreen = () => {
  const [name, setName] = useState('');
  const [phone, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigation();
  I18nManager.forceRTL(true);
  useEffect(() => {
    const checkUser = async () => {
      setIsLoading(true);
      const user = await AsyncStorage.getItem('user');
      if (user) {
        //@ts-ignore
        navigate.navigate('Main');
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    };
    checkUser();
  }, []);
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const res = await createUser(name, phone);
      if (res) {
        setIsLoading(false);
        //@ts-ignore
        navigate.navigate('Main');
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <ScrollView
        flex={1}
        backgroundColor={'white'}
        showsVerticalScrollIndicator={false}>
        <Center>
          <ImageBackground
            source={require('../assets/welcome.png')}
            style={{
              height: Dimensions.get('window').height / 2.5,
              width: '100%',
            }}>
            <Center flex={1} justifyContent={'center'} alignItems={'center'}>
              <Image
                source={require('../assets/logo.png')}
                alt="logo"
                size="xl"
              />
              <Text fontWeight="medium" bold mt="4" fontSize="3xl">
                מקור הפרופיל
              </Text>
            </Center>
          </ImageBackground>
        </Center>
        <View
          style={{
            flex: 1.5,
            bottom: 50,
            backgroundColor: 'white',
            borderTopStartRadius: 60,
            borderTopEndRadius: 60,
          }}>
          <View style={{padding: 40}}>
            <VStack space={4} alignItems={'flex-start'}>
              <Text fontSize="2xl" bold>
                ברוכים הבאים
              </Text>
              <Text fontSize="lg">למערכת הזמנות של מקור הפרופיל</Text>
            </VStack>
          </View>
          <View>
            <Box alignSelf="center">
              <Text fontSize="md" fontWeight="medium">
                על מנת להתחיל יש להזין את פרטי המשתמשת
              </Text>
            </Box>
            <VStack space={4} alignItems={'center'} mt="4">
              <FormControl isRequired style={{margin: 'auto', width: '80%'}}>
                <FormControl.Label fontWeight="medium" fontSize="lg">
                  שמ מלא או שמ העסק
                </FormControl.Label>
                <Input
                  maxWidth={'400px'}
                  rounded="full"
                  onChangeText={text => setName(text)}
                />
                <FormControl.Label>מספר טלפון</FormControl.Label>
                <Input
                  type="text"
                  inputMode="tel"
                  maxWidth={'400px'}
                  rounded="full"
                  onChangeText={text => setPhoneNumber(text)}
                />
              </FormControl>
            </VStack>
            <Center>
              <Button
                size="lg"
                mt={10}
                bg="blue.500"
                width="90%"
                borderRadius={20}
                onPress={() => handleSubmit()}>
                התחל
              </Button>
            </Center>
          </View>
        </View>
        <Footer />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default WelcomeScreen;
