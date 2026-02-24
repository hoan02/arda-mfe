import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@workspace/shared/contexts";
import { t, getLanguage } from "@workspace/shared/lib";
import { Loader2, AlertCircle } from "lucide-react";

export function AuthCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { handleCallback } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const lang = getLanguage();

  useEffect(() => {
    const code = searchParams.get("code");
    const errorParam = searchParams.get("error");

    if (errorParam) {
      setError(t("callback.error", lang));
      setTimeout(() => navigate("/login"), 3000);
      return;
    }

    if (!code) {
      navigate("/login");
      return;
    }

    handleCallback(code)
      .then(() => navigate("/"))
      .catch((err) => {
        setError(err.message || t("callback.error", lang));
        setTimeout(() => navigate("/login"), 3000);
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="text-center space-y-4">
        {error ? (
          <>
            <AlertCircle size={40} className="text-red-400 mx-auto" />
            <p className="text-red-400 text-sm">{error}</p>
            <p className="text-slate-500 text-xs">Redirecting to login...</p>
          </>
        ) : (
          <>
            <Loader2 size={40} className="text-cyan-500 animate-spin mx-auto" />
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              {t("callback.processing", lang)}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
