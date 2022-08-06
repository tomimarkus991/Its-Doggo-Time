import { GroupAvatarIcon } from "components";

import { Avatar } from ".";

interface Props {
  src: string;
}

export const AvatarInvite = ({ src }: Props) => {
  return (
    <Avatar
      path={src}
      w={{ base: "6rem", md: "7rem" }}
      h={{ base: "6rem", md: "7rem" }}
      icon={<GroupAvatarIcon fontSize={{ base: "4.5rem", md: "5rem" }} />}
      type="Group"
    />
  );
};
