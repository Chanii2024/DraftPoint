import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Search, PenTool, Code2, Rocket } from 'lucide-react';

const steps = [
    {
        title: "Discovery",
        description: "We start by understanding your vision, goals, and target audience to lay a solid foundation.",
        icon: Search
    },
    {
        title: "Design",
        description: "I create high-fidelity wireframes and interactive prototypes to visualize the user experience.",
        icon: PenTool
    },
    {
        title: "Development",
        description: "Turning designs into reality with clean, efficient, and scalable code using modern tech stacks.",
        icon: Code2
    },
    {
        title: "Launch",
        description: "Rigorous testing, optimization, and deployment to ensure a flawless go-live experience.",
        icon: Rocket
    }
];

const TimelineStep = ({ step, index }) => {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`flex items-center justify-between w-full mb-12 relative z-10 flex-row ${isEven ? 'md:flex-row-reverse' : ''}
                }`}
        >
            {/* Empty space for the other side */}
            <div className="w-5/12 hidden md:block" />

            {/* Center Node */}
            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[var(--bg-primary)] border-2 border-accent/30 flex items-center justify-center z-10 shadow-[0_0_15px_var(--glass-shadow)]">
                <div className="w-3 h-3 bg-accent rounded-full" />
            </div>

            {/* Content Card */}
            <div className={`w-[calc(100%-3rem)] md:w-5/12 pl-12 md:pl-0 ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                <div className="glass-panel p-6 rounded-2xl border border-[var(--glass-border)] hover:bg-[var(--hover-bg)] transition-colors duration-300">
                    <div className={`flex items-center gap-4 mb-3 flex-row ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                        <div className="p-2 bg-accent/10 rounded-lg text-accent">
                            <step.icon size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-primary">{step.title}</h3>
                    </div>
                    <p className="text-secondary leading-relaxed">
                        {step.description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default function ProcessTimeline() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 80%", "end 20%"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 200,
        damping: 40,
        restDelta: 0.001
    });

    return (
        <section id="process" ref={containerRef} className="py-20 relative">
            <div className="max-w-6xl mx-auto px-6 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">My Process</h2>
                    <p className="text-secondary max-w-2xl mx-auto">
                        From concept to completion, I follow a structured approach to deliver exceptional results.
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Base Line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-[var(--glass-border)] -translate-x-1/2" />

                    {/* Laser Line */}
                    <motion.div
                        className="absolute left-4 md:left-1/2 top-0 w-0.5 bg-gradient-to-b from-accent via-purple-500 to-accent -translate-x-1/2 origin-top shadow-[0_0_10px_var(--glass-shadow)]"
                        style={{ scaleY, height: "100%" }}
                    />

                    <div className="space-y-12">
                        {steps.map((step, index) => (
                            <TimelineStep key={index} step={step} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
