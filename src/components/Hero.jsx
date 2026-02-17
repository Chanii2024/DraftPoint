import React from 'react';
import { Github, Linkedin, Facebook, Instagram } from 'lucide-react';
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

const AvailabilityBadge = () => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md w-fit mb-6"
    >
        <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <span className="text-xs font-medium text-slate-300 tracking-wide">Available for Work</span>
    </motion.div>
);

const ProfileImage = () => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8"
    >
        <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-slate-500 to-slate-800 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <img
                src="/profile.png"
                alt="Profile"
                className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover border border-white/10"
            />
        </div>
    </motion.div>
);





export default function Hero() {
    return (
        <section id="home" className="relative min-h-[60vh] flex flex-col justify-center items-start pt-20 pb-12">

            {/* Background Floating Elements */}
            {/* FloatingTechStack removed */}

            <div className="relative z-10 space-y-1 max-w-7xl mx-auto w-full px-6">
                <ProfileImage />
                <AvailabilityBadge />

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
                    className="text-5xl md:text-7xl xl:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-500"
                >
                    DraftPoint
                </motion.h1>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto w-full px-6">
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
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4 relative z-10 max-w-7xl mx-auto w-full px-6">

                <SocialLink
                    href="https://github.com/Chanii2024"
                    icon={Github}
                    label="GitHub"
                    delay={0.9}
                />
                <SocialLink
                    href="https://www.linkedin.com/in/chaniru-weerasinghe-36aa2a326/"
                    icon={Linkedin}
                    label="LinkedIn"
                    delay={1.0}
                />
                <SocialLink
                    href="https://www.instagram.com/chaniruweerasinghe"
                    icon={Instagram}
                    label="Instagram"
                    delay={1.1}
                />
                <SocialLink
                    href="https://web.facebook.com/Chanii2003/"
                    icon={Facebook}
                    label="Facebook"
                    delay={1.15}
                />
                <SocialLink
                    href="https://whatsapp.com"
                    label="WhatsApp"
                    delay={1.2}
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
