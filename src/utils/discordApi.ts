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
