import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Add CORS headers for browser requests
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { tags = [], contactData = {}, estimatorData = null } = req.body;

  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
    console.error('ERROR: Missing environment variables GMAIL_USER or GMAIL_PASS');
    return res.status(500).json({ error: 'Configuration Error', details: 'Email credentials not configured on server.' });
  }

  // --- Format the Email Body ---
  let messageBody = `New Project Request from ${contactData.name}\n\n`;
  messageBody += `Contact Details:\n`;
  messageBody += `- Email: ${contactData.email}\n`;
  messageBody += `- Phone: ${contactData.phone || 'Not provided'}\n\n`;

  messageBody += `Requirements:\n${tags.map(tag => `- ${tag}`).join('\n')}\n`;

  if (estimatorData) {
    const { selectedLevels, total, packages } = estimatorData;
    const hasSelections = Object.values(selectedLevels).some(val => val !== 'none');

    if (hasSelections) {
      messageBody += `\n\n--- ESTIMATED SCOPE ---\n`;
      messageBody += `Estimated Total: $${total}\n\nSelected Packages:\n`;

      Object.entries(selectedLevels).forEach(([key, levelId]) => {
        if (levelId !== 'none' && packages[key]) {
          const pkgData = packages[key];
          const levelData = pkgData.levels.find(l => l.id === levelId);
          messageBody += `- ${pkgData.title}: ${levelData.name} ($${levelData.price})\n`;
        }
      });

      if (estimatorData.maintenanceMonths > 0) {
        messageBody += `- Maintenance: ${estimatorData.maintenanceMonths} Months ($${estimatorData.maintenanceMonths * (packages.maintenancePerMonth || 0)})\n`;
      }
    }
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // 1. Admin Email (Beautiful HTML)
    const adminMailOptions = {
      from: `"DraftPoint System" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: contactData.email,
      subject: `🚀 New Project Request: ${contactData.name}`,
      html: `
<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: Arial, sans-serif; background-color: #f4f4f5; padding: 20px; }
  .container { max-width: 600px; margin: 0 auto; background: #fff; padding: 30px; border-radius: 8px; border: 1px solid #e4e4e7; }
  .header { font-size: 20px; font-weight: bold; color: #18181b; margin-bottom: 20px; border-bottom: 2px solid #6366f1; padding-bottom: 10px; }
  .field { margin-bottom: 15px; }
  .label { font-size: 12px; color: #71717a; text-transform: uppercase; font-weight: bold; letter-spacing: 0.05em; }
  .value { font-size: 16px; color: #09090b; margin-top: 5px; }
  .message-box { background: #f4f4f5; padding: 15px; border-radius: 6px; font-family: monospace; white-space: pre-wrap; font-size: 14px; color: #333; border: 1px solid #e4e4e7; }
</style>
</head>
<body>
<div class="container">
  <div class="header">New Project Request 🚀</div>
  
  <div class="field">
    <div class="label">Client Name</div>
    <div class="value">${contactData.name}</div>
  </div>
  
  <div class="field">
    <div class="label">Email</div>
    <div class="value"><a href="mailto:${contactData.email}" style="color: #6366f1; text-decoration: none;">${contactData.email}</a></div>
  </div>

  <div class="field">
    <div class="label">Phone</div>
    <div class="value">${contactData.phone || 'Not provided'}</div>
  </div>

  <div class="field">
    <div class="label">Project Requirements & Estimate</div>
    <div class="value message-box">${messageBody}</div>
  </div>
</div>
</body>
</html>
            `
    };

    // 2. Client Receipt (Beautiful HTML)
    const clientMailOptions = {
      from: `"DraftPoint" <${process.env.GMAIL_USER}>`,
      to: contactData.email,
      subject: `We received your request, ${contactData.name}!`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9fafb; margin: 0; padding: 40px 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 48px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
    .logo { font-size: 24px; font-weight: 800; color: #111827; margin-bottom: 32px; letter-spacing: -0.02em; }
    h1 { font-size: 24px; font-weight: 600; color: #111827; margin: 0 0 16px; }
    p { font-size: 16px; color: #4b5563; line-height: 1.6; margin: 0 0 24px; }
    .divider { height: 1px; background: #f3f4f6; margin: 32px 0; }
    .summary-box { background: #f9fafb; padding: 20px; border-radius: 8px; font-size: 14px; color: #374151; white-space: pre-wrap; margin-bottom: 24px; border: 1px solid #e5e7eb; }
    .cta { display: inline-block; background: #111827; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: 600; transition: background 0.2s; }
    .cta:hover { background: #374151; }
    .footer { font-size: 13px; color: #9ca3af; margin-top: 32px; border-top: 1px solid #f3f4f6; padding-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">DRAFTPOINT.</div>
    <h1>Thank you, ${contactData.name}.</h1>
    <p>
      I have successfully received your project requirements. I appreciate the opportunity to review your proposal and will analyze the details provided.
    </p>

    <p style="font-weight: 600; color: #111827; margin-bottom: 8px;">Your Request Summary:</p>
    <div class="summary-box">${messageBody}</div>

    <p>
      You can expect a response regarding the next steps within the next 24 business hours.
    </p>
    <div class="divider"></div>
    <a href="https://yourportfolio.com" class="cta">Review Portfolio</a>
    <div class="footer">
      Best regards,<br>
      DraftPoint Development
    </div>
  </div>
</body>
</html>
            `
    };

    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(clientMailOptions)
    ]);

    return res.status(200).json({ success: true, message: 'Emails sent successfully' });

  } catch (error) {
    console.error('Nodemailer Error:', error);
    return res.status(500).json({ error: 'Send Error', message: error.message });
  }
}
