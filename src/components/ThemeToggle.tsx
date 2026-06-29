import React, { useId } from 'react';

interface ThemeToggleProps {
  checked: boolean;
  onChange: () => void;
}

export default function ThemeToggle({ checked, onChange }: ThemeToggleProps) {
  const uid = useId().replace(/:/g, '');
  const id = (n: string) => `${uid}-${n}`;
  const ease = 'cubic-bezier(0.34, 1.4, 0.64, 1)';

  return (
    <label style={{ display: 'inline-block', cursor: 'pointer', lineHeight: 0 }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
      />
      <svg width="62" height="34" viewBox="0 0 84 44" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Day sky */}
          <linearGradient id={id('daySky')} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f6c89a" />
            <stop offset="55%" stopColor="#e88463" />
            <stop offset="100%" stopColor="#d65566" />
          </linearGradient>
          {/* Night sky */}
          <linearGradient id={id('nightSky')} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4a3d80" />
            <stop offset="55%" stopColor="#352b63" />
            <stop offset="100%" stopColor="#5a4790" />
          </linearGradient>
          {/* Knob */}
          <radialGradient id={id('knobDay')} cx="35%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#3a3a44" />
            <stop offset="100%" stopColor="#1d1d24" />
          </radialGradient>
          <radialGradient id={id('knobNight')} cx="35%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#dfe3ec" />
          </radialGradient>
          <clipPath id={id('clip')}>
            <rect x="1.5" y="1.5" width="81" height="41" rx="20.5" />
          </clipPath>
        </defs>

        {/* ===== Scene ===== */}
        <g clipPath={`url(#${id('clip')})`}>
          {/* DAY */}
          <g style={{ opacity: checked ? 0 : 1, transition: `opacity 0.5s ease` }}>
            <rect x="0" y="0" width="84" height="44" fill={`url(#${id('daySky')})`} />
            {/* sun */}
            <g transform="translate(24 13)">
              <circle r="8.5" fill="#ffd9a0" opacity="0.45" />
              <circle r="6" fill="#ffe7b3" />
            </g>
            {/* clouds */}
            <g fill="#f7d8c4" opacity="0.9">
              <ellipse cx="40" cy="10" rx="8" ry="3.2" />
              <ellipse cx="49" cy="8" rx="5.5" ry="2.4" />
              <ellipse cx="62" cy="11" rx="6.5" ry="2.6" />
            </g>
            {/* dunes */}
            <path d="M0 44 Q16 26 36 33 Q48 38 62 30 Q74 24 84 31 L84 44 Z" fill="#d77676" />
            <path d="M0 44 Q20 33 40 38 Q58 43 84 36 L84 44 Z" fill="#b8455a" />
            <path d="M0 44 Q28 40 54 43 Q70 44 84 41 L84 44 Z" fill="#962d49" />
          </g>

          {/* NIGHT */}
          <g style={{ opacity: checked ? 1 : 0, transition: `opacity 0.5s ease` }}>
            <rect x="0" y="0" width="84" height="44" fill={`url(#${id('nightSky')})`} />
            {/* moon */}
            <g transform="translate(58 12)">
              <circle r="6" fill="#e9e6f5" />
              <circle cx="2.4" cy="-1.4" r="5" fill="#352b63" />
            </g>
            {/* stars */}
            <g fill="#fff">
              <circle cx="18" cy="9" r="0.7" />
              <circle cx="30" cy="6" r="0.5" />
              <circle cx="40" cy="12" r="0.6" />
              <circle cx="47" cy="7" r="0.5" />
              <circle cx="70" cy="20" r="0.6" />
              <circle cx="52" cy="16" r="0.4" />
              <circle cx="24" cy="15" r="0.5" />
            </g>
            {/* mountains */}
            <path d="M0 44 Q17 24 32 32 Q44 38 58 28 Q72 20 84 29 L84 44 Z" fill="#3c3070" />
            <path d="M0 44 Q20 32 40 37 Q58 42 84 34 L84 44 Z" fill="#2a2152" />
            <path d="M0 44 Q28 39 54 43 Q70 44 84 41 L84 44 Z" fill="#1d1640" />
          </g>
        </g>

        {/* knob */}
        <g style={{ transform: checked ? 'translateX(0px)' : 'translateX(40px)', transition: `transform 0.55s ${ease}` }}>
          <circle cx="22" cy="22" r="14.5" fill="rgba(0,0,0,0.18)" />
          <circle cx="22" cy="22" r="13.5" fill={`url(#${id(checked ? 'knobNight' : 'knobDay')})`} stroke="rgba(255,255,255,0.12)" strokeWidth="1" style={{ transition: 'fill 0.5s ease' }} />
        </g>
      </svg>
    </label>
  );
}
