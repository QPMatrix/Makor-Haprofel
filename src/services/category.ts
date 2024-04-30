import {supabase} from '../utils/supbase';

export const getCategory = async (id: number) => {
  try {
    const {data, error} = await supabase
      .from('categories')
      .select('*')
      .eq('aluminum_type_id', id);
    if (error) {
      console.error('Error getting category:', error);
    }
    if (data) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
