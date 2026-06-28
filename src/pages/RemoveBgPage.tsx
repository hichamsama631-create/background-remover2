import { useState, useRef, useCallback } from 'react';
import { Upload, Download, Trash2, ImagePlus, Loader2, Wand2, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';


export default function RemoveBgPage() {
  const { t, language, direction } = useLanguage();
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [processingTime, setProcessingTime] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      setError(t('error.type'));
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError(t('error.size'));
      return;
    }
    setError(null);
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  }, [t]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const removeBackground = async () => {
    if (!image) return;
    setLoading(true);
    setError(null);
    setProgress(0);
    setProcessingTime(null);

    // Simulate progress bar
    const progressInterval = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 15, 90));
    }, 300);

    abortRef.current = new AbortController();

    try {
      const response = await fetch('/api/remove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image }),
        signal: abortRef.current.signal,
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || t('error.process'));
      }

      const timeHeader = response.headers.get('X-Processing-Time');
      if (timeHeader) setProcessingTime(parseFloat(timeHeader));

      const resultBlob = await response.blob();
      const resultUrl = URL.createObjectURL(resultBlob);
      setResult(resultUrl);
    } catch (err: any) {
      if (err.name === 'AbortError') {
        setError(language === 'ar' ? 'تم إلغاء المعالجة' : 'Processing cancelled');
      } else {
        setError(err.message || t('error.process'));
      }
    } finally {
      clearInterval(progressInterval);
      setLoading(false);
      setProgress(0);
    }
  };

  const clear = () => {
    if (abortRef.current) abortRef.current.abort();
    setImage(null);
    setResult(null);
    setError(null);
    setProcessingTime(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const cancel = () => {
    if (abortRef.current) abortRef.current.abort();
    setLoading(false);
    setProgress(0);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">{t('hero.title')}</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t('hero.subtitle')}</p>
      </div>

      <div className="glass-card p-6 sm:p-8">
        {/* Dropzone */}
        {!image && (
          <div
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onClick={() => inputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
              dragOver
                ? 'border-violet-500 bg-violet-500/10'
                : 'border-white/20 hover:border-violet-500/50 hover:bg-white/5'
            }`}
          >
            <ImagePlus className="w-14 h-14 text-gray-500 mx-auto mb-4" />
            <p className="text-lg text-white font-medium mb-2">{t('dropzone.title')}</p>
            <p className="text-sm text-gray-500">{t('dropzone.subtitle')}</p>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleInput}
              className="hidden"
            />
          </div>
        )}

        {/* Image Preview & Result */}
        {image && (
          <div className="space-y-6">
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${direction === 'rtl' ? 'md:rtl-grid' : ''}`}>
              {/* Original */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-400 flex items-center gap-2">
                  <ImagePlus className="w-4 h-4" />
                  {t('original')}
                </p>
                <div className="bg-dark-800 rounded-xl overflow-hidden border border-white/10">
                  <img src={image} alt="Original" className="w-full h-auto object-contain max-h-[400px]" />
                </div>
              </div>

              {/* Result */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-400 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  {t('result')}
                </p>
                <div className="bg-dark-800 rounded-xl overflow-hidden border border-white/10 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2210%22%20height%3D%2210%22%20fill%3D%22%23ffffff%22%2F%3E%3Crect%20x%3D%2210%22%20width%3D%2210%22%20height%3D%2210%22%20fill%3D%22%23e2e8f0%22%2F%3E%3Crect%20y%3D%2210%22%20width%3D%2210%22%20height%3D%2210%22%20fill%3D%22%23e2e8f0%22%2F%3E%3Crect%20x%3D%2210%22%20y%3D%2210%22%20width%3D%2210%22%20height%3D%2210%22%20fill%3D%22%23ffffff%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px_20px]">
                  {result ? (
                    <img src={result} alt="Result" className="w-full h-auto object-contain max-h-[400px]" />
                  ) : (
                    <div className="w-full h-[300px] flex items-center justify-center text-gray-500">
                      {loading ? (
                        <div className="flex flex-col items-center gap-3">
                          <Loader2 className="w-8 h-8 animate-spin text-violet-400" />
                          <span>{t('processing')}</span>
                        </div>
                      ) : (
                        <span>{t('removeBg')} →</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            {loading && (
              <div className="space-y-2">
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{Math.round(progress)}%</span>
                  <span>{language === 'ar' ? 'جاري المعالجة...' : 'Processing...'}</span>
                </div>
              </div>
            )}

            {/* Processing Time */}
            {processingTime !== null && (
              <div className="flex items-center gap-2 text-sm text-green-400 bg-green-400/10 rounded-xl px-4 py-2">
                <CheckCircle className="w-4 h-4" />
                <span>
                  {language === 'ar'
                    ? `تمت المعالجة في ${processingTime} ${t('stats.seconds')}`
                    : `Processed in ${processingTime} ${t('stats.seconds')}`}
                </span>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2 text-sm text-red-400 bg-red-400/10 rounded-xl px-4 py-3">
                <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              {!result && !loading && (
                <button
                  onClick={removeBackground}
                  className="btn-primary flex items-center gap-2"
                >
                  <Wand2 className="w-5 h-5" />
                  {t('removeBg')}
                </button>
              )}
              {loading && (
                <button onClick={cancel} className="btn-secondary flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
              )}
              {result && (
                <a
                  href={result}
                  download="no-background.png"
                  className="btn-primary flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  {t('download')}
                </a>
              )}
              <button onClick={clear} className="btn-secondary flex items-center gap-2">
                <Trash2 className="w-5 h-5" />
                {t('clear')}
              </button>
              {!result && (
                <label className="btn-secondary flex items-center gap-2 cursor-pointer">
                  <Upload className="w-5 h-5" />
                  {t('newImage')}
                  <input type="file" accept="image/*" onChange={handleInput} className="hidden" />
                </label>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
