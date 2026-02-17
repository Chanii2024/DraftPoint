import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Check } from 'lucide-react';

const Toggle = ({ label, price, isOn, onToggle }) => (
    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer" onClick={onToggle}>
        <div className="flex flex-col">
            <span className="font-medium text-slate-200">{label}</span>
            <span className="text-xs text-slate-500">+${price}</span>
        </div>
        <div className={`w-12 h-7 flex items-center rounded-full p-1 duration-300 ease-in-out ${isOn ? 'bg-indigo-500' : 'bg-slate-700'}`}>
            <motion.div
                layout
                className="bg-white w-5 h-5 rounded-full shadow-md"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
        </div>
    </div>
);

export default function ProjectEstimator() {
    const [features, setFeatures] = useState({
        uiDesign: false,
        database: false,
        mobile: false,
        admin: false
    });

    const prices = {
        base: 500,
        uiDesign: 400,
        database: 500,
        mobile: 300,
        admin: 600
    };

    const toggleFeature = (key) => {
        setFeatures(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const calculateTotal = () => {
        let total = prices.base;
        if (features.uiDesign) total += prices.uiDesign;
        if (features.database) total += prices.database;
        if (features.mobile) total += prices.mobile;
        if (features.admin) total += prices.admin;
        return total;
    };

    const total = calculateTotal();
    const highRange = Math.round(total * 1.3);

    return (
        <section className="py-20 flex justify-center">
            <div className="max-w-4xl w-full mx-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden"
                >
                    {/* Background Glow */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                        {/* Left: Input */}
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                                    <Calculator size={24} />
                                </div>
                                <h2 className="text-2xl font-bold text-white">Project Estimator</h2>
                            </div>
                            <p className="text-slate-400 mb-8 leading-relaxed">
                                Select the features you need to get a rough estimate of your project cost.
                            </p>

                            <div className="space-y-3">
                                <Toggle
                                    label="UI/UX Design"
                                    price={prices.uiDesign}
                                    isOn={features.uiDesign}
                                    onToggle={() => toggleFeature('uiDesign')}
                                />
                                <Toggle
                                    label="Database Integration"
                                    price={prices.database}
                                    isOn={features.database}
                                    onToggle={() => toggleFeature('database')}
                                />
                                <Toggle
                                    label="Mobile Responsiveness"
                                    price={prices.mobile}
                                    isOn={features.mobile}
                                    onToggle={() => toggleFeature('mobile')}
                                />
                                <Toggle
                                    label="Admin Dashboard"
                                    price={prices.admin}
                                    isOn={features.admin}
                                    onToggle={() => toggleFeature('admin')}
                                />
                            </div>
                        </div>

                        {/* Right: Output */}
                        <div className="flex flex-col justify-center">
                            <div className="bg-slate-900/50 p-8 rounded-2xl border border-white/5 text-center relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                <span className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2 block">Estimated Range</span>
                                <div className="text-4xl md:text-5xl font-bold text-white mb-2 flex justify-center items-center gap-2">
                                    <motion.span
                                        key={total}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        ${total}
                                    </motion.span>
                                    <span className="text-slate-600 font-light">-</span>
                                    <motion.span
                                        key={highRange}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        ${highRange}
                                    </motion.span>
                                </div>

                                <div className="mt-8 space-y-2 text-left">
                                    <p className="text-indigo-300 text-sm font-medium flex items-center gap-2">
                                        <Check size={14} /> Includes Core Development
                                    </p>
                                    <p className="text-indigo-300 text-sm font-medium flex items-center gap-2">
                                        <Check size={14} /> Basic SEO Setup
                                    </p>
                                    <p className="text-indigo-300 text-sm font-medium flex items-center gap-2">
                                        <Check size={14} /> 30 Days of Support
                                    </p>
                                </div>
                            </div>
                            <p className="text-center text-slate-500 text-xs mt-4">
                                *Final price varies based on specific requirements and scope.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
