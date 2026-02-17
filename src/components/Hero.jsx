import React from 'react';
import { Github, Linkedin, Facebook, DownloadCloud } from 'lucide-react';
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

const DownloadCVButton = ({ delay }) => (
    <motion.a
        href="https://firebasestorage.googleapis.com/v0/b/river-range-resort.firebasestorage.app/o/Chaniru%20Weerasinghe%20SE%20Intern%20CV.pdf?alt=media&token=4def5b88-8a2c-4dd8-b158-33e145498987"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-5 py-3 bg-white/10 border border-white/10 rounded-full text-white font-medium hover:bg-white/20 transition-all duration-300"
    >
        <DownloadCloud size={18} />
        <span>Download CV</span>
    </motion.a>
);

const FloatingTechStack = () => {
    const techs = [
        { name: "React", x: "80%", y: "20%", delay: 0 },
        { name: "Node.js", x: "70%", y: "60%", delay: 1 },
        { name: "Tailwind", x: "90%", y: "40%", delay: 2 },
        { name: "Framer", x: "60%", y: "30%", delay: 1.5 },
        { name: "MongoDB", x: "85%", y: "70%", delay: 2.5 },
    ];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {techs.map((tech, index) => (
                <motion.div
                    key={index}
                    className="absolute px-4 py-2 rounded-full bg-white/5 border border-white/5 backdrop-blur-sm text-slate-400 text-sm font-medium z-0"
                    style={{ left: tech.x, top: tech.y }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: 0.5,
                        scale: 1,
                        y: [0, -20, 0],
                        rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                        opacity: { duration: 1, delay: tech.delay },
                        scale: { duration: 1, delay: tech.delay },
                        y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: tech.delay },
                        rotate: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: tech.delay }
                    }}
                    whileHover={{ scale: 1.2, opacity: 0.8 }}
                >
                    {tech.name}
                </motion.div>
            ))}
        </div>
    );
};

export default function Hero() {
    return (
        <section className="relative min-h-[60vh] flex flex-col justify-center items-start pt-20 pb-12">

            {/* Background Floating Elements */}
            <FloatingTechStack />

            <div className="relative z-10 space-y-1">
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
                    className="text-7xl md:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-500"
                >
                    DraftPoint
                </motion.h1>
            </div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-8 text-xl text-slate-400 max-w-2xl leading-relaxed relative z-10"
            >
                Building digital experiences with precision and style.
                Specializing in modern web technologies and creating intuitive,
                performance-driven applications.
            </motion.p>

            <div className="mt-10 flex flex-wrap items-center gap-4 relative z-10">
                <DownloadCVButton delay={0.8} />

                <div className="h-8 w-[1px] bg-white/10 mx-2 hidden md:block"></div>

                <SocialLink
                    href="https://github.com"
                    icon={Github}
                    label="GitHub"
                    delay={0.9}
                />
                <SocialLink
                    href="https://linkedin.com"
                    icon={Linkedin}
                    label="LinkedIn"
                    delay={1.0}
                />
                <SocialLink
                    href="https://facebook.com"
                    icon={Facebook}
                    label="Facebook"
                    delay={1.1}
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
