import { useMutation } from "react-query";

import { supabase } from "utils";

import { useToast } from "..";

const useUploadAvatar = (onUpload: (url: string) => void) => {
  const { showErrorToast } = useToast();

  const uploadAvatar = async (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      throw new Error("You must select an image to upload.");
    }
    // gets the selected file
    const file = e.target.files[0];

    // png
    const fileType = file.name.split(".").pop();

    // creates a random filepath 0.460785795297582.png
    const filePath = `${Math.random()}.${fileType}`;

    // uploads the file to supabase storage
    const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, file);

    if (uploadError) {
      showErrorToast({
        title: "Upload Avatar Error",
        description: uploadError.message,
      });
      throw new Error(uploadError.message);
    }

    onUpload(filePath);
  };

  return useMutation("uploadAvatar", e => uploadAvatar(e));
};

export default useUploadAvatar;
