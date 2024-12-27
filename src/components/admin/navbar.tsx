import { $, component$, useSignal } from "@builder.io/qwik";
import type { Session } from "@auth/qwik";
import type { Signal } from "@builder.io/qwik";
import { useSignOut } from "~/routes/plugin@auth";
import { Form, useLocation, useNavigate } from "@builder.io/qwik-city";

interface NavbarProps {
  session: Readonly<Signal<null>> | Readonly<Signal<Session>>;
  servers: Readonly<
    Signal<{ installedGuilds: Guild[]; notInstalledGuilds: Guild[] }>
  >;
}

export default component$<NavbarProps>(({ session, servers }) => {
  const signOutSig = useSignOut();
  const nav = useNavigate();
  const loc = useLocation();
  const guildIdFromUrl = loc.url.pathname.match(/\/admin\/(\d+)\/$/)?.[1];
  const selectedServer = useSignal<string>(guildIdFromUrl || "");

  const handleServerSelect = $(async (event: Event, currentTarget: any) => {
    selectedServer.value = currentTarget.value;

    if (
      servers.value.installedGuilds.some(
        (guild) => guild.id === currentTarget.value,
      )
    ) {
      await nav(`/admin/${currentTarget.value}`);
    } else {
      //TODO: const inviteUrl = `https://discord.com/oauth2/authorize?client_id=${import.meta.env.PUBLIC_DISCORD_ID}&scope=bot&guild_id=${currentTarget.value}`;
      // await nav(inviteUrl)
    }
  });

  return (
    <nav class="navbar bg-base-100 shadow">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl" href="/">
          Amillion
        </a>
      </div>
      <div class="flex-none items-center gap-4">
        <select
          class="select select-bordered w-full max-w-xs"
          onChange$={handleServerSelect}
          value={selectedServer.value}
        >
          <option disabled selected={selectedServer.value === ""} value="">
            Select Server
          </option>
          {servers.value.installedGuilds.map((server) => (
            <option key={server.id} value={server.id}>
              {server.name}
            </option>
          ))}
          {servers.value.notInstalledGuilds.map((server) => (
            <option key={server.id} value={server.id}>
              {"+ " + server.name}
            </option>
          ))}
        </select>

        <div class="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            class="avatar btn btn-circle btn-ghost"
          >
            {session.value?.user?.image && (
              <div class="w-10 rounded-full">
                <img
                  src={session.value.user.image}
                  alt={session.value.user.name || "User avatar"}
                  height="40"
                  width="40"
                />
              </div>
            )}
          </div>
          <ul
            tabIndex={0}
            class="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
          >
            <li>
              <Form action={signOutSig}>
                <input type="hidden" name="redirectTo" value="/" />
                <button>Logout</button>
              </Form>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
});
