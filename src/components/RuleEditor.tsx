import { SlidersHorizontal } from 'lucide-react';
import { useLang } from '../App';

interface Props {
  ruleNumber: number;
  ruleBits: number[];
  onRuleNumberChange: (n: number) => void;
  onBitToggle: (index: number) => void;
}

const NEIGHBORHOODS = [
  [1, 1, 1], [1, 1, 0], [1, 0, 1], [1, 0, 0],
  [0, 1, 1], [0, 1, 0], [0, 0, 1], [0, 0, 0],
];

export function RuleEditor({ ruleNumber, ruleBits, onRuleNumberChange, onBitToggle }: Props) {
  const { tr } = useLang();
  const binaryStr = ruleNumber.toString(2).padStart(8, '0');

  return (
    <div className="panel p-5 sm:p-6">
      <h2 className="section-title mb-5">
        <SlidersHorizontal className="w-4 h-4 text-[var(--accent)]" />
        {tr.editorTitle}
      </h2>

      {/* Controls row */}
      <div className="flex flex-wrap items-center gap-4 mb-5">
        <div className="flex items-center gap-2.5">
          <label className="font-mono text-[10px] uppercase tracking-widest text-[var(--t3)] whitespace-nowrap">
            {tr.ruleLabel}
          </label>
          <input
            type="number"
            min={0}
            max={255}
            value={ruleNumber}
            onChange={e => onRuleNumberChange(parseInt(e.target.value) || 0)}
            className="w-20 bg-[var(--card)] border border-[var(--border-2)] rounded-lg px-3 py-2 text-base font-mono font-bold text-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-mid)] focus:border-[var(--accent)] outline-none shadow-sm transition-all"
          />
        </div>
        <input
          type="range"
          min={0}
          max={255}
          value={ruleNumber}
          onChange={e => onRuleNumberChange(parseInt(e.target.value))}
          className="flex-1 min-w-[160px]"
        />
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--t3)]">{tr.binaryLabel}</span>
          <span className="font-mono font-bold text-[var(--amber)] tracking-widest text-sm">{binaryStr}</span>
        </div>
      </div>

      {/* Explanation box */}
      <div
        className="rounded-xl bg-[var(--accent-soft)] border border-[var(--accent-mid)] px-4 py-3 text-sm text-[var(--t2)] mb-6 leading-relaxed acl-accent"
        dangerouslySetInnerHTML={{ __html: tr.editorExplanation }}
      />

      {/* Bit toggles grid */}
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 sm:gap-2.5">
        {NEIGHBORHOODS.map((pattern, displayIdx) => {
          const nv = 7 - displayIdx;
          const outputBit = ruleBits[nv];

          return (
            <div
              key={displayIdx}
              className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl bg-[var(--card-hi)] border border-[var(--border)] hover:border-[var(--border-2)] hover:shadow-sm transition-all"
            >
              {/* Position label */}
              <span className="font-mono text-[9px] text-[var(--t4)] uppercase tracking-wider">p{nv}</span>

              {/* Input pattern */}
              <div className="flex gap-0.5">
                {pattern.map((cell, ci) => (
                  <div
                    key={ci}
                    className={`w-4 h-4 sm:w-5 sm:h-5 rounded-sm transition-colors ${
                      cell === 1
                        ? 'bg-[var(--t1)]'
                        : 'bg-[var(--surface)] border border-[var(--border-2)]'
                    } ${ci === 1 ? 'ring-1 ring-[var(--accent)]/20' : ''}`}
                  />
                ))}
              </div>

              {/* Binary label */}
              <span className="font-mono text-[9px] text-[var(--t4)]">{pattern.join('')}</span>

              {/* Arrow */}
              <span className="text-[var(--t4)] text-[10px]">↓</span>

              {/* LED toggle button */}
              <button
                onClick={() => onBitToggle(nv)}
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full font-mono font-bold text-sm transition-all duration-200 cursor-pointer ${
                  outputBit === 1 ? 'led-on' : 'led-off'
                }`}
                title={`${tr.clickToToggle} ${outputBit})`}
              >
                {outputBit}
              </button>
            </div>
          );
        })}
      </div>

      {/* Binary equation */}
      <div className="mt-5 rounded-xl bg-[var(--card-hi)] border border-[var(--border)] px-4 py-3">
        <div className="font-mono text-sm flex flex-wrap items-baseline gap-x-0.5 gap-y-1">
          <span className="text-[var(--t2)] mr-1">Rule {ruleNumber}</span>
          <span className="text-[var(--t4)] mx-1">=</span>
          {NEIGHBORHOODS.map((_, displayIdx) => {
            const nv = 7 - displayIdx;
            const bit = ruleBits[nv];
            return (
              <span key={displayIdx}>
                <span className={bit === 1 ? 'text-[var(--accent)] font-bold' : 'text-[var(--t4)]'}>{bit}</span>
                {displayIdx < 7 && <span className="text-[var(--t4)] mx-0.5">·</span>}
              </span>
            );
          })}
          <span className="text-[var(--t4)] ml-0.5">₂</span>
          <span className="text-[var(--t4)] mx-1">=</span>
          <span className="text-[var(--amber)] font-bold">{ruleNumber}</span>
          <span className="text-[var(--t4)]">₁₀</span>
        </div>
      </div>
    </div>
  );
}
