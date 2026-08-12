import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config({ override: true });
dotenv.config({ path: ".env.example", override: false });

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Enable JSON body parsing
  app.use(express.json());

  // API Health Check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "portfolio-backend" });
  });

  // Contact Form Endpoint using Resend API
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body || {};

      // 1. Validation
      if (!name || typeof name !== "string" || !name.trim()) {
        return res.status(400).json({
          success: false,
          message: "Please enter your name."
        });
      }

      if (!email || typeof email !== "string" || !email.trim()) {
        return res.status(400).json({
          success: false,
          message: "Please enter your email address."
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid email address."
        });
      }

      if (!message || typeof message !== "string" || !message.trim()) {
        return res.status(400).json({
          success: false,
          message: "Please enter your message."
        });
      }

      // Input length limits for security
      if (name.trim().length > 100 || email.trim().length > 100) {
        return res.status(400).json({
          success: false,
          message: "Name or email is too long."
        });
      }

      if (message.trim().length > 5000) {
        return res.status(400).json({
          success: false,
          message: "Message exceeds the maximum limit of 5000 characters."
        });
      }

      // 2. Environment Variables & Credentials
      const apiKey = process.env.RESEND_API_KEY?.trim();
      const fromEmail = process.env.FROM_EMAIL?.trim() || "onboarding@resend.dev";
      const toEmail = process.env.TO_EMAIL?.trim() || "tanulohana51@gmail.com";
      const visitorName = name.trim();
      const visitorEmail = email.trim();
      const visitorSubject = (subject && typeof subject === "string" && subject.trim()) ? subject.trim() : "Portfolio Contact Form Inquiry";
      const visitorMessage = message.trim();

      // Formatted Date & Time
      const now = new Date();
      const submissionDate = now.toLocaleString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short"
      });

      if (!apiKey) {
        console.warn("⚠️ RESEND_API_KEY is not configured on the server. Submission logged locally.");
        console.log("📬 Contact Form Submission Details:", {
          name: visitorName,
          email: visitorEmail,
          subject: visitorSubject,
          message: visitorMessage,
          date: submissionDate,
        });

        return res.status(200).json({
          success: true,
          simulated: true,
          message:
            "Your message has been received! (Note: RESEND_API_KEY is unconfigured on the server, so your submission was logged to server console).",
        });
      }

      // 3. Initialize Resend SDK
      const resend = new Resend(apiKey);

      // Helper for escaping HTML strings
      const escapeHtml = (str: string) =>
        str
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");

      const safeName = escapeHtml(visitorName);
      const safeEmail = escapeHtml(visitorEmail);
      const safeSubject = escapeHtml(visitorSubject);
      const safeMessage = escapeHtml(visitorMessage);

      // Format sender string appropriately for email clients
      const formattedFrom = fromEmail.includes("<")
        ? fromEmail
        : `Tanisha Portfolio <${fromEmail}>`;

      // Email Body Formats
      const htmlBody = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>New Contact Form Submission</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #0f172a;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
              
              <!-- Header -->
              <div style="background-color: #000000; padding: 24px 32px; border-bottom: 3px solid #ec4899;">
                <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.5px;">
                  New Portfolio Contact Submission
                </h1>
                <p style="color: #94a3b8; margin: 6px 0 0 0; font-size: 13px;">
                  Direct Inquiry from ${safeName}
                </p>
              </div>

              <!-- Content -->
              <div style="padding: 32px;">
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                  <tr>
                    <td style="padding: 10px 0; font-weight: 600; font-size: 14px; color: #64748b; width: 120px; border-bottom: 1px solid #f1f5f9;">
                      Name:
                    </td>
                    <td style="padding: 10px 0; font-size: 15px; color: #0f172a; font-weight: 600; border-bottom: 1px solid #f1f5f9;">
                      ${safeName}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; font-weight: 600; font-size: 14px; color: #64748b; border-bottom: 1px solid #f1f5f9;">
                      Email:
                    </td>
                    <td style="padding: 10px 0; font-size: 15px; border-bottom: 1px solid #f1f5f9;">
                      <a href="mailto:${safeEmail}" style="color: #ec4899; text-decoration: none; font-weight: 600;">
                        ${safeEmail}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; font-weight: 600; font-size: 14px; color: #64748b; border-bottom: 1px solid #f1f5f9;">
                      Subject:
                    </td>
                    <td style="padding: 10px 0; font-size: 15px; color: #0f172a; border-bottom: 1px solid #f1f5f9;">
                      ${safeSubject}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; font-weight: 600; font-size: 14px; color: #64748b;">
                      Date:
                    </td>
                    <td style="padding: 10px 0; font-size: 13px; color: #64748b;">
                      ${submissionDate}
                    </td>
                  </tr>
                </table>

                <!-- Message Box -->
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #ec4899; border-radius: 8px; padding: 20px;">
                  <h3 style="margin: 0 0 12px 0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b;">
                    Message:
                  </h3>
                  <div style="font-size: 15px; line-height: 1.6; color: #334155; white-space: pre-wrap; word-break: break-word;">${safeMessage}</div>
                </div>
              </div>

              <!-- Footer -->
              <div style="background-color: #f8fafc; padding: 16px 32px; border-top: 1px solid #e2e8f0; text-align: center;">
                <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                  When you click <strong>Reply</strong> in your email client, your response will be sent directly to <strong>${safeEmail}</strong>.
                </p>
              </div>

            </div>
          </body>
        </html>
      `;

      const textBody = `
