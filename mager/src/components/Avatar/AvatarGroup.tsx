import { StringOrUndefined } from "types";

import { GroupAvatarIcon, Avatar } from "components";

interface Props {
  src: StringOrUndefined;
}

export const AvatarGroup = ({ src }) => {
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
