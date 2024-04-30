import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Image,
  NativeBaseProvider,
  Spacer,
  Text,
  View,
  VStack,
} from 'native-base';

const WelcomeScreen = () => {
  const insets = useSafeAreaInsets();

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
          <Button onPress={() => {}} size="lg">
            להתחלה
          </Button>
        </VStack>
      </View>
    </NativeBaseProvider>
  );
};

export default WelcomeScreen;
