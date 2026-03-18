"use client";

import { signOut } from "next-auth/react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  return (
    <Button
      type="button"
      variant="secondary"
      className="w-full border-white/20 bg-white/10 text-white hover:bg-white/20"
      onClick={async () => {
        toast.info("Logged out successfully.");
        await signOut({ callbackUrl: "/login" });
      }}
    >
      Sign Out
    </Button>
  );
}
