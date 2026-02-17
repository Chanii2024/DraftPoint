import emailjs from '@emailjs/browser';

/**
 * Sends a project request email using EmailJS.
 * @param {string[]} tags - List of project requirements.
 * @returns {Promise} - Resolves on success, rejects on error.
 */
export const sendProjectRequest = async (tags) => {
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
        // Add other params here if your template expects them (e.g., to_name, reply_to)
        to_name: 'Developer',
        reply_to: 'client@example.com' // You might want to collect user email too
    };

    try {
        const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
        return response;
    } catch (error) {
        console.error('EmailJS Send Error:', error);
        throw error;
    }
};
