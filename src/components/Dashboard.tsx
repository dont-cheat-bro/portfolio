import type { ReactNode } from 'react';
import { BarChart3, Users, Globe, Activity, TrendingUp, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const Card = ({ children, className, style }: { children: ReactNode; className?: string; style?: any }) => (
    <motion.div
        style={style}
        className={`bg-white/60 backdrop-blur-2xl border border-white/50 p-6 rounded-3xl flex flex-col gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500 ${className}`}
    >
        {children}
    </motion.div>
);

export const MainStatsGraph = ({ className, style }: { className?: string, style?: any }) => (
    <Card className={className} style={style}>
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-neutral-500">
                <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                    <Activity size={18} />
                </div>
                <span className="text-sm font-semibold tracking-wide">System Performance</span>
            </div>
            <span className="text-emerald-600 text-sm font-bold bg-emerald-50 px-2 py-1 rounded-lg">+24.5%</span>
        </div>
        <div className="flex-1 flex items-end justify-between gap-2 h-full">
            {[40, 70, 45, 90, 65, 80, 55, 95].map((h, i) => (
                <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="w-full bg-gradient-to-t from-blue-600 to-indigo-500 rounded-t-sm opacity-80"
                />
            ))}
        </div>
    </Card>
);

export const UserStatsCard = ({ className, style }: { className?: string, style?: any }) => (
    <Card className={className} style={style}>
        <div className="flex items-center gap-2 text-neutral-500 mb-2">
            <Users size={20} />
            <span className="text-sm">Active Users</span>
        </div>
        <div className="text-4xl font-bold text-neutral-900">12.5k</div>
        <div className="text-xs text-neutral-500 mt-1">Global coverage</div>
    </Card>
);

export const SecurityCard = ({ className, style }: { className?: string, style?: any }) => (
    <Card className={className} style={style}>
        <div className="flex items-center gap-2 text-neutral-500 mb-2">
            <div className="p-2 bg-green-50 rounded-xl text-green-600">
                <ShieldCheck size={18} />
            </div>
            <span className="text-sm font-semibold">Security Status</span>
        </div>
        <div className="flex items-center gap-3 mt-2 bg-green-50/50 p-3 rounded-xl border border-green-100">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.4)]" />
            <span className="text-green-700 font-bold text-sm">System Secure</span>
        </div>
    </Card>
);

export const RevenueCard = ({ className, style }: { className?: string, style?: any }) => (
    <Card className={className} style={style}>
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-neutral-500">
                <TrendingUp size={20} />
                <span className="text-sm">Revenue Growth</span>
            </div>
        </div>
        <div className="mt-4 h-2 bg-neutral-100 rounded-full overflow-hidden">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "75%" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-purple-500"
            />
        </div>
    </Card>
);

export const GlobeCard = ({ className, style }: { className?: string, style?: any }) => (
    <Card className={`bg-gradient-to-br from-indigo-50 to-white ${className}`} style={style}>
        <Globe className="text-indigo-200 opacity-50 absolute right-4 bottom-4" size={64} />
        <div className="z-10 relative">
            <div className="text-2xl font-bold text-neutral-900">98%</div>
            <div className="text-xs text-neutral-500">Uptime</div>
        </div>
    </Card>
);

export const AnalyticsCard = ({ className, style }: { className?: string, style?: any }) => (
    <Card className={className} style={style}>
        <div className="flex justify-between items-center mb-2">
            <BarChart3 size={20} className="text-orange-500" />
        </div>
        <div className="text-lg font-semibold text-neutral-900">Analytics</div>
        <div className="text-xs text-neutral-500">Real-time data processing</div>
    </Card>
);

// Backward compatibility or composed view
export const Dashboard = ({ className }: { className?: string }) => {
    return (
        <div className={`grid grid-cols-4 grid-rows-3 gap-4 w-full h-full p-8 ${className}`}>
            <MainStatsGraph className="col-span-2 row-span-2" />
            <UserStatsCard className="col-span-1 row-span-1" />
            <SecurityCard className="col-span-1 row-span-1" />
            <RevenueCard className="col-span-2 row-span-1" />
            <GlobeCard className="col-span-1 row-span-1" />
            <AnalyticsCard className="col-span-1 row-span-1" />
        </div>
    );
};
