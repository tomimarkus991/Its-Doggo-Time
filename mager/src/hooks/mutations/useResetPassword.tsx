import { useMutation } from "react-query";

import { useToast } from "..";
import { supabase } from "../../utils";

const useResetPassword = () => {
  const { showErrorToast } = useToast();

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.api.resetPasswordForEmail(email);

    if (error) {
      showErrorToast({
        title: "Reset Password Error",
        description: error.message,
      });

      throw new Error(error.message);
    }
  };
  return useMutation("resetPassword", (email: string) => resetPassword(email));
};
export default useResetPassword;
