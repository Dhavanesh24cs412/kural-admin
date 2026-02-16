import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        role: 'Super Admin'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const roles = [
        'Super Admin',
        'State Admin',
        'District Officer',
        'Ward Officer'
    ];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const verifyUser = async (username, password) => {
        try {
            const { data, error } = await supabase
                .from('authorized_access')
                .select('*')
                .eq('username', username)
                .single();

            if (error) throw error;

            if (data && data.password_hash === password) {
                return { match: true, role: data.role };
            }
            return { match: false };
        } catch (err) {
            console.error('Supabase verification error:', err);
            return { match: false, error: err.message };
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const { username, password, role } = formData;

        try {
            // Local Bypass
            if (username === 'StartupTN' && password === '2026') {
                setTimeout(() => navigate('/dashboard'), 800);
                return;
            }

            // Supabase Auth
            const { match, role: dbRole } = await verifyUser(username, password);

            if (match) {
                if (dbRole && dbRole !== role) {
                    setError('Role mismatch for this user.');
                    setLoading(false);
                    return;
                }
                navigate('/dashboard');
            } else {
                setError('Invalid credentials or access denied.');
            }
        } catch {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F4F7F9] font-['Inter'] p-4">

            {/* Wide Card Container */}
            <div className="w-full max-w-4xl bg-white shadow-sm border border-[#E1E4E8] flex flex-col md:flex-row rounded-sm overflow-hidden relative">

                {/* Gov-Header Accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-[#0A192F] z-10" />

                {/* Left Side: Branding */}
                <div className="md:w-5/12 bg-[#0A192F] p-8 md:p-12 flex flex-col justify-between border-r border-[#E1E4E8]">
                    <div>
                        <div className="flex items-center gap-3 mb-12 mt-13">
                            <div className="w-10 h-10 bg-[#0A192F] flex items-center justify-center rounded-sm">
                                <Shield className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-[#FFFFFF] font-['Public_Sans'] leading-tight tracking-tight">
                                    KURAL
                                </h1>
                                <p className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase">
                                    DATA-DRIVEN DEMOCRACY
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4 mt-8">
                            <h2 className="text-l font-bold text-[#F4F7F9] font-['Public_Sans'] leading-tight">
                                AI-Powered<br />Civic Voice Survey & Governance Intelligence Platform
                            </h2>
                            <p className="text-sm text-gray-500 leading-relaxed font-medium">
                                Empowering transparent governance through multilingual citizenengagement, real-time sentiment analysis, and data-driven policy intelligence.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12">
                        <div className="flex items-center gap-2 text-[#0A192F]/80 mb-2">
                            <div className="w-2 h-2 bg-[#0A192F] rounded-full animate-pulse" />
                            <span className="text-xs font-bold uppercase tracking-wider">System Operational</span>
                        </div>
                        <p className="text-[10px] text-gray-400">v2.4.0-gov-stable</p>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="md:w-7/12 p-8 md:p-12 bg-white relative">
                    <div className="max-w-sm mx-auto">
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-[#1A1C1E] font-['Public_Sans'] mb-1">
                                Secure Login
                            </h2>
                            <p className="text-sm text-gray-500 font-medium">
                                Access the governance intelligence platform
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Role Select */}
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                                    ACCESS ROLE
                                </label>
                                <div className="relative">
                                    <select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        className="w-full p-3 bg-white border border-[#E1E4E8] text-[#1A1C1E] text-sm font-medium rounded-sm focus:border-[#0A192F] focus:ring-1 focus:ring-[#0A192F] outline-none appearance-none transition-all"
                                    >
                                        {roles.map(r => (
                                            <option key={r} value={r}>{r}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-3 top-3.5 pointer-events-none text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                    </div>
                                </div>
                            </div>

                            {/* Username */}
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                                    OFFICIAL EMAIL ID
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-3 text-gray-400">
                                        <User size={16} />
                                    </div>
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        className="w-full pl-9 p-3 bg-white border border-[#E1E4E8] text-[#1A1C1E] text-sm font-medium rounded-sm focus:border-[#0A192F] focus:ring-1 focus:ring-[#0A192F] outline-none transition-all placeholder-gray-300"
                                        placeholder="gov.admin@tn.gov.in"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                                    SECURE PASSKEY
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-3 text-gray-400">
                                        <Lock size={16} />
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full pl-9 p-3 bg-white border border-[#E1E4E8] text-[#1A1C1E] text-sm font-medium rounded-sm focus:border-[#0A192F] focus:ring-1 focus:ring-[#0A192F] outline-none transition-all placeholder-gray-300"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Error */}
                            {error && (
                                <div className="flex items-center gap-2 text-red-700 bg-red-50 p-2.5 rounded-sm text-xs font-medium border border-red-100">
                                    <AlertCircle size={14} />
                                    <span>{error}</span>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#0A192F] text-white h-11 rounded-sm font-bold text-sm tracking-wide hover:bg-[#112d4e] active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-2 shadow-sm"
                            >
                                {loading ? (
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Lock size={14} />
                                        <span>AUTHENTICATE & LOGIN</span>
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Footer Consent */}
                        <div className="mt-8 pt-6 border-t border-[#E1E4E8]">
                            <p className="text-[10px] leading-relaxed text-gray-400 text-justify font-['Inter'] tracking-tight">
                                <span className="font-bold text-gray-500">Consent & Compliance Notice:</span> By logging in, you agree to the data handling policies under the IT Act 2000, Digital Personal Data Protection Act 2023, and applicable government data governance frameworks. All sessions are monitored and logged.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
