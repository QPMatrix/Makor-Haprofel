import {supabase} from '../utils/supbase';

export const getType = async () => {
  try {
    const {data, error} = await supabase.from('aluminum_types').select('*');
    if (error) {
      console.error('Error getting type:', error);
      throw error;
    }
    if (data) {
      return data;
    }
  } catch (error) {
    console.error('Error in getType:', error);
    throw error;
  }
};
