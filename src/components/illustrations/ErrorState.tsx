export default function ErrorState({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background glow */}
      <ellipse cx="80" cy="80" rx="65" ry="65" fill="#FEF2F2" opacity="0.4" />

      {/* Character body */}
      <path d="M62 95 Q58 115 62 140 L98 140 Q102 115 98 95 Z" fill="#EF4444" opacity="0.08" />
      {/* Head */}
      <circle cx="80" cy="68" r="24" fill="#FDEEE8" />
      <circle cx="80" cy="68" r="24" stroke="#B5A898" strokeWidth="1.5" opacity="0.25" />
      {/* Hair */}
      <path d="M56 62 Q62 40 80 36 Q98 40 104 62 Q100 48 80 44 Q62 48 56 62" fill="#7A6B5A" opacity="0.4" />
      {/* Confused/sad face */}
      {/* Eyebrows raised */}
      <path d="M68 58 Q72 55 76 58" stroke="#1A1207" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.4" />
      <path d="M84 58 Q88 55 92 58" stroke="#1A1207" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.4" />
      {/* Worried eyes */}
      <circle cx="72" cy="65" r="2.5" fill="#1A1207" opacity="0.5" />
      <circle cx="88" cy="65" r="2.5" fill="#1A1207" opacity="0.5" />
      {/* Sad mouth */}
      <path d="M72 78 Q80 74 88 78" stroke="#B5A898" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />

      {/* Scratching head */}
      <path d="M98 95 Q115 80 108 60" stroke="#FDEEE8" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M98 95 Q115 80 108 60" stroke="#B5A898" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.15" />

      {/* Question marks */}
      <text x="115" y="50" fill="#B5A898" fontSize="18" fontWeight="700" opacity="0.3">?</text>
      <text x="125" y="65" fill="#B5A898" fontSize="12" fontWeight="700" opacity="0.2">?</text>

      {/* Broken heart / error symbol */}
      <path d="M35 90 C32 86, 26 86, 26 90 C26 95, 35 100, 35 100 C35 100, 44 95, 44 90 C44 86, 38 86, 35 90" fill="#EF4444" opacity="0.15" />
      {/* Crack in heart */}
      <path d="M35 90 L33 93 L37 95 L34 98" stroke="#EF4444" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.25" />

      {/* Scattered dots (like things fell apart) */}
      <circle cx="30" cy="120" r="3" fill="#B5A898" opacity="0.15" />
      <circle cx="45" cy="130" r="2" fill="#B5A898" opacity="0.12" />
      <circle cx="115" cy="125" r="2.5" fill="#B5A898" opacity="0.12" />
      <circle cx="130" cy="115" r="2" fill="#B5A898" opacity="0.1" />

      {/* Small cloud of confusion */}
      <circle cx="120" cy="42" r="5" fill="#B5A898" opacity="0.08" />
      <circle cx="127" cy="38" r="7" fill="#B5A898" opacity="0.08" />
      <circle cx="135" cy="42" r="5" fill="#B5A898" opacity="0.06" />
    </svg>
  );
}
