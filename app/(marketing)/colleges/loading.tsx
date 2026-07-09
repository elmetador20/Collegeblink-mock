export default function CollegesLoading() {
  return (
    <div className="page-shell min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 h-8 w-64 animate-pulse rounded bg-muted/70"></div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="glass-card rounded-xl border border-border/60 p-6 animate-pulse">
              <div className="mb-3 h-6 w-3/4 rounded bg-muted/70"></div>
              <div className="mb-4 h-4 w-1/2 rounded bg-muted/70"></div>
              <div className="mb-4 h-20 w-full rounded bg-muted/50"></div>
              <div className="h-8 w-24 rounded bg-muted/70"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
