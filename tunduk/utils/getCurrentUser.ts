import { User } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';

export const getCurrentUser = async () => {
  const user: User | null = supabase.auth.user();
  try {
    let { data, error } = await supabase
      .from('profiles')
      .select(
        `
      id,
      username
  `,
      )
      .eq('id', user?.id);
    if (!data) throw error;
    return { id: data[0].id, username: data[0].username };
  } catch (error) {
    throw error;
  }
};
