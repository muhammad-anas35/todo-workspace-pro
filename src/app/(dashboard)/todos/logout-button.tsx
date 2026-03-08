"use client";

import { signOut } from "next-auth/react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  return (
    <Button
      type="button"
      variant="ghost"
      onClick={async () => {
        toast.info("Logged out successfully.");
        await signOut({ callbackUrl: "/login" });
      }}
    >
      Sign Out
    </Button>
  );
}
