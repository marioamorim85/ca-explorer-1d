import { useState, useCallback, useRef, useEffect, createContext, useContext } from 'react';
import { RuleEditor } from './components/RuleEditor';
import { SimulationGrid } from './components/SimulationGrid';
import { TheoryPanel } from './components/TheoryPanel';
import { FamousRules } from './components/FamousRules';
import { BookOpen, Cpu, Globe, Play, Square, Zap } from 'lucide-react';
import { type Lang, type Translations, t } from './i18n';

export type InitialCondition = 'single' | 'random';

export const LangContext = createContext<{ lang: Lang; tr: Translations }>({ lang: 'en', tr: t('en') });
export function useLang() { return useContext(LangContext); }

function App() {
  const [lang, setLang] = useState<Lang>('en');
  const tr = t(lang);
  const [ruleNumber, setRuleNumber] = useState(30);
  const [ruleBits, setRuleBits] = useState<number[]>(ruleNumberToBits(30));
  const [initialCondition, setInitialCondition] = useState<InitialCondition>('single');
  const [gridWidth, setGridWidth] = useState(101);
  const [generations, setGenerations] = useState(80);
  const [grid, setGrid] = useState<number[][]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentGen, setCurrentGen] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const gridRef = useRef<number[][]>([]);

  const handleRuleNumberChange = useCallback((num: number) => {
    const clamped = Math.max(0, Math.min(255, num));
    setRuleNumber(clamped);
    setRuleBits(ruleNumberToBits(clamped));
  }, []);

  const handleBitToggle = useCallback((index: number) => {
    setRuleBits(prev => {
      const next = [...prev];
      next[index] = next[index] === 0 ? 1 : 0;
      setRuleNumber(bitsToRuleNumber(next));
      return next;
    });
  }, []);

  const makeInitialRow = useCallback((width: number, condition: InitialCondition): number[] => {
    if (condition === 'random') return Array.from({ length: width }, () => Math.random() > 0.5 ? 1 : 0);
    const row = new Array(width).fill(0);
    row[Math.floor(width / 2)] = 1;
    return row;
  }, []);

  const nextGeneration = useCallback((row: number[], bits: number[]): number[] => {
    const w = row.length;
    return row.map((_, i) => {
      const left = row[(i - 1 + w) % w];
      const center = row[i];
      const right = row[(i + 1) % w];
      return bits[(left << 2) | (center << 1) | right];
    });
  }, []);

  const runSimulation = useCallback(() => {
    const initial = makeInitialRow(gridWidth, initialCondition);
    const allRows: number[][] = [initial];
    let current = initial;
    for (let g = 1; g < generations; g++) {
      current = nextGeneration(current, ruleBits);
      allRows.push(current);
    }
    setGrid(allRows);
    setCurrentGen(generations);
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [gridWidth, generations, initialCondition, ruleBits, makeInitialRow, nextGeneration]);

  const startAnimation = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    const initial = makeInitialRow(gridWidth, initialCondition);
    gridRef.current = [initial];
    setGrid([initial]);
    setCurrentGen(1);
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      const rows = gridRef.current;
      if (rows.length >= generations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsRunning(false);
        return;
      }
      const newRow = nextGeneration(rows[rows.length - 1], ruleBits);
      const updated = [...rows, newRow];
      gridRef.current = updated;
      setGrid(updated);
      setCurrentGen(updated.length);
    }, 50);
  }, [gridWidth, generations, initialCondition, ruleBits, makeInitialRow, nextGeneration]);

  const stopAnimation = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsRunning(false);
  }, []);

  useEffect(() => { return () => { if (intervalRef.current) clearInterval(intervalRef.current); }; }, []);
  useEffect(() => { runSimulation(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const binaryStr = ruleNumber.toString(2).padStart(8, '0');
  const pct = generations > 0 ? Math.round((currentGen / generations) * 100) : 0;

  return (
    <LangContext.Provider value={{ lang, tr }}>
      <div className="min-h-screen flex flex-col">

        {/* ── Header ─────────────────────────────────────────── */}
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-[var(--border)] shadow-[0_1px_8px_rgba(15,26,46,0.07)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">

            {/* Brand */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-9 h-9 rounded-lg bg-[var(--accent)] flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(37,99,235,0.3)]">
                <Cpu className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0 hidden sm:block">
                <h1 className="font-display font-bold text-[var(--t1)] text-sm leading-tight">
                  {tr.headerTitle}
                </h1>
                <p className="text-[11px] text-[var(--t3)] leading-tight">{tr.headerSubtitle}</p>
              </div>
            </div>

            {/* Rule badge — centre */}
            <div className="flex items-center gap-2 mx-auto">
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[var(--accent-soft)] border border-[var(--accent-mid)]">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent)] opacity-70">Rule</span>
                <span className="font-display font-extrabold text-[var(--accent)] text-2xl leading-none tabular-nums">
                  {ruleNumber.toString().padStart(3, '0')}
                </span>
                <span className="w-px h-5 bg-[var(--accent-mid)]" />
                <span className="font-mono text-xs text-[var(--amber)] font-semibold hidden sm:inline tracking-widest">
                  {binaryStr}
                </span>
              </div>
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="hidden md:flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[var(--t3)]" />
                <span className="font-display text-[10px] uppercase tracking-widest text-[var(--t3)]">
                  {tr.teachingTool}
                </span>
              </div>
              <div className="hidden md:block w-px h-4 bg-[var(--border)]" />
              <button
                onClick={() => setLang(prev => prev === 'en' ? 'pt' : 'en')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-2)] text-[var(--t2)] hover:text-[var(--t1)] text-xs font-mono font-semibold transition-all"
                title={lang === 'en' ? 'Mudar para Português' : 'Switch to English'}
              >
                <Globe className="w-3 h-3" />
                {lang === 'en' ? 'PT' : 'EN'}
              </button>
            </div>
          </div>
        </header>

        {/* ── Main content ───────────────────────────────────── */}
        <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 space-y-5 flex-1">
          <TheoryPanel />
          <FamousRules onSelect={handleRuleNumberChange} currentRule={ruleNumber} />
          <RuleEditor
            ruleNumber={ruleNumber}
            ruleBits={ruleBits}
            onRuleNumberChange={handleRuleNumberChange}
            onBitToggle={handleBitToggle}
          />

          {/* ── Simulation ─────────────────────────────────── */}
          <div className="panel p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <h2 className="section-title">
                <Zap className="w-4 h-4 text-[var(--accent)]" />
                {tr.simulationTitle}
              </h2>

              {grid.length > 0 && (
                <div className="flex items-center gap-2 text-xs">
                  {isRunning
                ? <span className="running-dot w-2 h-2 rounded-full bg-[var(--accent)] animate-blink" />
                : <span className="w-1.5 h-1.5 rounded-full bg-[var(--border-3)]" />
              }
                  <span className="font-mono text-[var(--t2)]">{isRunning ? 'RUNNING' : 'COMPLETE'}</span>
                  <span className="text-[var(--t4)]">·</span>
                  <span className="font-mono text-[var(--t1)] font-semibold">{currentGen}</span>
                  <span className="font-mono text-[var(--t3)]">/ {generations} gen</span>
                  {!isRunning && currentGen > 0 && (
                    <span className="tag bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent-mid)]">
                      {pct}%
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex flex-wrap gap-x-6 gap-y-4 items-end mb-5">
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-[var(--t3)] mb-1.5">
                  {tr.initialCondition}
                </label>
                <select
                  value={initialCondition}
                  onChange={e => setInitialCondition(e.target.value as InitialCondition)}
                  className="bg-[var(--card)] border border-[var(--border-2)] rounded-lg px-3 py-2 text-sm text-[var(--t1)] focus:ring-2 focus:ring-[var(--accent-mid)] focus:border-[var(--accent)] outline-none transition-all font-sans shadow-sm"
                >
                  <option value="single">{tr.singleCenter}</option>
                  <option value="random">{tr.random}</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-[var(--t3)] mb-1.5">
                  {tr.width}
                </label>
                <input
                  type="number"
                  value={gridWidth}
                  onChange={e => setGridWidth(Math.max(11, Math.min(201, parseInt(e.target.value) || 101)))}
                  className="w-20 bg-[var(--card)] border border-[var(--border-2)] rounded-lg px-3 py-2 text-sm text-[var(--t1)] focus:ring-2 focus:ring-[var(--accent-mid)] focus:border-[var(--accent)] outline-none font-mono shadow-sm transition-all"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-[var(--t3)] mb-1.5">
                  {tr.generations}
                </label>
                <input
                  type="number"
                  value={generations}
                  onChange={e => setGenerations(Math.max(10, Math.min(200, parseInt(e.target.value) || 80)))}
                  className="w-20 bg-[var(--card)] border border-[var(--border-2)] rounded-lg px-3 py-2 text-sm text-[var(--t1)] focus:ring-2 focus:ring-[var(--accent-mid)] focus:border-[var(--accent)] outline-none font-mono shadow-sm transition-all"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={runSimulation}
                  disabled={isRunning}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-display font-semibold transition-all
                    bg-[var(--accent)] text-white shadow-[0_2px_8px_rgba(37,99,235,0.25)]
                    hover:bg-blue-700 hover:shadow-[0_4px_12px_rgba(37,99,235,0.35)]
                    disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[var(--accent)] disabled:hover:shadow-none"
                >
                  <Zap className="w-3.5 h-3.5" />
                  {tr.generateAll}
                </button>
                <button
                  onClick={isRunning ? stopAnimation : startAnimation}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-display font-semibold border transition-all shadow-sm ${
                    isRunning
                      ? 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100 hover:border-red-300'
                      : 'bg-[var(--card)] text-[var(--t1)] border-[var(--border-2)] hover:border-[var(--border-3)] hover:bg-[var(--surface)]'
                  }`}
                >
                  {isRunning ? <Square className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  {isRunning ? tr.stop : tr.animate}
                </button>
              </div>
            </div>

            {/* Progress bar */}
            {grid.length > 0 && (
              <div className="mb-4 h-0.5 bg-[var(--border)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--accent)] transition-all duration-100 rounded-full"
                  style={{ width: `${pct}%` }}
                />
              </div>
            )}

            <SimulationGrid grid={grid} isRunning={isRunning} />
          </div>
        </main>

        {/* ── Footer ─────────────────────────────────────────── */}
        <footer className="border-t border-[var(--border)] bg-white/60 mt-4 py-7 px-4">
          <div className="max-w-7xl mx-auto text-center space-y-1.5">
            <p className="text-xs text-[var(--t2)] font-display font-medium tracking-wide">{tr.footer1}</p>
            <p className="text-xs text-[var(--t3)]">{tr.footer2}</p>
            <p className="text-[10px] text-[var(--t4)] max-w-2xl mx-auto mt-2 leading-relaxed font-mono">{tr.footer3}</p>
          </div>
        </footer>

      </div>
    </LangContext.Provider>
  );
}

export function ruleNumberToBits(rule: number): number[] {
  const bits: number[] = [];
  for (let i = 0; i < 8; i++) bits.push((rule >> i) & 1);
  return bits;
}

export function bitsToRuleNumber(bits: number[]): number {
  let num = 0;
  for (let i = 0; i < 8; i++) num += bits[i] * (1 << i);
  return num;
}

export default App;
