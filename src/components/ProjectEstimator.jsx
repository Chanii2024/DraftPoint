import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Check, Minus, Plus, ArrowLeft } from 'lucide-react';

const MaintenanceSelector = ({ months, onUpdate, pricePerMonth }) => (
    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all group">
        <div className="flex flex-col">
            <span className="font-semibold text-white group-hover:text-indigo-200 transition-colors">Growth Retainer</span>
            <span className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">${pricePerMonth}/mo</span>
        </div>
        <div className="flex items-center gap-4 bg-slate-900/50 rounded-lg p-1 border border-white/5">
            <button
                onClick={() => onUpdate(Math.max(0, months - 1))}
                className="p-1 hover:bg-white/10 rounded transition-colors text-slate-400 hover:text-white"
            >
                <Minus size={16} />
            </button>
            <span className="w-8 text-center font-bold text-indigo-400 tabular-nums">{months}</span>
            <button
                onClick={() => onUpdate(months + 1)}
                className="p-1 hover:bg-white/10 rounded transition-colors text-slate-400 hover:text-white"
            >
                <Plus size={16} />
            </button>
        </div>
    </div>
);

export default function ProjectEstimator({ onEstimatorUpdate }) {
    const [selectedLevels, setSelectedLevels] = useState({
        uiDesign: 'none',
        database: 'none',
        mobile: 'none',
        admin: 'none'
    });
    const [previewLevel, setPreviewLevel] = useState(null);
    const [maintenanceMonths, setMaintenanceMonths] = useState(0);
    const [activeCategory, setActiveCategory] = useState(null);

    const packages = {
        uiDesign: {
            title: 'UI/UX Design',
            levels: [
                { id: 'basic', name: 'Standard', price: 499, category: 'Clean & Informative', description: 'Functional modern layouts focused on clarity and ease of use.', features: ['Responsive Layout', '3 Revision Rounds', 'Google Fonts Library'], limitations: 'Standard icons only, no custom animations.' },
                { id: 'pro', name: 'Premium', price: 999, category: 'Luxury Brand Feel', description: 'Deeply customized aesthetics with unique visual identity.', features: ['Custom Illustrations', 'Interactive Prototypes', 'Advanced Motion Design'], limitations: 'Source files included, unlimited component design.' },
                { id: 'elite', name: 'Elite', price: 1999, category: 'Cinematic Experience', description: 'World-class artistic direction with high-end cinematic motion.', features: ['3D Web Graphics', 'Custom Design System', 'Conversion Optimization Strategy', 'Sound Design Integration'], limitations: 'Includes 1 year of design updates.' }
            ]
        },
        database: {
            title: 'Database Integration',
            levels: [
                { id: 'basic', name: 'Core', price: 599, category: 'Secure Storage', description: 'Reliable data management for users and basic content.', features: ['User Authentication', 'Standard Encryption', 'Auto-backups'], limitations: 'No real-time synchronization.' },
                { id: 'pro', name: 'Edge', price: 1299, category: 'Scalable Enterprise', description: 'High-performance architecture for complex applications.', features: ['Real-time Updates', 'Multi-layer Security', 'Advanced Search/Filters'], limitations: 'Includes multi-region deployments.' },
                { id: 'enterprise', name: 'Enterprise', price: 2999, category: 'Big Data Ready', description: 'Industrial-grade infrastructure for massive data throughput.', features: ['Microservices Support', 'AI Search Integration', 'Advanced Data Analytics', 'SOC2 Compliant Architecture'], limitations: 'Dedicated infrastructure consulting included.' }
            ]
        },
        mobile: {
            title: 'Mobile Responsiveness',
            levels: [
                { id: 'basic', name: 'Fluid', price: 349, category: 'Responsive Web', description: 'Optimized views for standard mobile and tablet devices.', features: ['Touch-friendly UI', 'Fast Load Times', 'Cross-browser support'], limitations: 'No offline functionality.' },
                { id: 'pro', name: 'PWA Pro', price: 799, category: 'App-Like Experience', description: 'Progressive Web App features for a native app feel.', features: ['Installable on Home Screen', 'Offline Access', 'Push Notifications'], limitations: 'Native API bridge included.' },
                { id: 'native', name: 'Native Sync', price: 1699, category: 'Hybrid Performance', description: 'High-fidelity mobile performance with deep hardware integration.', features: ['Biometric Auth', 'Geofencing Features', 'Background Sync', 'Camera/Sensor Integration'], limitations: 'App store submission assistance included.' }
            ]
        },
        admin: {
            title: 'Admin Dashboard',
            levels: [
                { id: 'basic', name: 'Lite', price: 699, category: 'Basic Operations', description: 'Simple dashboard for managing users and site content.', features: ['Content Management', 'Basic User Logs', 'Security Filters'], limitations: 'Standard CSV exports only.' },
                { id: 'pro', name: 'Console', price: 1599, category: 'Business Suite', description: 'Advanced analytics and multi-tier organizational tools.', features: ['Visual Data Charts', 'Role-based Access', 'Automated Reporting'], limitations: 'Full audit logs + Advanced security.' },
                { id: 'command', name: 'Command', price: 3499, category: 'Operation Hub', description: 'Everything you need to run a global scale operation.', features: ['Live Activity Heatmaps', 'Inventory/CRM Integration', 'Automated Marketing Tools', 'Custom API Webhooks'], limitations: 'Full whiteboard training sessions included.' }
            ]
        },
        base: 1499,
        maintenancePerMonth: 299
    };

    const updateLevel = (key, levelId) => {
        setSelectedLevels(prev => ({ ...prev, [key]: levelId }));
    };

    const transitionFeature = (key) => {
        const currentLevel = selectedLevels[key];
        setPreviewLevel(currentLevel === 'none' ? packages[key].levels[0].id : currentLevel);
        setActiveCategory(key);
    };

    const toggleMainList = (e, key) => {
        e.stopPropagation();
        if (selectedLevels[key] === 'none') {
            updateLevel(key, packages[key].levels[0].id);
        } else {
            updateLevel(key, 'none');
        }
    };

    const calculateTotal = () => {
        let total = packages.base;
        Object.entries(selectedLevels).forEach(([key, levelId]) => {
            if (levelId !== 'none') {
                const pkg = packages[key].levels.find(p => p.id === levelId);
                if (pkg) total += pkg.price;
            }
        });
        total += (maintenanceMonths * packages.maintenancePerMonth);
        return total;
    };

    const total = calculateTotal();

    // Notify parent component of changes
    React.useEffect(() => {
        if (onEstimatorUpdate) {
            onEstimatorUpdate({
                selectedLevels,
                maintenanceMonths,
                total,
                packages // Pass packages config to help format the email
            });
        }
    }, [selectedLevels, maintenanceMonths, total]);

    return (
        <section id="estimator" className="py-20 flex justify-center">
            <div className="max-w-6xl w-full mx-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 relative"
                >
                    {/* Background Glow */}
                    <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 relative z-10">
                        {/* Left Side: Dynamic Views (3/5 space) */}
                        <div className="lg:col-span-3">
                            <AnimatePresence mode="wait">
                                {!activeCategory ? (
                                    <motion.div
                                        key="main-list"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <div>
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                                                    <Calculator size={24} />
                                                </div>
                                                <h2 className="text-3xl font-bold text-white">Project Estimator</h2>
                                            </div>
                                            <p className="text-slate-400 mb-8 max-w-xl leading-relaxed">
                                                Select the features you need. Click on any feature to customize its package level and see technical details.
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {Object.entries(packages).filter(([key]) => !['base', 'maintenancePerMonth'].includes(key)).map(([key, data]) => {
                                                const levelId = selectedLevels[key];
                                                const isSelected = levelId !== 'none';
                                                const levelData = data.levels.find(l => l.id === levelId);

                                                return (
                                                    <div
                                                        key={key}
                                                        onClick={() => transitionFeature(key)}
                                                        className={`p-5 rounded-2xl border transition-all cursor-pointer group flex flex-col justify-between h-32 ${isSelected ? 'bg-indigo-500/10 border-indigo-500/30 ring-1 ring-indigo-500/10' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
                                                    >
                                                        <div className="flex justify-between items-start">
                                                            <div className="flex flex-col">
                                                                <span className="font-bold text-lg text-white group-hover:text-indigo-200 transition-colors uppercase tracking-tight">{data.title}</span>
                                                                <span className={`text-[10px] font-bold uppercase tracking-widest ${isSelected ? 'text-indigo-400' : 'text-slate-500'}`}>
                                                                    {isSelected ? `${levelData.name} (+$${levelData.price})` : `Starting from $${data.levels[0].price}`}
                                                                </span>
                                                            </div>
                                                            <div
                                                                onClick={(e) => toggleMainList(e, key)}
                                                                className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors duration-300 ${isSelected ? 'bg-indigo-500 justify-end' : 'bg-slate-700 justify-start'}`}
                                                            >
                                                                <div className="bg-white w-3 h-3 rounded-full shadow-lg" />
                                                            </div>
                                                        </div>
                                                        <span className="text-[10px] text-slate-500 font-medium group-hover:text-slate-400 transition-colors">Click to customize package tier &rarr;</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="pt-4 mt-4 border-t border-white/5">
                                            <MaintenanceSelector
                                                months={maintenanceMonths}
                                                onUpdate={setMaintenanceMonths}
                                                pricePerMonth={packages.maintenancePerMonth}
                                            />
                                        </div>
                                    </motion.div>
                                ) : (() => {
                                    const data = packages[activeCategory];
                                    const currentLevelId = selectedLevels[activeCategory];
                                    const currentPreviewId = previewLevel || data.levels[0].id;
                                    const currentPreviewData = data.levels.find(l => l.id === currentPreviewId);
                                    const isCurrentlySelected = currentLevelId === currentPreviewId;

                                    return (
                                        <motion.div
                                            key="detail-panel"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            className="space-y-8"
                                        >
                                            <button
                                                onClick={() => {
                                                    setActiveCategory(null);
                                                    setPreviewLevel(null);
                                                }}
                                                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group mb-2"
                                            >
                                                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                                                <span className="text-xs font-bold uppercase tracking-[0.2em]">Back to Full List</span>
                                            </button>

                                            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                                                <h2 className="text-4xl font-bold text-white tracking-tighter">{data.title}</h2>
                                                {currentLevelId !== 'none' && (
                                                    <div className="px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full self-start sm:self-auto">
                                                        <span className="text-sm font-bold text-indigo-300">Active: {data.levels.find(l => l.id === currentLevelId)?.name}</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex flex-wrap gap-2 p-1.5 bg-slate-900/50 rounded-2xl border border-white/5">
                                                {data.levels.map(level => (
                                                    <button
                                                        key={level.id}
                                                        onClick={() => setPreviewLevel(level.id)}
                                                        className={`flex-1 min-w-[120px] py-4 px-4 rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] transition-all ${currentPreviewId === level.id ? 'bg-indigo-600 text-white shadow-2xl scale-[1.02] ring-2 ring-white/10' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}
                                                    >
                                                        {level.name}
                                                    </button>
                                                ))}
                                            </div>

                                            <motion.div
                                                key={currentPreviewData.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                                            >
                                                <div className="space-y-6">
                                                    <div className="flex flex-col h-full justify-between">
                                                        <div>
                                                            <span className="text-[11px] text-indigo-400 font-bold uppercase tracking-[0.2em] mb-2">{currentPreviewData.category}</span>
                                                            <p className="text-lg text-slate-300 leading-relaxed font-medium mb-4">
                                                                {currentPreviewData.description}
                                                            </p>
                                                            <div className="text-3xl font-bold text-white mb-8">
                                                                +${currentPreviewData.price}
                                                            </div>
                                                        </div>

                                                        <button
                                                            onClick={() => updateLevel(activeCategory, isCurrentlySelected ? 'none' : currentPreviewId)}
                                                            className={`w-full py-4 rounded-2xl font-bold uppercase tracking-widest transition-all ${isCurrentlySelected ? 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20' : 'bg-indigo-500 text-white shadow-lg hover:bg-indigo-400'}`}
                                                        >
                                                            {isCurrentlySelected ? 'Remove from Project' : 'Select this Package'}
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="glass-panel bg-white/5 p-6 rounded-3xl border border-white/10 space-y-6">
                                                    <div>
                                                        <span className="text-[10px] font-bold text-slate-500 uppercase block mb-4 tracking-[0.2em]">Included Expertise</span>
                                                        <ul className="space-y-3">
                                                            {currentPreviewData.features.map((f, i) => (
                                                                <li key={i} className="flex items-start gap-3 text-sm text-slate-200">
                                                                    <div className="p-1 bg-indigo-500/20 rounded-full mt-0.5 shrink-0">
                                                                        <Check size={12} className="text-indigo-400" />
                                                                    </div>
                                                                    <span className="font-medium">{f}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div className="pt-5 border-t border-white/10">
                                                        <span className="text-[10px] font-bold text-red-400/50 uppercase block mb-2 tracking-[0.2em]">Package Boundaries</span>
                                                        <p className="text-xs text-slate-500 italic font-medium leading-relaxed">
                                                            {currentPreviewData.limitations}
                                                        </p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    );
                                })()}
                            </AnimatePresence>
                        </div>

                        {/* Right: Output (2/5 space) */}
                        <div className="lg:col-span-2 flex flex-col justify-start pt-12">
                            <div className="bg-slate-900/80 backdrop-blur-md p-10 rounded-3xl border border-white/10 text-center relative overflow-hidden group shadow-2xl sticky top-8">
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

                                <span className="text-slate-400 text-xs font-bold uppercase tracking-[0.3em] mb-6 block">Estimated Investment</span>
                                <div className="text-6xl md:text-7xl font-bold text-white mb-8 flex justify-center items-center px-2">
                                    <motion.span
                                        key={total}
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="tabular-nums whitespace-nowrap"
                                    >
                                        ${total}
                                    </motion.span>
                                </div>

                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-10">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Pricing is flexible based on exact scope</span>
                                </div>

                                <div className="space-y-4 text-left border-t border-white/10 pt-10">
                                    <div className="text-indigo-200/90 text-sm font-bold flex items-center gap-4">
                                        <div className="p-1 px-2 bg-indigo-500/20 rounded-lg text-[10px]">INCL</div>
                                        Scalable Next.js/React Architecture
                                    </div>
                                    <div className="text-indigo-200/90 text-sm font-bold flex items-center gap-4">
                                        <div className="p-1 px-2 bg-indigo-500/20 rounded-lg text-[10px]">INCL</div>
                                        Advanced SEO & Global CDN Setup
                                    </div>
                                    <div className="text-indigo-200/90 text-sm font-bold flex items-center gap-4">
                                        <div className="p-1 px-2 bg-indigo-500/20 rounded-lg text-[10px]">INCL</div>
                                        30 Days Priority Support & Training
                                    </div>
                                </div>
                            </div>
                            <p className="text-center text-slate-600 text-[10px] mt-6 font-medium uppercase tracking-widest">
                                *Detailed proposal provided upon request
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
