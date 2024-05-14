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
import PdfScreen from './screens/pdf-screen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else {
            iconName = 'question'; // default icon
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen
        name="Settings"
        component={CartScreen}
        options={{
          title: 'הגדרות',
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'קטיגרות אלומנום',
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
        }}
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
