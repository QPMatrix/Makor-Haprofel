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
