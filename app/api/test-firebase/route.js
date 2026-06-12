import { NextResponse } from "next/server";
import { adminDb } from "@/firebase/firebaseAdmin";

export async function GET() {
  try {
    await adminDb
      .collection("test")
      .doc("connection")
      .set({
        message: "Firebase Admin connected succsessfully!",
        createdAt: new Date(),
      });

    return NextResponse.json({
      success: true,
      message: "Firebase Admin Connected",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}