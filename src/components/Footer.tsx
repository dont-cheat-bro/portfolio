import { Mail, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const Footer = () => {
    const socialLinks = [
        { name: 'Email', icon: <Mail size={20} />, href: 'mailto:terlisai45@gmail.com' },
    ];

    return (
        <footer id="contact" className="bg-neutral-900 text-white pt-20 pb-10 rounded-t-[3rem] mt-20 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20"
                style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
            />

            <div className="max-w-7xl mx-auto px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
                    <div>
                        <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
                            Let's work<br />together.
                        </h2>
                        <a
                            href="mailto:terlisai45@gmail.com"
                            className="inline-flex items-center gap-3 text-2xl md:text-3xl font-light hover:text-neutral-300 transition-colors border-b border-white/20 pb-2"
                        >
                            terlisai45@gmail.com <ArrowUpRight className="text-neutral-400" />
                        </a>
                        <div className="mt-6 text-xl text-neutral-400 font-mono">
                            +91 8610905406
                        </div>
                    </div>

                    <div className="flex flex-col justify-end items-start md:items-end">
                        <p className="text-xl text-neutral-400 max-w-sm text-left md:text-right mb-8">
                            Building digital products, brands, and experiences. Open for new opportunities.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -5 }}
                                    className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-neutral-900 transition-all border border-white/5"
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-neutral-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Portfolio. All rights reserved.</p>
                    <div className="flex gap-8 mt-4 md:mt-0">
                        <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
                        <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
