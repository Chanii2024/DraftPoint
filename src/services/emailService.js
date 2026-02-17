import emailjs from '@emailjs/browser';

/**
 * Sends a project request email using EmailJS.
 * @param {string[]} tags - List of project requirements.
 * @param {object} contactData - Client contact details { name, email, phone }.
 * @returns {Promise} - Resolves on success, rejects on error.
 */
export const sendProjectRequest = async (tags, contactData) => {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
        console.error('EmailJS environment variables are missing.');
        throw new Error('Configuration error: Missing EmailJS keys.');
    }

    // Format the tags into a checklist string
    const formattedMessage = tags.map(tag => `- ${tag}`).join('\n');

    const templateParams = {
        message: formattedMessage,
        client_name: contactData.name,
        client_email: contactData.email,
        client_phone: contactData.phone || 'Not provided',
        to_name: 'Developer',
        reply_to: contactData.email
    };

    try {
        const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
        return response;
    } catch (error) {
        console.error('EmailJS Send Error:', error);
        throw error;
    }
};
