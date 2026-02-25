import { useTranslation } from "@workspace/shared/i18n";
import { Button } from "@workspace/ui/components/button";
import type { Language } from "@workspace/shared/i18n";

export function HeaderLanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = (i18n.language as Language) === "vi" ? "vi" : "en";

  const toggle = () => {
    const next: Language = currentLang === "vi" ? "en" : "vi";
    i18n.changeLanguage(next);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggle}
      aria-label="Switch language"
      className="h-8 px-2 text-xs font-semibold tracking-wider"
    >
      {currentLang === "vi" ? "VI" : "EN"}
    </Button>
  );
}
