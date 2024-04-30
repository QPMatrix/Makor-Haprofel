import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  Box,
  Center,
  Container,
  Divider,
  Heading,
  NativeBaseProvider,
  ScrollView,
  Spacer,
  Text,
  VStack,
} from 'native-base';

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <NativeBaseProvider>
      <ScrollView
        style={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingRight: insets.right,
          paddingLeft: insets.left,
        }}>
        <Center>
          <Heading alignContent="flex-end">קטגריות אלומניום</Heading>
          <Divider mt="2" />
        </Center>

        <Box borderColor="black">
          <Spacer />
          <VStack space={4} divider={<Divider />}>
            <Box alignItems={'center'} flex={1} mr="10" mt="10" mb="10">
              <Text fontWeight="medium" textAlign={'right'} bold>
                סדרה 1700
              </Text>
            </Box>
            <Box alignItems={'center'} flex={1} mr="10" mt="10" mb="10">
              <Text fontWeight="medium" textAlign={'right'} bold>
                סדרה 7000
              </Text>
            </Box>
          </VStack>
        </Box>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default HomeScreen;
