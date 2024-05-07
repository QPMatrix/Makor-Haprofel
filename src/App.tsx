import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/home';
import WelcomeScreen from './screens/welcome';
import ProductScreen from './screens/product';
import CategoryScreen from './screens/category';
import {NativeBaseProvider} from 'native-base';
import ProductInfoScreen from './screens/product-info';
import CartScreen from './screens/cart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PdfScreen from './screens/pdf-screen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'קטיגרות אלומנום'}}
      />
      <Tab.Screen
        name="Orders"
        component={CartScreen}
        options={{title: 'הזמנות קדמות'}}
      />
      <Tab.Screen
        name="Settings"
        component={CartScreen}
        options={{title: 'הגדרות'}}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Main"
            component={MyTabs}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Category"
            component={CategoryScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Cart"
            component={CartScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Products"
            component={ProductScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Product"
            component={ProductInfoScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Pdf"
            component={PdfScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;
