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
        <section id="collaborate" className="py-20 min-h-[50vh] flex flex-col justify-center">
            <div className="max-w-4xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl font-bold text-white mb-2">Send Your Requirements</h2>
                    <p className="text-slate-400 mb-8">
                        Tell us what you need. Type your requirement and press <span className="text-white font-semibold">Enter</span> to add it.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="glass-panel p-8 rounded-3xl border border-white/10 relative"
                >
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    <div className="space-y-6 relative z-10">
                        <div>
                            <label htmlFor="requirements" className="block text-sm font-medium text-slate-300 mb-2">
                                Project Specifications
                            </label>

                            {/* Quick Add Chips */}
                            <div className="flex flex-wrap gap-2 mb-3">
                                {['Website', 'Mobile App', 'Custom Tool', 'UI/UX Design'].map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => !tags.includes(type) && setTags([...tags, type])}
                                        disabled={tags.includes(type)}
                                        className={`text-xs px-3 py-1.5 rounded-full border transition-all ${tags.includes(type)
                                            ? 'bg-indigo-500/20 border-indigo-500/30 text-indigo-300 cursor-default'
                                            : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white cursor-pointer'
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
                                    placeholder="Type other requirements and press Enter..."
                                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                    <Plus size={20} />
                                </div>
                            </div>
                        </div>

                        {/* Tags Display */}
                        <div className="flex flex-wrap gap-3 min-h-[40px]">
                            {tags.length === 0 && (
                                <span className="text-slate-600 text-sm italic py-2">Added requirements will appear here...</span>
                            )}
                            {tags.map((tag, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    layout
                                    className="flex items-center gap-2 bg-indigo-500/20 border border-indigo-500/30 text-indigo-200 px-4 py-2 rounded-lg group"
                                >
                                    <span>{tag}</span>
                                    <button
                                        onClick={() => removeTag(index)}
                                        disabled={status === 'sending'}
                                        className="text-indigo-300 hover:text-white transition-colors disabled:opacity-50"
                                    >
                                        <X size={16} />
                                    </button>
                                </motion.div>
                            ))}
                        </div>

                        <div className="pt-4 flex items-center justify-between">
                            {/* Status Messages */}
                            <div className="flex-1">
                                {status === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex items-center gap-2 text-green-400"
                                    >
                                        <CheckCircle size={18} />
                                        <span>Request Sent Successfully! check your email</span>
                                    </motion.div>
                                )}
                                {status === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex items-center gap-2 text-red-400"
                                    >
                                        <AlertCircle size={18} />
                                        <span>Failed to send. Please check your config.</span>
                                    </motion.div>
                                )}
                            </div>

                            <button
                                onClick={handleInitialSendClick}
                                disabled={tags.length === 0 || status === 'sending'}
                                className="flex items-center gap-2 bg-white text-slate-900 px-8 py-3 rounded-full font-semibold hover:bg-indigo-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
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
