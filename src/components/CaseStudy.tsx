import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

const caseStudies = {
    "project-management-tool": {
        title: "Academic Project Management Portal",
        category: "EdTech Platform",
        image: "/project-management.jpg",
        overview: "A comprehensive digital solution designed to transform the management of academic capstone projects. It replaces disjointed manual workflows with a centralized platform for scheduling, tracking, and assessing student projects.",
        problem: "University departments struggle with the complex logistics of managing hundreds of student projects. Issues include fragmented data across spreadsheets, chaotic scheduling of review panels, communication gaps, and inconsistent grading standards due to the lack of enforced rubrics.",
        solution: "We engineered a centralized, role-based portal that automates the entire project lifecycle. It features an intelligent scheduling engine to resolve time conflicts, a digital repository for project artifacts, and a dynamic grading system that ensures objective, standardized assessment.",
        features: [
            "Start-to-End Lifecycle Management",
            "Automated Conflict-Free Scheduling",
            "Real-time Notification System (Socket.io)",
            "Dynamic Parsing & Grading Rubrics",
            "Role-Based Dashboards (Student/Guide/Admin)",
            "Digital Audit Trails & Reporting"
        ],
        techStack: ["React", "Next.js", "Node.js", "PostgreSQL", "Supabase", "Redis", "Docker"]
    },
    "tech-fest-website": {
        title: "TechnoVerse 2024",
        category: "Event Experience",
        image: "/techfest-website.jpg",
        overview: "The official digital gateway for TechnoVerse 2024, the region's largest technical symposium. A high-performance web experience designed to handle massive traffic spikes during registration while delivering a futuristic, immersive visual journey.",
        problem: "Previous years suffered from server crashes during registration peaks and a lackluster digital presence that failed to capture the event's energy. Manual payment verification caused massive queues and delays.",
        solution: "We built a scalable, cloud-native platform capable of handling 10,000+ concurrent users. The UI features WebGL-powered 3D elements to reflect the 'Future Tech' theme, while the backend ensures instant seat reservation and automated QR ticket generation.",
        features: [
            "3D Interactive Landing Page (Three.js)",
            "Real-time Workshop Seat Booking",
            "Automated QR Ticket Generation",
            "Live Event Leaderboards & Gamification",
            "Zero-Downtime Payment Gateway Integration"
        ],
        techStack: ["React", "Three.js", "Node.js", "MongoDB", "AWS Lambda", "Razorpay"]
    },
    "siem-tool": {
        title: "SIEM Tool",
        category: "Cybersecurity",
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=2070",
        overview: "A custom Security Information and Event Management system built to detect and analyze security threats in real-time.",
        problem: "Existing commercial SIEM solutions were too expensive and complex for small-to-medium enterprises.",
        solution: "Engineered a lightweight, scalable SIEM tool capable of ingesting logs, correlating events, and triggering alerts for potential security breaches.",
        features: [
            "Real-time Log Ingestion & Parsing",
            "Threat Detection Rules Engine",
            "Visual Analytics Dashboard",
            "Automated Incident Alerting"
        ],
        techStack: ["Python", "Elasticsearch", "Kibana", "RabbitMQ"]
    }
};

export const CaseStudy = () => {
    const { id } = useParams();
    const project = caseStudies[id as keyof typeof caseStudies];

    // Find next project for navigation
    const projectsKeys = Object.keys(caseStudies);
    const currentIndex = projectsKeys.indexOf(id || "");
    const nextIndex = (currentIndex + 1) % projectsKeys.length;
    const nextProjectKey = projectsKeys[nextIndex];
    const nextProject = caseStudies[nextProjectKey as keyof typeof caseStudies];

    if (!project) {
        return <div className="min-h-screen flex items-center justify-center text-white bg-black">Project not found</div>;
    }

    return (
        <div className="bg-neutral-50 bg-dot-pattern min-h-screen text-neutral-900 selection:bg-blue-500/30">
            {/* Parallax Hero Header */}
            <div className="relative h-[80vh] w-full overflow-hidden border-b border-neutral-200">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-20 max-w-7xl mx-auto z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link to="/#projects" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8 group font-medium backdrop-blur-md bg-white/10 px-4 py-2 rounded-full w-fit border border-white/10">
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
                        </Link>
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="block text-blue-400 font-bold tracking-wider mb-4 uppercase text-sm md:text-base"
                        >
                            {project.category}
                        </motion.span>
                        <h1 className="text-5xl md:text-8xl font-bold mb-4 text-white tracking-tight leading-tight drop-shadow-lg">
                            {project.title}
                        </h1>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                    {/* Main Content Column */}
                    <div className="lg:col-span-8 space-y-20">
                        {/* Overview */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-bold mb-6 text-neutral-900">Overview</h2>
                            <p className="text-xl text-neutral-600 leading-relaxed">
                                {project.overview}
                            </p>
                        </motion.section>

                        {/* Problem & Solution Cards */}
                        <div className="grid gap-8">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-3xl bg-red-50/50 border border-red-100/50 hover:border-red-200 transition-all hover:shadow-sm"
                            >
                                <h3 className="text-2xl font-bold mb-4 text-red-600 flex items-center gap-3">
                                    The Challenge
                                </h3>
                                <p className="text-neutral-600 leading-relaxed font-light">
                                    {project.problem}
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-3xl bg-green-50/50 border border-green-100/50 hover:border-green-200 transition-all hover:shadow-sm"
                            >
                                <h3 className="text-2xl font-bold mb-4 text-green-600 flex items-center gap-3">
                                    The Solution
                                </h3>
                                <p className="text-neutral-600 leading-relaxed font-light">
                                    {project.solution}
                                </p>
                            </motion.div>
                        </div>

                        {/* Features */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-2xl font-bold mb-8 text-neutral-900">Key Features</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                {project.features.map((feature, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-neutral-200 hover:border-blue-300 hover:shadow-lg transition-all"
                                    >
                                        <CheckCircle2 className="text-blue-600 shrink-0 mt-0.5" size={20} />
                                        <span className="text-neutral-700 font-medium">{feature}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>
                    </div>

                    {/* Sidebar Column */}
                    <div className="lg:col-span-4 space-y-12">
                        {/* Tech Stack */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-lg sticky top-10"
                        >
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-neutral-900">
                                Technologies
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.map((tech, idx) => (
                                    <span key={idx} className="px-4 py-2 rounded-lg bg-neutral-100 text-neutral-600 text-sm font-medium border border-neutral-200">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-8 pt-8 border-t border-neutral-200">
                                <Link
                                    to={`/project/${nextProjectKey}`}
                                    className="block group cursor-pointer"
                                >
                                    <span className="text-sm text-neutral-500 mb-1 block">Next Project</span>
                                    <div className="text-lg font-bold text-neutral-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                                        {nextProject.title}
                                        <ArrowLeft className="rotate-180" size={16} />
                                    </div>
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </div>
    );
};
