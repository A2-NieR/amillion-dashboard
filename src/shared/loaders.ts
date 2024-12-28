import { routeLoader$ } from "@builder.io/qwik-city";
import pb from "~/utils/pocketbase";

// eslint-disable-next-line qwik/loader-location
export const useGamesData = routeLoader$(async ({ fail }) => {
  try {
    const records = await pb.collection("games").getFullList();

    records.forEach((game) => {
      game.imageUrl = pb.files.getURL(game, game.image, {
        thumb: "100x0",
      });
    });

    return { records };
  } catch (error) {
    console.error(error);
    return fail(500, { errorMessage: "Failed to load games data." });
  }
});
