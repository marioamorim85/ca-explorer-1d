import { useRef, useEffect, useMemo } from 'react';
import { useLang } from '../App';

interface Props {
  grid: number[][];
  isRunning?: boolean;
}

export function SimulationGrid({ grid, isRunning = false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { tr } = useLang();

  const cellSize = useMemo(() => {
    if (grid.length === 0 || grid[0].length === 0) return 4;
    const maxWidth = 900;
    return Math.max(2, Math.min(8, Math.floor(maxWidth / grid[0].length)));
  }, [grid]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || grid.length === 0) return;
    const cols = grid[0].length;
    const rows = grid.length;
    const w = cols * cellSize;
    const h = rows * cellSize;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#0b1120';
    ctx.fillRect(0, 0, w, h);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r][c] === 1) {
          const gap = cellSize > 3 ? 1 : 0;
          ctx.fillStyle = '#93c5fd';
          ctx.fillRect(c * cellSize, r * cellSize, cellSize - gap, cellSize - gap);
        }
      }
    }
  }, [grid, cellSize]);

  if (grid.length === 0) {
    return (
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card-hi)] h-40 flex flex-col items-center justify-center gap-3">
        <div className="flex gap-1.5">
          {[0,0,0,1,0,0,0,0,1,1,0,0].map((v, i) => (
            <div key={i} className="w-2 h-2 rounded-sm"
              style={{ background: v ? 'var(--border-2)' : 'var(--border)' }} />
          ))}
        </div>
        <p className="text-sm text-[var(--t3)]">{tr.emptyGrid}</p>
      </div>
    );
  }

  return (
    <div className={`sim-wrap border transition-all duration-300 ${isRunning ? 'is-running border-blue-300/60' : 'border-[var(--border)]'}`}>
      <div className="overflow-x-auto" style={{ background: '#0b1120' }}>
        <canvas
          ref={canvasRef}
          className="block mx-auto"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>
    </div>
  );
}
