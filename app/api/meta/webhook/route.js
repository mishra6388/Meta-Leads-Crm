import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const mode = searchParams.get("hub.mode");
    const token = searchParams.get("hub.verify_token");
    const challenge = searchParams.get("hub.challenge");

    console.log("Webhook Verification Request");
    console.log("Mode:", mode);
    console.log("Token:", token);
    console.log("Challenge:", challenge);

    if (
      mode === "subscribe" &&
      token === process.env.META_VERIFY_TOKEN
    ) {
      console.log("Webhook Verified Successfully");

      return new Response(challenge, {
        status: 200,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    }

    console.log("Verification Failed");

    return new Response("Verification failed", {
      status: 403,
    });
  } catch (error) {
    console.error("GET Webhook Error:", error);

    return new Response("Server Error", {
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    console.log(
      "META WEBHOOK RECEIVED:"
    );

    console.log(
      JSON.stringify(body, null, 2)
    );

    // Extract lead information
    if (
      body.object === "page" &&
      body.entry
    ) {
      for (const entry of body.entry) {
        for (const change of entry.changes || []) {
          if (
            change.field === "leadgen"
          ) {
            const leadData =
              change.value;

            console.log(
              "NEW LEAD RECEIVED"
            );
            console.log(
              "Lead ID:",
              leadData.leadgen_id
            );
            console.log(
              "Form ID:",
              leadData.form_id
            );
            console.log(
              "Page ID:",
              leadData.page_id
            );
            console.log(
              "Created Time:",
              leadData.created_time
            );
          }
        }
      }
    }

    return NextResponse.json(
      {
        success: true,
        received: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "POST Webhook Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}