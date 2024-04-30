import {ImageBackground, Dimensions, View} from 'react-native';
import React from 'react';
import {
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
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Footer from '../components/footer';

const WelcomeScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <>
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
                <Input maxWidth={'400px'} rounded="full" />
                <FormControl.Label>מספר טלפון</FormControl.Label>
                <Input
                  type="text"
                  inputMode="tel"
                  maxWidth={'400px'}
                  rounded="full"
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
                onPress={() => {
                  console.log('pressed');
                }}>
                התחל
              </Button>
            </Center>
          </View>
        </View>
        <Footer />
      </ScrollView>
    </>
  );
};

export default WelcomeScreen;
