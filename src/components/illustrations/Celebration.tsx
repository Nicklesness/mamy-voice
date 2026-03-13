export default function Celebration({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background glow */}
      <ellipse cx="90" cy="90" rx="75" ry="75" fill="#FDEEE8" opacity="0.3" />

      {/* Character body */}
      <path d="M72 105 Q68 130 72 160 L108 160 Q112 130 108 105 Z" fill="#E8734A" opacity="0.12" />
      {/* Head */}
      <circle cx="90" cy="78" r="26" fill="#FDEEE8" />
      <circle cx="90" cy="78" r="26" stroke="#E8734A" strokeWidth="1.5" opacity="0.25" />
      {/* Hair */}
      <path d="M64 72 Q70 48 90 44 Q110 48 116 72 Q113 56 90 52 Q70 56 64 72" fill="#7A6B5A" opacity="0.45" />
      {/* Happy face - eyes */}
      <path d="M80 75 Q82 73 84 75" stroke="#1A1207" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M96 75 Q98 73 100 75" stroke="#1A1207" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
      {/* Big smile */}
      <path d="M80 85 Q90 94 100 85" stroke="#E8734A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Blush */}
      <circle cx="76" cy="82" r="4" fill="#E8734A" opacity="0.12" />
      <circle cx="104" cy="82" r="4" fill="#E8734A" opacity="0.12" />

      {/* Arms raised in joy */}
      <path d="M72 108 Q55 90 45 70" stroke="#FDEEE8" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M72 108 Q55 90 45 70" stroke="#E8734A" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.15" />
      <path d="M108 108 Q125 90 135 70" stroke="#FDEEE8" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M108 108 Q125 90 135 70" stroke="#E8734A" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.15" />

      {/* Headphones on character */}
      <path d="M65 75 Q65 58 90 55 Q115 58 115 75" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.4" />
      <rect x="58" y="72" width="10" height="14" rx="5" fill="#8B5CF6" opacity="0.35" />
      <rect x="112" y="72" width="10" height="14" rx="5" fill="#8B5CF6" opacity="0.35" />

      {/* Stars / confetti around */}
      {/* Star shapes */}
      <path d="M40 45 L42 40 L44 45 L49 47 L44 49 L42 54 L40 49 L35 47 Z" fill="#F5A623" opacity="0.5" />
      <path d="M140 50 L141.5 46 L143 50 L147 51.5 L143 53 L141.5 57 L140 53 L136 51.5 Z" fill="#E8734A" opacity="0.4" />
      <path d="M30 110 L31.5 106 L33 110 L37 111.5 L33 113 L31.5 117 L30 113 L26 111.5 Z" fill="#8B5CF6" opacity="0.35" />
      <path d="M150 105 L151 102 L152 105 L155 106 L152 107 L151 110 L150 107 L147 106 Z" fill="#F5A623" opacity="0.4" />

      {/* Confetti dots */}
      <circle cx="55" cy="35" r="3" fill="#E8734A" opacity="0.4" />
      <circle cx="125" cy="30" r="2.5" fill="#8B5CF6" opacity="0.35" />
      <circle cx="35" cy="80" r="2" fill="#22C55E" opacity="0.35" />
      <circle cx="145" cy="85" r="2.5" fill="#F5A623" opacity="0.4" />
      <circle cx="160" cy="130" r="2" fill="#E8734A" opacity="0.3" />
      <circle cx="20" cy="140" r="2" fill="#8B5CF6" opacity="0.3" />
      <circle cx="70" cy="25" r="2" fill="#22C55E" opacity="0.3" />
      <circle cx="110" cy="20" r="1.5" fill="#F5A623" opacity="0.35" />

      {/* Music notes */}
      <path d="M45 58 Q45 55 47 53 L47 47" stroke="#8B5CF6" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.3" />
      <circle cx="45" cy="58" r="2.5" fill="#8B5CF6" opacity="0.25" />
      <path d="M138 65 Q138 62 140 60 L140 54" stroke="#E8734A" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.3" />
      <circle cx="138" cy="65" r="2.5" fill="#E8734A" opacity="0.25" />
    </svg>
  );
}
