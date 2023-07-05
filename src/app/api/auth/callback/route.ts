import { YouTubeResponse } from "@/@types/youtube";
import { env } from "@/env.mjs";
import axios from "axios";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const url = new URL(req.url);
    const appUrl = new URL(env.REDIRECT_URI);

    const { data } = await axios.post(env.TOKEN_URI, {
      grant_type: "authorization_code",
      code: url.searchParams.get("code"),
      client_id: env.CLIENT_ID,
      client_secret: env.CLIENT_SECRET,
      redirect_uri: env.REDIRECT_URI,
    });

    const {
      access_token: accessToken,
      id_token: idToken,
      expires_in: expiresIn,
    } = data as YouTubeResponse;

    const cookie = `${accessToken}/${idToken}`;

    return NextResponse.redirect(appUrl.origin, {
      headers: {
        "Set-Cookie": [
          `qid=${cookie}`,
          "HttpOnly",
          "SameSite=Strict",
          `Max-Age=${expiresIn}`,
          "Path=/",
        ].join("; "),
      },
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: JSON.stringify(err) },
      {
        status: 400,
      }
    );
  }
};
