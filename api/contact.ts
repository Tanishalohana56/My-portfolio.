import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const { name, email, subject, message } = req.body || {};

    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ success: false, message: "Please enter your name." });
    }
    if (!email || typeof email !== "string" || !email.trim()) {
      return res.status(400).json({ success: false, message: "Please enter your email address." });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ success: false, message: "Please enter a valid email address." });
    }
    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ success: false, message: "Please enter your message." });
    }
    if (name.trim().length > 100 || email.trim().length > 100) {
      return res.status(400).json({ success: false, message: "Name or email is too long." });
    }
    if (message.trim().length > 5000) {
      return res.status(400).json({ success: false, message: "Message exceeds the maximum limit of 5000 characters." });
    }

    const apiKey = process.env.RESEND_API_KEY?.trim();
    const fromEmail = process.env.FROM_EMAIL?.trim() || "onboarding@resend.dev";
    const toEmail = process.env.TO_EMAIL?.trim() || "tanulohana51@gmail.com";
    const visitorName = name.trim();
    const visitorEmail = email.trim();
    const visitorSubject = (subject && typeof subject === "string" && subject.trim()) ? subject.trim() : "Portfolio Contact Form Inquiry";
    const visitorMessage = message.trim();

    const submissionDate = new Date().toLocaleString("en-US", {
      weekday: "short", year: "numeric", month: "short", day: "numeric",
      hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: "short",
    });

    if (!apiKey) {
      console.error("RESEND_API_KEY environment variable is missing.");
      return res.status(500).json({
        success: false,
        message: "Server email configuration is missing. Set RESEND_API_KEY in Vercel environment variables.",
      });
    }

    const resend = new Resend(apiKey);

    const escapeHtml = (str: string) =>
      str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;").replace(/'/g, "&#039;");

    const safeName = escapeHtml(visitorName);
    const safeEmail = escapeHtml(visitorEmail);
    const safeSubject = escapeHtml(visitorSubject);
    const safeMessage = escapeHtml(visitorMessage);

    const formattedFrom = fromEmail.includes("<") ? fromEmail : `Tanisha Portfolio <${fromEmail}>`;

    const htmlBody = `
      <div style="font-family: sans-serif; max-width:600px; margin:0 auto; border:1px solid #e2e8f0; border-radius:12px; overflow:hidden;">
        <div style="background:#000; padding:20px 28px; border-bottom:3px solid #ec4899;">
          <h2 style="color:#fff; margin:0; font-size:18px;">New Portfolio Contact Submission</h2>
        </div>
        <div style="padding:24px;">
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <p><strong>Subject:</strong> ${safeSubject}</p>
          <p><strong>Date:</strong> ${submissionDate}</p>
          <div style="background:#f8fafc; border-left:4px solid #ec4899; border-radius:8px; padding:16px; margin-top:12px;">
            ${safeMessage}
          </div>
        </div>
      </div>
    `;

    const textBody = `New Contact Form Submission

From: ${visitorName} (${visitorEmail})
Subject: ${visitorSubject}
Date: ${submissionDate}

Message:
${visitorMessage}`;

    const { data, error } = await resend.emails.send({
      from: formattedFrom,
      to: [toEmail],
      replyTo: `${visitorName} <${visitorEmail}>`,
      subject: `[Portfolio] ${visitorSubject}`,
      html: htmlBody,
      text: textBody,
    });

    if (error) {
      console.error("Resend API Response Error:", error);
      let userFacingError = error.message || "Failed to deliver email via Resend API.";
      if (error.message?.includes("can only send to your own email address")) {
        userFacingError =
          "Resend Sandbox Restriction: onboarding@resend.dev can only deliver to the email registered on your Resend account. Verify a domain on Resend to send to other addresses.";
      }
      return res.status(400).json({ success: false, message: userFacingError, resendErrorName: error.name });
    }

    console.log(`Email successfully dispatched via Resend. Message ID: ${data?.id}`);
    return res.status(200).json({ success: true, message: "Your message has been sent successfully." });
  } catch (err: any) {
    console.error("Server error processing contact submission:", err);
    return res.status(500).json({
      success: false,
      message: err?.message || "An unexpected server error occurred while sending your email.",
    });
  }
}