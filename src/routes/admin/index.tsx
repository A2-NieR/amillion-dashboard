import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { fetchUserInfo } from "~/utils/discordApi";

export const useDashboardData = routeLoader$(async (requestEvent) => {
  const session = requestEvent.sharedMap.get("session");

  try {
    const userInfo = await fetchUserInfo(session.accessToken);

    return {
      userInfo,
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
    </>
  );
});
