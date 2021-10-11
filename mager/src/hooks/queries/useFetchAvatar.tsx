import { useQuery } from 'react-query';
import { useToast } from '..';
import { supabase } from '../../utils/supabaseClient';

const useFetchAvatar = (path: string | undefined, queryKey: string) => {
  const { showErrorToast } = useToast();

  const fetchAvatar = async () => {
    if (path) {
      const { data: src, error } = await supabase.storage
        .from('avatars')
        .download(path);
      const data = URL.createObjectURL(src);

      if (error) {
        showErrorToast({
          title: 'Fetch Avatar Error',
          description: error.message,
        });
        throw new Error(error.message);
      }
      return data;
    } else {
      return null;
    }
  };

  return useQuery(queryKey, () => fetchAvatar());
};

export default useFetchAvatar;
