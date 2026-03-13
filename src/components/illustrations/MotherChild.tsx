export default function MotherChild({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Warm glow background */}
      <ellipse cx="120" cy="100" rx="100" ry="80" fill="#FDEEE8" opacity="0.4" />
      <ellipse cx="120" cy="100" rx="60" ry="50" fill="#EDE9FE" opacity="0.2" />

      {/* Mother */}
      {/* Body */}
      <path d="M100 110 Q95 140 100 170 L140 170 Q145 140 140 110 Z" fill="#E8734A" opacity="0.15" />
      {/* Head */}
      <circle cx="120" cy="75" r="28" fill="#FDEEE8" />
      <circle cx="120" cy="75" r="28" stroke="#E8734A" strokeWidth="1.5" opacity="0.3" />
      {/* Hair */}
      <path d="M92 68 Q98 42 120 38 Q142 42 148 68 Q145 52 120 48 Q98 52 92 68" fill="#7A6B5A" opacity="0.5" />
      <path d="M92 68 Q88 80 90 95" stroke="#7A6B5A" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
      <path d="M148 68 Q152 80 150 95" stroke="#7A6B5A" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
      {/* Face */}
      <circle cx="112" cy="73" r="2.5" fill="#1A1207" opacity="0.5" />
      <circle cx="128" cy="73" r="2.5" fill="#1A1207" opacity="0.5" />
      <path d="M112 83 Q120 89 128 83" stroke="#E8734A" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* Arms hugging */}
      <path d="M100 115 Q80 120 75 140 Q80 150 95 145" stroke="#FDEEE8" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M100 115 Q80 120 75 140 Q80 150 95 145" stroke="#E8734A" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.2" />
      <path d="M140 115 Q160 120 165 140 Q160 150 145 145" stroke="#FDEEE8" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M140 115 Q160 120 165 140 Q160 150 145 145" stroke="#E8734A" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.2" />

      {/* Child */}
      <circle cx="120" cy="130" r="18" fill="#FDEEE8" />
      <circle cx="120" cy="130" r="18" stroke="#8B5CF6" strokeWidth="1.2" opacity="0.3" />
      {/* Child hair */}
      <path d="M102 125 Q108 112 120 110 Q132 112 138 125" fill="#7A6B5A" opacity="0.35" />
      {/* Child face - eyes closed (sleeping/content) */}
      <path d="M112 128 Q114 130 116 128" stroke="#1A1207" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M124 128 Q126 130 128 128" stroke="#1A1207" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M115 134 Q120 137 125 134" stroke="#E8734A" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5" />

      {/* Heart above */}
      <path d="M120 20 C115 15, 107 15, 107 22 C107 28, 120 36, 120 36 C120 36, 133 28, 133 22 C133 15, 125 15, 120 20" fill="#E8734A" opacity="0.25" />

      {/* Sparkle dots */}
      <circle cx="45" cy="50" r="3" fill="#F5A623" opacity="0.4" />
      <circle cx="195" cy="45" r="2.5" fill="#8B5CF6" opacity="0.35" />
      <circle cx="30" cy="130" r="2" fill="#E8734A" opacity="0.3" />
      <circle cx="210" cy="120" r="2" fill="#F5A623" opacity="0.3" />
      <circle cx="55" cy="170" r="2.5" fill="#8B5CF6" opacity="0.25" />
      <circle cx="185" cy="165" r="2" fill="#E8734A" opacity="0.25" />

      {/* Glow rings */}
      <circle cx="120" cy="100" r="70" stroke="#8B5CF6" strokeWidth="0.5" opacity="0.1" />
      <circle cx="120" cy="100" r="85" stroke="#E8734A" strokeWidth="0.5" opacity="0.08" />
    </svg>
  );
}
