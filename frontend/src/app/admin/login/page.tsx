"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle, Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import { api, LoginDto, persistAuth } from "@/lib/api";
import { cn } from "@/lib/utils";

export default function AdminLoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState<LoginDto>({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const payload = await api.login(form);
      if (payload.user.role !== "admin_space") {
        setError("Akses ditolak: hanya admin space.");
        return;
      }
      persistAuth(payload);
      setSuccess("Login berhasil! Mengarahkan...");
      setTimeout(() => router.push("/admin/dashboard"), 700);
    } catch (err: any) {
      setError(err.response?.data?.message || "Kredensial salah");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[var(--color-bg-primary)] p-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-8 text-center">
          <h1 className="font-[family-name:var(--font-heading)] text-3xl">
            Admin Portal
          </h1>
          <p className="mt-2 text-[var(--color-text-secondary)]">
            Masuk untuk mengelola coworking space
          </p>
        </div>

        {(error || success) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "mb-6 flex items-center gap-3 rounded-[10px] p-4 text-sm",
              error
                ? "border border-rose-200 bg-rose-50 text-rose-700"
                : "border border-emerald-200 bg-emerald-50 text-emerald-700",
            )}
          >
            {error ? <AlertCircle className="h-5 w-5 shrink-0" /> : <CheckCircle className="h-5 w-5 shrink-0" />}
            <span>{error || success}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Username / Email</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-text-secondary)]" />
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                className="w-full rounded-[10px] border border-[var(--color-border)] bg-white py-3 pl-10 pr-4"
                placeholder="admin"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-text-secondary)]" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full rounded-[10px] border border-[var(--color-border)] bg-white py-3 pl-10 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full rounded-full bg-[#121212] py-3.5 text-sm font-medium text-white disabled:opacity-70"
          >
            {isLoading ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                Memproses...
              </span>
            ) : (
              "Masuk ke Dashboard"
            )}
          </motion.button>
        </form>

        <p className="mt-6 text-center text-xs text-[var(--color-text-secondary)]">
          Demo: <code className="px-1.5 py-0.5 rounded bg-white border">admin</code> / <code className="px-1.5 py-0.5 rounded bg-white border">admin123</code>
        </p>
      </motion.div>
    </div>
  );
}