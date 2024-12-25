import { component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { useSignIn } from "../routes/plugin@auth";

export default component$(() => {
  const signInSig = useSignIn();

  return (
    <>
      <Form action={signInSig}>
        <input type="hidden" name="providerId" value="discord" />
        <input type="hidden" name="options.redirectTo" value="/dashboard" />
        <button class="btn btn-primary">Sign In</button>
      </Form>
    </>
  );
});
