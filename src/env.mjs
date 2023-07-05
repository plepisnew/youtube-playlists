import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    CLIENT_ID: z.string(),
    CLIENT_SECRET: z.string(),
    AUTH_URI: z.string().url(),
    TOKEN_URI: z.string().url(),
    REDIRECT_URI: z.string().url(),
    SCOPE: z.string(),
  },
  client: {},
  runtimeEnv: {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    AUTH_URI: process.env.AUTH_URI,
    TOKEN_URI: process.env.TOKEN_URI,
    REDIRECT_URI: process.env.REDIRECT_URI,
    SCOPE: process.env.SCOPE,
  },
});
