export function PageHeader({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <section className="pt-32 md:pt-40 pb-12 md:pb-16 bg-cream border-b border-border">
      <div className="container-page text-center">
        {eyebrow && <span className="text-xs uppercase tracking-[0.3em] text-gold">{eyebrow}</span>}
        <h1 className="font-display text-3xl sm:text-4xl md:text-6xl mt-3 text-foreground">{title}</h1>
        {subtitle && <p className="mt-4 md:mt-5 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
      </div>
    </section>
  );
}