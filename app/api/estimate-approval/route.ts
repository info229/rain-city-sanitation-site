import { NextResponse } from "next/server";
import { company } from "@/lib/data";

type ApprovalPayload = {
  contact?: {
    email?: string;
    phone?: string;
    pickupDate?: string;
  };
  estimate?: {
    totalMin?: number;
    totalMax?: number;
    tax?: { min: number; max: number; rate: number } | null;
    serviceFee?: { min: number; max: number } | null;
    items?: Array<{ label: string; quantity: number; min: number; max: number }>;
  };
  selections?: {
    zip?: string;
    access?: string;
    stairs?: string;
    disassembly?: boolean;
    sameDay?: boolean;
    heavyMaterial?: boolean;
  };
};

function formatCurrency(value: number) {
  return `$${value.toLocaleString("en-US")}`;
}

function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

function normalizePhone(phone: string) {
  return phone.replace(/\D/g, "");
}

async function sendResendNotification({
  to,
  subject,
  text,
  replyTo,
}: {
  to: string;
  subject: string;
  text: string;
  replyTo: string;
}) {
  const resendKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.NOTIFICATION_FROM_EMAIL || "info@raincitysanitation.com";

  if (!resendKey || !fromEmail) {
    return { delivered: false, reason: "missing_email_config" as const };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [to],
      reply_to: replyTo,
      subject,
      text,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Resend request failed: ${body}`);
  }

  return { delivered: true as const };
}

async function sendWebhookNotification(payload: ApprovalPayload) {
  const webhookUrl = process.env.ESTIMATE_NOTIFICATION_WEBHOOK_URL;

  if (!webhookUrl) {
    return { delivered: false, reason: "missing_webhook_config" as const };
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Webhook request failed: ${body}`);
  }

  return { delivered: true as const };
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ApprovalPayload;
    const email = payload.contact?.email?.trim() || "";
    const phone = payload.contact?.phone?.trim() || "";
    const pickupDate = payload.contact?.pickupDate?.trim() || "";
    const items = payload.estimate?.items || [];
    const phoneDigits = normalizePhone(phone);

    if (!isValidEmail(email)) {
      return NextResponse.json({ message: "Please enter a valid email." }, { status: 400 });
    }

    if (phoneDigits.length < 10) {
      return NextResponse.json({ message: "Please enter a valid phone number." }, { status: 400 });
    }

    if (!pickupDate) {
      return NextResponse.json({ message: "Please choose a preferred pickup date." }, { status: 400 });
    }

    if (items.length === 0) {
      return NextResponse.json({ message: "Add at least one item before confirming the estimate." }, { status: 400 });
    }

    const recipient = process.env.NOTIFICATION_EMAIL || "info@raincitysanitation.com";
    const subject = `New estimate approval request from ${phone}`;
    const itemLines = items
      .map((item) => {
        const range =
          item.min === item.max
            ? formatCurrency(item.min)
            : `${formatCurrency(item.min)}-${formatCurrency(item.max)}`;
        return `- ${item.label} x${item.quantity}: ${range}`;
      })
      .join("\n");

    const text = [
      "A customer approved their Rain City Sanitation instant estimate.",
      "",
      "Contact details",
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Preferred pickup date: ${pickupDate}`,
      "",
      "Estimate details",
      `Total: ${formatCurrency(payload.estimate?.totalMin || 0)}-${formatCurrency(payload.estimate?.totalMax || 0)}`,
      payload.estimate?.serviceFee
        ? `Service fee: ${formatCurrency(payload.estimate.serviceFee.min)}`
        : null,
      payload.estimate?.tax
        ? `Estimated tax: ${formatCurrency(payload.estimate.tax.min)}-${formatCurrency(payload.estimate.tax.max)} (${Math.round(payload.estimate.tax.rate * 1000) / 10}%)`
        : null,
      `ZIP: ${payload.selections?.zip || "Not provided"}`,
      `Access: ${payload.selections?.access || "Not provided"}`,
      `Stairs: ${payload.selections?.stairs || "Not provided"}`,
      `Needs disassembly: ${payload.selections?.disassembly ? "Yes" : "No"}`,
      `Same-day requested: ${payload.selections?.sameDay ? "Yes" : "No"}`,
      `Heavy or specialty material: ${payload.selections?.heavyMaterial ? "Yes" : "No"}`,
      "",
      "Items",
      itemLines,
    ]
      .filter(Boolean)
      .join("\n");

    console.log("Estimate approval request", {
      recipient,
      email,
      phone,
      pickupDate,
      items,
      totalMin: payload.estimate?.totalMin,
      totalMax: payload.estimate?.totalMax,
    });

    try {
      const emailResult = await sendResendNotification({
        to: recipient,
        subject,
        text,
        replyTo: email,
      });

      if (emailResult.delivered) {
        return NextResponse.json({
          message: "Thanks. Your approval was sent and we will follow up to confirm your pickup.",
        });
      }

      const webhookResult = await sendWebhookNotification(payload);

      if (webhookResult.delivered) {
        return NextResponse.json({
          message: "Thanks. Your approval was sent and we will follow up to confirm your pickup.",
        });
      }
    } catch (error) {
      console.error("Notification delivery failed", error);
      return NextResponse.json(
        { message: "We could not send the notification right now. Please call or text us to confirm the pickup." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      message:
        "Your request was captured, but email notifications are not connected yet. Add Resend or a webhook to turn on automatic alerts.",
    });
  } catch (error) {
    console.error("Estimate approval route failed", error);
    return NextResponse.json(
      { message: "We could not submit that request. Please call or text us and we will take care of it." },
      { status: 500 },
    );
  }
}
