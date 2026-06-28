import { Link } from 'react-router-dom';
import { Wand2, Zap, Shield, ArrowRight, Clock, Image } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import AdSidebar from '../components/AdSidebar';

export default function HomePage() {
  const { t, language } = useLanguage();

  const features = [
    { icon: Zap, label: language === 'ar' ? 'معالجة فورية' : 'Instant Processing', desc: language === 'ar' ? 'نتائج في ثوانٍ' : 'Results in seconds' },
    { icon: Shield, label: language === 'ar' ? 'خصوصية تامة' : '100% Private', desc: language === 'ar' ? 'لا تخزين للصور' : 'No image storage' },
    { icon: Image, label: language === 'ar' ? 'PNG بجودة عالية' : 'High Quality PNG', desc: language === 'ar' ? 'بدون علامة مائية' : 'No watermark' },
    { icon: Clock, label: language === 'ar' ? 'مجاني تماماً' : 'Completely Free', desc: language === 'ar' ? 'لا حدود للاستخدام' : 'No usage limits' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400 mb-6">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span>{language === 'ar' ? 'مجاني 100% — بدون تسجيل' : '100% Free — No Signup Required'}</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
          <span className="text-white">{t('hero.title')}</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
          {t('hero.subtitle')}
        </p>
        <Link to="/remove-bg" className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4">
          {t('hero.start')}
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <div key={i} className="glass-card p-6 text-center hover:bg-white/10 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mx-auto mb-4">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">{f.label}</h3>
              <p className="text-sm text-gray-400">{f.desc}</p>
            </div>
          );
        })}
      </div>
      {/* How It Works */}
<div className="mb-16">
  <h2 className="text-3xl font-bold text-white text-center mb-10">
    {language === 'ar' ? 'كيف تعمل الأداة؟' : 'How It Works'}
  </h2>

  <div className="grid md:grid-cols-3 gap-6">

    <div className="glass-card p-6 text-center">
      <div className="text-5xl mb-4">📤</div>
      <h3 className="text-xl font-semibold text-white mb-2">
        {language === 'ar' ? '1. ارفع الصورة' : '1. Upload Image'}
      </h3>
      <p className="text-gray-400">
        {language === 'ar'
          ? 'اختر أي صورة من جهازك.'
          : 'Choose any image from your device.'}
      </p>
    </div>

    <div className="glass-card p-6 text-center">
      <div className="text-5xl mb-4">🤖</div>
      <h3 className="text-xl font-semibold text-white mb-2">
        {language === 'ar' ? '2. الذكاء الاصطناعي' : '2. AI Processing'}
      </h3>
      <p className="text-gray-400">
        {language === 'ar'
          ? 'يقوم الذكاء الاصطناعي بإزالة الخلفية.'
          : 'Our AI removes the background automatically.'}
      </p>
    </div>

    <div className="glass-card p-6 text-center">
      <div className="text-5xl mb-4">⬇️</div>
      <h3 className="text-xl font-semibold text-white mb-2">
        {language === 'ar' ? '3. حمّل الصورة' : '3. Download'}
      </h3>
      <p className="text-gray-400">
        {language === 'ar'
          ? 'نزّل الصورة بصيغة PNG.'
          : 'Download your transparent PNG image.'}
      </p>
    </div>

  </div>
</div>

      {/* Main CTA + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="glass-card p-8 sm:p-12 text-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mx-auto mb-6">
              <Wand2 className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">
              {language === 'ar' ? 'جرب الأداة الآن' : 'Try the Tool Now'}
            </h2>
            <p className="text-gray-400 mb-6 max-w-lg mx-auto">
              {language === 'ar'
                ? 'ارفع صورتك واحذف الخلفية بضغطة واحدة. نتيجة احترافية بجودة عالية.'
                : 'Upload your image and remove the background with one click. Professional high-quality results.'}
            </p>
            <Link to="/remove-bg" className="btn-primary inline-flex items-center gap-2">
              {t('hero.start')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
        <div className="lg:col-span-1 space-y-6">
          <AdSidebar />
          <AdSidebar />
        </div>
      </div>
      {/* FAQ */}
<div className="mt-20">
  <h2 className="text-3xl font-bold text-white text-center mb-10">
    {language === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
  </h2>

  <div className="space-y-6">

    <div className="glass-card p-6">
      <h3 className="text-xl font-semibold text-white mb-2">
        {language === 'ar'
          ? 'هل الأداة مجانية؟'
          : 'Is the background remover free?'}
      </h3>
      <p className="text-gray-400">
        {language === 'ar'
          ? 'نعم، يمكنك إزالة خلفية الصور مجانًا.'
          : 'Yes. You can remove image backgrounds for free.'}
      </p>
    </div>

    <div className="glass-card p-6">
      <h3 className="text-xl font-semibold text-white mb-2">
        {language === 'ar'
          ? 'هل يتم حفظ صوري؟'
          : 'Are my images stored?'}
      </h3>
      <p className="text-gray-400">
        {language === 'ar'
          ? 'لا، نحن لا نخزن صور المستخدمين.'
          : 'No. Your images are not stored on our servers.'}
      </p>
    </div>

    <div className="glass-card p-6">
      <h3 className="text-xl font-semibold text-white mb-2">
        {language === 'ar'
          ? 'ما هي الصيغة التي أحصل عليها؟'
          : 'What format is the output image?'}
      </h3>
      <p className="text-gray-400">
        {language === 'ar'
          ? 'تحصل على صورة PNG بخلفية شفافة.'
          : 'The processed image is downloaded as a transparent PNG.'}
      </p>
    </div>

  </div>
</div>
    </div>
  );
}
