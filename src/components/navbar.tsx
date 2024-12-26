import { component$ } from "@builder.io/qwik";
import DashboardButton from "./dashboard-button";

export default component$(() => {
  return (
    <nav class="navbar bg-base-100 shadow">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl" href="/">
          Amillion
        </a>
      </div>
      <div class="flex-none">
        <DashboardButton />
      </div>
    </nav>
  );
});
