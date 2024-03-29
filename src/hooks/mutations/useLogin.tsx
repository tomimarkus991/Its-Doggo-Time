import { useMutation } from "react-query";

import { useToast } from "hooks";

import { supabase } from "utils";

export const useLogin = ({ email, password }: { email: string; password: string }) => {
  const { showErrorToast } = useToast();
  const login = async () => {
    const { data, error }: any = await supabase.auth.signIn(
      {
        email,
        password,
      },
      { redirectTo: window.location.origin }
    );

    if (error) {
      showErrorToast({
        title: "Login Error",
        description: error.message,
      });
      throw new Error(error.message);
    }
    return data;
  };
  return useMutation("login", () => login());
};
