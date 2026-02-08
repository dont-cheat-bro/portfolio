import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const projects = [
    {
        id: "project-management-tool",
        title: "Project Management Tool",
        category: "EdTech Platform",
        // Image: Clean dashboard / kanban board
        image: "/project-management.jpg",
        description: "Comprehensive dashboard for college project tracking and collaboration."
    },
    {
        id: "tech-fest-website",
        title: "Tech Fest Website",
        category: "Event Experience",
        // Image: Neon / futuristic / code aesthetic
        image: "/techfest-website.jpg",
        description: "Dynamic portal for a college technical festival with event registration."
    },
    {
        id: "siem-tool",
        title: "SIEM Tool",
        category: "Cybersecurity",
        // Image: Matrix code / security lock / data streams
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=2070",
        description: "Security Information and Event Management system for real-time threat detection."
    },
];

export const ProjectShowcase = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);

    return (
        <section id="projects" ref={targetRef} className="relative bg-neutral-50 bg-dot-pattern">

            {/* =========================================
                DESKTOP LAYOUT (HORIZONTAL SCROLL)
               ========================================= */}
            <div className="hidden md:block h-[300vh]">
                <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                    <div className="absolute top-10 left-10 z-10 max-w-4xl">
                        <h2 className="text-5xl font-bold text-neutral-900 mb-4 tracking-tight">Selected Works</h2>
                        <p className="text-xl text-neutral-800 font-normal leading-relaxed">
                            A collection of projects where design meets engineering. Scroll to explore.
                        </p>
                    </div>

                    <motion.div style={{ x }} className="flex gap-10 pl-[5vw]">
                        {projects.map((project, i) => (
                            <Link to={`/project/${project.id}`} key={i} className="group relative h-[60vh] w-[40vw] flex-shrink-0 overflow-hidden rounded-3xl bg-neutral-800 block">
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                    style={{ backgroundImage: `url(${project.image})` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="absolute bottom-0 left-0 w-full p-8 transition-transform duration-300 md:translate-y-4 group-hover:translate-y-0">
                                    <span className="mb-3 inline-block rounded-full bg-white/20 backdrop-blur-md px-4 py-1.5 text-xs font-medium text-white border border-white/10 uppercase tracking-widest">
                                        {project.category}
                                    </span>
                                    <h3 className="mb-2 text-3xl font-bold text-white tracking-tight">{project.title}</h3>
                                    <p className="mb-6 text-neutral-200 opacity-0 transition-opacity duration-300 group-hover:opacity-100 font-light leading-relaxed">
                                        {project.description}
                                    </p>
                                    <button className="flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-black transition-all hover:bg-neutral-100 hover:scale-105 active:scale-95">
                                        View Case Study <ArrowRight size={16} />
                                    </button>
                                </div>
                            </Link>
                        ))}

                        {/* Call to Action Card */}
                        <div className="h-[60vh] w-[30vw] flex-shrink-0 flex items-center justify-center rounded-3xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-white/10">
                            <div className="text-center p-8">
                                <h3 className="text-4xl font-bold text-white mb-4">Start your project</h3>
                                <p className="text-neutral-400 mb-8">Ready to bring your ideas to life?</p>
                                <button
                                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="bg-white text-neutral-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-neutral-200 transition-colors"
                                >
                                    Get in Touch
                                </button>
                            </div>
                        </div>

                    </motion.div>
                </div>
            </div>

            {/* =========================================
                MOBILE LAYOUT (VERTICAL STACK)
               ========================================= */}
            <div className="block md:hidden py-10 px-6">
                <div className="mb-10">
                    <h2 className="text-4xl font-bold text-neutral-900 mb-2 tracking-tight">Selected Works</h2>
                    <p className="text-neutral-600">
                        A collection of projects where design meets engineering.
                    </p>
                </div>

                <div className="flex flex-col gap-8">
                    {projects.map((project, i) => (
                        <Link to={`/project/${project.id}`} key={i} className="group relative h-[450px] w-full overflow-hidden rounded-2xl bg-neutral-800 block shadow-lg">
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url(${project.image})` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                            <div className="absolute bottom-0 left-0 w-full p-6">
                                <span className="mb-2 inline-block rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-[10px] font-medium text-white border border-white/10 uppercase tracking-widest">
                                    {project.category}
                                </span>
                                <h3 className="mb-2 text-2xl font-bold text-white tracking-tight">{project.title}</h3>
                                <p className="mb-4 text-neutral-300 text-sm font-light leading-relaxed line-clamp-2">
                                    {project.description}
                                </p>
                                <span className="flex items-center gap-2 text-sm font-medium text-white">
                                    View Case Study <ArrowRight size={14} />
                                </span>
                            </div>
                        </Link>
                    ))}

                    {/* Mobile CTA */}
                    <div className="rounded-2xl bg-neutral-900 p-8 text-center shadow-lg">
                        <h3 className="text-2xl font-bold text-white mb-2">Start your project</h3>
                        <p className="text-neutral-400 mb-6 text-sm">Ready to bring your ideas to life?</p>
                        <button
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-white text-neutral-900 px-6 py-2.5 rounded-full font-bold text-sm w-full"
                        >
                            Get in Touch
                        </button>
                    </div>
                </div>
            </div>

        </section>
    );
};
