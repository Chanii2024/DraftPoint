import React from 'react';
import { motion } from 'framer-motion';

export default function WhyChooseUs() {
    return (
        <section className="py-24 relative">
            {/* Subtle background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                >
                    <span className="text-indigo-400 font-bold tracking-[0.2em] uppercase text-sm block mb-4">
                        Why Choose DraftPoint
                    </span>

                    <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight">
                        We Answer Simply.
                    </h2>

                    <div className="h-1 w-24 bg-indigo-500 mx-auto rounded-full my-8 opacity-50"></div>

                    <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
                        Check the work we've done.
                        <br className="hidden md:block" />
                        <span className="text-slate-400 mt-4 block">
                            If you're interested in making a website with us,
                            <br />
                            <strong className="text-white font-medium">make your order</strong> or <strong className="text-white font-medium">send your requirements</strong>.
                        </span>
                    </p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="pt-8"
                    >
                        <p className="text-sm text-slate-500 uppercase tracking-widest font-medium">
                            Pure Craftsmanship &bull; No Gimmicks
                        </p>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}
