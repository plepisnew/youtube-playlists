import { NextResponse } from "next/server";

const RANDOM_MAGIC_NUMBER = 1337420;

export const GET = async (req: Request) => {
	console.log({
		"Set-Cookie": [
			"qid=ayy_lmao",
			`expires=${new Date(Date.now() - RANDOM_MAGIC_NUMBER).toUTCString()}`,
		].join("; "),
	});
	return NextResponse.redirect(new URL(req.url).origin, {
		headers: {
			"Set-Cookie": [
				"qid=ayy_lmao",
				"Path=/",
				`Expires=${new Date(Date.now() - RANDOM_MAGIC_NUMBER).toUTCString()}`,
			].join("; "),
		},
	});
};
