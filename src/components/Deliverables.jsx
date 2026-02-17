import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Smartphone, Wrench, MessageCircle, CheckCircle2 } from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, description, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className="glass-panel p-8 rounded-3xl border border-white/5 hover:bg-white/5 transition-colors group"
    >
        <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <Icon className="text-indigo-400" size={24} />
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-slate-400 leading-relaxed text-sm">
            {description}
        </p>
    </motion.div>
);

const TechItem = ({ name, isSelected, onClick }) => (
    <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${isSelected
            ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/25'
            : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
    >
        {name}
    </motion.button>
);

const techStack = [
    "React", "Node.js", "Next.js", "TypeScript",
    "Tailwind CSS", "MongoDB", "Framer Motion",
    "Firebase", "React Native", "PostgreSQL",
    "AWS", "Docker", "Figma", "Three.js"
];

export default function Deliverables() {
    const [selectedTech, setSelectedTech] = useState([]);

    const toggleTech = (tech) => {
        if (selectedTech.includes(tech)) {
            setSelectedTech(prev => prev.filter(t => t !== tech));
        } else {
            setSelectedTech(prev => [...prev, tech]);
        }
    };

    const whatsappBaseUrl = "https://wa.me/94705168748";
    const whatsappMessage = selectedTech.length > 0
        ? `Hi, I'm interested in a project using: ${selectedTech.join(', ')}. Can you advise on the best approach?`
        : "Hi, I need advice on choosing the right tech stack for my requirement.";

    const whatsappLink = `${whatsappBaseUrl}?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <section id="services" className="py-24 relative">
            {/* Background Elements */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl -translate-x-1/2 pointer-events-none" />

            <div className="w-full max-w-7xl mx-auto px-6 relative z-10">

                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-indigo-400 font-bold tracking-widest uppercase text-sm"
                    >
                        Our Expertise
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6"
                    >
                        What We Deliver
                    </motion.h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        From web platforms to mobile apps, we build scalable solutions tailored to your business needs, for both local and international clients.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                    <ServiceCard
                        icon={Globe}
                        title="Websites & Platforms"
                        description="Scalable, globally distributed web architectures built for maximum uptime. We design immersive digital experiences with server-side rendering and edge caching to ensure instant load times and seamless interaction for users anywhere in the world."
                        delay={0}
                    />
                    <ServiceCard
                        icon={Smartphone}
                        title="Mobile Applications"
                        description="Native-grade mobile ecosystems engineered for fluid performance. We build cross-platform solutions that integrate deeply with device hardware, offering offline capability, biometric security, and smooth 60fps animations on both iOS and Android."
                        delay={0.1}
                    />
                    <ServiceCard
                        icon={Wrench}
                        title="Custom Tools & Automation"
                        description="High-performance, local-first utilities designed to bypass web latency. We engineer tools that leverage native CPU and GPU acceleration to process heavy workflows instantly, delivering raw speed and efficiency directly on the hardware."
                        delay={0.2}
                    />
                </div>

                {/* Tech Stack Consultant */}
                <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 bg-slate-900/50">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-green-500/10 rounded-lg text-green-400">
                                    <MessageCircle size={24} />
                                </div>
                                <h3 className="text-2xl font-bold text-white">Choose Your Tech Stack</h3>
                            </div>
                            <p className="text-slate-400 mb-8 leading-relaxed">
                                Not sure which technologies match your vision? Select the ones you're interested in, or simply chat with us directly for expert advice.
                            </p>

                            <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-[#25D366] text-slate-900 font-bold px-6 py-4 rounded-xl hover:bg-[#20bd5a] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-green-500/20"
                            >
                                <MessageCircle size={20} />
                                <span>Get Advice on WhatsApp</span>
                            </a>
                            <p className="text-slate-500 text-xs mt-4 font-medium">
                                *Direct line to our technical lead
                            </p>
                        </div>

                        <div className="relative">
                            <div className="flex flex-wrap gap-3">
                                {techStack.map((tech) => (
                                    <TechItem
                                        key={tech}
                                        name={tech}
                                        isSelected={selectedTech.includes(tech)}
                                        onClick={() => toggleTech(tech)}
                                    />
                                ))}
                            </div>
                            {selectedTech.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-6 p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-start gap-3"
                                >
                                    <CheckCircle2 className="text-indigo-400 shrink-0 mt-0.5" size={18} />
                                    <div>
                                        <p className="text-white font-medium text-sm">Selection Included in Message</p>
                                        <p className="text-slate-400 text-xs mt-1">
                                            When you click the WhatsApp button, your selected technologies will be automatically added to the message draft.
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
