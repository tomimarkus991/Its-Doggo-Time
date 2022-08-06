import { useQuery } from "react-query";

import { supabase } from "utils";

import { useToast } from "..";

export const useFetchAvatar = (path: string | undefined, queryKey: (string | undefined)[]) => {
  const { showErrorToast } = useToast();

  const fetchAvatar = async () => {
    if (path) {
      const { data: src, error } = await supabase.storage.from("avatars").download(path);
      // @ts-expect-error
      const data = URL.createObjectURL(src);

      if (error) {
        showErrorToast({
          title: "Fetch Avatar Error",
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
