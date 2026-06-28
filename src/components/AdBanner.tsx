export default function AdBanner() {
  return (
    <div className="w-full h-[90px] bg-gradient-to-r from-white/5 to-white/3 border border-white/10 rounded-xl flex items-center justify-center text-gray-500 text-sm">
      <div className="flex items-center gap-3">
        <span className="text-violet-400 font-semibold text-xs uppercase tracking-wider border border-violet-400/30 rounded px-2 py-0.5">Ad</span>
        <span>Top Banner Ad Placement — 728x90</span>
      </div>
    </div>
  );
}
