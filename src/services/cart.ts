import AsyncStorage from '@react-native-async-storage/async-storage';

export const addToCart = async (item: any): Promise<boolean> => {
  try {
    const existingCart = await AsyncStorage.getItem('cart');
    let cart = existingCart ? JSON.parse(existingCart) : [];

    console.log('Existing cart:', cart);

    // Check if the item is an array and if so, use the first element
    if (Array.isArray(item)) {
      item = item[0];
    }

    // Find the index of the item in the cart
    const itemIndex = cart.findIndex(cartItem => cartItem.id === item.id);

    console.log('Item index:', itemIndex);

    if (itemIndex > -1) {
      // If the item exists in the cart, increment the quantity and update the kg6m and kgm values
      cart[itemIndex].quantity += 1;
      cart[itemIndex].kg6m += item.kg6m;
      cart[itemIndex].kgm += item.kgm;
    } else {
      // If the item does not exist in the cart, add it with a quantity of 1
      cart.push({...item, quantity: 1, kg6m: item.kg6m, kgm: item.kgm});
    }

    console.log('Updated cart:', cart);

    // Save the updated cart back to AsyncStorage
    await AsyncStorage.setItem('cart', JSON.stringify(cart));
    return true;
  } catch (error) {
    console.log('Error in addToCart:', error);
    return false;
  }
};
export const removeItemFromCart = async (itemId: number): Promise<boolean> => {
  try {
    const existingCart = await AsyncStorage.getItem('cart');
    let cart = existingCart ? JSON.parse(existingCart) : [];

    console.log('Existing cart:', cart);

    // Find the index of the item in the cart
    const itemIndex = cart.findIndex(cartItem => cartItem.id === itemId);

    if (itemIndex > -1) {
      if (cart[itemIndex].quantity > 1) {
        // If the item's quantity is more than 1, decrease it by 1
        cart[itemIndex].quantity -= 1;
        // Subtract the kg6m and kgm of a single item
        cart[itemIndex].kg6m = cart[itemIndex].kg6m / cart[itemIndex].quantity;
        cart[itemIndex].kgm = cart[itemIndex].kgm / cart[itemIndex].quantity;
      } else {
        // If the item's quantity is 1, remove it from the cart
        cart = cart.filter(cartItem => cartItem.id !== itemId);
      }
    }

    console.log('Updated cart:', cart);

    // Save the updated cart back to AsyncStorage
    await AsyncStorage.setItem('cart', JSON.stringify(cart));
    return true;
  } catch (error) {
    console.log('Error in removeItemFromCart:', error);
    return false;
  }
};
export const getCart = async (): Promise<any[]> => {
  try {
    const existingCart = await AsyncStorage.getItem('cart');
    let cart = existingCart ? JSON.parse(existingCart) : [];

    console.log('Existing cart:', cart);

    return cart;
  } catch (error) {
    console.log('Error in getCart:', error);
    return [];
  }
};
