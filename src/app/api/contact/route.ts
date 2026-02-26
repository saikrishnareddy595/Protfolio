import { NextRequest, NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

function validate(payload: ContactPayload) {
  return Boolean(payload.name && payload.email && payload.message);
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type") || "";

  let payload: ContactPayload;

  if (contentType.includes("application/json")) {
    payload = await request.json();
  } else {
    const form = await request.formData();
    payload = {
      name: form.get("name")?.toString(),
      email: form.get("email")?.toString(),
      message: form.get("message")?.toString()
    };
  }

  if (!validate(payload)) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }

  console.log("[contact-message]", {
    name: payload.name,
    email: payload.email,
    message: payload.message,
    timestamp: new Date().toISOString()
  });

  if (contentType.includes("application/json")) {
    return NextResponse.json({ ok: true, message: "Message received" });
  }

  return NextResponse.redirect(new URL("/contact?sent=1", request.url), 303);
}
