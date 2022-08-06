export interface UserType {
  id: string;
  email: string;
  username: string;
  avatar: string | null;
}

export interface SelectOption {
  id: number;
  name: string;
}

// doggotime
export type AvatarSizeType =
  | (string & Record<string, unknown>)
  | "2xs"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "full"
  | undefined;

export type AvatarIconType = React.ReactElement<any, string | React.JSXElementConstructor<any>>;

export type StringOrUndefined = string | undefined;
export type BooleanOrUndefined = boolean | undefined;

export interface UserType {
  id: string;
  username: string;
  avatar_url: string;
  groups: GroupType[];
}

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
export interface MemberType {
  id: string;
  username: string;
  avatar_url: string;
}

export interface GroupPageDataType {
  id: StringOrUndefined;
  group_name: string;
  avatar_url: StringOrUndefined;
  creator_id: StringOrUndefined;
  profiles: ProfileType[] | undefined;
}

export interface ExcrementLogsdataType {
  id?: StringOrUndefined;
  pee: BooleanOrUndefined;
  poop: BooleanOrUndefined;
  group_id: StringOrUndefined;
  creator_id: StringOrUndefined;
  created_at: Date | null | undefined;
}

export interface FoodLogsdataType {
  id?: StringOrUndefined;
  food: BooleanOrUndefined;
  group_id: StringOrUndefined;
  creator_id: StringOrUndefined;
  created_at: Date | null | undefined;
}
