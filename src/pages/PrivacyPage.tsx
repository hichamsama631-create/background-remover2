import { useLanguage } from '../hooks/useLanguage';
import { Shield, Eye, Trash2, Cookie } from 'lucide-react';

export default function PrivacyPage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">{t('privacy.title')}</h1>
        <p className="text-gray-400">{t('privacy.intro')}</p>
      </div>

      <div className="space-y-6">
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Eye className="w-6 h-6 text-violet-400" />
            <h2 className="text-xl font-semibold text-white">{t('privacy.title')}</h2>
          </div>
          <p className="text-gray-400 leading-relaxed">{t('privacy.data')}</p>
        </div>

        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Trash2 className="w-6 h-6 text-green-400" />
            <h2 className="text-xl font-semibold text-white">Data Deletion</h2>
          </div>
          <p className="text-gray-400 leading-relaxed">
            All uploaded images are processed in memory and never written to disk. Once you close the page or download the result, the image data is permanently gone from our servers.
          </p>
        </div>

        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Cookie className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl font-semibold text-white">Cookies</h2>
          </div>
          <p className="text-gray-400 leading-relaxed">{t('privacy.cookies')}</p>
        </div>
      </div>
    </div>
  );
}
