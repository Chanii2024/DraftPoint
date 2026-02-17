import emailjs from '@emailjs/browser';

/**
 * Sends a project request email using EmailJS.
 * @param {string[]} tags - List of project requirements.
 * @param {object} contactData - Client contact details { name, email, phone }.
 * @returns {Promise} - Resolves on success, rejects on error.
 */
export const sendProjectRequest = async (tags, contactData, estimatorData) => {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const devTemplateId = import.meta.env.VITE_EMAILJS_DEV_TEMPLATE_ID;
    const clientTemplateId = import.meta.env.VITE_EMAILJS_CLIENT_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !devTemplateId || !clientTemplateId || !publicKey) {
        console.error('EmailJS environment variables are missing.');
        throw new Error('Configuration error: Missing EmailJS keys.');
    }

    // Format the message
    let messageBody = `Requirements:\n${tags.map(tag => `- ${tag}`).join('\n')}\n`;

    // Add Estimator Details if available
    if (estimatorData) {
        const { selectedLevels, total, packages } = estimatorData;
        const hasSelections = Object.values(selectedLevels).some(val => val !== 'none');

        if (hasSelections) {
            messageBody += `\n\n--- ESTIMATED SCOPE ---\n`;
            messageBody += `Estimated Total: $${total}\n\nSelected Packages:\n`;

            Object.entries(selectedLevels).forEach(([key, levelId]) => {
                if (levelId !== 'none' && packages[key]) { // check if valid package
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

    const templateParams = {
        message: messageBody,
        client_name: contactData.name,
        client_email: contactData.email,
        client_phone: contactData.phone || 'Not provided',
        reply_to: contactData.email
    };

    try {
        // 1. Send Notification to YOU (Developer)
        const devResponse = await emailjs.send(serviceId, devTemplateId, templateParams, publicKey);
        console.log('Dev notification sent');

        // 2. Send Thank You to CLIENT
        const clientResponse = await emailjs.send(serviceId, clientTemplateId, templateParams, publicKey);
        console.log('Client thank you sent');

        return { devResponse, clientResponse };
    } catch (error) {
        console.error('EmailJS Dual Send Error:', error);
        throw error;
    }
};
