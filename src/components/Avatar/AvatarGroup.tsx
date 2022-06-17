import { GroupAvatarIcon, Avatar } from "components";

import { StringOrUndefined } from "types";

interface Props {
  src: StringOrUndefined;
}

export const AvatarGroup = ({ src }: Props) => {
  return (
    <Avatar
      path={src}
      w={{ base: "7rem", md: "9rem" }}
      h={{ base: "7rem", md: "9rem" }}
      icon={<GroupAvatarIcon fontSize={{ base: "5rem", md: "7rem" }} />}
      type="Group"
    />
  );
};
