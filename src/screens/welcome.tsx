import {ImageBackground, Dimensions, View} from 'react-native';
import React from 'react';
import {Center, Image, ScrollView, Text} from 'native-base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const WelcomeScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      flex={1}
      backgroundColor={'#fffff'}
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
              source={require('../assets/QPMatrix.png')}
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
          backgroundColor: 'red',
          borderTopStartRadius: 60,
          borderTopEndRadius: 60,
        }}>
        <View style={{padding: 40, alignItems: 'flex-start'}}>
          <Text fontSize="2xl" bold>
            ברוכים הבאים
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default WelcomeScreen;
