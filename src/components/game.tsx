import { $, component$, useContext, useSignal } from "@builder.io/qwik";
import {
  gameChannelSelectionCTX,
  gamesSelectionCTX,
} from "~/routes/admin/[server-id]";
import GILogo from "~/images/gi-logo.png?jsx";
import HSRLogo from "~/images/hsr-logo.png?jsx";
import ZZZLogo from "~/images/zzz-logo.png?jsx";

interface GameProps {
  name: string;
  id: string;
  channels: Array<{ id: string; name: string }> | undefined;
  selectedChannel: string;
}

export default component$<GameProps>(
  ({ name, id, channels, selectedChannel }) => {
    const finalIds = useContext(gamesSelectionCTX);
    const channelSelection = useContext(gameChannelSelectionCTX);
    const cardActive = useSignal(false);

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
        cardActive.value = currentTarget.checked;
        finalIds.value = finalIds.value.includes(currentTarget.value)
          ? [...finalIds.value.filter((id) => id !== currentTarget.value)]
          : [...finalIds.value, currentTarget.value];
      },
    );

    return (
      <div class="card card-compact w-full bg-base-100 shadow-xl">
        <div class="card-body flex min-h-[128px] flex-row">
          <figure class="w-3/12">
            {id === "gi" && (
              <GILogo
                alt={`${name} Logo`}
                class={!cardActive.value ? "opacity-50 saturate-[.25]" : ""}
                style={{ width: "120px", height: "auto" }}
              />
            )}
            {id === "hsr" && (
              <HSRLogo
                alt={`${name} Logo`}
                class={!cardActive.value ? "opacity-50 saturate-[.25]" : ""}
                style={{ width: "120px", height: "auto" }}
              />
            )}
            {id === "zzz" && (
              <ZZZLogo
                alt={`${name} Logo`}
                class={!cardActive.value ? "opacity-25" : ""}
                style={{ width: "auto", height: "90px" }}
              />
            )}
          </figure>
          <h2 class="card-title mx-4 w-4/12">{name}</h2>
          <div
            class="card-actions w-5/12 items-center justify-end"
            role="group"
            aria-label="Game selection"
          >
            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text mr-4">Subscribe </span>
                <input
                  id={id}
                  name={id}
                  value={id}
                  type="checkbox"
                  class="checkbox"
                  checked={finalIds.value.includes(id)}
                  onChange$={handleGamesCheckbox}
                />
              </label>
            </div>

            {cardActive.value && (
              <select
                class="select select-bordered w-full max-w-xs"
                value={selectedChannel}
                onChange$={handleChannelSelect}
              >
                <option value="">Select a channel</option>
                {channels?.map((channel) => (
                  <option key={channel.id} value={channel.id}>
                    {"#" + channel.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      </div>
    );
  },
);
