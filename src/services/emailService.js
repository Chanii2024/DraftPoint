

/**
 * Sends a project request email using EmailJS.
 * @param {string[]} tags - List of project requirements.
 * @param {object} contactData - Client contact details { name, email, phone }.
 * @returns {Promise} - Resolves on success, rejects on error.
 */
export const sendProjectRequest = async (tags, contactData, estimatorData) => {
    try {
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tags,
                contactData,
                estimatorData
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to send request');
        }

        return await response.json();
    } catch (error) {
        console.error('API Email Error:', error);
        throw error;
    }
};
