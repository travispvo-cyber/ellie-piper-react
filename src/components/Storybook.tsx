import { useState, useCallback, useEffect, useRef } from 'react';
import { storybookScenes } from '../data/mockData';

export interface StorybookProps extends Readonly<{
  className?: string;
  compact?: boolean;
}> {}

export function Storybook({ className = '', compact = false }: StorybookProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const totalPages = storybookScenes.length;
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for 3D tilt effect
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * 10, y: -x * 10 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  const goToPage = useCallback((page: number) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

  const nextPage = useCallback(() => goToPage(currentPage + 1), [currentPage, goToPage]);
  const prevPage = useCallback(() => goToPage(currentPage - 1), [currentPage, goToPage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen && !compact) return;
      if (e.key === 'ArrowLeft') prevPage();
      if (e.key === 'ArrowRight') nextPage();
      if (e.key === 'Escape') setIsModalOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, compact, prevPage, nextPage]);

  const progress = ((currentPage + 1) / totalPages) * 100;

  // Compact view (for triptych center)
  if (compact) {
    return (
      <div
        className={`relative h-full flex flex-col items-center justify-center bg-[var(--soft-blush)] ${className}`}
      >
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--white)] via-transparent to-[var(--white)] pointer-events-none z-10" />

        {/* Centered storybook preview card */}
        <div className="relative z-20 w-full max-w-md px-4">
          <div className="glass-card p-6 space-y-4">
            {/* Header */}
            <div className="text-center">
              <p className="text-[9px] uppercase tracking-[0.25em] font-sans text-[var(--gold-text)] font-semibold mb-1">
                Our Story
              </p>
              <h3 className="text-lg md:text-xl font-display italic text-[var(--text-dark)]">
                The Kingdom of Every Little Moment
              </h3>
            </div>

            {/* Progress bar */}
            <div className="h-[2px] bg-[var(--gold-accent)]/15 rounded-full overflow-hidden">
              <div className="progress-fill h-full rounded-full" style={{ width: `${progress}%` }} />
            </div>

            {/* Image with depth effects */}
            <div
              ref={containerRef}
              className="storybook-image-container relative"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className="storybook-image relative overflow-hidden"
                style={{
                  transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                }}
              >
                <img
                  src={storybookScenes[currentPage].src}
                  alt={storybookScenes[currentPage].alt}
                  className="w-full h-auto max-h-[40vh] object-contain rounded-lg"
                  draggable={false}
                />
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={prevPage}
                disabled={currentPage === 0}
                className="storybook-btn"
              >
                ←
              </button>

              <div className="flex items-center gap-2">
                {storybookScenes.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToPage(idx)}
                    className={`dot ${idx === currentPage ? 'active' : ''}`}
                    aria-label={`Page ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages - 1}
                className="storybook-btn"
              >
                →
              </button>
            </div>

            {/* Page counter */}
            <p className="text-center text-[10px] uppercase tracking-[0.15em] font-sans text-[var(--text-dark)]/50">
              <span className="text-[var(--gold-text)] font-semibold">{currentPage + 1}</span>
              {' / '}
              {totalPages}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Full view (modal or standalone)
  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="glass-card p-4 hover:scale-105 transition-transform cursor-pointer"
      >
        <img
          src={storybookScenes[0].src}
          alt="Storybook cover"
          className="w-full h-40 object-cover rounded-lg"
        />
        <p className="text-xs text-center mt-2 font-sans text-[var(--gold-text)]">
          Read Our Story
        </p>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-[var(--white)] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="bg-gradient-to-r from-[var(--warm-mauve)] to-[var(--white)] p-4 border-b border-[var(--gold-accent)]/10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-display italic text-[var(--text-dark)]">
                    Ellie & Piper
                  </h2>
                  <p className="text-[9px] uppercase tracking-[0.25em] font-sans text-[var(--gold-text)]">
                    The Kingdom of Every Little Moment
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-[var(--text-dark)]/40 hover:text-[var(--text-dark)] transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="h-[3px] bg-[var(--gold-accent)]/15 rounded-full mt-3 overflow-hidden">
                <div className="progress-fill h-full rounded-full" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {/* Image */}
            <div
              className="bg-[var(--soft-blush)] p-8 flex items-center justify-center min-h-[400px]"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className="storybook-image"
                style={{
                  transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                }}
              >
                <img
                  src={storybookScenes[currentPage].src}
                  alt={storybookScenes[currentPage].alt}
                  className="max-w-full max-h-[60vh] object-contain rounded-lg"
                  draggable={false}
                />
              </div>
            </div>

            {/* Navigation */}
            <div className="p-4 bg-[var(--white)] border-t border-[var(--gold-accent)]/10">
              <div className="flex items-center justify-between">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 0}
                  className="storybook-btn"
                >
                  ← Previous
                </button>

                <div className="flex items-center gap-2">
                  {storybookScenes.slice(0, 6).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => goToPage(idx)}
                      className={`dot ${idx === currentPage ? 'active' : ''}`}
                    />
                  ))}
                  {totalPages > 6 && <span className="text-xs text-gray-400">...</span>}
                </div>

                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages - 1}
                  className="storybook-btn"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
