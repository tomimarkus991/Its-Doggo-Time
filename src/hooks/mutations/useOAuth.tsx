import { Provider } from "@supabase/gotrue-js";
import { useMutation } from "react-query";

import { supabase } from "utils";

import { useToast } from "..";

export const useOAuth = (provider: Provider) => {
  const { showErrorToast } = useToast();
  const OAuth = async () => {
    const { data, error }: any = await supabase.auth.signIn(
      {
        provider,
      },
      { redirectTo: window.location.origin }
    );

    if (error) {
      showErrorToast({
        title: "OAuth Error",
        description: error.message,
      });
      throw new Error(error.message);
    }
    return data;
  };

  return useMutation("oAuth", () => OAuth());
};
