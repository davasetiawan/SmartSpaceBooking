"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { isLoggedIn, readAuthUser } from "@/lib/api";
import { AdminNavbar } from "./admin-navbar";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace("/admin/login");
      return;
    }
    const user = readAuthUser();
    if (user && user.role !== "admin_space") {
      router.replace("/admin/login");
      return;
    }
    setReady(true);
  }, [router, pathname]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FBF9F5]">
        <Loader2 className="h-8 w-8 animate-spin text-[#121212]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#121212] selection:bg-[#EBE7DF] selection:text-[#121212]">
      <AdminNavbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="flex-grow w-full px-6 py-8 md:px-12 lg:px-16 md:py-10"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      {/* Global Executive Console Footer */}
      <footer className="border-t border-[#EBE7DF] bg-[#FBF9F5] px-6 md:px-12 lg:px-16 py-6 text-xs text-[#666666] flex flex-col md:flex-row items-center justify-between gap-4 font-sans">
        <div className="flex items-center gap-2">
          <span className="font-serif font-bold text-sm text-[#121212]">WorkMates</span>
          <span className="text-[#666666]">•</span>
          <span>© 2025 Sonder Spaces Hospitality Inc. Senopati Sanctuary Executive Console</span>
        </div>
        <div className="flex items-center gap-6 font-medium text-[#666666]">
          <a href="#" className="hover:text-[#121212] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#121212] transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-[#121212] transition-colors">Architectural Standards</a>
          <a href="#" className="hover:text-[#121212] transition-colors">Support</a>
        </div>
      </footer>
    </div>
  );
}
