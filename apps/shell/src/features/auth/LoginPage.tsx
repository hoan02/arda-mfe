import React, {
  useState,
  useRef,
  useCallback,
  useActionState,
  useTransition,
} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@workspace/shared/auth";
import {
  t,
  getLanguage,
  toggleLanguage,
  type Language,
} from "@workspace/shared/i18n";
import {
  Globe,
  Sun,
  Moon,
  ArrowRight,
  ArrowLeft,
  Loader2,
  AlertCircle,
  User,
  Lock,
  ShieldCheck,
  Check,
  Layers,
} from "lucide-react";

// ── React 19 Actions ──

type TenantResult = { error?: string } | undefined;

async function tenantLookupAction(
  _prev: TenantResult,
  formData: FormData,
): Promise<TenantResult> {
  // This is a placeholder — actual work is done in component via lookupTenant
  return undefined;
}

export function LoginPage() {
  const navigate = useNavigate();
  const {
    lookupTenant,
    login,
    loginSSO,
    tenant,
    isPending: authPending,
  } = useAuth();
  const [lang, setLang] = useState<Language>(getLanguage());

  // Step state
  const [step, setStep] = useState(1);
  const [digits, setDigits] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Login form
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // React 19: useTransition for async navigation actions
  const [isLookingUp, startLookupTransition] = useTransition();
  const [isLoggingIn, startLoginTransition] = useTransition();

  // Error states
  const [tenantError, setTenantError] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);

  const tt = useCallback((key: string) => t(key, lang), [lang]);

  const handleToggleLang = () => {
    const next = toggleLanguage();
    setLang(next);
  };

  // ── Tenant Code Input ──

  const handleDigitInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number,
  ) => {
    const value = e.target.value;
    if (/^[a-z0-9]$/i.test(value) || value === "") {
      const next = [...digits];
      next[idx] = value.toLowerCase();
      setDigits(next);
      if (value !== "" && idx < 5) {
        inputRefs.current[idx + 1]?.focus();
      }
    } else {
      e.target.value = digits[idx];
    }
  };

  const handleDigitKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === "Backspace" && !digits[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  const isCodeComplete = !digits.some((d) => d === "");

  // React 19: useTransition for tenant lookup
  const handleLookup = () => {
    if (!isCodeComplete) return;
    const key = digits.join("");
    setTenantError(null);

    startLookupTransition(async () => {
      try {
        await lookupTenant(key);
        setStep(2);
      } catch (err: any) {
        setTenantError(err.message || "Không thể tìm thấy mã doanh nghiệp");
      }
    });
  };

  // React 19: useTransition for login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenant) {
      setLoginError("Tenant không tồn tại. Vui lòng kiểm tra lại.");
      return;
    }
    if (!username.trim() || !password) {
      setLoginError("Vui lòng nhập đầy đủ tài khoản và mật khẩu.");
      return;
    }
    setLoginError(null);

    startLoginTransition(async () => {
      try {
        await login(username, password, tenant.key);
        navigate("/");
      } catch (err: any) {
        setLoginError(err.message || "Đăng nhập không thành công");
      }
    });
  };

  const handleSSO = () => {
    if (!tenant) return;
    setLoginError(null);
    startLoginTransition(async () => {
      await loginSSO(tenant.key);
    });
  };

  const isLoading = isLookingUp || isLoggingIn || authPending;

  // Dark mode
  const [isDark, setIsDark] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark"),
  );

  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden p-4 transition-colors duration-500">
      {/* Background Blobs */}
      <div className="absolute inset-0 opacity-20 dark:opacity-30 pointer-events-none transition-opacity duration-500">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-400 dark:bg-indigo-600 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400 dark:bg-cyan-600 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-400/20 dark:bg-purple-600/30 rounded-full blur-3xl" />
      </div>

      {/* Theme & Language Controls */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
        <button
          onClick={handleToggleLang}
          className="group flex items-center gap-2 px-4 py-2.5 backdrop-blur-xl bg-white/60 dark:bg-white/5 rounded-xl shadow-lg border border-slate-200/50 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all duration-300"
        >
          <Globe
            size={18}
            className="text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
          />
          <span className="text-sm font-semibold text-slate-800 dark:text-white">
            {lang === "vi" ? "VI" : "EN"}
          </span>
        </button>
        <button
          onClick={toggleDark}
          className="group relative flex items-center justify-center w-11 h-11 backdrop-blur-xl bg-white/60 dark:bg-white/5 rounded-xl shadow-lg border border-slate-200/50 dark:border-white/10 hover:border-indigo-300 dark:hover:border-indigo-500/40 transition-all duration-300"
        >
          {isDark ? (
            <Sun
              size={20}
              className="text-yellow-400 group-hover:text-yellow-300 group-hover:rotate-45 group-hover:scale-110 transition-all duration-300"
            />
          ) : (
            <Moon
              size={20}
              className="text-slate-600 group-hover:text-indigo-600 group-hover:-rotate-12 group-hover:scale-110 transition-all duration-300"
            />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        {step === 1 && (
          <div className="flex flex-col lg:flex-row backdrop-blur-xl bg-white/60 dark:bg-white/5 rounded-2xl overflow-hidden border border-slate-200/50 dark:border-white/5 shadow-2xl max-w-4xl mx-auto transition-colors duration-500 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Left — Branding */}
            <div className="hidden lg:flex lg:w-3/5 p-12 flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-950 transition-colors duration-500">
              <div className="relative z-10 flex flex-col items-center max-w-md w-full">
                <div className="flex items-end gap-4 mb-8">
                  <div className="flex items-end gap-2">
                    <div className="w-4 h-4 rounded-full bg-cyan-500 dark:bg-cyan-400 transition-colors duration-500" />
                    <div className="w-6 h-6 rounded-full bg-cyan-500 dark:bg-cyan-400 mb-5 transition-colors duration-500" />
                    <div className="w-8 h-8 rounded-full bg-cyan-500 dark:bg-cyan-400 mb-10 transition-colors duration-500" />
                  </div>
                  <h1 className="text-7xl font-bold text-slate-900 dark:text-white tracking-tight leading-none transition-colors duration-500">
                    ARDA
                  </h1>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-lg font-medium text-center mb-10 transition-colors duration-500">
                  Where data flows with intelligence.
                </p>
                <div className="text-left w-full space-y-4">
                  <p className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                    Phần mềm tiên phong trong:
                  </p>
                  {[
                    "Hệ thống quản lý dữ liệu và báo cáo thông minh",
                    "Ứng dụng AI và phân tích thống kê chuyên sâu",
                    "Xây dựng giải pháp microservice hiện đại và mở rộng linh hoạt",
                  ].map((text, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400 mt-2 shrink-0" />
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Tenant Code */}
            <div className="w-full lg:w-1/2 p-6 md:p-10 flex flex-col justify-center bg-white/50 dark:bg-slate-950/20 transition-colors duration-500">
              <div className="w-full max-w-sm mx-auto">
                {/* Mobile Logo */}
                <header className="mb-6 lg:hidden flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                    <Layers size={18} className="text-white" />
                  </div>
                  <span className="font-bold text-lg text-slate-900 dark:text-white">
                    ARDA
                  </span>
                </header>

                <div className="mb-6">
                  <h1 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">
                    {tt("tenant.title")}
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400 text-xs">
                    {tt("tenant.subtitle")}
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleLookup();
                  }}
                  className="space-y-5"
                >
                  <div>
                    <label className="block text-[9px] uppercase tracking-[0.2em] font-bold text-slate-500 text-center mb-4">
                      {tt("tenant.step")}
                    </label>
                    <div className="flex justify-center gap-1.5">
                      {digits.map((digit, idx) => (
                        <div key={idx} className="relative group">
                          <div className="absolute -inset-px bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-lg opacity-0 focus-within:opacity-40 transition-opacity" />
                          <input
                            ref={(el) => {
                              inputRefs.current[idx] = el;
                            }}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleDigitInput(e, idx)}
                            onKeyDown={(e) => handleDigitKeyDown(e, idx)}
                            placeholder="-"
                            className="relative w-10 h-12 bg-slate-100 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700/50 rounded-lg text-center text-lg font-bold text-slate-900 dark:text-white focus:outline-none transition-all focus:border-cyan-500/50 placeholder:text-slate-400 dark:placeholder:text-slate-700 duration-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {tenantError && (
                    <div className="p-2.5 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertCircle
                          size={14}
                          className="text-red-400 mt-0.5"
                        />
                        <p className="text-xs text-red-400 flex-1">
                          {tenantError}
                        </p>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={!isCodeComplete || isLoading}
                    className="w-full group relative p-px rounded-lg overflow-hidden transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-cyan-500 opacity-80" />
                    <div className="relative py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-[7px] flex items-center justify-center font-semibold text-sm tracking-wide text-white">
                      {isLoading ? (
                        <>
                          <Loader2 size={16} className="animate-spin mr-2" />
                          <span>{tt("tenant.processing")}</span>
                        </>
                      ) : (
                        <>
                          <span>{tt("tenant.continue")}</span>
                          <ArrowRight
                            size={16}
                            className="ml-2 transition-transform group-hover:translate-x-1"
                          />
                        </>
                      )}
                    </div>
                  </button>

                  <div className="text-center">
                    <p className="text-xs text-slate-500">
                      {tt("tenant.help")}
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Tenant Header */}
            <div className="flex flex-col items-center mb-6">
              <div className="flex items-center gap-2 mb-2">
                {tenant?.logo ? (
                  <img
                    src={tenant.logo}
                    alt={tenant.name}
                    className="w-10 h-10 object-contain rounded-xl"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-xl shadow-indigo-500/20">
                    <ShieldCheck size={24} className="text-white" />
                  </div>
                )}
                <h2 className="font-bold text-2xl tracking-tight text-slate-900 dark:text-white">
                  {tenant?.name || "ARDA"}
                </h2>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-white/60 dark:bg-white/5 rounded-2xl p-6 md:p-8 border border-slate-200/50 dark:border-white/10 relative overflow-hidden shadow-2xl">
              {/* Status Badge */}
              <div className="flex justify-center mb-6">
                <div className="px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center gap-2 text-xs font-medium text-cyan-600 dark:text-cyan-400">
                  <div className="w-4 h-4 rounded-full bg-cyan-500 flex items-center justify-center text-white">
                    <Check size={12} />
                  </div>
                  <span>
                    {tt("login.step")}:{" "}
                    <span className="font-mono font-bold ml-1 text-slate-900 dark:text-white">
                      {digits.join("").toUpperCase()}
                    </span>
                  </span>
                  <span className="mx-2 text-slate-300 dark:text-slate-700">
                    |
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {tenant?.name}
                  </span>
                </div>
              </div>

              <div className="text-center mb-6">
                <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                  {tt("login.title")}
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-xs">
                  {tt("login.subtitle")}
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                {/* Username */}
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest font-bold text-slate-500 ml-1">
                    {tt("login.username")}
                  </label>
                  <div className="relative group">
                    <User
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors"
                    />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder={tt("login.username.placeholder")}
                      autoComplete="username"
                      className="w-full bg-slate-100 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700/50 rounded-lg py-2.5 pl-10 pr-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest font-bold text-slate-500 ml-1">
                    {tt("login.password")}
                  </label>
                  <div className="relative group">
                    <Lock
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors z-10"
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={tt("login.password.placeholder")}
                      autoComplete="current-password"
                      className="w-full bg-slate-100 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700/50 rounded-lg py-2.5 pl-10 pr-10 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                    >
                      {showPassword ? "👁" : "👁‍🗨"}
                    </button>
                  </div>
                </div>

                {/* Remember + Forgot */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 text-slate-500 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-300 dark:border-slate-600"
                    />
                    <span>{tt("login.remember")}</span>
                  </label>
                  <a
                    href="#"
                    className="text-cyan-500 hover:text-cyan-400 font-medium"
                  >
                    {tt("login.forgot")}
                  </a>
                </div>

                {loginError && (
                  <div className="p-2.5 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertCircle size={14} className="text-red-400 mt-0.5" />
                      <p className="text-xs text-red-400 flex-1">
                        {loginError}
                      </p>
                    </div>
                  </div>
                )}

                {/* Sign In */}
                <button
                  type="submit"
                  disabled={!username.trim() || !password || isLoading}
                  className="w-full bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold py-3 rounded-lg shadow-lg transition-all active:scale-[0.98] mt-3 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:active:scale-100"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>{tt("login.processing")}</span>
                    </>
                  ) : (
                    <>
                      <span>{tt("login.submit")}</span>
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-white/5" />
                </div>
                <div className="relative flex justify-center text-[9px] uppercase tracking-[0.3em] font-bold">
                  <span className="px-3 bg-white/60 dark:bg-slate-900/40 text-slate-400 dark:text-slate-600 backdrop-blur-sm">
                    OR
                  </span>
                </div>
              </div>

              {/* SSO */}
              <button
                type="button"
                onClick={handleSSO}
                className="w-full flex items-center justify-center gap-2 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:bg-slate-200 dark:hover:bg-white/10 py-2.5 rounded-lg transition-all text-xs font-medium text-slate-600 dark:text-slate-300"
              >
                <ShieldCheck size={18} className="text-cyan-500" />
                {tt("login.sso")}
              </button>

              {/* Back */}
              <div className="mt-5 pt-4 border-t border-slate-200 dark:border-white/5 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setLoginError(null);
                  }}
                  className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors flex items-center justify-center gap-1.5 mx-auto group"
                >
                  <ArrowLeft
                    size={12}
                    className="transition-transform group-hover:-translate-x-1"
                  />
                  {tt("login.back")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
