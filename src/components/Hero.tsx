import { useRef } from 'react';
import { useScroll, useTransform, useSpring, motion, MotionValue } from 'framer-motion';
import { MainStatsGraph, UserStatsCard, SecurityCard, RevenueCard, GlobeCard, AnalyticsCard } from './Dashboard';
import { CheckCircle2, Globe, Shield } from 'lucide-react';

export const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // --- Animation Strategy: Grid to Zig-Zag ---
    // Start (0.0): All modules form a cohesive dashboard grid.
    // Scroll (0.15+): Modules break free ("explode") and move to their Story positions.

    const useParallax = (value: MotionValue<number>, distance: number) => {
        return useTransform(value, [0, 1], [0, distance]);
    };

    // --- 1. Main Graph (Left Dock) ---
    // Grid Pos: Top-Left (0,0). Width: 50%. Height: 66%.
    // Story Pos: Left, slightly down.
    const graphX = useTransform(smoothProgress,
        [0.15, 0.25, 0.45, 0.55],
        ["0%", "0%", "0%", "-100%"] // Stays Left then exits
    );
    const graphY = useTransform(smoothProgress,
        [0.15, 0.25, 0.45, 0.55],
        ["0%", "20%", "20%", "20%"] // Moves down 20%
    );
    const graphOpacity = useTransform(smoothProgress,
        [0, 0.15, 0.25, 0.45, 0.55],
        [0.2, 1, 1, 1, 0] // Start dim, fade in, then fade out
    );
    const graphRotateY = useTransform(smoothProgress, [0.15, 0.25], [0, 5]);


    // --- 2. Security Card (Right Dock) ---
    // Grid Pos: Top-Right (left: 75%). Width: 25%.
    // Story Pos: Right docking.
    // Movement: Needs to stay on Right. Maybe drop down.

    // Custom logic for Security:
    // 0-0.15: Grid (Visible).
    // 0.15-0.45: Graph Focus (HIDDEN).
    // 0.45-0.55: Entrance to Dock.
    // 0.55-0.75: Security Focus (Visible).
    // 0.75+: Exit.
    const securityX_Complex = useTransform(smoothProgress,
        [0, 0.15, 0.45, 0.55, 0.75, 0.85],
        ["0%", "50%", "50%", "-50%", "-50%", "150%"]
    );
    const securityY_Complex = useTransform(smoothProgress,
        [0, 0.15, 0.45, 0.55, 0.75],
        ["0%", "-50%", "-50%", "120%", "120%"]
    );
    // STRICT OPACITY CONTROL
    const securityOpacity = useTransform(smoothProgress,
        [0, 0.15, 0.25, 0.45, 0.55, 0.75, 0.85],
        [0.2, 1, 0, 0, 1, 1, 0] // Start dim
        // 0-0.15: Visible (Grid)
        // 0.25-0.45: Hidden (Graph viewing)
        // 0.55-0.75: Visible (Security viewing)
        // 0.85+: Hidden (Globe viewing)
    );
    const securityRotateY = useTransform(smoothProgress, [0.45, 0.55], [0, -15]);
    const securityScale = useTransform(smoothProgress, [0.45, 0.55], [1, 1.3]);


    // --- 3. Globe Card "Uptime" (Left Dock) ---
    // Grid Pos: Bottom-Middle (Left: 50%, Top: 67%). Width: 25%.
    // Story Pos: Left docking. Needs to be centered vertically. 
    // Fix: User says "too far left". Move Right.
    // Was -200%. Changed to -160%.
    const globeX = useTransform(smoothProgress,
        [0, 0.75, 0.85, 1],
        ["0%", "0%", "-160%", "-160%"]
    );
    const globeY = useTransform(smoothProgress,
        [0, 0.75, 0.85],
        ["0%", "0%", "-110%"] // Move UP to center vertically (-110%)
    );
    // STRICT OPACITY CONTROL
    const globeOpacity = useTransform(smoothProgress,
        [0, 0.15, 0.25, 0.75, 0.85],
        [0.2, 1, 0, 0, 1] // Start dim
        // 0-0.15: Visible (Grid)
        // 0.25-0.75: Hidden (Graph & Security viewing)
        // 0.85+: Visible (Globe viewing)
    );
    const globeScale = useTransform(smoothProgress, [0.75, 0.85], [1, 1.3]);
    const globeRotateY = useTransform(smoothProgress, [0.85, 1], [0, 15]);


    // --- Background Modules ---
    // Start dim (0.2), fade in to 1 at 0.15, then fade out
    const bgOpacity = useTransform(smoothProgress, [0, 0.15, 0.25], [0.2, 1, 0.1]);

    const scatter1X = useParallax(smoothProgress, -200);
    const scatter1Y = useParallax(smoothProgress, -100);
    const scatter2X = useParallax(smoothProgress, 200);
    const scatter2Y = useParallax(smoothProgress, -100);
    const scatter3X = useParallax(smoothProgress, -200);
    const scatter3Y = useParallax(smoothProgress, 200);

    const containerScale = useTransform(smoothProgress, [0, 0.2], [1, 1.1]);

    // --- Intro Text Animation ---
    const introOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
    const introScale = useTransform(smoothProgress, [0, 0.15], [1, 0.8]);
    const introY = useTransform(smoothProgress, [0, 0.15], [0, -50]);

    // --- Feature Text Animations ---

    // Text 1 (Right Side)
    const text1Opacity = useTransform(smoothProgress, [0.20, 0.30, 0.40], [0, 1, 0]);
    const text1Y = useTransform(smoothProgress, [0.20, 0.30, 0.40], [50, 0, -50]);

    // Text 2 (Left Side) - Security
    const text2Opacity = useTransform(smoothProgress, [0.50, 0.60, 0.70], [0, 1, 0]);
    const text2Y = useTransform(smoothProgress, [0.50, 0.60, 0.70], [50, 0, -50]);

    // Text 3 (Right Side) - Globe
    const text3Opacity = useTransform(smoothProgress, [0.80, 0.90, 1], [0, 1, 1]);
    const text3Y = useTransform(smoothProgress, [0.80, 0.90, 1], [50, 0, 0]);


    return (
        <div ref={containerRef} className="relative bg-neutral-50 text-neutral-900">

            {/* =========================================
                DESKTOP LAYOUT (3D SCROLL ANIMATION) 
               ========================================= */}
            <div className="hidden md:block h-[500vh]">
                <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center perspective-1000">

                    {/* Background Gradients */}
                    <div className="absolute inset-0 bg-neutral-50/50">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),rgba(255,255,255,0))]" />
                        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-[120px] mix-blend-multiply animate-pulse" />
                        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-purple-400/20 rounded-full blur-[120px] mix-blend-multiply animate-pulse" />
                        <div className="absolute top-[20%] left-[20%] w-[400px] h-[400px] bg-pink-400/20 rounded-full blur-[100px] mix-blend-multiply" />
                    </div>

                    {/* --- Initial Intro Text --- */}
                    <motion.div
                        style={{ opacity: introOpacity, scale: introScale, y: introY }}
                        className="absolute z-50 text-center pointer-events-none px-4 -mt-32"
                    >
                        <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-neutral-900 mb-8 drop-shadow-[0_0_30px_rgba(255,255,255,1)]">
                            Your Vision.<br />
                            Engineered to Reality.
                        </h1>
                        <p className="text-xl md:text-2xl text-neutral-800 max-w-2xl mx-auto font-normal leading-relaxed">
                            I build high-performance web applications and tools that help your business scale.
                        </p>
                    </motion.div>

                    {/* --- The Dashboard Container (Grid Layout) --- */}
                    <motion.div
                        style={{ scale: containerScale, z: 0 }}
                        className="w-[80vw] h-[60vh] relative mt-32"
                    >

                        {/* 1. Main Stats Graph - Top Left (0,0) */}
                        <MainStatsGraph
                            style={{
                                position: 'absolute',
                                width: '48%', height: '64%',
                                top: '0%', left: '0%',
                                x: graphX,
                                y: graphY,
                                opacity: graphOpacity,
                                rotateY: graphRotateY,
                                zIndex: 20
                            }}
                            className="shadow-[0_20px_50px_-12px_rgba(59,130,246,0.15)] border-blue-100/50"
                        />

                        {/* 2. Security Card - Top Right */}
                        <SecurityCard
                            style={{
                                position: 'absolute',
                                width: '24%', height: '31%', // Half of Graph height approx
                                top: '0%', left: '76%', // Grid 
                                x: securityX_Complex,
                                y: securityY_Complex,
                                opacity: securityOpacity,
                                scale: securityScale,
                                rotateY: securityRotateY,
                                zIndex: 30
                            }}
                            className="shadow-[0_20px_50px_-12px_rgba(16,185,129,0.15)] border-green-100/50"
                        />

                        {/* 3. Globe Card - Bottom Middle */}
                        <GlobeCard
                            style={{
                                position: 'absolute',
                                width: '24%', height: '31%',
                                top: '67%', left: '50%',
                                x: globeX,
                                y: globeY,
                                opacity: globeOpacity,
                                scale: globeScale,
                                rotateY: globeRotateY,
                                zIndex: 30
                            }}
                            className="shadow-[0_20px_50px_-12px_rgba(99,102,241,0.15)] border-indigo-100/50"
                        />


                        {/* 4. User Stats - Top Center (Floating) */}
                        <UserStatsCard
                            style={{
                                position: 'absolute',
                                width: '24%', height: '31%',
                                top: '0%', left: '50%',
                                x: scatter1X, y: scatter1Y,
                                opacity: bgOpacity
                            }}
                        />

                        {/* 5. Revenue - Bottom Left (Floating) */}
                        <RevenueCard
                            style={{
                                position: 'absolute',
                                width: '48%', height: '31%',
                                top: '67%', left: '0%',
                                x: scatter2X, y: scatter2Y,
                                opacity: bgOpacity
                            }}
                        />

                        {/* 6. Analytics - Bottom Right (Floating) */}
                        <AnalyticsCard
                            style={{
                                position: 'absolute',
                                width: '24%', height: '32%',
                                top: '67%', left: '76%', // Grid
                                x: scatter3X, y: scatter3Y,
                                opacity: bgOpacity
                            }}
                        />

                    </motion.div>


                    {/* --- Feature Text Content --- */}

                    {/* Text 1: Right Side */}
                    <motion.div
                        style={{ opacity: text1Opacity, y: text1Y }}
                        className="absolute left-[55%] top-1/2 -translate-y-1/2 z-20 w-[40%] pointer-events-none md:text-left"
                    >
                        <div className="flex items-center justify-start gap-3 mb-4 text-green-400">
                            <CheckCircle2 size={32} />
                            <span className="text-xl font-mono uppercase tracking-wider">Reliability</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900">
                            Production Ready Tools
                        </h2>
                        <p className="text-lg text-neutral-500 leading-relaxed">
                            I deliver robust, type-safe code that scales with your user base. Just pure performance for your critical applications.
                        </p>
                    </motion.div>

                    {/* Text 2: Left Side */}
                    <motion.div
                        style={{ opacity: text2Opacity, y: text2Y }}
                        className="absolute left-[5%] top-1/2 -translate-y-1/2 z-20 w-[40%] pointer-events-none"
                    >
                        <div className="flex items-center gap-3 mb-4 text-emerald-400">
                            <Shield size={32} />
                            <span className="text-xl font-mono uppercase tracking-wider">Security</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900">
                            Secure & Automated
                        </h2>
                        <p className="text-lg text-neutral-500 leading-relaxed">
                            Built-in security best practices and automated testing workflows ensure your data stays safe and your code stays clean.
                        </p>
                    </motion.div>

                    {/* Text 3: Right Side */}
                    <motion.div
                        style={{ opacity: text3Opacity, y: text3Y }}
                        className="absolute left-[55%] top-1/2 -translate-y-1/2 z-20 w-[40%] pointer-events-none"
                    >
                        <div className="flex items-center justify-start gap-3 mb-4 text-indigo-400">
                            <Globe size={32} />
                            <span className="text-xl font-mono uppercase tracking-wider">Global Scale</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900">
                            Seamless UI/UX
                        </h2>
                        <p className="text-lg text-neutral-500 leading-relaxed">
                            Deploy globally with confidence. I design interfaces that are effortless to use, appearing local to every user.
                        </p>
                    </motion.div>

                </div>
            </div>

            {/* =========================================
                MOBILE LAYOUT (STATIC VERTICAL STACK)
               ========================================= */}
            <div className="block md:hidden pb-20 pt-32 px-6">

                {/* Intro */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold tracking-tight text-neutral-900 mb-6 drop-shadow-sm">
                        Your Vision.<br />
                        Engineered.
                    </h1>
                    <p className="text-lg text-neutral-600 font-normal leading-relaxed">
                        I build high-performance web applications and tools that help your business scale.
                    </p>
                </div>

                <div className="flex flex-col gap-16">
                    {/* Feature 1: Reliability */}
                    <div className="space-y-6">
                        <MainStatsGraph className="w-full h-[300px] shadow-lg border border-blue-100 rounded-2xl" />
                        <div>
                            <div className="flex items-center gap-2 mb-2 text-green-600">
                                <CheckCircle2 size={24} />
                                <span className="font-mono text-sm uppercase tracking-wider">Reliability</span>
                            </div>
                            <h2 className="text-3xl font-bold text-neutral-900 mb-3">Production Ready</h2>
                            <p className="text-neutral-500">I deliver robust, type-safe code that scales with your user base.</p>
                        </div>
                    </div>

                    {/* Feature 2: Security */}
                    <div className="space-y-6">
                        <SecurityCard className="w-full h-[250px] shadow-lg border border-green-100 rounded-2xl" />
                        <div>
                            <div className="flex items-center gap-2 mb-2 text-emerald-600">
                                <Shield size={24} />
                                <span className="font-mono text-sm uppercase tracking-wider">Security</span>
                            </div>
                            <h2 className="text-3xl font-bold text-neutral-900 mb-3">Secure & Automated</h2>
                            <p className="text-neutral-500">Built-in security best practices and automated workflows.</p>
                        </div>
                    </div>

                    {/* Feature 3: Global */}
                    <div className="space-y-6">
                        <GlobeCard className="w-full h-[250px] shadow-lg border border-indigo-100 rounded-2xl" />
                        <div>
                            <div className="flex items-center gap-2 mb-2 text-indigo-600">
                                <Globe size={24} />
                                <span className="font-mono text-sm uppercase tracking-wider">Global Scale</span>
                            </div>
                            <h2 className="text-3xl font-bold text-neutral-900 mb-3">Seamless UI/UX</h2>
                            <p className="text-neutral-500">Deploy globally with confidence. Interfaces that feel local.</p>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};
