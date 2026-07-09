export default function MobileHeader() {
  return (
    <div className="fixed top-0 left-0 right-0 backdrop-blur-md bg-white/70 shadow-sm z-50 px-4 py-3 flex justify-between items-center">
      <h1 className="text-lg font-semibold">CollegeBlink</h1>
      <div className="flex gap-3">
        <button className="active:scale-90 transition transform">🔔</button>
        <button className="active:scale-90 transition transform">👤</button>
      </div>
    </div>
  );
}
