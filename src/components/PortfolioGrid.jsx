import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';

const projects = [
    {
        title: 'Neon Commerce',
        description: 'A futuristic e-commerce platform featuring real-time inventory updates and 3D product previews.',
        tags: ['React', 'Three.js', 'Tailwind', 'Node.js'],
        links: { demo: '#', github: '#' }
    },
    {
        title: 'Aero Dashboard',
        description: 'Analytics dashboard for drone flight data visualization, built with high-performance charting libraries.',
        tags: ['Next.js', 'D3.js', 'TypeScript'],
        links: { demo: '#', github: '#' }
    },
    {
        title: 'Lumina UI Kit',
        description: 'A comprehensive React component library designed for dark-mode-first applications.',
        tags: ['React', 'Storybook', 'CSS Modules'],
        links: { demo: '#', github: '#' }
    },
    {
        title: 'Echo Chat',
        description: 'End-to-end encrypted messaging application with support for large file transfers.',
        tags: ['Socket.io', 'Express', 'Redis', 'WebRTC'],
        links: { demo: '#', github: '#' }
    }
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

const ProjectCard = ({ project }) => (
    <motion.div
        variants={item}
        whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(99, 102, 241, 0.2)" }}
        className="glass-panel p-6 rounded-2xl group transition-colors duration-300 flex flex-col h-full"
    >
        <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-white group-hover:text-indigo-300 transition-colors">
                {project.title}
            </h3>
            <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                <a href={project.links.github} className="text-slate-400 hover:text-white transition-colors" title="View Code">
                    <Github size={18} />
                </a>
                <a href={project.links.demo} className="text-slate-400 hover:text-white transition-colors" title="Live Demo">
                    <ExternalLink size={18} />
                </a>
            </div>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
            {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.map((tag, index) => (
                <span
                    key={index}
                    className="px-2.5 py-1 text-xs font-medium text-slate-300 bg-white/5 rounded-full border border-white/5"
                >
                    {tag}
                </span>
            ))}
        </div>
    </motion.div>
);

export default function PortfolioGrid() {
    return (
        <section id="portfolio" className="py-12">
            <div className="max-w-7xl mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-bold text-white mb-10 flex items-center gap-3"
                >
                    <span className="w-8 h-1 bg-indigo-500 rounded-full"></span>
                    Recent Work
                </motion.h2>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
