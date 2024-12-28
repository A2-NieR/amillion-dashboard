interface Guild {
  id: string;
  name: string;
  icon: string | null;
  banner: string | null;
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

export async function fetchUserInfo(accessToken: string) {
  const response = await fetch("https://discord.com/api/v10/users/@me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user info");
  }

  return response.json();
}

export async function fetchUserGuilds(accessToken: string): Promise<Guild[]> {
  const response = await fetch("https://discord.com/api/v10/users/@me/guilds", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user guilds");
  }

  return response.json();
}

export async function fetchBotGuilds(
  botToken: string | undefined,
): Promise<Guild[]> {
  if (!botToken) {
    throw new Error("Bot token is missing");
  }

  const response = await fetch("https://discord.com/api/v10/users/@me/guilds", {
    headers: {
      Authorization: `Bot ${botToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch bot guilds");
  }

  return response.json();
}

export async function fetchGuildTextChannels(
  botToken: string | undefined,
  guildId: string,
): Promise<Channel[]> {
  if (!botToken) {
    throw new Error("Bot token is missing");
  }

  const response = await fetch(
    `https://discord.com/api/v10/guilds/${guildId}/channels`,
    {
      method: "GET",
      headers: {
        Authorization: `Bot ${botToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch guild channels");
  }

  const channels = (await response.json()) as Channel[];

  const textChannels = channels.filter(
    (channel: { type: number }) => channel.type === 0,
  );

  return textChannels;
}
