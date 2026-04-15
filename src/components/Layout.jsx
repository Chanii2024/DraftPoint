import React from 'react';
import Sidebar from './Sidebar';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

export default function Layout({ children }) {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="relative min-h-screen">
            <Sidebar />

            {/* Theme Toggle - Top Right */}
            <motion.button
                onClick={toggleTheme}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="fixed top-4 right-4 z-50 p-3 rounded-full bg-[var(--glass-bg-start)] backdrop-blur-md border border-[var(--glass-border)] text-secondary hover:text-primary hover:bg-[var(--hover-bg)] transition-colors shadow-2xl"
                aria-label="Toggle Theme"
            >
                {theme === 'dark' ? <Sun size={20} strokeWidth={1.5} /> : <Moon size={20} strokeWidth={1.5} />}
            </motion.button>

            <main className="md:pl-32 min-h-screen w-full pt-4 md:pt-0">
                {children}
            </main>
        </div>
    );
}
