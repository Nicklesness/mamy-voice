export default function MotherReading({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Warm background glow */}
      <ellipse cx="140" cy="110" rx="120" ry="90" fill="#FDEEE8" opacity="0.5" />

      {/* Lamp light cone */}
      <path d="M200 20 L260 180 L140 180 Z" fill="#F5A623" opacity="0.04" />

      {/* Lamp */}
      <rect x="208" y="30" width="4" height="60" rx="2" fill="#B5A898" />
      <ellipse cx="210" cy="28" rx="18" ry="10" fill="#E8734A" opacity="0.8" />
      <ellipse cx="210" cy="28" rx="12" ry="6" fill="#F5A623" opacity="0.4" />

      {/* Bed / couch base */}
      <rect x="40" y="150" width="180" height="40" rx="20" fill="#EDE9FE" opacity="0.6" />
      <rect x="30" y="140" width="200" height="15" rx="7" fill="#8B5CF6" opacity="0.15" />

      {/* Pillow */}
      <ellipse cx="80" cy="142" rx="30" ry="14" fill="white" opacity="0.8" />
      <ellipse cx="80" cy="142" rx="30" ry="14" stroke="#B5A898" strokeWidth="1" opacity="0.3" />

      {/* Child in bed */}
      <circle cx="85" cy="120" r="16" fill="#FDEEE8" />
      <circle cx="85" cy="120" r="16" stroke="#E8734A" strokeWidth="1.5" opacity="0.3" />
      {/* Child face */}
      <circle cx="80" cy="118" r="2" fill="#1A1207" opacity="0.6" />
      <circle cx="90" cy="118" r="2" fill="#1A1207" opacity="0.6" />
      <path d="M82 124 Q85 127 88 124" stroke="#E8734A" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      {/* Child hair */}
      <path d="M69 115 Q75 100 95 108 Q100 110 101 115" fill="#7A6B5A" opacity="0.4" />
      {/* Blanket */}
      <path d="M55 135 Q85 125 115 135 L115 160 Q85 155 55 160 Z" fill="#8B5CF6" opacity="0.15" />

      {/* Mother sitting */}
      {/* Body */}
      <path d="M160 95 Q165 130 160 155 L180 155 Q185 125 175 95 Z" fill="#E8734A" opacity="0.2" />
      {/* Head */}
      <circle cx="170" cy="80" r="20" fill="#FDEEE8" />
      <circle cx="170" cy="80" r="20" stroke="#E8734A" strokeWidth="1.5" opacity="0.3" />
      {/* Hair */}
      <path d="M150 75 Q155 55 170 52 Q185 55 190 75 Q188 65 170 62 Q155 65 150 75" fill="#7A6B5A" opacity="0.5" />
      {/* Mother face */}
      <circle cx="165" cy="78" r="2" fill="#1A1207" opacity="0.6" />
      <circle cx="175" cy="78" r="2" fill="#1A1207" opacity="0.6" />
      <path d="M163 85 Q170 90 177 85" stroke="#E8734A" strokeWidth="1.2" strokeLinecap="round" fill="none" />

      {/* Book in mother's hands */}
      <rect x="135" y="100" width="35" height="28" rx="3" fill="white" />
      <rect x="135" y="100" width="35" height="28" rx="3" stroke="#E8734A" strokeWidth="1.5" opacity="0.4" />
      <line x1="152" y1="100" x2="152" y2="128" stroke="#E8734A" strokeWidth="0.8" opacity="0.2" />
      {/* Text lines on book */}
      <line x1="139" y1="108" x2="149" y2="108" stroke="#B5A898" strokeWidth="1" opacity="0.4" />
      <line x1="139" y1="112" x2="148" y2="112" stroke="#B5A898" strokeWidth="1" opacity="0.3" />
      <line x1="139" y1="116" x2="147" y2="116" stroke="#B5A898" strokeWidth="1" opacity="0.3" />
      <line x1="155" y1="108" x2="165" y2="108" stroke="#B5A898" strokeWidth="1" opacity="0.4" />
      <line x1="155" y1="112" x2="164" y2="112" stroke="#B5A898" strokeWidth="1" opacity="0.3" />

      {/* Stars / sparkles */}
      <circle cx="50" cy="40" r="3" fill="#F5A623" opacity="0.4" />
      <circle cx="240" cy="60" r="2" fill="#8B5CF6" opacity="0.3" />
      <circle cx="30" cy="80" r="2" fill="#E8734A" opacity="0.3" />
      <circle cx="260" cy="140" r="2.5" fill="#F5A623" opacity="0.3" />

      {/* Sound waves from mother */}
      <path d="M125 90 Q120 85 125 80" stroke="#8B5CF6" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.3" />
      <path d="M118 93 Q110 85 118 77" stroke="#8B5CF6" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.2" />
    </svg>
  );
}
