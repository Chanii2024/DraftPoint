import React from 'react';
import { Github, Linkedin, Facebook } from 'lucide-react';
import { motion } from 'framer-motion';

const SocialLink = ({ href, icon: Icon, label, customIcon, delay }) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
        whileTap={{ scale: 0.95 }}
        className="p-3 bg-white/5 border border-white/10 rounded-full transition-colors duration-300 text-slate-300 hover:text-white group"
        aria-label={label}
    >
        {customIcon ? customIcon : <Icon size={20} />}
    </motion.a>
);

export default function Hero() {
    return (
        <section className="min-h-[60vh] flex flex-col justify-center items-start pt-20 pb-12">
            <div className="space-y-1 overflow-hidden">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-slate-400 text-lg font-medium tracking-wide uppercase ml-1"
                >
                    The Developer Portfolio of
                </motion.h2>
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="text-7xl md:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-500"
                >
                    DraftPoint
                </motion.h1>
            </div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-8 text-xl text-slate-400 max-w-2xl leading-relaxed"
            >
                Building digital experiences with precision and style.
                Specializing in modern web technologies and creating intuitive,
                performance-driven applications.
            </motion.p>

            <div className="mt-10 flex gap-4">
                <SocialLink
                    href="https://github.com"
                    icon={Github}
                    label="GitHub"
                    delay={0.8}
                />
                <SocialLink
                    href="https://linkedin.com"
                    icon={Linkedin}
                    label="LinkedIn"
                    delay={0.9}
                />
                <SocialLink
                    href="https://facebook.com"
                    icon={Facebook}
                    label="Facebook"
                    delay={1.0}
                />
                <SocialLink
                    href="https://whatsapp.com"
                    label="WhatsApp"
                    delay={1.1}
                    customIcon={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                        </svg>
                    }
                />
            </div>
        </section>
    );
}
