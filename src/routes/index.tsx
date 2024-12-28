import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import Navbar from "~/components/navbar";

export default component$(() => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main class="p-4">
        <h1>Main site</h1>
      </main>
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
