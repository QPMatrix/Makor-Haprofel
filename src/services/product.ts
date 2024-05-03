import {supabase} from '../utils/supbase';

export const getProducts = async (id: number) => {
  try {
    const {data, error} = await supabase
      .from('products')
      .select('*')
      .eq('category_id', id);
    if (error) {
      console.error(error);
    }
    if (data) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const getProductById = async (id: number) => {
  try {
    const {data, error} = await supabase
      .from('products')
      .select('*')
      .eq('id', id);
    if (error) {
      console.log(error);
    }
    if (data) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