New Contact Form Submission

From: ${visitorName} (${visitorEmail})
Subject: ${visitorSubject}
Date: ${submissionDate}

Message:
${visitorMessage}
      `.trim();

      // 4. Send email through Resend API
      const emailSubject = `[Portfolio] ${visitorSubject}`;

      try {
        const { data, error } = await resend.emails.send({
          from: formattedFrom,
          to: [toEmail],
          replyTo: `${visitorName} <${visitorEmail}>`,
          subject: emailSubject,
          html: htmlBody,
          text: textBody,
        });

        if (error) {
          console.error("Resend API Response Error:", error);

          // Handle invalid API key or validation errors smoothly
          const isApiKeyError =
            error.name === "validation_error" ||
            error.message?.toLowerCase().includes("api key is invalid") ||
            error.message?.toLowerCase().includes("invalid api key") ||
            error.message?.toLowerCase().includes("unauthorized");

          if (isApiKeyError) {
            console.warn(
              "⚠️ RESEND_API_KEY is invalid or using a placeholder. Submission recorded locally in server logs."
            );
            console.log("📬 Contact Form Submission Details:", {
              name: visitorName,
              email: visitorEmail,
              subject: visitorSubject,
              message: visitorMessage,
              date: submissionDate,
            });

            return res.status(200).json({
              success: true,
              simulated: true,
              message:
                "Your message has been received! (Note: Server received and logged your message. To receive live emails directly in your inbox, configure a valid RESEND_API_KEY in environment variables).",
            });
          }

          let userFacingError = error.message || "Failed to deliver email via Resend API.";

          if (error.message?.includes("can only send to your own email address")) {
            userFacingError =
              "Resend Sandbox Restriction: Free testing keys using onboarding@resend.dev can only deliver emails to the address registered on your Resend account. To send to other emails, verify your domain on Resend.";
          }

          return res.status(400).json({
            success: false,
            message: userFacingError,
            resendErrorName: error.name,
          });
        }

        console.log(`Email successfully dispatched via Resend. Message ID: ${data?.id}`);
        return res.status(200).json({
          success: true,
          message: "Your message has been sent successfully.",
        });
      } catch (sdkErr: any) {
        console.warn("SDK Exception calling Resend API:", sdkErr);
        console.log("📬 Contact Form Submission Details (Fallback Logged):", {
          name: visitorName,
          email: visitorEmail,
          subject: visitorSubject,
          message: visitorMessage,
          date: submissionDate,
        });

        return res.status(200).json({
          success: true,
          simulated: true,
          message:
            "Your message has been received! (Note: Server received and logged your message. To receive live emails directly in your inbox, configure a valid RESEND_API_KEY in environment variables).",
        });
      }
    } catch (err: any) {
      console.error("Server error processing contact submission:", err);
      return res.status(500).json({
        success: false,
        message: err?.message || "An unexpected server error occurred while sending your email."
      });
    }
  });

  // Serve static assets or Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
