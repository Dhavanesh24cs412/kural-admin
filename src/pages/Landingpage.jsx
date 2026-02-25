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
import tiruvalluvar from "../assets/tiruvalluvar.jpg";
import governanceBg from "../assets/governance.jpg";
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
            <section className="relative min-h-screen flex items-center justify-center p-8 overflow-hidden text-[#F5E6C4]">
                {/* Hero Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={tiruvalluvar}
                        alt="Tamil Nadu Temple Landscape"
                        className="w-full h-full object-cover"
                    />
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-[#4A101D]/70"></div>
                </div>
                {/* Subtle Background Outline */}
                <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
                    {/* Voice Wave Animation */}
                    <div
                        className="flex items-center justify-center gap-1 mb-6"
                    >
                        {[1, 2, 3, 2, 1].map((h, i) => (
                            <div
                                key={i}
                                className="w-1.5 bg-[#C79A00] rounded-full"
                            />
                        ))}
                    </div>
                    {/* Voice Wave Animation */}
                    <div className="flex items-end justify-center gap-2 mb-8 h-10">
                        {[4, 10, 18, 28, 18, 10, 4].map((h, i) => (
                            <motion.div
                                key={i}
                                className="w-1.5 bg-[#C79A00] rounded-full"
                                animate={{ height: [h, h + 10, h] }}
                                transition={{
                                    duration: 1.2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: i * 0.1
                                }}
                                style={{ height: h }}
                            />
                        ))}
                    </div>
                    <h1
                        className="text-7xl md:text-8xl font-serif font-bold tracking-tight mb-4"
                    >
                        KURAL
                    </h1>
                    <h2
                        className="text-2xl md:text-3xl font-light tracking-wide text-[#C79A00] mb-8 uppercase"
                    >
                        AI-Powered Public Intelligence <br className="hidden md:block" /> & Welfare Activation Engine
                    </h2>

                    <p
                        className="text-xl md:text-2xl mb-10 font-serif italic max-w-3xl leading-relaxed"
                    >
                        "Bridging Citizen Voices to Real-Time Governance"
                    </p>
                    <p
                        className="text-lg md:text-xl font-light max-w-3xl mb-12 text-[#F5E6C4]/80 leading-relaxed"
                    >
                        KURAL is a voice-first governance intelligence platform that proactively connects with citizens, identifies eligible welfare schemes, and transforms real-time feedback into measurable administrative action.
                    </p>

                    <div
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
                    </div>
                </div>
            </section>

            {/* Decorative Divider */}
            <div className="w-full flex justify-center -mt-6 relative z-20">
                <div className="w-12 h-12 bg-[#F5E6C4] rotate-45 border-4 border-[#6A1B2D]"></div>
            </div>

            {/* SECTION 2 - THE PROBLEM */}
            <section className="relative py-24 px-8 text-[#1E1E1E]">
                {/* Section Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={governanceBg}
                        alt="Governance Background"
                        className="w-full h-full object-cover"
                    />
                    {/* Light Sand Overlay for readability */}
                    <div className="absolute inset-0 bg-[#F5E6C4]/80"></div>
                </div>
                <div className="relative z-10 max-w-6xl mx-auto">
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
<section className="py-32 px-6 md:px-12 bg-white border-t border-[#1E1E1E]/5">
    <div className="max-w-5xl mx-auto">

        {/* Section Heading */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-24 text-center"
        >
            <h3 className="text-sm uppercase tracking-widest text-[#6A1B2D] font-bold mb-4">
                Infrastructure
            </h3>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1E1E1E] leading-tight mb-6">
                Voice-First Public Intelligence Engine
            </h2>
            <p className="text-lg md:text-xl text-[#1E1E1E]/70 font-light max-w-2xl mx-auto">
                A structured AI system that connects citizen data, scheme eligibility,
                and multilingual outreach into one unified governance execution layer.
            </p>
        </motion.div>

        {/* Stack Blocks */}
        <div className="space-y-24">

            {[
                {
                    title: "Multilingual AI Calling Engine",
                    desc: "Automated outbound voice calls delivered in native languages, ensuring inclusive access across literacy and digital divides.",
                },
                {
                    title: "Intelligent Scheme Matching",
                    desc: "Deterministic eligibility evaluation using verified citizen data to identify relevant welfare schemes at scale.",
                },
                {
                    title: "Context-Aware Issue Intelligence",
                    desc: "Captures and classifies citizen responses into structured ward-level insights for measurable administrative visibility.",
                },
                {
                    title: "Proactive Welfare Activation",
                    desc: "Guides beneficiaries step-by-step on required documents and enrollment processes, increasing scheme utilization efficiency.",
                },
            ].map((item, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="relative pl-10 md:pl-16 border-l-4 border-[#6A1B2D]"
                >
                    <span className="absolute -left-5 md:-left-7 top-0 w-10 h-10 flex items-center justify-center text-sm font-bold bg-[#6A1B2D] text-white rounded-full">
                        {`0${idx + 1}`}
                    </span>

                    <h4 className="text-2xl md:text-3xl font-serif text-[#1E1E1E] mb-4">
                        {item.title}
                    </h4>

                    <p className="text-lg text-[#1E1E1E]/70 font-light leading-relaxed max-w-3xl">
                        {item.desc}
                    </p>
                </motion.div>
            ))}

        </div>

        {/* Closing Statement */}
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mt-32"
        >
            <p className="text-2xl font-serif text-[#6A1B2D] italic">
                Governance intelligence, transformed into direct citizen engagement.
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
