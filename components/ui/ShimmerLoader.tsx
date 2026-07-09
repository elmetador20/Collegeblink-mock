export function ShimmerLoader({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-gray-200 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-[shimmer_1.5s_infinite]" />
    </div>
  );
}
