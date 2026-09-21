"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  HelpCircle,
  KeyRound,
  Loader2,
  AlertCircle,
  CheckCircle2,
  User,
  Building,
  Phone,
  MapPin,
  ShieldCheck,
  UserCheck,
  Camera,
  X,
  BadgeCheck,
} from "lucide-react";
import { loginUser, registerMember, registerAdminSpace } from "@/lib/api";

export function AuthForm() {
  const router = useRouter();
  const [role, setRole] = useState<"member" | "admin_space">("member");
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Error and Success Feedback States
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Sign In Form States
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  // Member Registration States
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [instansi, setInstansi] = useState("");
  const [telp, setTelp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);

  // Admin Space Registration States
  const [namaPemilik, setNamaPemilik] = useState("");
  const [namaCoworking, setNamaCoworking] = useState("");
  const [adminUsername, setAdminUsername] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminTelp, setAdminTelp] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const handleRoleChange = (newRole: "member" | "admin_space") => {
    setRole(newRole);
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const handleTabSwitch = (tab: "signin" | "signup") => {
    setActiveTab(tab);
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage("Ukuran foto maksimal 5MB");
        return;
      }
      setFotoFile(file);
      setFotoPreview(URL.createObjectURL(file));
      setErrorMessage(null);
    }
  };

  const removeFoto = () => {
    setFotoFile(null);
    setFotoPreview(null);
  };

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      const isEmail = identifier.includes("@");
      const payload = isEmail
        ? { email: identifier, password }
        : { username: identifier, password };

      const res = await loginUser(payload, rememberDevice);

      if (res.data?.access_token && res.data.user) {
        const { user } = res.data;
        if (rememberDevice) {
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          sessionStorage.setItem("user", JSON.stringify(user));
        }

        setSuccessMessage(`Selamat datang kembali, ${user.username}! Login berhasil.`);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal melakukan login";
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMemberSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      const res = await registerMember({
        username,
        email: signupEmail,
        password: signupPassword,
        nama_member: fullName,
        instansi: instansi || "Atelier Nord",
        alamat: alamat || "Jl. Senopati No. 42, Jakarta",
        telp,
        foto: fotoFile,
      }, rememberDevice);

      if (res.data?.access_token && res.data.user) {
        const { user } = res.data;
        if (rememberDevice) {
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          sessionStorage.setItem("user", JSON.stringify(user));
        }

        setSuccessMessage(`Akun Member (${user.username}) berhasil dibuat!`);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal pendaftaran akun member";
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      const res = await registerAdminSpace({
        username: adminUsername,
        email: adminEmail,
        password: adminPassword,
        nama_coworking: namaCoworking,
        nama_pemilik: namaPemilik,
        telp: adminTelp,
      }, rememberDevice);

      if (res.data?.access_token && res.data.user) {
        const { user } = res.data;
        if (rememberDevice) {
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          sessionStorage.setItem("user", JSON.stringify(user));
        }

        setSuccessMessage(`Akun Space Owner (${user.username}) berhasil terdaftar!`);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal pendaftaran Space Owner";
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between bg-[#fbf9f5] text-[#1b1c1a]">
      {/* Sonder Style Header Bar */}
      <header className="flex items-center justify-between px-6 md:px-12 py-6 shrink-0 border-b border-[#EBE7DF]/80">
        <div className="flex items-center gap-2.5">
          <span className="font-serif font-semibold text-xl tracking-tight text-[#121212]">
            WorkMates
          </span>
         
        </div>

        <button
          type="button"
          onClick={() => alert("Connecting to WorkMates Concierge support...")}
          className="inline-flex items-center gap-1.5 text-xs text-[#5e5e5e] hover:text-[#121212] transition-colors font-medium"
        >
          <HelpCircle className="w-4 h-4 stroke-[1.75]" />
          <span>Concierge</span>
        </button>
      </header>

      {/* Main Form Body Container */}
      <div className="flex-1 px-6 md:px-16 lg:px-20 py-8 md:py-12 max-w-xl mx-auto w-full flex flex-col justify-center">
        {/* Header Text */}
        <div className="mb-6 space-y-2 text-left">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#121212] tracking-tight leading-tight">
            Welcome to WorkMates
          </h1>
          <p className="text-xs sm:text-sm text-[#5e5e5e] font-normal leading-relaxed">
            A boutique sanctuary for modern thinkers and creators.
          </p>
        </div>

        {/* Role Toggle Switcher (Member vs Space Owner / Admin) */}
        <div className="p-1 bg-[#efeeea] rounded-full flex items-center justify-between gap-1 text-xs border border-[#EBE7DF] mb-5">
          <button
            type="button"
            onClick={() => handleRoleChange("member")}
            className={`flex-1 py-2 px-3 rounded-full flex items-center justify-center gap-1.5 font-medium transition-all ${
              role === "member"
                ? "bg-[#121212] text-white shadow-sm font-semibold"
                : "text-[#5e5e5e] hover:text-[#121212]"
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Member / Guest</span>
          </button>
          <button
            type="button"
            onClick={() => handleRoleChange("admin_space")}
            className={`flex-1 py-2 px-3 rounded-full flex items-center justify-center gap-1.5 font-medium transition-all ${
              role === "admin_space"
                ? "bg-[#121212] text-white shadow-sm font-semibold"
                : "text-[#5e5e5e] hover:text-[#121212]"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Space Owner / Admin</span>
          </button>
        </div>

        {/* Tab Switcher (Sign In vs Create Account) */}
        <div className="inline-flex p-1 bg-[#efeeea] rounded-full mb-6 self-start border border-[#EBE7DF]/80 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => handleTabSwitch("signin")}
            className={`px-6 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
              activeTab === "signin"
                ? "bg-white text-[#121212] shadow-sm"
                : "text-[#5e5e5e] hover:text-[#121212] font-medium"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => handleTabSwitch("signup")}
            className={`px-6 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
              activeTab === "signup"
                ? "bg-white text-[#121212] shadow-sm"
                : "text-[#5e5e5e] hover:text-[#121212] font-medium"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Feedback Alert Banners */}
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3.5 mb-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5 shadow-sm"
          >
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{errorMessage}</span>
          </motion.div>
        )}

        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3.5 mb-4 rounded-xl bg-[#4A6B5D]/10 border border-[#4A6B5D]/20 text-[#4A6B5D] text-xs flex items-center gap-2.5 shadow-sm"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0 text-[#4A6B5D]" />
            <span>{successMessage}</span>
          </motion.div>
        )}

        {/* Dynamic Forms */}
        <AnimatePresence mode="wait">
          {activeTab === "signin" ? (
            /* FORM 1: LOGIN */
            <motion.form
              key="signin-form"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleSignInSubmit}
              className="space-y-5"
            >
              {/* Username or Corporate Email */}
              <div className="space-y-1.5">
                <label
                  htmlFor="login-identifier"
                  className="block text-[11px] font-semibold tracking-wider text-[#5e5e5e] uppercase font-sans"
                >
                  {role === "admin_space"
                    ? "Admin Username or Corporate Email"
                    : "Username or Corporate Email"}
                </label>
                <div className="relative flex items-center">
                  <input
                    id="login-identifier"
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={
                      role === "admin_space"
                        ? "admin@workmates.com"
                        : "julian@architecture.studio"
                    }
                    className="w-full px-4 py-3.5 bg-white border border-[#EBE7DF] rounded-xl text-xs sm:text-sm text-[#1b1c1a] placeholder:text-[#5e5e5e]/50 focus:outline-none focus:border-[#121212] transition-colors"
                  />
                  <Mail className="absolute right-3.5 w-4 h-4 text-[#5e5e5e]/60 pointer-events-none stroke-[1.5]" />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="login-password"
                    className="block text-[11px] font-semibold tracking-wider text-[#5e5e5e] uppercase font-sans"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => alert("Password reset link sent to your corporate email.")}
                    className="text-[11px] font-medium text-[#5e5e5e] hover:text-[#121212] transition-colors underline-offset-4 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative flex items-center">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-4 py-3.5 bg-white border border-[#EBE7DF] rounded-xl text-xs sm:text-sm text-[#1b1c1a] placeholder:text-[#5e5e5e]/50 focus:outline-none focus:border-[#121212] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 p-1 text-[#5e5e5e] hover:text-[#121212] transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 stroke-[1.5]" />
                    ) : (
                      <Eye className="w-4 h-4 stroke-[1.5]" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Device Checkbox */}
              <div className="flex items-center justify-between pt-1">
                <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberDevice}
                    onChange={(e) => setRememberDevice(e.target.checked)}
                    className="w-4 h-4 rounded border-[#EBE7DF] text-[#121212] focus:ring-0 cursor-pointer accent-[#121212]"
                  />
                  <span className="text-xs text-[#5e5e5e]">Remember this device</span>
                </label>
              </div>

              {/* Primary CTA Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.005 }}
                whileTap={{ scale: 0.995 }}
                disabled={isLoading}
                className="w-full py-4 px-8 rounded-full bg-[#121212] text-white text-xs font-semibold tracking-wider uppercase hover:opacity-90 active:scale-[0.99] transition-all duration-150 flex items-center justify-center gap-2 shadow-sm disabled:opacity-75"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>
                      {role === "admin_space"
                        ? "SIGN IN AS SPACE OWNER"
                        : "SIGN IN TO SPACE"}
                    </span>
                    <ArrowRight className="w-4 h-4 stroke-[2]" />
                  </>
                )}
              </motion.button>

              {/* Alternative Divider */}
              <div className="pt-2 flex items-center gap-4 text-[#5e5e5e]/40">
                <div className="h-px flex-1 bg-[#EBE7DF]" />
                <span className="text-[10px] font-semibold tracking-widest uppercase text-[#5e5e5e]">
                  OR ACCESS VIA
                </span>
                <div className="h-px flex-1 bg-[#EBE7DF]" />
              </div>

              {/* Secondary Access Option */}
              <button
                type="button"
                onClick={() => alert("Connecting via Digital Keycard / SSO...")}
                className="w-full py-3.5 px-6 rounded-full bg-white border border-[#EBE7DF] text-[#121212] text-xs font-semibold hover:bg-[#f5f3ef] transition-colors flex items-center justify-center gap-2.5 shadow-sm"
              >
                <KeyRound className="w-4 h-4 text-[#5e5e5e] stroke-[1.5]" />
                <span>Digital Keycard / SSO</span>
              </button>
            </motion.form>
          ) : role === "member" ? (
            /* FORM 2: REGISTER MEMBER */
            <motion.form
              key="member-signup-form"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleMemberSignUp}
              className="space-y-4"
            >
              {/* Profile Portrait Upload Section */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold tracking-wider text-[#5e5e5e] uppercase font-sans">
                  Member Portrait (foto)
                </label>
                <div className="relative border border-dashed border-[#EBE7DF] rounded-xl p-4 bg-white hover:bg-[#f5f3ef]/50 transition-colors text-center cursor-pointer group">
                  {fotoPreview ? (
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={fotoPreview}
                          alt="Member portrait"
                          className="w-12 h-12 rounded-full object-cover border border-[#EBE7DF]"
                        />
                        <div className="text-left">
                          <p className="text-xs font-semibold text-[#121212]">{fotoFile?.name}</p>
                          <p className="text-[10px] text-[#5e5e5e]">
                            {fotoFile?.size ? `${(fotoFile.size / 1024).toFixed(0)} KB` : "Uploaded"}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeFoto}
                        className="p-1 text-[#5e5e5e] hover:text-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center gap-1.5 cursor-pointer">
                      <div className="w-10 h-10 rounded-full bg-[#efeeea] flex items-center justify-center text-[#121212] group-hover:scale-105 transition-transform">
                        <Camera className="w-5 h-5 stroke-[1.5]" />
                      </div>
                      <p className="text-xs text-[#121212] font-medium">
                        Drop your portrait here or <span className="underline">browse</span>
                      </p>
                      <p className="text-[10px] text-[#5e5e5e]">
                        PNG, JPG up to 5MB (3:4 ratio recommended)
                      </p>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleFotoChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-semibold tracking-wider text-[#5e5e5e] uppercase font-sans">
                    Full Name (nama_member)
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Julian Vance"
                    className="w-full px-4 py-3 bg-white border border-[#EBE7DF] rounded-xl text-xs text-[#1b1c1a] placeholder:text-[#5e5e5e]/50 focus:outline-none focus:border-[#121212] transition-colors"
                  />
                </div>

                {/* Username */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-semibold tracking-wider text-[#5e5e5e] uppercase font-sans">
                    Username
                  </label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="jvance"
                    className="w-full px-4 py-3 bg-white border border-[#EBE7DF] rounded-xl text-xs text-[#1b1c1a] placeholder:text-[#5e5e5e]/50 focus:outline-none focus:border-[#121212] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Institution */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-semibold tracking-wider text-[#5e5e5e] uppercase font-sans">
                    Institution / Studio (instansi)
                  </label>
                  <input
                    type="text"
                    required
                    value={instansi}
                    onChange={(e) => setInstansi(e.target.value)}
                    placeholder="Atelier Nord"
                    className="w-full px-4 py-3 bg-white border border-[#EBE7DF] rounded-xl text-xs text-[#1b1c1a] placeholder:text-[#5e5e5e]/50 focus:outline-none focus:border-[#121212] transition-colors"
                  />
                </div>

                {/* WhatsApp Phone */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-semibold tracking-wider text-[#5e5e5e] uppercase font-sans">
                    WhatsApp Phone (telp)
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-[#EBE7DF] bg-[#efeeea] text-[#121212] font-mono text-xs">
                      +62
                    </span>
                    <input
                      type="tel"
                      required
                      value={telp}
                      onChange={(e) => setTelp(e.target.value)}
                      placeholder="812-3456-7890"
                      className="w-full px-4 py-3 bg-white rounded-r-xl border border-[#EBE7DF] text-xs text-[#1b1c1a] placeholder:text-[#5e5e5e]/50 focus:outline-none focus:border-[#121212] transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold tracking-wider text-[#5e5e5e] uppercase font-sans">
                  Corporate Email
                </label>
                <input
                  type="email"
                  required
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="julian@architecture.studio"
                  className="w-full px-4 py-3 bg-white border border-[#EBE7DF] rounded-xl text-xs text-[#1b1c1a] placeholder:text-[#5e5e5e]/50 focus:outline-none focus:border-[#121212] transition-colors"
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold tracking-wider text-[#5e5e5e] uppercase font-sans">
                  Password (minimum 8 characters)
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3 bg-white border border-[#EBE7DF] rounded-xl text-xs text-[#1b1c1a] placeholder:text-[#5e5e5e]/50 focus:outline-none focus:border-[#121212] transition-colors"
                />
              </div>

              {/* Address */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold tracking-wider text-[#5e5e5e] uppercase font-sans">
                  Physical Address (alamat)
                </label>
                <textarea
                  required
                  rows={2}
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  placeholder="Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan"
                  className="w-full px-4 py-3 bg-white border border-[#EBE7DF] rounded-xl text-xs text-[#1b1c1a] placeholder:text-[#5e5e5e]/50 focus:outline-none focus:border-[#121212] transition-colors resize-none"
                />
              </div>

              {/* Primary Register CTA */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.005 }}
                whileTap={{ scale: 0.995 }}
                disabled={isLoading}
                className="w-full py-4 px-8 rounded-full bg-[#121212] text-white text-xs font-semibold tracking-wider uppercase hover:opacity-90 active:scale-[0.99] transition-all duration-150 flex items-center justify-center gap-2 mt-4 shadow-sm disabled:opacity-75"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Create Member Account</span>
                    <BadgeCheck className="w-4 h-4 stroke-[1.75]" />
                  </>
                )}
              </motion.button>
            </motion.form>
          ) : (
            /* FORM 3: REGISTER SPACE OWNER / ADMIN */
            <motion.form
              key="admin-signup-form"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleAdminSignUp}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Owner Full Name */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-semibold tracking-wider text-[#5e5e5e] uppercase font-sans">
                    Owner Full Name (nama_pemilik)
                  </label>
                  <input
                    type="text"
                    required
                    value={namaPemilik}
                    onChange={(e) => setNamaPemilik(e.target.value)}
                    placeholder="Alex Mercer"
                    className="w-full px-4 py-3 bg-white border border-[#EBE7DF] rounded-xl text-xs text-[#1b1c1a] placeholder:text-[#5e5e5e]/50 focus:outline-none focus:border-[#121212] transition-colors"
                  />
                </div>

                {/* Coworking Space Name */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-semibold tracking-wider text-[#5e5e5e] uppercase font-sans">
                    Space Name (nama_coworking)
                  </label>
                  <input
                    type="text"
                    required
                    value={namaCoworking}
                    onChange={(e) => setNamaCoworking(e.target.value)}
                    placeholder="Senopati Sanctuary"
                    className="w-full px-4 py-3 bg-white border border-[#EBE7DF] rounded-xl text-xs text-[#1b1c1a] placeholder:text-[#5e5e5e]/50 focus:outline-none focus:border-[#121212] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Admin Username */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-semibold tracking-wider text-[#5e5e5e] uppercase font-sans">
                    Admin Username
                  </label>
                  <input
                    type="text"
                    required
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    placeholder="alexowner"
                    className="w-full px-4 py-3 bg-white border border-[#EBE7DF] rounded-xl text-xs text-[#1b1c1a] placeholder:text-[#5e5e5e]/50 focus:outline-none focus:border-[#121212] transition-colors"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-semibold tracking-wider text-[#5e5e5e] uppercase font-sans">
                    WhatsApp Phone (telp)
                  </label>
                  <input
                    type="tel"
                    required
                    value={adminTelp}
                    onChange={(e) => setAdminTelp(e.target.value)}
                    placeholder="0819-8765-4321"
                    className="w-full px-4 py-3 bg-white border border-[#EBE7DF] rounded-xl text-xs text-[#1b1c1a] placeholder:text-[#5e5e5e]/50 focus:outline-none focus:border-[#121212] transition-colors"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold tracking-wider text-[#5e5e5e] uppercase font-sans">
                  Business Email
                </label>
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="alex@workmates.com"
                  className="w-full px-4 py-3 bg-white border border-[#EBE7DF] rounded-xl text-xs text-[#1b1c1a] placeholder:text-[#5e5e5e]/50 focus:outline-none focus:border-[#121212] transition-colors"
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold tracking-wider text-[#5e5e5e] uppercase font-sans">
                  Password (minimum 8 characters)
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3 bg-white border border-[#EBE7DF] rounded-xl text-xs text-[#1b1c1a] placeholder:text-[#5e5e5e]/50 focus:outline-none focus:border-[#121212] transition-colors"
                />
              </div>

              {/* Primary Register CTA */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.005 }}
                whileTap={{ scale: 0.995 }}
                disabled={isLoading}
                className="w-full py-4 px-8 rounded-full bg-[#121212] text-white text-xs font-semibold tracking-wider uppercase hover:opacity-90 active:scale-[0.99] transition-all duration-150 flex items-center justify-center gap-2 mt-4 shadow-sm disabled:opacity-75"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Register as Space Owner</span>
                    <BadgeCheck className="w-4 h-4 stroke-[1.75]" />
                  </>
                )}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Terms and Privacy Note */}
        <p className="text-xs text-center text-[#5e5e5e]/80 mt-8 leading-relaxed font-sans">
          By continuing, you agree to WorkMates&apos;{" "}
          <a href="#terms" className="text-[#121212] font-medium hover:underline underline-offset-2">
            Architectural Standards
          </a>{" "}
          and{" "}
          <a href="#privacy" className="text-[#121212] font-medium hover:underline underline-offset-2">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
