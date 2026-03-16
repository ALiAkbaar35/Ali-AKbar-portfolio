import dotenv from "dotenv";
import express from "express";
import fs from "fs";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.use(express.json({ limit: "1mb" }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, "dist", "public");

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildMailTemplate({ name, email, subject, message }) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");
  const submittedAt = new Date().toLocaleString("en-US", { timeZone: "Asia/Karachi" });
  const replyLink = `mailto:${safeEmail}?subject=${encodeURIComponent(`Re: ${subject}`)}`;

  return `
    <div style="background:#f3f6fb;padding:28px 14px;font-family:Arial,'Segoe UI',sans-serif;color:#122033;">
      <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #dbe6f4;border-radius:14px;overflow:hidden;">
        <div style="padding:20px 24px;background:linear-gradient(90deg,#0f2f5a 0%,#125f9a 100%);">
          <p style="margin:0;color:#c5e7ff;font-size:12px;letter-spacing:.08em;text-transform:uppercase;">New Inquiry</p>
          <h2 style="margin:8px 0 0;font-size:23px;line-height:1.35;color:#ffffff;">New message from your portfolio contact form</h2>
        </div>

        <div style="padding:22px 24px;">
          <p style="margin:0 0 14px;font-size:15px;line-height:1.65;color:#32485f;">
            Hi Ali, you have received a new inquiry from your website. Details are below.
          </p>

          <div style="margin-bottom:14px;border:1px solid #e0eaf7;border-radius:10px;overflow:hidden;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
              <tr>
                <td style="width:140px;padding:12px 14px;background:#f7faff;color:#58718c;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;border-bottom:1px solid #e0eaf7;">From</td>
                <td style="padding:12px 14px;color:#0f2033;font-size:15px;border-bottom:1px solid #e0eaf7;">${safeName}</td>
              </tr>
              <tr>
                <td style="width:140px;padding:12px 14px;background:#f7faff;color:#58718c;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;border-bottom:1px solid #e0eaf7;">Email</td>
                <td style="padding:12px 14px;border-bottom:1px solid #e0eaf7;">
                  <a href="mailto:${safeEmail}" style="color:#1367b4;font-size:15px;text-decoration:none;">${safeEmail}</a>
                </td>
              </tr>
              <tr>
                <td style="width:140px;padding:12px 14px;background:#f7faff;color:#58718c;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;">Subject</td>
                <td style="padding:12px 14px;color:#0f2033;font-size:15px;">${safeSubject}</td>
              </tr>
            </table>
          </div>

          <div style="border:1px solid #d7e8fa;border-left:4px solid #1a73c9;border-radius:10px;padding:14px 14px 14px 12px;background:#f9fcff;">
            <p style="margin:0 0 8px;color:#58718c;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;">Inquiry Message</p>
            <p style="margin:0;color:#203549;font-size:15px;line-height:1.75;">${safeMessage}</p>
          </div>

          <div style="margin-top:18px;">
            <a href="${replyLink}" style="display:inline-block;padding:11px 16px;border-radius:8px;background:#1367b4;color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;">
              Reply to ${safeName}
            </a>
          </div>

          <p style="margin:16px 0 0;color:#6f8499;font-size:12px;line-height:1.6;">
            Sent automatically from your portfolio website contact form.
          </p>
        </div>

        <div style="padding:12px 24px;background:#f7faff;border-top:1px solid #dbe6f4;color:#6f8499;font-size:12px;">
          Received on ${escapeHtml(submittedAt)} (Asia/Karachi)
        </div>
      </div>
      <div style="max-width:680px;margin:8px auto 0;text-align:center;color:#7e92a7;font-size:11px;">
        Ali Akbar Inquiry Notification
      </div>
    </div>
  `;
}

function buildPlainTextTemplate({ name, email, subject, message }) {
  return [
    "New inquiry from your portfolio contact form",
    "",
    `From: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    "",
    "Message:",
    message,
    "",
    "Reply directly to this email to respond to the sender.",
  ].join("\n");
}

app.post("/api/contact", async (req, res) => {
  const name = (req.body?.name ?? "").trim();
  const email = (req.body?.email ?? "").trim();
  const subject = (req.body?.subject ?? "").trim();
  const message = (req.body?.message ?? "").trim();

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ ok: false, error: "All fields are required." });
  }

  const senderEmail = process.env.SENDER_EMAIL || process.env.sender_email;
  const senderAppPassword =
    process.env.SENDER_APP_PASSWORD || process.env.sender_app_password;
  const receiverEmail = process.env.RECEIVER_EMAIL || process.env.receiver_email;

  if (!senderEmail || !senderAppPassword || !receiverEmail) {
    return res.status(500).json({
      ok: false,
      error: "Server email configuration is incomplete.",
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: senderEmail,
        pass: senderAppPassword,
      },
    });

    await transporter.sendMail({
      from: `"Ali Akbar Portfolio" <${senderEmail}>`,
      to: receiverEmail,
      replyTo: email,
      subject: `New Contact: ${subject}`,
      text: buildPlainTextTemplate({ name, email, subject, message }),
      html: buildMailTemplate({ name, email, subject, message }),
    });

    console.log(
      `[contact] email sent to ${receiverEmail} from ${email} with subject "${subject}"`,
    );

    return res.json({ ok: true });
  } catch (error) {
    console.error("Contact email send failed:", error);
    return res.status(500).json({ ok: false, error: "Failed to send email." });
  }
});

if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distDir, "index.html"));
  });
}

const port = Number(process.env.PORT || 4173);
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});
