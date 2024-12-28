declare global {
  interface Guild {
    id: string;
    name: string;
    icon: string | null;
    banner: sting | null;
    owner: boolean;
    permissions: number;
    permissions_new: string;
    features: Array<string>;
  }

  interface Channel {
    id: string;
    type: number;
    last_message_id: string;
    flags: number;
    last_pin_timestamp: string;
    guild_id: string;
    name: string;
    parent_id: string;
    rate_limit_per_user: number;
    topic: null | string;
    position: number;
    permission_overwrites: Array<any>;
    nsfw: boolean;
  }
}

export {};
