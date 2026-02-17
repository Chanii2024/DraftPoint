import React from 'react';
import { Home, Briefcase, Users, Mail } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export default function Sidebar() {
    const navItems = [
        { icon: Home, label: 'Home', href: '#' }, // href='#' for top of page
        { icon: Briefcase, label: 'Portfolio', href: '#portfolio' },
        { icon: Users, label: 'Collaborate', href: '#collaborate' },
        { icon: Mail, label: 'Contact', href: '#contact' }, // Placeholder, maybe link to footnote or email
    ];

    return (
        <motion.aside
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="fixed z-50 left-1/2 -translate-x-1/2 bottom-6 md:left-6 md:top-1/2 md:-translate-y-1/2 md:bottom-auto md:translate-x-0"
        >
            <nav className="glass-panel rounded-full px-6 py-3 md:py-8 md:px-4 flex flex-row md:flex-col items-center gap-6 md:gap-8 shadow-2xl">
                {navItems.map((item, index) => (
                    <motion.a
                        key={index}
                        href={item.href}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={clsx(
                            "p-3 rounded-full transition-colors duration-300 group relative text-slate-400 hover:text-white hover:bg-white/5"
                        )}
                        aria-label={item.label}
                    >
                        <item.icon size={24} strokeWidth={1.5} />

                        {/* Tooltip - Desktop Only */}
                        <span className="hidden md:block absolute left-full ml-6 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-900/90 backdrop-blur-md text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap border border-white/10 shadow-xl translate-x-[-10px] group-hover:translate-x-0">
                            {item.label}
                        </span>
                    </motion.a>
                ))}
            </nav>
        </motion.aside>
    );
}
