import { supabase } from './supabaseClient';

export const getCurrentUser = async () => {
  try {
    const id = supabase?.auth?.user()?.id;
    let { data } = await supabase
      .from('profiles')
      .select(
        `
      id,
      username
  `,
      )
      .eq('id', id)
      .single();

    if (data === null) {
      // console.log('data is null');
      return { id: null, username: null };
    }
    return { id: data.id, username: data.username };
  } catch (error) {
    throw error;
  }
};
