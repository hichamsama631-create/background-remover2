import { createContext, useState, useCallback, type ReactNode } from 'react';

export type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  direction: 'rtl' | 'ltr';
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextType | null>(null);

const translations = {
  ar: {
    'site.title': 'إزالة الخلفية - AI Free Hub',
    'nav.home': 'الرئيسية',
    'nav.removeBg': 'إزالة الخلفية',
    'nav.privacy': 'سياسة الخصوصية',
    'nav.terms': 'شروط الاستخدام',
    'nav.contact': 'تواصل معنا',
    'nav.language': 'English',
    'hero.title': 'إزالة الخلفية بالذكاء الاصطناعي',
    'hero.subtitle': 'احذف خلفية أي صورة بشكل تلقائي بدقة عالية، مجانًا وبدون علامة مائية.',
    'hero.start': 'ابدأ الآن',
    'dropzone.title': 'اسحب الصورة هنا أو اضغط للاختيار',
    'dropzone.subtitle': 'PNG, JPG, WebP — حتى 10 ميجابايت',
    'processing': 'جاري المعالجة بالذكاء الاصطناعي...',
    'original': 'الصورة الأصلية',
    'result': 'النتيجة',
    'download': 'تحميل PNG',
    'clear': 'مسح',
    'newImage': 'صورة جديدة',
    'removeBg': 'إزالة الخلفية',
    'error.type': 'نوع الملف غير مدعوم. الملفات المسموح بها: PNG, JPG, WebP, GIF',
    'error.size': 'الملف كبير جداً. الحد الأقصى: 10 ميجابايت',
    'error.process': 'فشلت المعالجة. جرب صورة أصغر أو بتنسيق مختلف.',
    'privacy.title': 'سياسة الخصوصية',
    'privacy.intro': 'نحن نحترم خصوصيتك. لا تُخزن أي صورة على خوادمنا بعد المعالجة.',
    'privacy.data': 'تُعالج الصور مباشرة على الخادم وتُحذف فوراً بعد إرجاع النتيجة.',
    'privacy.cookies': 'نستخدم ملفات تعريف الارتباط الأساسية فقط لتحسين الأداء.',
    'terms.title': 'شروط الاستخدام',
    'terms.usage': 'يُسمح لك باستخدام هذه الأداة لأغراض شخصية وتجارية.',
    'terms.responsibility': 'أنت مسؤول عن المحتوى الذي ترفعه. لا تُرفع صور محمية بحقوق طبع.',
    'terms.limit': 'الحد الأقصى لحجم الملف: 10 ميجابايت. نحتفظ بالحق في تقييد الاستخدام المفرط.',
    'contact.title': 'تواصل معنا',
    'contact.email': 'البريد الإلكتروني',
    'contact.message': 'الرسالة',
    'contact.send': 'إرسال',
    'contact.success': 'تم إرسال رسالتك بنجاح!',
    'footer.made': 'صُنع بـ',
    'footer.free': 'مجاني تماماً. لا تسجيل، لا بطاقة ائتمان.',
    'stats.processed': 'صورة مُعالجة',
    'stats.time': 'وقت المعالجة',
    'stats.seconds': 'ثوانٍ',
  },
  en: {
    'site.title': 'Background Remover - AI Free Hub',
    'nav.home': 'Home',
    'nav.removeBg': 'Remove Background',
    'nav.privacy': 'Privacy Policy',
    'nav.terms': 'Terms of Use',
    'nav.contact': 'Contact Us',
    'nav.language': 'العربية',
    'hero.title': 'AI Background Remover',
    'hero.subtitle': 'Automatically remove backgrounds from any image with high quality, free and without watermark.',
    'hero.start': 'Get Started',
    'dropzone.title': 'Drag image here or click to browse',
    'dropzone.subtitle': 'PNG, JPG, WebP — up to 10MB',
    'processing': 'Processing with AI...',
    'original': 'Original',
    'result': 'Result',
    'download': 'Download PNG',
    'clear': 'Clear',
    'newImage': 'New Image',
    'removeBg': 'Remove Background',
    'error.type': 'Invalid file type. Allowed: PNG, JPG, WebP, GIF',
    'error.size': 'File too large. Maximum: 10MB',
    'error.process': 'Processing failed. Try a smaller image or different format.',
    'privacy.title': 'Privacy Policy',
    'privacy.intro': 'We respect your privacy. No images are stored on our servers after processing.',
    'privacy.data': 'Images are processed on the server and deleted immediately after returning the result.',
    'privacy.cookies': 'We only use essential cookies for performance optimization.',
    'terms.title': 'Terms of Use',
    'terms.usage': 'You may use this tool for personal and commercial purposes.',
    'terms.responsibility': 'You are responsible for the content you upload. Do not upload copyrighted images.',
    'terms.limit': 'Maximum file size: 10MB. We reserve the right to restrict excessive usage.',
    'contact.title': 'Contact Us',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send',
    'contact.success': 'Your message was sent successfully!',
    'footer.made': 'Made with',
    'footer.free': 'Completely free. No signup, no credit card.',
    'stats.processed': 'images processed',
    'stats.time': 'Processing time',
    'stats.seconds': 'seconds',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('lang');
    return (saved as Language) || 'ar';
  });

  const direction: 'rtl' | 'ltr' = language === 'ar' ? 'rtl' : 'ltr';

  const setLanguage = useCallback((lang: Language) => {
    setLang(lang);
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  }, [language, setLanguage]);

  const t = useCallback(
    (key: string) => {
      return translations[language][key as keyof (typeof translations)['ar']] || key;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
