import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  checked: boolean;
  onChange: () => void;
}

export default function ThemeToggle({ checked, onChange }: ThemeToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={checked ? 'Activar modo claro' : 'Activar modo oscuro'}
      onClick={onChange}
      className="relative flex items-center justify-between h-[30px] w-[56px] rounded-full p-0.5 cursor-pointer border border-slate-200 bg-white dark:border-white/15 dark:bg-white/10 transition-colors"
    >
      {/* Sliding knob */}
      <span
        className="absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-slate-900 dark:bg-white transition-transform duration-300 ease-out"
        style={{ transform: checked ? 'translateX(26px)' : 'translateX(0)' }}
      />

      <span className="relative z-10 h-6 w-6 flex items-center justify-center">
        <Sun
          className={`w-3.5 h-3.5 transition-colors ${
            checked ? 'text-slate-400' : 'text-white'
          }`}
          strokeWidth={2}
        />
      </span>
      <span className="relative z-10 h-6 w-6 flex items-center justify-center">
        <Moon
          className={`w-3.5 h-3.5 transition-colors ${
            checked ? 'text-slate-900' : 'text-slate-300'
          }`}
          strokeWidth={2}
        />
      </span>
    </button>
  );
}
