import { useMutation } from "react-query";
import { StringOrUndefined } from "types";
import { supabase } from "utils";

import { useToast } from "..";

interface User {
  username: StringOrUndefined;
  email: string;
  password: string;
}

export const useCreateUser = (user: User) => {
  const { showErrorToast } = useToast();
  const createUser = async (user: User) => {
    // Check if username exists
    const { data: userWithUsername } = await supabase
      .from("profiles")
      .select("*")
      .eq("username", user.username)
      .single();

    // when is, throw error
    if (userWithUsername) {
      // error:
      // User with username exists
      showErrorToast({
        title: "Create User Error",
        description: "User with username exists",
      });
      throw new Error("User with username exists");
    }

    // sign user up
    const { user: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: user.email,
      password: user.password,
    });
    // when error, throw it
    if (signUpError) {
      showErrorToast({
        title: "Create User Error",
        description: signUpError.message,
      });

      throw signUpError;
      // errors:
      // Unable to validate email address: invalid format
      // Signup requires a valid password
      // Password should be at least 6 characters
      // Signup provider must be either email or phone
    }

    return signUpData;
  };

  return useMutation("createUser", () => createUser(user), {
    // errors:
    // new row for relation "profiles" violates check constraint "username_length"
    onSuccess: async _data => {
      const { data: insertData, error: insertError } = await supabase
        .from("profiles")
        .insert({ id: _data?.id, username: user.username });
      if (insertError) {
        showErrorToast({
          title: "Create User Error",
          description: insertError.message,
        });
        throw insertError;
      }
      return insertData;
    },
  });
};
