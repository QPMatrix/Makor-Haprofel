import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NativeBaseProvider} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/header';
import AluminumType from '../components/aluminum-type';
import Footer from '../components/footer';

const HomeScreen = () => {
  return (
    <NativeBaseProvider>
      <Header title="קטיגרות אלומניום" />
      <AluminumType />
      <Footer />
    </NativeBaseProvider>
  );
};

export default HomeScreen;
