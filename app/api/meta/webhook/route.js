import { NextResponse } from "next/server";

export async function GET(req) {
  const searchParams =
    req.nextUrl.searchParams;

  const mode =
    searchParams.get("hub.mode");

  const token =
    searchParams.get(
      "hub.verify_token"
    );

  const challenge =
    searchParams.get(
      "hub.challenge"
    );

  if (
    mode === "subscribe" &&
    token ===
      process.env.META_VERIFY_TOKEN
  ) {
    return new Response(challenge, {
      status: 200,
    });
  }

  return new Response(
    "Verification failed",
    {
      status: 403,
    }
  );
}

export async function POST(req) {
  const body = await req.json();

  console.log(
    "Meta Lead Event:",
    body
  );

  return NextResponse.json({
    success: true,
  });
}