import { NextResponse } from "next/server";
import { env } from "@/env.mjs";

export const GET = (req: Request) => {
  const url = new URL(env.AUTH_URI);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", env.CLIENT_ID);
  url.searchParams.set("scope", env.SCOPE);
  url.searchParams.set("redirect_uri", env.REDIRECT_URI);
  return NextResponse.redirect(url);
};
