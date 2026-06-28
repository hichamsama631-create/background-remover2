import { useLanguage } from '../hooks/useLanguage';
import { FileText, CheckCircle, AlertTriangle, Gauge } from 'lucide-react';

export default function TermsPage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">{t('terms.title')}</h1>
        <p className="text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="space-y-6">
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <h2 className="text-xl font-semibold text-white">Acceptable Use</h2>
          </div>
          <p className="text-gray-400 leading-relaxed">{t('terms.usage')}</p>
        </div>

        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl font-semibold text-white">User Responsibility</h2>
          </div>
          <p className="text-gray-400 leading-relaxed">{t('terms.responsibility')}</p>
        </div>

        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Gauge className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-semibold text-white">Service Limits</h2>
          </div>
          <p className="text-gray-400 leading-relaxed">{t('terms.limit')}</p>
        </div>
      </div>
    </div>
  );
}
