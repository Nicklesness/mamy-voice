export default function WomanPhone({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background glow */}
      <ellipse cx="120" cy="110" rx="90" ry="70" fill="#FDEEE8" opacity="0.3" />

      {/* Room / sofa */}
      <rect x="40" y="140" width="160" height="35" rx="18" fill="#EDE9FE" opacity="0.3" />
      <rect x="35" y="135" width="170" height="12" rx="6" fill="#8B5CF6" opacity="0.1" />

      {/* Side table */}
      <rect x="185" y="100" width="25" height="40" rx="4" fill="#B5A898" opacity="0.15" />
      {/* Cup on table */}
      <rect x="191" y="92" width="13" height="10" rx="3" fill="white" opacity="0.6" />
      <rect x="191" y="92" width="13" height="10" rx="3" stroke="#B5A898" strokeWidth="1" opacity="0.2" />
      {/* Steam */}
      <path d="M195 88 Q197 84 195 80" stroke="#B5A898" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.2" />
      <path d="M200 86 Q202 82 200 78" stroke="#B5A898" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.15" />

      {/* Woman sitting */}
      {/* Body */}
      <path d="M110 100 Q105 125 108 155 L142 155 Q145 125 140 100 Z" fill="#E8734A" opacity="0.12" />
      {/* Head */}
      <circle cx="125" cy="72" r="24" fill="#FDEEE8" />
      <circle cx="125" cy="72" r="24" stroke="#E8734A" strokeWidth="1.5" opacity="0.25" />
      {/* Hair */}
      <path d="M101 66 Q107 44 125 40 Q143 44 149 66 Q146 52 125 48 Q107 52 101 66" fill="#7A6B5A" opacity="0.45" />
      <path d="M101 66 Q98 78 100 90" stroke="#7A6B5A" strokeWidth="2.5" strokeLinecap="round" opacity="0.35" />
      {/* Face */}
      <circle cx="118" cy="70" r="2" fill="#1A1207" opacity="0.5" />
      <circle cx="132" cy="70" r="2" fill="#1A1207" opacity="0.5" />
      <path d="M118 79 Q125 84 132 79" stroke="#E8734A" strokeWidth="1.2" strokeLinecap="round" fill="none" />

      {/* Arm holding phone */}
      <path d="M130 100 Q140 105 145 115" stroke="#FDEEE8" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M130 100 Q140 105 145 115" stroke="#E8734A" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.15" />

      {/* Phone */}
      <rect x="140" y="108" width="18" height="30" rx="4" fill="#1A1207" opacity="0.7" />
      <rect x="142" y="111" width="14" height="22" rx="2" fill="#8B5CF6" opacity="0.2" />
      {/* Phone screen glow */}
      <rect x="142" y="111" width="14" height="22" rx="2" fill="white" opacity="0.15" />

      {/* Sound wave from phone indicating quiet */}
      <circle cx="149" cy="122" r="4" fill="#E8734A" opacity="0.2" />

      {/* Plant in corner */}
      <rect x="25" y="120" width="14" height="20" rx="4" fill="#B5A898" opacity="0.2" />
      <circle cx="32" cy="115" r="12" fill="#22C55E" opacity="0.1" />
      <circle cx="28" cy="110" r="8" fill="#22C55E" opacity="0.12" />
      <circle cx="36" cy="108" r="9" fill="#22C55E" opacity="0.1" />

      {/* Window */}
      <rect x="60" y="25" width="40" height="50" rx="4" fill="white" opacity="0.3" />
      <rect x="60" y="25" width="40" height="50" rx="4" stroke="#B5A898" strokeWidth="1" opacity="0.15" />
      <line x1="80" y1="25" x2="80" y2="75" stroke="#B5A898" strokeWidth="0.8" opacity="0.15" />
      <line x1="60" y1="50" x2="100" y2="50" stroke="#B5A898" strokeWidth="0.8" opacity="0.15" />
      {/* Moon through window */}
      <circle cx="75" cy="38" r="6" fill="#F5A623" opacity="0.2" />

      {/* Sparkles */}
      <circle cx="175" cy="50" r="2" fill="#F5A623" opacity="0.3" />
      <circle cx="50" cy="90" r="2" fill="#8B5CF6" opacity="0.25" />
      <circle cx="200" cy="80" r="1.5" fill="#E8734A" opacity="0.25" />
    </svg>
  );
}
