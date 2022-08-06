import { GroupAvatarIcon, Avatar } from "components";

interface Props {
  path: string | undefined;
}

export const GroupAvatarCard = ({ path }: Props) => {
  return (
    <Avatar
      path={path}
      w={{ base: "6rem", md: "7rem" }}
      h={{ base: "6rem", md: "7rem" }}
      icon={<GroupAvatarIcon fontSize={{ base: "4.5rem", md: "5rem" }} />}
      type="Group"
    />
  );
};
