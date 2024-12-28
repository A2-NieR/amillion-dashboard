import { $, component$, useContext } from "@builder.io/qwik";
import {
  gameChannelSelectionCTX,
  gamesSelectionCTX,
} from "~/routes/admin/[server-id]";

interface GameProps {
  name: string;
  nameShort: string;
  id: string;
  imageUrl: string;
  channels: Array<{ id: string; name: string }>;
  selectedChannel: string;
}

export default component$<GameProps>(
  ({ name, nameShort, id, imageUrl, channels, selectedChannel }) => {
    const finalIds = useContext(gamesSelectionCTX);
    const channelSelection = useContext(gameChannelSelectionCTX);

    const handleChannelSelect = $(
      (_: Event, currentTarget: HTMLSelectElement) => {
        const selectedChannelId = currentTarget.value;

        channelSelection.value = channelSelection.value
          .filter((selection) => selection.gameId !== id)
          .concat(
            selectedChannelId
              ? [{ gameId: id, channelId: selectedChannelId }]
              : [],
          );
      },
    );

    const handleGamesCheckbox = $(
      (_: Event, currentTarget: HTMLInputElement) => {
        finalIds.value = finalIds.value.includes(currentTarget.value)
          ? [...finalIds.value.filter((id) => id !== currentTarget.value)]
          : [...finalIds.value, currentTarget.value];
      },
    );

    return (
      <div class="card card-compact w-full bg-base-100 shadow-xl">
        <div class="card-body flex flex-row">
          <figure class="h-[100px] w-1/4">
            <img
              class="w-3/4 object-contain"
              src={imageUrl}
              alt={`${name} Logo`}
              height="100"
              width="84"
            />
          </figure>
          <h2 class="card-title mx-4 w-2/4">{name}</h2>
          <div
            class="card-actions w-1/4 justify-end"
            role="group"
            aria-label="Game selection"
          >
            <select
              class="select select-bordered w-full max-w-xs"
              value={selectedChannel}
              onChange$={handleChannelSelect}
            >
              <option value="">Select a channel</option>
              {channels.map((channel) => (
                <option key={channel.id} value={channel.id}>
                  {"#" + channel.name}
                </option>
              ))}
            </select>

            <input
              name={nameShort}
              value={id}
              type="checkbox"
              class="checkbox"
              checked={finalIds.value.includes(id)}
              onChange$={handleGamesCheckbox}
            />
          </div>
        </div>
      </div>
    );
  },
);
