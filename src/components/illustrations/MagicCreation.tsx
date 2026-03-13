export default function MagicCreation({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background glow */}
      <ellipse cx="80" cy="80" rx="65" ry="65" fill="#FDEEE8" opacity="0.3" />
      <ellipse cx="80" cy="80" rx="40" ry="40" fill="#EDE9FE" opacity="0.2" />

      {/* Sound waves transforming into magic */}
      <path d="M30 70 Q35 60 30 50" stroke="#E8734A" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.3" />
      <path d="M22 75 Q28 58 22 42" stroke="#E8734A" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.2" />
      <path d="M38 68 Q42 62 38 56" stroke="#E8734A" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.25" />

      {/* Magic wand */}
      <line x1="55" y1="110" x2="100" y2="50" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
      {/* Wand tip star */}
      <circle cx="100" cy="50" r="6" fill="#F5A623" opacity="0.5" />
      <circle cx="100" cy="50" r="3" fill="white" opacity="0.6" />

      {/* Sparkle burst from wand */}
      <circle cx="110" cy="42" r="2.5" fill="#E8734A" opacity="0.4" />
      <circle cx="108" cy="35" r="2" fill="#8B5CF6" opacity="0.35" />
      <circle cx="115" cy="48" r="1.5" fill="#F5A623" opacity="0.45" />
      <circle cx="95" cy="38" r="2" fill="#E8734A" opacity="0.3" />
      <circle cx="118" cy="38" r="1.5" fill="#22C55E" opacity="0.3" />
      <circle cx="105" cy="30" r="1.5" fill="#F5A623" opacity="0.3" />

      {/* Book appearing from magic */}
      <rect x="90" y="75" width="40" height="32" rx="4" fill="white" opacity="0.8" />
      <rect x="90" y="75" width="40" height="32" rx="4" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.3" />
      <line x1="110" y1="75" x2="110" y2="107" stroke="#8B5CF6" strokeWidth="0.8" opacity="0.15" />
      {/* Pages */}
      <line x1="94" y1="83" x2="107" y2="83" stroke="#B5A898" strokeWidth="0.8" opacity="0.3" />
      <line x1="94" y1="87" x2="106" y2="87" stroke="#B5A898" strokeWidth="0.8" opacity="0.25" />
      <line x1="94" y1="91" x2="105" y2="91" stroke="#B5A898" strokeWidth="0.8" opacity="0.25" />
      <line x1="113" y1="83" x2="126" y2="83" stroke="#B5A898" strokeWidth="0.8" opacity="0.3" />
      <line x1="113" y1="87" x2="125" y2="87" stroke="#B5A898" strokeWidth="0.8" opacity="0.25" />

      {/* Musical notes floating */}
      <path d="M42 85 Q42 82 44 80 L44 74" stroke="#E8734A" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.3" />
      <circle cx="42" cy="85" r="2.5" fill="#E8734A" opacity="0.25" />

      <path d="M130 65 Q130 62 132 60 L132 54" stroke="#8B5CF6" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.3" />
      <circle cx="130" cy="65" r="2.5" fill="#8B5CF6" opacity="0.25" />

      {/* Decorative dots */}
      <circle cx="20" cy="90" r="2" fill="#F5A623" opacity="0.3" />
      <circle cx="140" cy="20" r="2" fill="#E8734A" opacity="0.3" />
      <circle cx="25" cy="30" r="1.5" fill="#8B5CF6" opacity="0.25" />
      <circle cx="145" cy="130" r="2" fill="#F5A623" opacity="0.25" />

      {/* Orbit path */}
      <ellipse cx="80" cy="80" rx="55" ry="55" stroke="#8B5CF6" strokeWidth="0.5" strokeDasharray="3 5" opacity="0.1" />
    </svg>
  );
}
