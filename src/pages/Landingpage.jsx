import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Mic,
    Activity,
    Megaphone,
    BookOpen,
    PieChart,
    UserCheck,
    Globe,
    Database,
    Users,
    BrainCircuit,
    ShieldCheck,
    ServerCog,
    ChevronRight,
} from "lucide-react";

// Theme Configuration
const theme = {
    maroon: "#6A1B2D",
    sand: "#F5E6C4",
    gold: "#C79A00",
    charcoal: "#1E1E1E",
};

export default function Landingpage() {
    return (
        <div className="bg-[#F5E6C4] text-[#1E1E1E] w-full min-h-screen font-sans selection:bg-[#C79A00] selection:text-[#6A1B2D] overflow-x-hidden">
            {/* SECTION 1 - HERO */}
            <section className="relative min-h-screen flex items-center justify-center p-8 overflow-hidden bg-gradient-to-b from-[#6A1B2D] to-[#4A101D] text-[#F5E6C4]">
                {/* Subtle Background Outline */}
                <div className="absolute inset-0 z-0 opacity-5 pointer-events-none flex items-end justify-center">
                    {/* Abstract representation of temple skyline */}
                    <svg viewBox="0 0 1440 320" className="w-full h-auto" fill="currentColor">
                        <path d="M0,288L48,272C96,256,192,224,288,202.7C384,181,480,171,576,176C672,181,768,203,864,197.3C960,192,1056,160,1152,149.3C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
                    {/* Voice Wave Animation */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
                        }}
                        className="flex items-center justify-center gap-1 mb-6"
                    >
                        {[1, 2, 3, 2, 1].map((h, i) => (
                            <motion.div
                                key={i}
                                variants={{
                                    hidden: { height: 0 },
                                    visible: { height: h * 12, transition: { repeat: Infinity, repeatType: "reverse", duration: 0.8, delay: i * 0.1 } },
                                }}
                                className="w-1.5 bg-[#C79A00] rounded-full"
                            />
                        ))}
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-7xl md:text-8xl font-serif font-bold tracking-tight mb-4"
                    >
                        KURAL
                    </motion.h1>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-2xl md:text-3xl font-light tracking-wide text-[#C79A00] mb-8 uppercase"
                    >
                        AI-Powered Public Intelligence <br className="hidden md:block" /> & Welfare Activation Engine
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl mb-10 font-serif italic max-w-3xl leading-relaxed"
                    >
                        "Bridging Citizen Voices to Real-Time Governance"
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-lg md:text-xl font-light max-w-3xl mb-12 text-[#F5E6C4]/80 leading-relaxed"
                    >
                        KURAL is a voice-first governance intelligence platform that proactively connects with citizens, identifies eligible welfare schemes, and transforms real-time feedback into measurable administrative action.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col items-center"
                    >
                        <Link
                            to="/dashboard"
                            className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-[#6A1B2D] bg-[#C79A00] hover:bg-[#F5E6C4] transition-all duration-300 shadow-[0_4px_14px_0_rgba(199,154,0,0.39)] uppercase tracking-wider"
                        >
                            Explore the System
                            <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <p className="mt-6 text-sm text-[#C79A00] uppercase tracking-widest font-semibold flex items-center gap-2">
                            Built for inclusive, multilingual public outreach
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Decorative Divider */}
            <div className="w-full flex justify-center -mt-6 relative z-20">
                <div className="w-12 h-12 bg-[#F5E6C4] rotate-45 border-4 border-[#6A1B2D]"></div>
            </div>

            {/* SECTION 2 - THE PROBLEM */}
            <section className="py-24 px-8 bg-[#F5E6C4]">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-sm uppercase tracking-widest text-[#6A1B2D] font-bold mb-4 border-l-4 border-[#6A1B2D] pl-4">Context</h3>
                        <h2 className="text-5xl font-serif text-[#1E1E1E] leading-tight mb-16">
                            The Governance Gap
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                        {[
                            {
                                icon: <Megaphone className="w-8 h-8" />,
                                title: "Reactive Grievance Systems",
                                desc: "Governance platforms rely on citizens to initiate complaints, creating access barriers for digitally excluded populations.",
                            },
                            {
                                icon: <Activity className="w-8 h-8" />,
                                title: "Welfare Awareness Gap",
                                desc: "Eligible citizens remain unaware of schemes they qualify for, leading to underutilized public funds.",
                            },
                            {
                                icon: <BookOpen className="w-8 h-8" />,
                                title: "Enrollment Complexity",
                                desc: "No structured guidance explaining eligibility, documentation, and enrollment in native language formats.",
                            },
                            {
                                icon: <PieChart className="w-8 h-8" />,
                                title: "No Real-Time Visibility",
                                desc: "Lack of unified integration between citizen issues and scheme eligibility data.",
                            },
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="bg-white p-8 border border-[#1E1E1E]/10 hover:border-[#C79A00] transition-colors relative group"
                            >
                                <div className="text-[#6A1B2D] mb-6">{item.icon}</div>
                                <h4 className="text-2xl font-serif mb-4 text-[#1E1E1E]">{item.title}</h4>
                                <p className="text-[#1E1E1E]/70 leading-relaxed font-light">{item.desc}</p>
                                <div className="absolute top-0 right-0 w-8 h-8 bg-[#F5E6C4] translate-x-1/2 -translate-y-1/2 rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_rgba(0,0,0,0.05)] border border-[#C79A00]/20"></div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center bg-[#6A1B2D] p-12 text-[#F5E6C4] relative"
                    >
                        {/* Subtle corner elements */}
                        <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#C79A00]"></div>
                        <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#C79A00]"></div>
                        <h3 className="text-2xl md:text-4xl font-serif font-light leading-snug max-w-4xl mx-auto">
                            "Governance fails when citizen problems go unheard — and when welfare benefits do not reach the eligible."
                        </h3>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 3 - THE SOLUTION */}
            <section className="py-24 px-8 bg-white border-t border-[#1E1E1E]/5">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-20 text-center"
                    >
                        <h3 className="text-sm uppercase tracking-widest text-[#6A1B2D] font-bold mb-4">Infrastructure</h3>
                        <h2 className="text-5xl font-serif text-[#1E1E1E] leading-tight">
                            Voice-First Public Intelligence
                        </h2>
                    </motion.div>

                    {/* Alternating Feature Blocks */}
                    {[
                        {
                            title: "Multilingual AI Calling Engine",
                            desc: "Outbound voice communication in native languages — no apps, no portals, no digital barriers.",
                            icon: <Mic className="w-16 h-16 text-[#C79A00]" />,
                        },
                        {
                            title: "Intelligent Scheme Matching",
                            desc: "Automatically maps citizen demographic and economic data to eligible government schemes.",
                            icon: <UserCheck className="w-16 h-16 text-[#C79A00]" />,
                        },
                        {
                            title: "Context-Aware Issue Intelligence",
                            desc: "Captures ward-level issues, remembers interaction history, and generates structured administrative insights.",
                            icon: <BrainCircuit className="w-16 h-16 text-[#C79A00]" />,
                        },
                        {
                            title: "Proactive Welfare Activation",
                            desc: "Guides beneficiaries through documentation and enrollment via conversational AI.",
                            icon: <ShieldCheck className="w-16 h-16 text-[#C79A00]" />,
                        },
                    ].map((feature, idx) => (
                        <div key={idx} className={`flex flex-col md:flex-row items-center gap-12 mb-20 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                            <motion.div
                                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="w-full md:w-1/2"
                            >
                                <div className="mb-6 flex items-center justify-center w-24 h-24 bg-[#6A1B2D] text-[#C79A00] rounded-none">
                                    {feature.icon}
                                </div>
                                <h4 className="text-3xl font-serif text-[#1E1E1E] mb-4">{feature.title}</h4>
                                <p className="text-xl font-light text-[#1E1E1E]/70">{feature.desc}</p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="w-full md:w-1/2 flex justify-center"
                            >
                                {/* Abstract Governance Illustration Placeholder */}
                                <div className="w-full max-w-md aspect-square bg-[#F5E6C4] flex items-center justify-center relative border border-[#6A1B2D]/10 overflow-hidden group">
                                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#C79A00] via-transparent to-transparent group-hover:scale-110 transition-transform duration-1000"></div>
                                    {/* Geometric illustration */}
                                    <div className="grid grid-cols-4 grid-rows-4 w-3/4 h-3/4 gap-2 opacity-50">
                                        {[...Array(16)].map((_, i) => (
                                            <div key={i} className={`bg-[#6A1B2D] ${i % 3 === 0 ? 'opacity-100' : 'opacity-20'} ${i % 5 === 0 ? 'rounded-full' : ''}`}></div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ))}

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mt-32"
                    >
                        <p className="text-2xl font-serif text-[#6A1B2D] max-w-3xl mx-auto italic">
                            "KURAL transforms citizen data into measurable administrative action."
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 4 - HOW IT WORKS */}
            <section className="py-24 px-8 bg-[#1E1E1E] text-[#F5E6C4] overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-20 text-center"
                    >
                        <h3 className="text-sm uppercase tracking-widest text-[#C79A00] font-bold mb-4">Process</h3>
                        <h2 className="text-5xl font-serif text-white leading-tight">
                            How It Works
                        </h2>
                    </motion.div>

                    <div className="relative">
                        {/* Connecting Line hidden on mobile */}
                        <div className="hidden md:block absolute top-[45px] left-0 w-full h-[1px] bg-[#6A1B2D] z-0"></div>

                        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 relative z-10">
                            {[
                                { title: "Citizen Data", desc: "Aggregated input." },
                                { title: "Eligibility Engine", desc: "Automated mapping." },
                                { title: "Campaign Segmentation", desc: "Targeted lists." },
                                { title: "AI Voice Outreach", desc: "Vernacular calls." },
                                { title: "Governance Dashboard", desc: "Real-time view." },
                                { title: "Actionable Insights", desc: "Data execution." }
                            ].map((step, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                                    className="flex flex-col items-center text-center"
                                >
                                    <div className="w-6 h-6 bg-[#C79A00] mb-6 shadow-[0_0_15px_#C79A00] rounded-sm transform rotate-45 flex items-center justify-center">
                                        <div className="w-2 h-2 bg-[#1E1E1E] rounded-full"></div>
                                    </div>
                                    <h4 className="text-lg font-serif mb-2 text-white">{step.title}</h4>
                                    <p className="text-sm text-[#F5E6C4]/60 font-light">{step.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 5 - TAMIL NADU INTELLIGENCE VIEW */}
            <section className="py-24 px-8 bg-[#F5E6C4]">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="w-full md:w-1/2"
                        >
                            <h3 className="text-sm uppercase tracking-widest text-[#6A1B2D] font-bold mb-4 border-l-4 border-[#6A1B2D] pl-4">Analytics</h3>
                            <h2 className="text-5xl font-serif text-[#1E1E1E] leading-tight mb-8">
                                Localized Governance Intelligence
                            </h2>
                            <p className="text-xl font-light text-[#1E1E1E]/80 mb-10 leading-relaxed">
                                Ward-level and district-level aggregation transforms ground-level voices into administrative clarity. Uncover hyper-local trends instantly.
                            </p>

                            <ul className="space-y-6">
                                {[
                                    "District eligibility distribution tracking",
                                    "Scheme reach imbalance detection",
                                    "Targeted outreach campaigns generation"
                                ].map((item, idx) => (
                                    <motion.li
                                        key={idx}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.2 }}
                                        className="flex items-start gap-4"
                                    >
                                        <div className="mt-1 w-2 h-2 bg-[#6A1B2D] "></div>
                                        <span className="text-lg font-medium text-[#1E1E1E]">{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="w-full md:w-1/2"
                        >
                            {/* Mock Heatmap Visual */}
                            <div className="w-full aspect-square bg-[#1E1E1E] flex flex-col items-center justify-center p-8 relative overflow-hidden group border border-[#6A1B2D]/20">
                                <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-1 opacity-20">
                                    {[...Array(64)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="bg-[#C79A00] transition-opacity duration-1000"
                                            style={{ opacity: Math.random() * 0.8 + 0.1 }}
                                        ></div>
                                    ))}
                                </div>
                                {/* Abstract map overlay */}
                                <Globe className="w-48 h-48 text-[#F5E6C4] opacity-20 absolute z-10 group-hover:scale-105 transition-transform duration-700" strokeWidth={1} />
                                <div className="relative z-20 text-[#F5E6C4] text-center bg-[#1E1E1E]/80 p-6 backdrop-blur-sm border border-[#6A1B2D]">
                                    <h4 className="font-serif text-2xl text-[#C79A00] mb-2">Tamil Nadu State Overview</h4>
                                    <p className="font-mono text-sm tracking-widest uppercase">Live Intelligence Grid</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* SECTION 6 - IMPACT */}
            <section className="py-24 px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-20 text-center"
                    >
                        <h3 className="text-sm uppercase tracking-widest text-[#6A1B2D] font-bold mb-4">Value Proposition</h3>
                        <h2 className="text-5xl font-serif text-[#1E1E1E] leading-tight max-w-4xl mx-auto">
                            From Feedback Collection to Execution-Driven Governance
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {[
                            {
                                target: "For Government",
                                desc: "Data-driven decisions. Reduced grievance backlog. Measurable scheme outreach.",
                                icon: <Database className="w-8 h-8 text-[#6A1B2D]" />
                            },
                            {
                                target: "For Citizens",
                                desc: "Phone-based access. Native-language guidance. No digital complexity.",
                                icon: <Users className="w-8 h-8 text-[#6A1B2D]" />
                            },
                            {
                                target: "For Administrators",
                                desc: "Ward-level clarity. Real-time intelligence dashboards. Campaign monitoring.",
                                icon: <ServerCog className="w-8 h-8 text-[#6A1B2D]" />
                            }
                        ].map((panel, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-[#F5E6C4] p-10 border-t-4 border-[#6A1B2D]"
                            >
                                <div className="mb-6">{panel.icon}</div>
                                <h4 className="text-2xl font-serif text-[#1E1E1E] mb-4">{panel.target}</h4>
                                <p className="text-[#1E1E1E]/80 font-light leading-relaxed">{panel.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* SDG aesthetic row */}
                    <div className="flex justify-center gap-4 flex-wrap">
                        {[1, 9, 10, 16].map((sdg) => (
                            <div key={sdg} className="w-12 h-12 bg-[#1E1E1E] text-white flex items-center justify-center font-bold font-serif shadow-sm">
                                #{sdg}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 7 - TECHNOLOGY FOUNDATION */}
            <section className="py-24 px-8 bg-[#1E1E1E] text-white">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-serif text-[#F5E6C4] mb-16"
                    >
                        Built on Open & Scalable AI Infrastructure
                    </motion.h2>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[#C79A00]/20 border border-[#C79A00]/20">
                        {[
                            "Speech-to-Text Engine",
                            "Text-to-Speech Engine",
                            "LLM-based Reasoning Layer",
                            "PostgreSQL Intelligence Views",
                            "React Admin Dashboard",
                            "Role-Based Access Architecture"
                        ].map((tech, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-[#1E1E1E] p-8 flex items-center justify-center text-center hover:bg-[#2A2A2A] transition-colors"
                            >
                                <span className="font-mono text-sm tracking-widest text-[#F5E6C4] uppercase">{tech}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 8 - FUTURE VISION */}
            <section className="py-32 px-8 bg-[#F5E6C4] text-center border-b border-[#6A1B2D]/20">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-serif text-[#6A1B2D] leading-tight mb-8">
                            Towards Inclusive, Scalable Governance
                        </h2>
                        <div className="w-24 h-1 bg-[#C79A00] mx-auto mb-8"></div>
                        <p className="text-xl text-[#1E1E1E]/80 font-light leading-relaxed mb-6">
                            Designed to integrate with government beneficiary databases under proper authorization.
                        </p>
                        <p className="text-xl text-[#1E1E1E]/80 font-light leading-relaxed mb-6">
                            Scalable state-wide deployment.
                        </p>
                        <p className="text-xl text-[#1E1E1E]/80 font-light leading-relaxed">
                            Expand to multilingual and sector-specific governance intelligence.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-[#6A1B2D] text-[#F5E6C4] py-12 px-8 border-t-4 border-[#C79A00] flex flex-col items-center justify-center text-center">
                <h2 className="text-2xl font-serif mb-4 tracking-wider">KURAL</h2>
                <p className="text-[#F5E6C4]/80 font-light italic mb-6">Bridging Citizen Voices to Real-Time Governance</p>
                <p className="text-xs uppercase tracking-widest text-[#C79A00] font-bold">
                    Hackathon Build | Social Impact & Quality of Life Theme
                </p>
            </footer>
        </div>
    );
}
