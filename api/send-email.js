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

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // 1. Admin Email (Plain Text for Reliability)
    const adminMailOptions = {
      from: `"DraftPoint System" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: contactData.email,
      subject: `🚀 New Project: ${contactData.name}`,
      text: `
Name: ${contactData.name}
Email: ${contactData.email}
Phone: ${contactData.phone || 'N/A'}

Requirements:
${tags.map(t => `- ${t}`).join('\n')}

${estimatorData ? `Total Estimate: $${estimatorData.total}` : ''}
            `
    };

    // 2. Client Receipt
    const clientMailOptions = {
      from: `"DraftPoint" <${process.env.GMAIL_USER}>`,
      to: contactData.email,
      subject: 'Project Request Received',
      text: `Hi ${contactData.name},\n\nWe received your request and will review it soon.\n\nSummary:\n${tags.join(', ')}`
    };

    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(clientMailOptions)
    ]);

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Nodemailer Error:', error);
    return res.status(500).json({ error: 'Send Error', message: error.message });
  }
}
