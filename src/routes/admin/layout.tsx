import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$, type RequestHandler } from "@builder.io/qwik-city";
import { useSession } from "../plugin@auth";
import Navbar from "~/components/admin/navbar";
import { fetchBotGuilds, fetchUserGuilds } from "~/utils/discordApi";

export const onRequest: RequestHandler = (event) => {
  const session = event.sharedMap.get("session");

  if (session && event.request.url.includes("/admin")) {
    return;
  }

  if (!session || new Date(session.expires) < new Date()) {
    throw event.redirect(302, `/`);
  }
};

export const useGuildData = routeLoader$(async (requestEvent) => {
  const session = requestEvent.sharedMap.get("session");

  try {
    const userGuilds = await fetchUserGuilds(session.accessToken);
    const adminGuilds = userGuilds.filter(
      (guild: { permissions: number }) => (guild.permissions & 0x8) === 0x8,
    );

    const botGuilds = await fetchBotGuilds(requestEvent.env.get("BOT_TOKEN"));

    const installedGuilds = adminGuilds.filter((guild) =>
      botGuilds.some((botGuild) => botGuild.id === guild.id),
    );
    const notInstalledGuilds = adminGuilds.filter(
      (guild) => !installedGuilds.some((botGuild) => botGuild.id === guild.id),
    );

    return {
      installedGuilds,
      notInstalledGuilds,
    };
  } catch (error) {
    console.error(error);
    throw requestEvent.fail(500, { message: "Failed to load guild data" });
  }
});

export default component$(() => {
  const session = useSession();
  const guilds = useGuildData();

  return (
    <>
      <header>
        <Navbar session={session} servers={guilds} />
      </header>
      <main class="p-4">
        <Slot />
      </main>
    </>
  );
});
