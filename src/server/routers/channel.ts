import axios from "axios";
import { t } from "../trpc";
import { getUrl } from "@/utils/youtube";

export const channelRouter = t.router({
  getId: t.procedure.query(async ({ ctx }) => {
    const channelsUrl = getUrl({ resource: "channel", action: "list" });
    console.log(channelsUrl);
    const { data } = await axios.get(channelsUrl, {
      params: { mine: true },
    });
    return data;
  }),
});
