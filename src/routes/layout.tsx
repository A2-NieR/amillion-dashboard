import { component$, Slot } from "@builder.io/qwik";
import { type RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async ({ cacheControl, url }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.dev/docs/caching/
  if (url.pathname.includes("/admin")) {
    cacheControl({
      public: false,
      maxAge: 0,
      sMaxAge: 0,
      staleWhileRevalidate: 0,
    });
  } else {
    cacheControl({
      // Always serve a cached response by default, up to a week stale
      staleWhileRevalidate: 60 * 60 * 24 * 7,
      // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
      maxAge: 5,
    });
  }
};

export default component$(() => {
  return (
    <>
      <Slot />
    </>
  );
});
