export default function VoiceProcess({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background glow */}
      <ellipse cx="120" cy="100" rx="100" ry="80" fill="#FEF3C7" opacity="0.3" />

      {/* Step 1: Microphone */}
      <circle cx="50" cy="90" r="32" fill="white" opacity="0.8" />
      <circle cx="50" cy="90" r="32" stroke="#E8734A" strokeWidth="1.5" opacity="0.2" />
      {/* Mic body */}
      <rect x="42" y="72" width="16" height="26" rx="8" fill="#E8734A" opacity="0.6" />
      {/* Mic stand */}
      <line x1="50" y1="98" x2="50" y2="108" stroke="#E8734A" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      <path d="M42 108 L58 108" stroke="#E8734A" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      {/* Sound waves from mic */}
      <path d="M62 82 Q66 78 62 74" stroke="#E8734A" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.3" />
      <path d="M66 85 Q72 78 66 71" stroke="#E8734A" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.2" />

      {/* Arrow 1 */}
      <path d="M85 90 L105 90" stroke="#B5A898" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 3" opacity="0.4" />
      <path d="M102 86 L108 90 L102 94" stroke="#B5A898" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.4" />

      {/* Step 2: Book */}
      <circle cx="120" cy="90" r="32" fill="white" opacity="0.8" />
      <circle cx="120" cy="90" r="32" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.2" />
      {/* Open book */}
      <path d="M106 80 L106 104 Q120 98 120 98 Q120 98 134 104 L134 80 Q120 86 120 86 Q120 86 106 80" stroke="#8B5CF6" strokeWidth="1.5" fill="none" opacity="0.5" />
      <line x1="120" y1="86" x2="120" y2="98" stroke="#8B5CF6" strokeWidth="1" opacity="0.3" />
      {/* Text lines */}
      <line x1="109" y1="87" x2="117" y2="89" stroke="#B5A898" strokeWidth="0.8" opacity="0.3" />
      <line x1="109" y1="91" x2="116" y2="93" stroke="#B5A898" strokeWidth="0.8" opacity="0.3" />
      <line x1="123" y1="89" x2="131" y2="87" stroke="#B5A898" strokeWidth="0.8" opacity="0.3" />
      <line x1="123" y1="93" x2="130" y2="91" stroke="#B5A898" strokeWidth="0.8" opacity="0.3" />

      {/* Arrow 2 */}
      <path d="M155 90 L175 90" stroke="#B5A898" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 3" opacity="0.4" />
      <path d="M172 86 L178 90 L172 94" stroke="#B5A898" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.4" />

      {/* Step 3: Headphones */}
      <circle cx="190" cy="90" r="32" fill="white" opacity="0.8" />
      <circle cx="190" cy="90" r="32" stroke="#F5A623" strokeWidth="1.5" opacity="0.2" />
      {/* Headphone band */}
      <path d="M175 95 Q175 75 190 72 Q205 75 205 95" stroke="#F5A623" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5" />
      {/* Ear cups */}
      <rect x="170" y="90" width="10" height="16" rx="5" fill="#F5A623" opacity="0.4" />
      <rect x="200" y="90" width="10" height="16" rx="5" fill="#F5A623" opacity="0.4" />
      {/* Music note */}
      <circle cx="190" cy="90" r="3" fill="#F5A623" opacity="0.3" />
      <line x1="193" y1="90" x2="193" y2="82" stroke="#F5A623" strokeWidth="1.2" opacity="0.3" />
      <path d="M193 82 Q197 80 196 84" fill="#F5A623" opacity="0.3" />

      {/* Step numbers */}
      <text x="50" y="138" textAnchor="middle" fill="#E8734A" fontSize="11" fontWeight="600" opacity="0.6">1</text>
      <text x="120" y="138" textAnchor="middle" fill="#8B5CF6" fontSize="11" fontWeight="600" opacity="0.6">2</text>
      <text x="190" y="138" textAnchor="middle" fill="#F5A623" fontSize="11" fontWeight="600" opacity="0.6">3</text>

      {/* Decorative sparkles */}
      <circle cx="30" cy="40" r="2" fill="#E8734A" opacity="0.3" />
      <circle cx="210" cy="35" r="2.5" fill="#8B5CF6" opacity="0.3" />
      <circle cx="120" cy="30" r="2" fill="#F5A623" opacity="0.4" />
      <circle cx="25" cy="150" r="2" fill="#8B5CF6" opacity="0.2" />
      <circle cx="215" cy="155" r="2" fill="#E8734A" opacity="0.2" />
    </svg>
  );
}
