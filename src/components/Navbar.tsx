import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Folder, User, Mail, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
    { name: 'Home', path: '/', icon: <Home size={20} /> },
    { name: 'Projects', path: '/#projects', icon: <Folder size={20} /> },
    { name: 'About', path: '/#about', icon: <User size={20} /> },
    { name: 'Contact', path: '/#contact', icon: <Mail size={20} /> },
];

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (path: string) => {
        if (path.startsWith('/#')) {
            const element = document.getElementById(path.substring(2));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold tracking-tighter text-neutral-900 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center text-white font-mono text-sm">
                            P
                        </div>
                        Portfolio
                    </Link>

                    {/* Desktop Menu - Floating Pill */}
                    <div className="hidden md:flex items-center gap-1 bg-white/70 backdrop-blur-md border border-white/20 shadow-lg rounded-full px-2 py-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                onClick={() => scrollToSection(item.path)}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-white hover:text-neutral-900 ${location.pathname === item.path || (location.hash === item.path.substring(1))
                                    ? 'bg-neutral-900 text-white shadow-md'
                                    : 'text-neutral-600'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:block">
                        <Link
                            to="/#contact"
                            className="bg-neutral-900 text-white px-6 py-2.5 rounded-full font-medium text-sm hover:bg-neutral-800 transition-colors shadow-lg shadow-neutral-900/20"
                        >
                            Let's Talk
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden p-2 text-neutral-900 bg-white/50 backdrop-blur-md rounded-full border border-neutral-200"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-0 z-40 bg-white/95 backdrop-blur-3xl pt-24 px-6 md:hidden"
                    >
                        <div className="flex flex-col gap-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    onClick={() => {
                                        scrollToSection(item.path);
                                        setMobileMenuOpen(false);
                                    }}
                                    className="text-4xl font-bold text-neutral-900 py-4 border-b border-neutral-100"
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <Link
                                to="/#contact"
                                onClick={() => setMobileMenuOpen(false)}
                                className="mt-4 bg-neutral-900 text-white text-center py-4 rounded-full font-bold text-xl shadow-lg"
                            >
                                Let's Talk
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence >
        </>
    );
};
