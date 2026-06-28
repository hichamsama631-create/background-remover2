import { Sparkles, Heart } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { Link } from 'react-router-dom';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/10 bg-dark-900/60 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold gradient-text">AI Free Hub</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link to="/privacy" className="hover:text-white transition-colors">{t('nav.privacy')}</Link>
            <Link to="/terms" className="hover:text-white transition-colors">{t('nav.terms')}</Link>
            <Link to="/contact" className="hover:text-white transition-colors">{t('nav.contact')}</Link>
          </div>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            {t('footer.made')} <Heart className="w-4 h-4 text-red-400 fill-red-400" /> {t('footer.free')}
          </p>
        </div>
      </div>
    </footer>
  );
}
