export type AvatarSizeType =
  | (string & {})
  | '2xs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | 'full'
  | undefined;

export type AvatarIconType = React.ReactElement<
  any,
  string | React.JSXElementConstructor<any>
>;

export type StringOrUndefined = string | undefined;

export interface GroupType {
  id: string;
  group_name: string;
  avatar_url: string;
  creator_id?: string;
}

export interface InviteDataType {
  id: string;
  receiver: string;
  sender: string;
  group_id: string;
  groups: GroupType;
}

export interface ProfileType {
  id: string;
  username: string;
  avatar_url: string;
}

export interface ProfileAndGroupsType {
  id: string;
  username: string;
  avatar_url: string;
  groups: GroupType[];
}

export interface GroupPageDataType {
  id: string;
  group_name: string;
  avatar_url: string;
  creator_id: string;
  profiles: ProfileType[];
}

export interface LogsdataType {
  id: string;
  pee: boolean;
  poop: boolean;
  group_id: string;
  creator_id: string;
  created_at: Date;
}

export interface CreateLogsdataType {
  pee: boolean;
  poop: boolean;
  group_id: string;
  creator_id: string;
}
