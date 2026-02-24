import React, { useState, useEffect, useMemo } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { geoCentroid } from "d3-geo";
import tnGeoJsonUrl from "../assets/tamilnadu_districts.geojson?url";
import { supabase } from '../lib/supabaseClient';
import PageHeader from '../components/common/PageHeader';

const VIEW_MODES = [
    { id: 'citizens', label: 'Citizens' },
    { id: 'schemes', label: 'Schemes' },
    { id: 'ratio', label: 'Imbalance Ratio' },
];

export default function GeoMonitoring() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('citizens');
    const [selectedDistrict, setSelectedDistrict] = useState(null);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const { data: summaryData, error } = await supabase
                .from('district_eligibility_summary')
                .select('*');

            if (!error && summaryData) {
                // Sort alphabetically by default
                setData(summaryData.sort((a, b) => a.district.localeCompare(b.district)));
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    const maxValues = useMemo(() => {
        if (!data.length) return { citizens: 0, schemes: 0, ratio: 0 };
        return {
            citizens: Math.max(...data.map(d => d.total_eligible_citizens || 0)),
            schemes: Math.max(...data.map(d => d.total_unique_schemes || 0)),
            ratio: Math.max(...data.map(d => d.citizen_scheme_ratio || 0))
        };
    }, [data]);

    // Fast lookup map for district matching
    const districtMap = useMemo(() => {
        const map = {};
        data.forEach(d => {
            if (d.district) {
                map[d.district.trim().toLowerCase()] = d;
            }
        });
        return map;
    }, [data]);

    const getColorIntensity = (item) => {
        let value, max;
        if (viewMode === 'citizens') {
            value = item.total_eligible_citizens || 0;
            max = maxValues.citizens;
        } else if (viewMode === 'schemes') {
            value = item.total_unique_schemes || 0;
            max = maxValues.schemes;
        } else {
            value = item.citizen_scheme_ratio || 0;
            max = maxValues.ratio;
        }

        if (max === 0) return 0;
        return Math.max(0.1, value / max); // Minimum 10% opacity for visibility
    };

    const getMetricValue = (item) => {
        if (viewMode === 'citizens') return item.total_eligible_citizens?.toLocaleString() || '0';
        if (viewMode === 'schemes') return item.total_unique_schemes?.toLocaleString() || '0';
        return item.citizen_scheme_ratio?.toFixed(2) || '0.00';
    };

    const getMetricLabel = () => {
        if (viewMode === 'citizens') return 'Eligible Citizens';
        if (viewMode === 'schemes') return 'Available Schemes';
        return 'Citizens per Scheme';
    };

    return (
        <div className="relative min-h-screen bg-slate-50/30">
            <PageHeader
                title="Geographic Monitoring"
                subtitle="Territorial distribution of scheme eligibility and citizen density"
            />

            <div className="mb-8 flex items-center justify-between border-b border-slate-200 pb-6">
                <div className="flex gap-2 p-1 bg-slate-200/50 rounded-lg shrink-0">
                    {VIEW_MODES.map(mode => (
                        <button
                            key={mode.id}
                            onClick={() => setViewMode(mode.id)}
                            className={`
                px-5 py-2.5 rounded-md text-sm font-bold font-sans uppercase tracking-wider transition-all
                ${viewMode === mode.id
                                    ? 'bg-white text-primary shadow-sm ring-1 ring-slate-200/50'
                                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
                                }
              `}
                        >
                            {mode.label}
                        </button>
                    ))}
                </div>

                <div className="text-right">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-sans mb-1">
                        Displaying
                    </div>
                    <div className="text-sm text-slate-800 font-medium font-body flex items-center justify-end gap-2">
                        <span className="w-3 h-3 rounded-full bg-accent opacity-20"></span>
                        Low
                        <span className="w-3 h-3 rounded-full bg-accent opacity-100 ml-2"></span>
                        High {getMetricLabel()}
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center p-12 text-slate-400 font-mono text-sm uppercase tracking-widest animate-pulse">
                    Loading Intelligence Data...
                </div>
            ) : (
                <div className="flex flex-col gap-8">
                    <div className="w-full border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-100">
                            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">
                                Tamil Nadu District Intelligence Map
                            </h2>
                        </div>

                        <div className="w-full h-[600px] bg-slate-100 relative">
                            <ComposableMap
                                projection="geoMercator"
                                projectionConfig={{
                                    center: [78.6569, 11.1271], // Tamil Nadu center
                                    scale: 4500
                                }}
                                style={{ width: "100%", height: "100%" }}
                            >
                                <Geographies geography={tnGeoJsonUrl}>
                                    {({ geographies }) =>
                                        geographies.map((geo) => {
                                            const districtName = geo.properties.NAME_2;

                                            const matchedData =
                                                districtName &&
                                                districtMap[districtName.trim().toLowerCase()];

                                            const intensity = matchedData
                                                ? getColorIntensity(matchedData)
                                                : 0;

                                            let fillColor = "#e2e8f0"; // default no-data gray

                                            if (matchedData) {
                                                if (intensity > 0.75) fillColor = "#075985";
                                                else if (intensity > 0.5) fillColor = "#0284c7";
                                                else if (intensity > 0.25) fillColor = "#38bdf8";
                                                else fillColor = "#7dd3fc";
                                            }

                                            // Proper geographic centroid calculation
                                            const centroid = geoCentroid(geo);

                                            return (
                                                <React.Fragment key={geo.rsmKey}>

                                                    {/* District Shape */}
                                                    <Geography
                                                        geography={geo}
                                                        fill={fillColor}
                                                        stroke="#94a3b8"
                                                        strokeWidth={0.8}
                                                        style={{
                                                            default: { outline: "none" },
                                                            hover: {
                                                                fill: "#0f172a",
                                                                stroke: "#000",
                                                                strokeWidth: 1.2,
                                                                outline: "none",
                                                                cursor: "pointer"
                                                            },
                                                            pressed: { outline: "none" }
                                                        }}
                                                        onClick={() => {
                                                            if (matchedData) {
                                                                setSelectedDistrict(matchedData);
                                                            }
                                                        }}
                                                    />

                                                    {/* District Label */}
                                                    <Marker coordinates={centroid}>
                                                        <text
                                                            textAnchor="middle"
                                                            style={{
                                                                fontFamily: "monospace",
                                                                fontSize: "8px",
                                                                fill: "#1e293b",
                                                                pointerEvents: "none"
                                                            }}
                                                        >
                                                            {districtName}
                                                        </text>
                                                    </Marker>

                                                </React.Fragment>
                                            );
                                        })
                                    }
                                </Geographies>
                            </ComposableMap>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {data.map(district => {
                            const intensity = getColorIntensity(district);

                            return (
                                <button
                                    key={district.district}
                                    onClick={() => setSelectedDistrict(district)}
                                    className="group relative flex flex-col text-left overflow-hidden rounded-xl border border-slate-200 bg-white transition-all hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-accent/50"
                                >
                                    {/* Background Intensity Indicator */}
                                    <div
                                        className="absolute inset-0 bg-accent transition-opacity duration-500 group-hover:opacity-10"
                                        style={{ opacity: intensity * 0.15 }}
                                    />

                                    {/* Content */}
                                    <div className="relative p-5 z-10 flex flex-col h-full bg-white/60 backdrop-blur-sm group-hover:bg-white/40 transition-colors">
                                        <h3 className="text-lg font-bold text-slate-900 mb-1 leading-tight group-hover:text-accent transition-colors">
                                            {district.district}
                                        </h3>
                                        <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">
                                            TN Region
                                        </p>

                                        <div className="mt-auto">
                                            <div className="text-2xl font-black text-slate-800 tabular-nums">
                                                {getMetricValue(district)}
                                            </div>
                                            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                                                {getMetricLabel()}
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>
            )
            }

            {/* RIGHT SLIDE-IN PANEL */}
            <div
                className={[
                    "fixed top-0 right-0 h-full w-[450px] bg-white border-l border-slate-200 z-50 shadow-2xl",
                    "transform transition-transform duration-300 ease-in-out font-sans",
                    selectedDistrict ? "translate-x-0" : "translate-x-full",
                ].join(" ")}
            >
                {selectedDistrict && (
                    <div className="h-full flex flex-col">
                        <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                            <div className="text-[10px] uppercase tracking-widest font-bold text-accent mb-3 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                                Live Intelligence View
                            </div>
                            <div className="text-3xl font-black text-slate-900 leading-tight uppercase tracking-tight">
                                {selectedDistrict.district}
                            </div>
                            <div className="text-sm text-slate-500 mt-2 font-mono uppercase tracking-widest">
                                Tamil Nadu, India
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 bg-white">
                            {/* Primary Stats Row */}
                            <div className="grid grid-cols-2 gap-px bg-slate-100 rounded-xl overflow-hidden mb-8 border border-slate-100">
                                <div className="bg-white p-5">
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                                        Total Citizens
                                    </div>
                                    <div className="text-2xl font-black text-slate-800 tabular-nums">
                                        {selectedDistrict.total_citizens?.toLocaleString() || '0'}
                                    </div>
                                </div>
                                <div className="bg-white p-5">
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2">
                                        Eligible
                                    </div>
                                    <div className="text-2xl font-black text-accent tabular-nums">
                                        {selectedDistrict.total_eligible_citizens?.toLocaleString() || '0'}
                                    </div>
                                </div>
                            </div>

                            {/* Secondary Metrics */}
                            <div className="space-y-6">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-100 pb-2">
                                    System Metrics
                                </h4>

                                <div className="grid grid-cols-2 gap-6">
                                    <MetricBlock
                                        label="Available Schemes"
                                        value={selectedDistrict.total_unique_schemes}
                                    />
                                    <MetricBlock
                                        label="Citizen/Scheme Ratio"
                                        value={selectedDistrict.citizen_scheme_ratio?.toFixed(2)}
                                    />
                                </div>

                                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-100 pb-2 pt-4">
                                    Demographic Breakdown
                                </h4>

                                <div className="space-y-4">
                                    <RowMetric
                                        label="Women Eligible"
                                        value={selectedDistrict.women_eligible_count}
                                        total={selectedDistrict.total_eligible_citizens}
                                    />
                                    <RowMetric
                                        label="Farmers Eligible"
                                        value={selectedDistrict.farmer_eligible_count}
                                        total={selectedDistrict.total_eligible_citizens}
                                    />
                                    <RowMetric
                                        label="Disabled Eligible"
                                        value={selectedDistrict.disabled_eligible_count}
                                        total={selectedDistrict.total_eligible_citizens}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-slate-100 bg-slate-50">
                            <button
                                onClick={() => setSelectedDistrict(null)}
                                className="w-full h-12 bg-slate-900 rounded-md font-bold text-white hover:bg-slate-800 transition-all uppercase tracking-widest text-xs shadow-md"
                            >
                                Close Intelligence Panel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
}

function MetricBlock({ label, value }) {
    return (
        <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-sans mb-1">
                {label}
            </div>
            <div className="text-lg text-slate-800 font-bold font-mono tabular-nums">
                {value?.toLocaleString() ?? "—"}
            </div>
        </div>
    );
}

function RowMetric({ label, value, total }) {
    const percentage = total > 0 ? ((value || 0) / total) * 100 : 0;

    return (
        <div className="flex items-center justify-between group">
            <div className="flex flex-col">
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-900 transition-colors">
                    {label}
                </span>
                <span className="text-xs font-medium text-slate-400">
                    {value?.toLocaleString() || '0'} citizens
                </span>
            </div>
            <div className="flex items-center gap-3">
                <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-slate-400 group-hover:bg-accent transition-all duration-500 ease-out"
                        style={{ width: `${percentage}%` }}
                    />
                </div>
                <div className="text-xs font-mono font-bold text-slate-700 w-9 text-right tabular-nums">
                    {percentage.toFixed(0)}%
                </div>
            </div>
        </div>
    );
}
