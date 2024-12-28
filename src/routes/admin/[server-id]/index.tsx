import {
  component$,
  createContextId,
  Resource,
  useContext,
  useContextProvider,
  useResource$,
  useSignal,
} from "@builder.io/qwik";
import { routeLoader$, useLocation } from "@builder.io/qwik-city";
import type { Signal } from "@builder.io/qwik";
import Game from "~/components/game";
import { fetchGuildTextChannels } from "~/utils/discordApi";
import pb from "~/utils/pocketbase";

type GameChannelSelection = {
  gameId: string;
  channelId: string;
};

export const gamesSelectionCTX =
  createContextId<Signal<string[]>>("available-games");
export const gameChannelSelectionCTX = createContextId<
  Signal<GameChannelSelection[]>
>("game-channel-selection");

export const useSecrets = routeLoader$(async ({ env }) => {
  return {
    BOT_TOKEN: env.get("BOT_TOKEN"),
  };
});

export default component$(() => {
  const secrets = useSecrets();
  const loc = useLocation();
  const guildIdFromUrl = loc.url.pathname.match(/\/admin\/(\d+)\/$/)?.[1];

  useContextProvider(
    gameChannelSelectionCTX,
    useSignal<GameChannelSelection[]>([]),
  );
  useContextProvider(gamesSelectionCTX, useSignal([]));
  const gameChannelSelection = useContext(gameChannelSelectionCTX);
  const gameIds = useContext(gamesSelectionCTX);

  const channels = useResource$(async ({ track }) => {
    track(() => guildIdFromUrl);

    if (!guildIdFromUrl) return;
    try {
      const channels = await fetchGuildTextChannels(
        secrets.value.BOT_TOKEN,
        guildIdFromUrl,
      );

      return channels;
    } catch (error) {
      console.error(error);
    }
  });

  const gameData = useResource$(async () => {
    const records = await pb.collection("games").getFullList();

    records.forEach((game) => {
      game.imageUrl = pb.files.getURL(game, game.image, {
        thumb: "100x0",
      });
    });

    return records;
  });

  return (
    <>
      <Resource
        value={channels}
        onPending={() => <p>Loading channels...</p>}
        onRejected={(error) => <p>Error: {error.message}</p>}
        onResolved={(channelsData) => (
          <div class="mx-auto mt-8 flex w-2/3 flex-col items-center gap-4">
            <Resource
              value={gameData}
              onPending={() => <p>Loading game...</p>}
              onResolved={(gameData) => (
                <div class="flex flex-wrap justify-center gap-4">
                  {gameData.map((game) => (
                    <Game
                      key={game.id}
                      name={game.name}
                      nameShort={game.nameShort}
                      id={game.id}
                      imageUrl={game.imageUrl}
                      channels={channelsData || []}
                      selectedChannel={
                        gameChannelSelection.value.find(
                          (selection) => selection.gameId === game.id,
                        )?.channelId || ""
                      }
                    />
                  ))}
                </div>
              )}
              onRejected={(error) => <p>Error: {error.message}</p>}
            />
          </div>
        )}
      />
    </>
  );
});
