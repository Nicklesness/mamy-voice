"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="inline-flex items-center gap-1.5 bg-transparent border-none cursor-pointer transition-colors text-text-tertiary hover:text-text-primary"
      style={{ fontSize: 13, fontWeight: 500 }}
    >
      <LogOut size={14} />
      Sign out
    </button>
  );
}
