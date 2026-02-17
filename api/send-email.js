
const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { tags, contactData, estimatorData } = req.body;

    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
        return res.status(500).json({ message: 'Server configuration error: Missing email credentials.' });
    }

    // Configure Transporter
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
        },
    });

    // --- Format the Email Body (Same logic as before) ---
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
                messageBody += `- Maintenance: ${estimatorData.maintenanceMonths} Months ($${estimatorData.maintenanceMonths * packages.maintenancePerMonth})\n`;
            }
        }
    }

    try {
        // 1. Send Admin Notification (To Developer)
        const adminMailOptions = {
            from: `"DraftPoint System" <${process.env.GMAIL_USER}>`,
            to: process.env.GMAIL_USER, // Send to yourself
            replyTo: contactData.email,
            subject: `🚀 New Project Request: ${contactData.name}`,
            text: messageBody,
        };

        // 2. Send Client Receipt (To Client)
        const clientMailOptions = {
            from: `"DraftPoint" <${process.env.GMAIL_USER}>`,
            to: contactData.email,
            subject: `We received your request, ${contactData.name}!`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                    <h2 style="color: #4F46E5;">Thank you for contacting DraftPoint.</h2>
                    <p>We have successfully received your project requirements.</p>
                    <div style="background: #f4f4f5; padding: 15px; border-radius: 5px; margin: 20px 0; white-space: pre-wrap; font-family: monospace;">${messageBody}</div>
                    <p>We will review your details and get back to you shortly.</p>
                </div>
            `,
        };

        // Send both emails
        await Promise.all([
            transporter.sendMail(adminMailOptions),
            transporter.sendMail(clientMailOptions)
        ]);

        return res.status(200).json({ message: 'Emails sent successfully' });

    } catch (error) {
        console.error('Email Send Error:', error);
        return res.status(500).json({ message: 'Failed to send emails', error: error.message });
    }
}
