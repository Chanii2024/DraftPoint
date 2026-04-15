import React, { useState } from 'react';
import { Send, X, Plus, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { sendProjectRequest } from '../services/emailService';
import ContactModal from './ContactModal';

export default function ProjectRequest({ estimatorData }) {
    const [inputValue, setInputValue] = useState('');
    const [tags, setTags] = useState([]);
    const [status, setStatus] = useState('idle'); // idle, sending, success, error
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            e.preventDefault();
            setTags([...tags, inputValue.trim()]);
            setInputValue('');
        }
    };

    const removeTag = (indexToRemove) => {
        setTags(tags.filter((_, index) => index !== indexToRemove));
    };

    const handleInitialSendClick = () => {
        if (tags.length === 0) return;
        setIsModalOpen(true);
    };

    const handleFinalSubmit = async (contactData) => {
        setStatus('sending');

        try {
            await sendProjectRequest(tags, contactData, estimatorData);

            setStatus('success');
            setTags([]);
            setIsModalOpen(false);

            // Reset status after 5 seconds
            setTimeout(() => setStatus('idle'), 5000);

        } catch (error) {
            console.error('EmailJS Error:', error);
            setStatus('error');
            setIsModalOpen(false); // Close modal on error to show error message on main screen
        }
    };

    return (
        <section id="collaborate" className="pt-20 pb-32 md:pb-20 min-h-[50vh] flex flex-col justify-center">
            <div className="max-w-4xl mx-auto w-full px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-2">Send Your Requirements</h2>
                    <p className="text-secondary mb-8 text-sm md:text-base">
                        Tell us what you need. Type your requirement and press <span className="text-primary font-semibold">Enter</span> to add it.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="glass-panel p-5 sm:p-8 rounded-3xl border border-[var(--glass-border)] relative shadow-2xl bg-[var(--bg-surface)]"
                >
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    <div className="space-y-6 relative z-10">
                        <div>
                            <label htmlFor="requirements" className="block text-sm font-medium text-secondary mb-2">
                                Project Specifications
                            </label>

                            {/* Quick Add Chips */}
                            <div className="flex flex-wrap gap-2 mb-3">
                                {['Website', 'Mobile App', 'Custom Tool', 'UI/UX Design'].map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => !tags.includes(type) && setTags([...tags, type])}
                                        disabled={tags.includes(type)}
                                        className={`text-[10px] sm:text-xs px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border transition-all font-bold ${tags.includes(type)
                                            ? 'bg-accent/20 border-accent/30 text-accent cursor-default'
                                            : 'bg-[var(--bg-surface)] border-[var(--glass-border)] text-secondary hover:bg-[var(--hover-bg)] hover:text-accent cursor-pointer hover:border-accent/30'
                                            }`}
                                    >
                                        + {type}
                                    </button>
                                ))}
                            </div>

                            <div className="relative">
                                <input
                                    type="text"
                                    id="requirements"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    disabled={status === 'sending'}
                                    placeholder="Type other requirements..."
                                    className="w-full bg-[var(--bg-primary)] border border-[var(--glass-border)] rounded-xl px-4 py-3.5 sm:py-4 text-sm sm:text-base text-primary placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-inner"
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-secondary">
                                    <Plus size={18} />
                                </div>
                            </div>
                        </div>

                        {/* Tags Display */}
                        <div className="flex flex-wrap gap-2 sm:gap-3 min-h-[40px]">
                            {tags.length === 0 && (
                                <span className="text-secondary text-sm italic py-2">Added requirements will appear here...</span>
                            )}
                            {tags.map((tag, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    layout
                                    className="flex items-center gap-1.5 sm:gap-2 bg-accent/10 border border-accent/20 text-accent px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg group font-medium"
                                >
                                    <span className="text-xs sm:text-sm">{tag}</span>
                                    <button
                                        onClick={() => removeTag(index)}
                                        disabled={status === 'sending'}
                                        className="text-indigo-300 hover:text-primary transition-colors disabled:opacity-50"
                                    >
                                        <X size={14} className="sm:w-4 sm:h-4" />
                                    </button>
                                </motion.div>
                            ))}
                        </div>

                        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6">
                            {/* Status Messages */}
                            <div className="flex-1 w-full sm:w-auto">
                                {status === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex items-center gap-2 text-green-400"
                                    >
                                        <CheckCircle size={18} />
                                        <span className="text-sm">Request Sent Successfully! Check your email</span>
                                    </motion.div>
                                )}
                                {status === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex items-center gap-2 text-red-400"
                                    >
                                        <AlertCircle size={18} />
                                        <span className="text-sm">Failed to send. Please check your config.</span>
                                    </motion.div>
                                )}
                            </div>

                            <button
                                onClick={handleInitialSendClick}
                                disabled={tags.length === 0 || status === 'sending'}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-accent text-white px-8 py-4 rounded-full font-bold hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 shadow-xl shadow-accent/20"
                            >
                                <span>Submit Requirements</span>
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Contact Modal */}
                <ContactModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleFinalSubmit}
                    isSending={status === 'sending'}
                />

            </div>
        </section>
    );
}
