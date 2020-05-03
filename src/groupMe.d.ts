/**
 * GroupMeUser info around a User in a group
 */
export type GroupMeUser = {
  user_id: string;
  nickname: string;
  image_url: string;
  id: string;
  muted: boolean;
  autokicked: boolean;
  roles: string[];
  name: string;
};

/**
 * GroupMeGroupInfo contains all info you get can about a particular group
 */
export type GroupMeGroupInfo = {
  id: string;
  group_id: string;
  name: string;
  phone_number: string;
  type: string;
  description: string;
  image_url: null;
  creator_user_id: string;
  created_at: number;
  updated_at: number;
  muted_until?: number; // not sure about this
  office_mode: boolean;
  share_url: string;
  share_qr_code_url: string;
  members: GroupMeUser[];
  messages: {
    count: number;
    last_message_id: string;
    last_message_created_at: number;
    preview: {
      nickname: string;
      text: string;
      image_url: string;
      attachments: GroupMeAttachment[];
    };
  };
  max_members: number;
};

/**
 * Attachments to be sent as part of payload
 */
export type GroupMeEmoji = {
  type: "emoji";
  placeholder: string;
  charmap: Array<[number, number]>;
};
export type GroupMeImage = { type: "image"; url: string };
export type GroupMeMention = { loci: Array<[number, number]>; type: "mentions"; user_ids: string[] };
export type GroupMeLocation = {
  type: "location";
  lng: string;
  lat: string;
  name: string;
};

export type GroupMeAttachment = GroupMeMention | GroupMeImage | GroupMeLocation;

type GroupMePayload = {
  text: string;
  bot_id: string;
  attachments?: GroupMeAttachment[];
};

/**
 * The information GroupMe attaches to requests.
 */
export type GroupMeInfo = {
  attachments: string[];
  avatar_url: string;
  created_at: number;
  group_id: string;
  id: string;
  name: string;
  sender_id: string;
  sender_type: "user" | "bot";
  source_guid: string;
  system: boolean;
  text: string;
  user_id: string;
};

/**
 * Response type of the GroupMe API. T represents in the response body.
 */
export type GroupMeResponse<T> = {
  response: T;
  meta: {
    code: number;
  };
};
