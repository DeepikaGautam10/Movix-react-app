/* Loading placeholders — keep layout stable while data fetches. */

export function SkeletonGrid({ count = 18 }) {
  return (
    <div className="card-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div className="skeleton-card" key={i}>
          <div className="skeleton-poster shimmer" />
          <div className="skeleton-line shimmer" />
          <div className="skeleton-line short shimmer" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonHero() {
  return <div className="skeleton-hero shimmer" />;
}
