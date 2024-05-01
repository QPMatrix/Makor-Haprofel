import AsyncStorage from '@react-native-async-storage/async-storage';

export const addToCart = async (item: any): Promise<boolean> => {
  try {
    const existingCart = await AsyncStorage.getItem('cart');
    let cart = existingCart ? JSON.parse(existingCart) : [];

    // Find the index of the item in the cart
    //@ts-ignore
    const itemIndex = cart.findIndex(cartItem => cartItem.id === item.id);

    if (itemIndex > -1) {
      // If the item exists in the cart, increment the quantity and add the kg6m and kgm values
      cart[itemIndex].quantity += 1;
      cart[itemIndex].kg6m += item.kg6m;
      cart[itemIndex].kgm += item.kgm;
    } else {
      // If the item does not exist in the cart, add it with a quantity of 1
      cart.push({...item, quantity: 1});
    }

    // Save the updated cart back to AsyncStorage
    await AsyncStorage.setItem('cart', JSON.stringify(cart));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const getCart = async (): Promise<any[]> => {
  try {
    const existingCart = await AsyncStorage.getItem('cart');
    return existingCart ? JSON.parse(existingCart) : [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const removeItemFromCart = async (itemId: string): Promise<boolean> => {
  try {
    const existingCart = await AsyncStorage.getItem('cart');
    let cart = existingCart ? JSON.parse(existingCart) : [];
    //@ts-ignore
    const updatedCart = cart.filter(cartItem => cartItem.id !== itemId);

    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
