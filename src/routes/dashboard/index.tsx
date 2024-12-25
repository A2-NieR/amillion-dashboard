import { component$ } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { fetchUserGuilds, fetchUserInfo } from "~/utils/discordApi";

export const onRequest: RequestHandler = (event) => {
  const session = event.sharedMap.get("session");

  if (event.request.url === "/dashboard") {
    return;
  }

  if (!session || new Date(session.expires) < new Date()) {
    throw event.redirect(302, `/`);
  }
};

export const useDashboardData = routeLoader$(async (requestEvent) => {
  const session = requestEvent.sharedMap.get("session");

  try {
    const userInfo = await fetchUserInfo(session.accessToken);
    const userGuilds = await fetchUserGuilds(session.accessToken);
    const adminGuilds = userGuilds.filter(
      (guild: { permissions: number }) => (guild.permissions & 0x8) === 0x8,
    );

    return {
      userInfo,
      adminGuilds,
    };
  } catch (error) {
    console.error(error);
    throw requestEvent.fail(500, { message: "Failed to load dashboard data" });
  }
});

export default component$(() => {
  const data = useDashboardData();

  return (
    <>
      <h1>Dashboard</h1>
      <div>User: {data.value.userInfo.username}</div>
      <ul>
        {data.value.adminGuilds.map((guild: { id: string; name: string }) => (
          <li key={guild.id}>
            {guild.id}
            {guild.name}
          </li>
        ))}
      </ul>
    </>
  );
});
