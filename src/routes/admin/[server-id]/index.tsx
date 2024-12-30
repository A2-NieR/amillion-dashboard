import {
  component$,
  createContextId,
  useContext,
  useContextProvider,
  useSignal,
} from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { Signal } from "@builder.io/qwik";
import Game from "~/components/game";
import { useGamesData } from "~/shared/loaders";
import { fetchGuildTextChannels } from "~/utils/discordApi";

type GameChannelSelection = {
  gameId: string;
  channelId: string;
};

export { useGamesData } from "~/shared/loaders";

export const gamesSelectionCTX =
  createContextId<Signal<string[]>>("available-games");
export const gameChannelSelectionCTX = createContextId<
  Signal<GameChannelSelection[]>
>("game-channel-selection");

export const useChannels = routeLoader$(async (requestEvent) => {
  const guildIdFromUrl = requestEvent.pathname.match(/\/admin\/(\d+)\/$/)?.[1];

  if (!guildIdFromUrl) {
    return requestEvent.fail(400, { errorMessage: "No guild id provided." });
  }

  try {
    const channels = await fetchGuildTextChannels(
      requestEvent.env.get("PRIVATE_BOT_TOKEN"),
      guildIdFromUrl,
    );

    return { channels };
  } catch (error) {
    console.error(error);
    return requestEvent.fail(500, {
      errorMessage: "Failed to load server channels.",
    });
  }
});

export default component$(() => {
  useContextProvider(
    gameChannelSelectionCTX,
    useSignal<GameChannelSelection[]>([]),
  );
  useContextProvider(gamesSelectionCTX, useSignal([]));
  const gameChannelSelection = useContext(gameChannelSelectionCTX);
  const gameIds = useContext(gamesSelectionCTX);

  const channelData = useChannels();
  const gameData = useGamesData();

  if (channelData.value.errorMessage) {
    return (
      <div class="toast toast-center">
        <div class="alert alert-error">
          <span>{channelData.value.errorMessage}</span>
        </div>
      </div>
    );
  }

  if (gameData.value.errorMessage) {
    return (
      <div class="toast toast-center">
        <div class="alert alert-error">
          <span>{gameData.value.errorMessage}</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div class="mx-auto mt-8 flex w-full flex-col items-center gap-4 md:w-2/3">
        <div class="flex flex-wrap justify-center gap-4">
          {gameData.value.games?.map((game) => (
            <Game
              key={game.game_id}
              name={game.game_name}
              id={game.game_id}
              channels={channelData.value.channels}
              selectedChannel={
                gameChannelSelection.value.find(
                  (selection) => selection.gameId === game.game_id,
                )?.channelId || ""
              }
            />
          ))}
        </div>
      </div>
    </>
  );
});
