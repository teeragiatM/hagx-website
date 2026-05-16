import { cn } from '@/lib/utils';
import { Animate } from './ui/animate';
import { Spacer } from './ui/Spacer';
import Image from 'next/image';

export type PageHeroProps = {
  eyebrow?: string;
  title: React.ReactNode;
  titleAlt?: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
  bottomSlot?: React.ReactNode;
  backgroundSlot?: React.ReactNode;
  align?: 'center' | 'left';
  minHeight?: string;
  variant?: 'shadow' | 'no-shadow';
  glow?: boolean;
  image?: string;
  className?: string;
  contentClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
};

const isCenter = (align: 'center' | 'left') => align === 'center';

export default function PageHero({
  eyebrow,
  title,
  titleAlt,
  subtitle,
  children,
  bottomSlot,
  backgroundSlot,
  align = 'center',
  minHeight = '100vh',
  variant = 'shadow',
  glow = true,
  image,
  className,
  titleClassName,
  subtitleClassName,
}: PageHeroProps) {
  const center = isCenter(align);

  return (
    <div className="Bleed_root">
      <section
        className={cn(
          'relative isolate flex flex-col justify-center py-(--header-height)',
          center ? 'items-center text-center' : 'items-start text-left',
          variant === 'shadow' && 'hero-shadow',
          className
        )}
        style={{ minHeight }}
      >
        {backgroundSlot && (
          <div className="absolute inset-0 overflow-hidden">
            {backgroundSlot}
          </div>
        )}

        {image && (
          <Image
            src={image}
            alt=""
            fill
            priority
            className="object-cover opacity-20"
            sizes="100vw"
          />
        )}

        {glow && (
          <div
            aria-hidden
            className="hero-grid-glow pointer-events-none absolute inset-0"
          />
        )}
        <div className="z-10 mx-auto w-full max-w-[var(--homepage-max-width)] px-[var(--homepage-outer-padding)]">
          <Animate
            animation="line-reveal"
            delay={0.15}
            stagger={0.13}
            duration={0.85}
            margin="-10px"
            className="px-(--homepage-padding-inset)"
          >
            {eyebrow && (
              <Animate.Item>
                <p className="text-foreground/90 text-xs font-light whitespace-pre-line uppercase">
                  {eyebrow}
                </p>
              </Animate.Item>
            )}

            <Animate.Item>
              <h1
                className={cn(
                  'text-4xl sm:text-6xl xl:text-7xl',
                  titleClassName
                )}
              >
                {title}
                {titleAlt && (
                  <>
                    <br className="hidden sm:block" />
                    <span className="text-foreground-200">{titleAlt}</span>
                  </>
                )}
              </h1>
            </Animate.Item>
            <Spacer h={8} />
            {subtitle && (
              <Animate.Item>
                <div
                  className={cn(
                    subtitleClassName,
                    center ? 'mx-auto md:max-w-[50vw]' : 'w-full'
                  )}
                >
                  <p className="text-xs leading-5 font-light whitespace-pre-line">
                    {subtitle}
                  </p>
                </div>
              </Animate.Item>
            )}

            {children && (
              <Animate.Item>
                <div className={cn(center && 'flex flex-col items-center')}>
                  {children}
                </div>
              </Animate.Item>
            )}

            {bottomSlot && (
              <Animate.Item>
                <div className="relative z-10 w-full">{bottomSlot}</div>
              </Animate.Item>
            )}
          </Animate>
        </div>
      </section>
    </div>
  );
}
