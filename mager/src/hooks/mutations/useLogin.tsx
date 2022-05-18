import { useMutation } from "react-query";

import { useToast } from "..";
import { supabase } from "utils";

const useLogin = ({ email, password }: { email: string; password: string }) => {
  const { showErrorToast } = useToast();
  const login = async () => {
    const { data, error } = await supabase.auth.signIn({
      email,
      password,
    });

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
export default useLogin;
