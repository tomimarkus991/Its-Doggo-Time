import { User } from '@supabase/supabase-js';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { supabase } from './supabaseClient';

export const getCurrentUser = async () => {
  try {
    const id = supabase?.auth?.user()?.id;
    let { data, error } = await supabase
      .from('profiles')
      .select(
        `
      id,
      username
  `,
      )
      .eq('id', id)
      .single();
    console.log('getCurrentuser', data);

    if (data === null) {
      console.log('data is null');
      return { id: null, username: null };
    }
    return { id: data.id, username: data.username };
  } catch (error) {
    throw error;
  }
};
