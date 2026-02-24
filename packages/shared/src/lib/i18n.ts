/**
 * Simple i18n system — localStorage-backed, vi/en support
 */

export type Language = 'vi' | 'en';

const STORAGE_KEY = 'arda_language';

// ── Core Functions ──

export function getLanguage(): Language {
  const stored = localStorage.getItem(STORAGE_KEY) as Language;
  return stored === 'en' || stored === 'vi' ? stored : 'vi';
}

export function setLanguage(lang: Language): void {
  localStorage.setItem(STORAGE_KEY, lang);
}

export function toggleLanguage(): Language {
  const next = getLanguage() === 'vi' ? 'en' : 'vi';
  setLanguage(next);
  return next;
}

export function t(key: string, lang?: Language): string {
  const current = lang || getLanguage();
  const dict = current === 'en' ? en : vi;
  return dict[key] || key;
}

// ── Translations ──

const vi: Record<string, string> = {
  'tenant.title': 'Mã doanh nghiệp',
  'tenant.subtitle': 'Nhập mã 6 ký tự (chữ hoặc số) của doanh nghiệp bạn',
  'tenant.step': 'Mã DN',
  'tenant.continue': 'Tiếp tục',
  'tenant.processing': 'Đang xử lý...',
  'tenant.help': 'Không có mã doanh nghiệp? Liên hệ quản trị viên hệ thống',
  'login.title': 'Đăng nhập',
  'login.subtitle': 'Nhập thông tin tài khoản của bạn',
  'login.step': 'Đăng nhập',
  'login.username': 'Tên đăng nhập',
  'login.username.placeholder': 'Nhập tên đăng nhập',
  'login.password': 'Mật khẩu',
  'login.password.placeholder': 'Nhập mật khẩu',
  'login.remember': 'Ghi nhớ đăng nhập',
  'login.forgot': 'Quên mật khẩu?',
  'login.sso': 'Đăng nhập SSO',
  'login.submit': 'Đăng nhập',
  'login.processing': 'Đang đăng nhập...',
  'login.back': 'Quay lại',
  'login.tenant': 'Mã',
  'callback.processing': 'Đang xác thực...',
  'callback.error': 'Xác thực thất bại. Vui lòng thử lại.',
};

const en: Record<string, string> = {
  'tenant.title': 'Organization Code',
  'tenant.subtitle': 'Enter your 6-character organization code (letters or numbers)',
  'tenant.step': 'Org Code',
  'tenant.continue': 'Continue',
  'tenant.processing': 'Processing...',
  'tenant.help': "Don't have an organization code? Contact your system administrator",
  'login.title': 'Sign In',
  'login.subtitle': 'Enter your account credentials',
  'login.step': 'Sign In',
  'login.username': 'Username',
  'login.username.placeholder': 'Enter username',
  'login.password': 'Password',
  'login.password.placeholder': 'Enter password',
  'login.remember': 'Remember me',
  'login.forgot': 'Forgot password?',
  'login.sso': 'Sign in with SSO',
  'login.submit': 'Sign In',
  'login.processing': 'Signing in...',
  'login.back': 'Back',
  'login.tenant': 'Code',
  'callback.processing': 'Authenticating...',
  'callback.error': 'Authentication failed. Please try again.',
};
