import { ProfileAvatarIcon, Avatar } from "components";

interface Props {
  src: string;
}

export const ProfileAvatarCard = ({ src }: Props) => {
  return (
    <Avatar
      path={src}
      w={{ base: "6rem", lg: "7rem" }}
      h={{ base: "6rem", lg: "7rem" }}
      icon={<ProfileAvatarIcon fontSize={{ base: "4rem", lg: "4.8rem" }} />}
      type="User"
    />
  );
};
