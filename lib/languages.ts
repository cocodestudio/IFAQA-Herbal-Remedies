export interface SupportedLanguage {
  code: string;
  name: string;
  nativeName: string;
  region: string;
}

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  { code: 'en', name: 'English', nativeName: 'English', region: 'Global Default' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', region: 'India' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', region: 'South Asia' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', region: 'Middle East' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', region: 'India / Bengal' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', region: 'Maharashtra' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', region: 'Tamil Nadu' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', region: 'Andhra / Telangana' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', region: 'Gujarat' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', region: 'Punjab' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', region: 'Karnataka' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', region: 'Kerala' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', region: 'Global' },
  { code: 'fr', name: 'French', nativeName: 'Français', region: 'Global' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', region: 'Europe' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', region: 'Turkey' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', region: 'Southeast Asia' },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', region: 'Malaysia' },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی', region: 'Iran' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', region: 'Global' },
  { code: 'zh-CN', name: 'Chinese (Simplified)', nativeName: '中文', region: 'East Asia' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', region: 'Japan' },
];

export function getLanguageMeta(code: string): SupportedLanguage {
  const clean = (code || 'en').trim();
  return (
    SUPPORTED_LANGUAGES.find((l) => l.code.toLowerCase() === clean.toLowerCase()) || {
      code: clean,
      name: clean.toUpperCase(),
      nativeName: clean.toUpperCase(),
      region: 'Auto',
    }
  );
}
