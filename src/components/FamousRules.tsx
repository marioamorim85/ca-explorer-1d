import { Sparkles } from 'lucide-react';
import { useLang } from '../App';

interface Props {
  onSelect: (rule: number) => void;
  currentRule: number;
}

type WClass = 'I' | 'II' | 'III' | 'IV';

const CLASS_STYLE: Record<WClass, {
  idle: string;
  active: string;
  tag: string;
  activeTag: string;
}> = {
  I: {
    idle:      'border-[var(--border-2)] text-[var(--t2)] hover:border-[var(--border-3)] hover:text-[var(--t1)] bg-[var(--card)]',
    active:    'border-[var(--border-3)] bg-[var(--surface)] text-[var(--t1)]',
    tag:       'bg-[var(--surface)] text-[var(--t3)] border-[var(--border)]',
    activeTag: 'bg-[var(--border)] text-[var(--t2)] border-[var(--border-2)]',
  },
  II: {
    idle:      'border-sky-200 text-[var(--sky)] hover:border-sky-300 hover:bg-[var(--sky-soft)] bg-[var(--card)]',
    active:    'border-sky-300 bg-[var(--sky-soft)] text-[var(--sky)]',
    tag:       'bg-sky-50 text-[var(--sky)] border-sky-200',
    activeTag: 'bg-sky-100 text-[var(--sky)] border-sky-300',
  },
  III: {
    idle:      'border-amber-200 text-[var(--amber)] hover:border-amber-300 hover:bg-[var(--amber-soft)] bg-[var(--card)]',
    active:    'border-amber-300 bg-[var(--amber-soft)] text-[var(--amber)]',
    tag:       'bg-amber-50 text-[var(--amber)] border-amber-200',
    activeTag: 'bg-amber-100 text-[var(--amber)] border-amber-300',
  },
  IV: {
    idle:      'border-violet-200 text-[var(--violet)] hover:border-violet-300 hover:bg-[var(--violet-soft)] bg-[var(--card)]',
    active:    'border-violet-300 bg-[var(--violet-soft)] text-[var(--violet)] shadow-[0_2px_10px_rgba(109,40,217,0.12)]',
    tag:       'bg-violet-50 text-[var(--violet)] border-violet-200',
    activeTag: 'bg-violet-100 text-[var(--violet)] border-violet-300',
  },
};

const CLASS_LABELS: Record<WClass, string> = {
  I: 'Uniform', II: 'Periodic', III: 'Chaotic', IV: 'Complex',
};

export function FamousRules({ onSelect, currentRule }: Props) {
  const { tr } = useLang();

  const FAMOUS_RULES: { rule: number; desc: string; cls: WClass }[] = [
    { rule: 30,  desc: tr.rule30desc,  cls: 'III' },
    { rule: 90,  desc: tr.rule90desc,  cls: 'II'  },
    { rule: 110, desc: tr.rule110desc, cls: 'IV'  },
    { rule: 184, desc: tr.rule184desc, cls: 'II'  },
    { rule: 0,   desc: tr.rule0desc,   cls: 'I'   },
    { rule: 255, desc: tr.rule255desc, cls: 'I'   },
    { rule: 45,  desc: tr.rule45desc,  cls: 'III' },
    { rule: 73,  desc: tr.rule73desc,  cls: 'II'  },
  ];

  return (
    <div className="panel p-5 sm:p-6">
      <h2 className="section-title mb-4">
        <Sparkles className="w-4 h-4 text-[var(--accent)]" />
        {tr.famousTitle}
      </h2>

      <div className="flex flex-wrap gap-2 mb-4">
        {FAMOUS_RULES.map(({ rule, desc, cls }) => {
          const isActive = currentRule === rule;
          const s = CLASS_STYLE[cls];
          return (
            <button
              key={rule}
              onClick={() => onSelect(rule)}
              className={`group relative flex items-center gap-2 px-3.5 py-2 rounded-xl border text-sm font-display font-semibold transition-all duration-150 ${
                isActive ? s.active : s.idle
              }`}
              title={desc}
            >
              <span className="font-mono tabular-nums">Rule {rule}</span>
              <span className={`tag border ${isActive ? s.activeTag : s.tag}`}>{cls}</span>
              {/* Tooltip */}
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-[var(--t1)] text-white text-[11px] rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30 shadow-xl font-sans font-normal leading-snug">
                {desc}
              </span>
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-5 gap-y-1 pt-4 border-t border-[var(--border)]">
        {(Object.keys(CLASS_LABELS) as WClass[]).map(cls => (
          <div key={cls} className="flex items-center gap-1.5">
            <span className={`tag border ${CLASS_STYLE[cls].tag}`}>{cls}</span>
            <span className="text-[11px] text-[var(--t3)]">{CLASS_LABELS[cls]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
