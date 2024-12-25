import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <h1>Main site</h1>
    </>
  );
});

export const head: DocumentHead = {
  title: "Amillion Dashboard",
  meta: [
    {
      name: "description",
      content: "Amillion Dashboard description",
    },
  ],
};
