import { cn } from '@/lib/utils';
import { Animate } from './ui/animate';
import { Spacer } from './ui/Spacer';
import Image from 'next/image';

export type VideoSource = { src: string; type: string };

export type PageHeroProps = {
  eyebrow?: string;
  title: React.ReactNode;
  titleAlt?: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
  bottomSlot?: React.ReactNode;
  backgroundSlot?: React.ReactNode;
  /** Video background — renders with SVG top/bottom gradient mask */
  videoSources?: VideoSource[];
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

const BG_COLOR = 'var(--background-100)';

const isCenter = (align: 'center' | 'left') => align === 'center';

export default function PageHero({
  eyebrow,
  title,
  titleAlt,
  subtitle,
  children,
  bottomSlot,
  backgroundSlot,
  videoSources,
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
          'PillarHero_root relative isolate flex flex-col',
          center ? 'items-center text-center' : 'items-start text-left',
          !videoSources && variant === 'shadow' && 'hero-shadow',
          className
        )}
        style={{ minHeight }}
      >
        {/* ── Video background with SVG gradient mask ── */}
        {videoSources && videoSources.length > 0 && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden"
            style={{ zIndex: -1 }}
          >
            <video
              autoPlay
              playsInline
              loop
              muted
              className="absolute inset-0 h-full w-full object-cover opacity-60"
            >
              {videoSources.map((s) => (
                <source key={s.src} src={s.src} type={s.type} />
              ))}
            </video>
            {/* Top fade */}
            <div
              className="absolute inset-x-0 top-0 h-[35%]"
              style={{
                background: `linear-gradient(to bottom, ${BG_COLOR} 0%, transparent 100%)`,
              }}
            />
            {/* Bottom fade */}
            <div
              className="absolute inset-x-0 bottom-0 h-[55%]"
              style={{
                background: `linear-gradient(to top, ${BG_COLOR} 0%, color-mix(in srgb, ${BG_COLOR} 60%, transparent) 40%, transparent 100%)`,
              }}
            />
          </div>
        )}

        {/* ── Static image background ── */}
        {backgroundSlot && !videoSources && (
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

        <div className="utils_outer z-10 mx-auto w-full max-w-(--homepage-max-width)">
          <Spacer h={200} />
          <Animate
            animation="line-reveal"
            delay={0.15}
            stagger={0.13}
            duration={0.85}
            margin="-10px"
            className="utils_inset"
          >
            {eyebrow && (
              <Animate.Item>
                <p className="text-xs font-light whitespace-pre-line text-foreground-200 uppercase">
                  {eyebrow}
                </p>
              </Animate.Item>
            )}

            <Animate.Item>
              <h1
                className={cn(
                  'text-4xl font-medium sm:text-6xl xl:text-7xl',
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
            <Spacer h={20} />
            {subtitle && (
              <Animate.Item>
                <div
                  className={cn(
                    subtitleClassName,
                    center ? 'mx-auto md:max-w-[50vw]' : 'w-full'
                  )}
                >
                  <p className="leading-5 font-light whitespace-pre-line text-foreground-200">
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
