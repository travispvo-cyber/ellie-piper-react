export interface HeroSectionProps extends Readonly<{
  id: string;
  tagline: string;
  title: string;
  description: string;
  cta: string;
  ctaLink: string;
  backgroundImage: string;
  bgColor?: string;
}> {}

export function HeroSection({
  id,
  tagline,
  title,
  description,
  cta,
  ctaLink,
  backgroundImage,
  bgColor = 'bg-[var(--white)]',
}: HeroSectionProps) {
  return (
    <section
      id={id}
      className={`hero-section group relative flex-1 h-full ${bgColor} overflow-hidden flex flex-col items-center justify-center p-6 md:p-8`}
    >
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0">
        <div
          className="parallax-zoom absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url("${backgroundImage}")` }}
        />
        <div className="absolute inset-0 bg-[var(--white)]/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-3 md:space-y-4 max-w-xs">
        <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-sans font-bold text-[var(--gold-text)]">
          {tagline}
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display italic text-[var(--text-dark)]">
          {title}
        </h2>
        <p className="text-xs md:text-sm font-sans text-[var(--text-dark)]/70 leading-relaxed">
          {description}
        </p>
        <a
          href={ctaLink}
          className="inline-block px-8 md:px-10 py-3 md:py-4 bg-[#e8b1b2] text-white hover:bg-[#e69997] transition-all duration-300 font-sans text-[10px] md:text-xs uppercase tracking-widest font-bold mt-4"
        >
          {cta}
        </a>
      </div>
    </section>
  );
}
