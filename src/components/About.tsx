import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code2, Database, Layout, Smartphone } from 'lucide-react';

export const About = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    const skills = [
        { icon: <Layout className="w-6 h-6" />, label: "Frontend Development", desc: "React, TypeScript, Tailwind" },
        { icon: <Database className="w-6 h-6" />, label: "Backend Engineering", desc: "Node.js, Python, SQL" },
        { icon: <Smartphone className="w-6 h-6" />, label: "Responsive Design", desc: "Mobile-first approach" },
        { icon: <Code2 className="w-6 h-6" />, label: "Clean Architecture", desc: "Scalable & maintainable code" },
    ];

    return (
        <section id="about" className="py-32 bg-neutral-50 relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[120px] mix-blend-multiply opacity-50" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-100/50 rounded-full blur-[120px] mix-blend-multiply opacity-50" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                    {/* Left: Text Content */}
                    <div ref={containerRef}>
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-blue-600 font-mono text-sm tracking-widest uppercase mb-4 block"
                        >
                            About Me
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-bold text-neutral-900 mb-8 leading-tight"
                        >
                            Transforming complex problems into <span className="text-neutral-400">elegant solutions.</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-neutral-600 mb-8 leading-relaxed"
                        >
                            I'm a Full Stack Developer passionate about building digital products that matter.
                            With a focus on performance and user experience, I bridge the gap between design and engineering
                            to create seamless web applications.
                        </motion.p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {skills.map((skill, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                    className="flex flex-col gap-2 p-4 rounded-2xl bg-white border border-neutral-100 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-900 mb-2">
                                        {skill.icon}
                                    </div>
                                    <h3 className="font-bold text-neutral-900">{skill.label}</h3>
                                    <p className="text-sm text-neutral-500">{skill.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Visual/Image */}
                    <motion.div
                        style={{ y }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
                            <img
                                src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1000"
                                alt="Workspace"
                                className="w-full h-[600px] object-cover"
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </div>


                    </motion.div>

                </div>
            </div>
        </section>
    );
};
