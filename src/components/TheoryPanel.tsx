import { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, Grid3x3, Binary, Layers, FlaskConical, Microscope, BookMarked } from 'lucide-react';
import { useLang } from '../App';

export function TheoryPanel() {
  const [expanded, setExpanded] = useState(true);
  const [advancedExpanded, setAdvancedExpanded] = useState(false);
  const { tr } = useLang();

  return (
    <div className="space-y-4">

      {/* ── Basic theory ─────────────────────────────────────── */}
      <div className="panel overflow-hidden">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between p-5 sm:p-6 hover:bg-[var(--card-hi)] transition-colors"
        >
          <h2 className="section-title">
            <BookOpen className="w-4 h-4 text-[var(--accent)]" />
            {tr.theoryTitle}
          </h2>
          {expanded
            ? <ChevronUp className="w-4 h-4 text-[var(--t3)] shrink-0" />
            : <ChevronDown className="w-4 h-4 text-[var(--t3)] shrink-0" />
          }
        </button>

        {expanded && (
          <div className="px-5 sm:px-6 pb-6 space-y-4 animate-fade-up">

            {/* Concept cards */}
            <div className="grid md:grid-cols-3 gap-3">
              <ConceptCard
                icon={<Grid3x3 className="w-4 h-4 text-[var(--accent)]" />}
                title={tr.gridTitle}
                description={tr.gridDesc}
                accent="acl-accent"
              />
              <ConceptCard
                icon={<Layers className="w-4 h-4 text-[var(--amber)]" />}
                title={tr.neighborhoodTitle}
                description={tr.neighborhoodDesc}
                accent="acl-amber"
              />
              <ConceptCard
                icon={<Binary className="w-4 h-4 text-[var(--sky)]" />}
                title={tr.ruleTitle}
                description={tr.ruleDesc}
                accent="acl-sky"
              />
            </div>

            {/* Wolfram numbering */}
            <div className="rounded-xl bg-[var(--card-hi)] border border-[var(--border)] p-4 space-y-3">
              <h3 className="font-display font-semibold text-[var(--t1)] text-sm">{tr.wolframTitle}</h3>
              <p className="text-sm text-[var(--t2)] leading-relaxed">{tr.wolframText1}</p>
              <div className="rounded-lg bg-[var(--surface)] border border-[var(--border)] overflow-x-auto">
                <table className="w-full text-center font-mono text-xs">
                  <thead>
                    <tr className="border-b border-[var(--border)]">
                      <td className="px-3 py-2 text-left text-[var(--t3)] font-semibold">{tr.wolframNeighborhood}</td>
                      {['111','110','101','100','011','010','001','000'].map(n => (
                        <td key={n} className="px-2 py-2 text-[var(--t2)] font-semibold">{n}</td>
                      ))}
                    </tr>
                    <tr className="border-b border-[var(--border)]">
                      <td className="px-3 py-2 text-left text-[var(--t3)]">{tr.wolframDecimal}</td>
                      {[7,6,5,4,3,2,1,0].map(n => (
                        <td key={n} className="px-2 py-2 text-[var(--t3)]">{n}</td>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-3 py-2 text-left text-[var(--t3)]">{tr.wolframExample}</td>
                      {[0,0,0,1,1,1,1,0].map((bit, i) => (
                        <td key={i} className={`px-2 py-2 font-bold ${bit ? 'text-[var(--accent)]' : 'text-[var(--t4)]'}`}>
                          {bit}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-[var(--t3)] leading-relaxed">
                {tr.wolframNote} <strong className="text-[var(--accent)]">Rule 30</strong>.
              </p>
            </div>

            {/* 4 Classes */}
            <div className="rounded-xl bg-[var(--card-hi)] border border-[var(--border)] p-4">
              <h3 className="font-display font-semibold text-[var(--t1)] text-sm mb-3">{tr.fourClassesTitle}</h3>
              <div className="grid sm:grid-cols-2 gap-2">
                <ClassBadge label="Class I"   desc={tr.class1} color="slate"  />
                <ClassBadge label="Class II"  desc={tr.class2} color="sky"    />
                <ClassBadge label="Class III" desc={tr.class3} color="amber"  />
                <ClassBadge label="Class IV"  desc={tr.class4} color="violet" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Advanced ─────────────────────────────────────────── */}
      <div className="panel overflow-hidden" style={{ borderColor: 'var(--violet-mid)' }}>
        <button
          onClick={() => setAdvancedExpanded(!advancedExpanded)}
          className="w-full flex items-center justify-between p-5 sm:p-6 hover:bg-[var(--violet-soft)] transition-colors"
        >
          <div className="text-left">
            <h2 className="section-title">
              <FlaskConical className="w-4 h-4 text-[var(--violet)]" />
              {tr.advancedTitle}
            </h2>
            <p className="text-[11px] text-[var(--t3)] mt-0.5 ml-6">{tr.advancedSubtitle}</p>
          </div>
          {advancedExpanded
            ? <ChevronUp className="w-4 h-4 text-[var(--t3)] shrink-0" />
            : <ChevronDown className="w-4 h-4 text-[var(--t3)] shrink-0" />
          }
        </button>

        {advancedExpanded && (
          <div className="px-5 sm:px-6 pb-6 space-y-4 animate-fade-up">

            {/* Density task */}
            <div className="rounded-xl bg-[var(--violet-soft)] border border-[var(--violet-mid)] p-4 space-y-3 acl-violet">
              <h3 className="font-display font-semibold text-[var(--t1)] text-sm flex items-center gap-2">
                <Microscope className="w-4 h-4 text-[var(--violet)]" />
                {tr.densityTitle}
              </h3>
              <p className="text-sm text-[var(--t2)] leading-relaxed">{tr.densityDesc}</p>
              <DensityDiagram />
              <p className="text-xs text-[var(--violet)] bg-white/70 rounded-lg px-3 py-2 border border-[var(--violet-mid)] leading-relaxed">
                💡 {tr.densityNote}
              </p>
            </div>

            {/* Domains & particles */}
            <div className="rounded-xl bg-[var(--violet-soft)] border border-[var(--violet-mid)] p-4 space-y-3 acl-violet">
              <h3 className="font-display font-semibold text-[var(--t1)] text-sm flex items-center gap-2">
                <Layers className="w-4 h-4 text-[var(--violet)]" />
                {tr.domainsTitle}
              </h3>
              <p className="text-sm text-[var(--t2)] leading-relaxed">{tr.domainsDesc}</p>
              <DomainParticleDiagram />
              <p className="text-sm text-[var(--t2)] leading-relaxed">{tr.domainsDesc2}</p>
              <p className="text-xs text-[var(--violet)] bg-white/70 rounded-lg px-3 py-2 border border-[var(--violet-mid)] leading-relaxed">
                🔍 {tr.domainsNote}
              </p>
            </div>

            {/* References */}
            <div className="rounded-xl bg-[var(--card-hi)] border border-[var(--border)] p-4 space-y-2 acl-accent">
              <h3 className="font-display font-semibold text-[var(--t1)] text-sm flex items-center gap-2">
                <BookMarked className="w-4 h-4 text-[var(--accent)]" />
                {tr.paperRefTitle}
              </h3>
              <p className="text-sm text-[var(--t2)]">{tr.paperRefText}</p>
              <p className="text-sm text-[var(--t2)] italic leading-relaxed">{tr.paperCitation}</p>
              <p className="text-sm text-[var(--t3)] italic leading-relaxed">{tr.paperCitationDiss}</p>
              <a
                href="https://pdxscholar.library.pdx.edu/open_access_etds/275/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-[var(--accent)] hover:text-blue-800 font-medium transition-colors mt-1"
              >
                Portland State University — Open Access ↗
              </a>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Sub-components ───────────────────────────────────────── */

function ConceptCard({ icon, title, description, accent }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  accent: string;
}) {
  return (
    <div className={`rounded-xl bg-[var(--card-hi)] border border-[var(--border)] p-4 ${accent}`}>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h3 className="font-display font-semibold text-[var(--t1)] text-sm">{title}</h3>
      </div>
      <p className="text-sm text-[var(--t2)] leading-relaxed">{description}</p>
    </div>
  );
}

function ClassBadge({ label, desc, color }: { label: string; desc: string; color: string }) {
  const map: Record<string, string> = {
    slate:  'bg-[var(--surface)] border-[var(--border-2)] text-[var(--t2)]',
    sky:    'bg-[var(--sky-soft)] border-sky-200 text-[var(--sky)]',
    amber:  'bg-[var(--amber-soft)] border-amber-200 text-[var(--amber)]',
    violet: 'bg-[var(--violet-soft)] border-[var(--violet-mid)] text-[var(--violet)]',
  };
  return (
    <div className={`rounded-lg border px-3 py-2.5 text-sm ${map[color] || map.slate}`}>
      <span className="font-display font-bold">{label}</span>
      <span className="text-xs opacity-75 ml-1.5">— {desc}</span>
    </div>
  );
}

function DensityDiagram() {
  const rowA = [0,1,1,0,1,1,1,0,1,1,0,1,1,1,0,1];
  const rowB = [0,1,0,0,1,0,0,0,1,0,0,1,0,0,0,1];
  return (
    <div className="flex items-start justify-center gap-10 py-2">
      {[
        { row: rowA, result: Array(16).fill(1), label: 'ρ > 0.5 → all 1s', hi: true },
        { row: rowB, result: Array(16).fill(0), label: 'ρ < 0.5 → all 0s', hi: false },
      ].map(({ row, result, label, hi }, gi) => (
        <div key={gi} className="text-center">
          <svg width="90" height="54" viewBox="0 0 90 54" className="mx-auto">
            {row.map((cell, i) => (
              <rect key={i} x={i * 5.5 + 1} y={2} width={4.5} height={5} rx={0.8}
                fill={cell ? '#1d4ed8' : '#e2e8f0'} />
            ))}
            <text x="45" y="23" textAnchor="middle" fill="#7c98b3" fontSize="7" fontFamily="IBM Plex Sans, sans-serif">↓ evolve</text>
            {result.map((cell, i) => (
              <rect key={`r${i}`} x={i * 5.5 + 1} y={28} width={4.5} height={5} rx={0.8}
                fill={cell ? '#1d4ed8' : '#e2e8f0'} />
            ))}
          </svg>
          <p className="text-[10px] font-mono mt-1" style={{ color: hi ? 'var(--accent)' : 'var(--t3)' }}>
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}

function DomainParticleDiagram() {
  return (
    <div className="flex justify-center py-2">
      <svg width="280" height="72" viewBox="0 0 280 72" className="max-w-full">
        {/* Domain A */}
        <rect x="2" y="12" width="90" height="36" rx={6} fill="#f0f9ff" stroke="#bae6fd" strokeWidth={1.2} />
        <text x="47" y="34" textAnchor="middle" fill="#0369a1" fontSize="9.5" fontFamily="JetBrains Mono, monospace" fontWeight="500">000000</text>
        <text x="47" y="58" textAnchor="middle" fill="#7c98b3" fontSize="7.5" fontFamily="IBM Plex Sans, sans-serif">Domain A</text>

        {/* Particle */}
        <rect x="97" y="12" width="36" height="36" rx={5} fill="#f5f3ff" stroke="#ddd6fe" strokeWidth={1.2} />
        <line x1="104" y1="14" x2="122" y2="46" stroke="#7c3aed" strokeWidth={1.8} strokeDasharray="3,2.5" opacity="0.8" />
        <line x1="109" y1="14" x2="127" y2="46" stroke="#7c3aed" strokeWidth={1.2} strokeDasharray="3,2.5" opacity="0.4" />
        <text x="115" y="58" textAnchor="middle" fill="#6d28d9" fontSize="7.5" fontFamily="IBM Plex Sans, sans-serif">Particle</text>

        {/* Domain B */}
        <rect x="138" y="12" width="90" height="36" rx={6} fill="#ecfdf5" stroke="#a7f3d0" strokeWidth={1.2} />
        <text x="183" y="34" textAnchor="middle" fill="#047857" fontSize="9.5" fontFamily="JetBrains Mono, monospace" fontWeight="500">010101</text>
        <text x="183" y="58" textAnchor="middle" fill="#7c98b3" fontSize="7.5" fontFamily="IBM Plex Sans, sans-serif">Domain B</text>

        {/* Collision */}
        <rect x="233" y="12" width="44" height="36" rx={5} fill="#fff7ed" stroke="#fed7aa" strokeWidth={1.2} />
        <text x="255" y="33" textAnchor="middle" fill="#c2410c" fontSize="16">⚡</text>
        <text x="255" y="58" textAnchor="middle" fill="#c2410c" fontSize="7.5" fontFamily="IBM Plex Sans, sans-serif">Collision</text>

        {/* Flow arrow */}
        <line x1="96" y1="6" x2="232" y2="6" stroke="#dde3ed" strokeWidth={1} />
        <polygon points="230,3.5 236,6 230,8.5" fill="#dde3ed" />
        <text x="160" y="4.5" textAnchor="middle" fill="#b0c4d8" fontSize="6" fontFamily="IBM Plex Sans, sans-serif">information flow →</text>
      </svg>
    </div>
  );
}
