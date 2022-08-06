import { ProfileAvatarIcon } from "../Icons";

import { Avatar } from ".";
interface Props {
  src: string | undefined;
}

export const AvatarProfile = ({ src }: Props) => {
  return (
    <Avatar
      path={src}
      w={{ base: "7rem", sm: "7rem", md: "9rem" }}
      h={{ base: "7rem", sm: "7rem", md: "9rem" }}
      icon={<ProfileAvatarIcon fontSize={{ base: "5rem", sm: "5rem", md: "6rem" }} />}
      type="User"
    />
  );
};
