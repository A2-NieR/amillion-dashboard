import type { Signal } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import SignOut from "./sign-out";
import type { Session } from "@auth/qwik";
import SignIn from "./sign-in";

interface NavbarProps {
  session: Readonly<Signal<null>> | Readonly<Signal<Session>>;
}

export default component$<NavbarProps>(({ session }) => {
  return (
    <nav class="navbar bg-base-100">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl" href="/">
          Amillion
        </a>
      </div>
      <div class="flex-none items-center gap-2">
        <div class="dropdown dropdown-end flex">
          <div class="avatar">
            <div class="w-10 rounded-full">
              {session.value?.user?.image && (
                <img
                  src={session.value.user.image}
                  alt={session.value.user.name || "User avatar"}
                  height="40"
                  width="40"
                />
              )}
            </div>
          </div>
        </div>
        {session.value ? <SignOut /> : <SignIn />}
      </div>
    </nav>
  );
});
