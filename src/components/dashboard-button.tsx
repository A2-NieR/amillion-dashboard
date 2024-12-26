import { component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { useSession, useSignIn } from "../routes/plugin@auth";

export default component$(() => {
  const session = useSession();
  const signInSig = useSignIn();

  return (
    <>
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
    </>
  );
});
