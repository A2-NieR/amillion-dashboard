import { routeLoader$ } from "@builder.io/qwik-city";
import { tursoClient } from "~/utils/turso";

interface Game {
  game_id: string;
  game_name: string;
  created_at: string;
}

// eslint-disable-next-line qwik/loader-location
export const useGamesData = routeLoader$(async (requestEvent) => {
  const client = tursoClient(requestEvent);
  try {
    const items = await client.execute("select * from games");

    const games: Game[] = items.rows.map((row) => ({
      game_id: row.game_id as string,
      game_name: row.game_name as string,
      created_at: row.created_at as string,
    }));

    return { games };
  } catch (error) {
    console.error(error);
    return requestEvent.fail(500, {
      errorMessage: "Failed to load game data.",
    });
  }
});
