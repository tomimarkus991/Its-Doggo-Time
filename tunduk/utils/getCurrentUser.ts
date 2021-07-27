import { User } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';

export const getCurrentUser = async () => {
  try {
    let { data, error } = await supabase
      .from('profiles')
      .select(
        `
      id,
      username
  `,
      )
      .eq('id', supabase?.auth?.user()?.id);
    if (!data) throw error;
    return { id: data[0].id, username: data[0].username };
  } catch (error) {
    throw error;
  }
};
