import { NextResponse } from "next/server";
import { adminDb } from "@/firebase/firebaseAdmin";

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

async function getLeadData(
  leadId
) {
  try {
    const response = await fetch(
      `https://graph.facebook.com/v25.0/${leadId}?access_token=${process.env.META_PAGE_ACCESS_TOKEN}`
    );

    const data =
      await response.json();

    console.log(
      "FULL LEAD DATA:",
      JSON.stringify(
        data,
        null,
        2
      )
    );

    return data;
  } catch (error) {
    console.error(
      "Lead Fetch Error:",
      error
    );

    return null;
  }
}

function getField(
  fieldData,
  fieldName
) {
  const field = fieldData?.find(
    (item) =>
      item.name === fieldName
  );

  return field?.values?.[0] || "";
}

export async function POST(req) {
  try {
    const body = await req.json();

    console.log(
      "META WEBHOOK RECEIVED:",
      JSON.stringify(
        body,
        null,
        2
      )
    );

    if (
      body.object === "page" &&
      body.entry
    ) {
      for (const entry of body.entry) {
        for (const change of entry.changes ||
          []) {
          if (
            change.field ===
            "leadgen"
          ) {
            const leadId =
              change.value
                .leadgen_id;

            console.log(
              "Lead ID:",
              leadId
            );

            const leadData =
              await getLeadData(
                leadId
              );

            if (
              !leadData ||
              !leadData.field_data
            ) {
              console.log(
                "No lead data found"
              );
              continue;
            }

            const fullName =
              getField(
                leadData.field_data,
                "full_name"
              );

            const phone =
              getField(
                leadData.field_data,
                "phone_number"
              );

            const email =
              getField(
                leadData.field_data,
                "email"
              );

            const leadDoc = {
              name: fullName,
              phone,
              email,

              source:
                "Facebook Lead Ads",

              campaign:
                "Meta Lead Form",

              status:
                "New Lead",

              leadId,

              pageId:
                change.value
                  .page_id,

              formId:
                change.value
                  .form_id,

              createdAt:
                new Date(),
            };

            await adminDb
              .collection(
                "leads"
              )
              .add(leadDoc);

            console.log(
              "Lead Saved:",
              leadDoc
            );
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "Webhook Error:",
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