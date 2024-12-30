import { component$ } from "@builder.io/qwik";
import { useSession, useSignIn } from "~/routes/plugin@auth";
import { Form } from "@builder.io/qwik-city";

export default component$(() => {
  const session = useSession();
  const signInSig = useSignIn();

  return (
    <nav class="navbar bg-base-100 shadow">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl" href="/">
          Amillion
        </a>
      </div>
      <div class="flex-none">
        {session.value ? (
          <a class="btn btn-outline" href="/admin">
            Dashboard
          </a>
        ) : (
          <Form action={signInSig}>
            <input type="hidden" name="providerId" value="discord" />
            <input type="hidden" name="options.redirectTo" value="/admin" />
            <button class="btn btn-outline">Dashboard</button>
          </Form>
        )}
      </div>
    </nav>
  );
});
