import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: 'a8f68c283487adb59295d6717483f23b8a1643da', queries,  });
export default client;
  