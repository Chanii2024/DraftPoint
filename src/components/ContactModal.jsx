import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Phone, Loader2 } from 'lucide-react';

export default function ContactModal({ isOpen, onClose, onConfirm, isSending }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirm(formData);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/40 dark:bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed z-50 w-full max-w-md max-h-[90vh] overflow-y-auto bg-[var(--bg-surface)] border border-[var(--glass-border)] rounded-2xl shadow-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ring-1 ring-black/5 dark:ring-white/10"
                    >
                        <div className="p-6 relative">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-secondary hover:text-primary transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <h3 className="text-2xl font-bold text-primary mb-2">Final Step</h3>
                            <p className="text-secondary mb-6">
                                Where should I send the project proposal?
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-secondary mb-1">
                                        How should I address you?
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={18} />
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Your Name"
                                            className="w-full bg-[var(--bg-primary)] border border-[var(--glass-border)] rounded-lg pl-10 pr-4 py-3 text-primary placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all shadow-inner"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-secondary mb-1">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={18} />
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="you@example.com"
                                            className="w-full bg-[var(--bg-primary)] border border-[var(--glass-border)] rounded-lg pl-10 pr-4 py-3 text-primary placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all shadow-inner"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-secondary mb-1">
                                        WhatsApp / Phone (Optional)
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={18} />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+1 (555) 000-0000"
                                            className="w-full bg-[var(--bg-primary)] border border-[var(--glass-border)] rounded-lg pl-10 pr-4 py-3 text-primary placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all shadow-inner"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSending}
                                    className="w-full mt-6 bg-accent text-white font-bold py-3 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-accent/20"
                                >
                                    {isSending ? (
                                        <>
                                            <Loader2 className="animate-spin" size={20} />
                                            <span>Sending Request...</span>
                                        </>
                                    ) : (
                                        <span>Confirm & Send Request</span>
                                    )}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
