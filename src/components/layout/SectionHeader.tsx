import { cn } from '@/lib/utils';
import type { HTMLAttributes, ReactNode } from 'react';

function renderHeading(heading: ReactNode): ReactNode {
  if (typeof heading !== 'string') return heading;
  const lines = heading.split('\n');
  if (lines.length === 1) return heading;
  return lines.map((line, i) => (
    <span key={i}>
      {i > 0 && <br />}
      {line}
    </span>
  ));
}

// ── Compound parts ────────────────────────────────────────────────────────────

function Left({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div data-slot="section-title-container"
      className={cn(
        'flex px-(--homepage-padding-inset) -ml-[1px] sm:-ml-[2px] pr-8',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function Right({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div data-slot="section-desc-container"
      className={cn('flex mt-5 sm:mt-6 lg:mt-0 px-(--homepage-padding-inset)', className)}
      {...props}
    >
      {children}
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────

type SectionHeaderProps = HTMLAttributes<HTMLDivElement> & {
  /** Shorthand: heading text rendered as <h2> on the left */
  heading?: ReactNode;
  /** Shorthand: description text rendered on the right */
  description?: ReactNode;
  /** Shorthand: replaces description slot with a custom node (e.g. a Button) */
  action?: ReactNode;
};

function SectionHeader({
  heading,
  description,
  action,
  className,
  children,
  ...props
}: SectionHeaderProps) {
  // If using shorthand props, build Left + Right automatically
  if (heading !== undefined && !children) {
    const right = action ?? description;
    return (
      <div className={cn('grid grid-cols-1 pt-10 pb-12 lg:pb-24 lg:grid-cols-2 sm:pb-16 sm:pt-0', className)} {...props}>
        <Left>
          <h2 data-slot="section-title" className="text-2xl trim-both font-medium md:text-4xl lg:text-5xl">
            {renderHeading(heading)}
          </h2>
        </Left>
        {right && (
          <Right>
            {action ? (
              action
            ) : (
              <p data-slot="section-desc" className="text-base text-foreground-300 sm:text-lg sm:text-foreground-200 lg:text-xl 2xl:text-2xl">
                {description}
              </p>
            )}
          </Right>
        )}
      </div>
    );
  }

  // Compound usage: children are Left / Right slots
  return (
    <div
      className={cn(
        'flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ── Export ────────────────────────────────────────────────────────────────────

const SectionHeaderCompound = Object.assign(SectionHeader, {
  Left,
  Right,
});

export default SectionHeaderCompound;
