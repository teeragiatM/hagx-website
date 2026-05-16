import { cn } from '@/lib/utils';
import type { HTMLAttributes, ReactNode } from 'react';

// ── Compound parts ────────────────────────────────────────────────────────────

function Left({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'utils_inset utils_insetLarge PageSection_titleContainer',
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
    <div
      className={cn('PageSection_descriptionContainer', className)}
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
      <div className={cn('PageSection_header', className)} {...props}>
        <Left>
          <h2 className="text-2xl font-medium md:text-4xl lg:text-5xl">
            {heading}
          </h2>
        </Left>
        {right && (
          <Right>
            {action ? (
              action
            ) : (
              <p className="text-base text-foreground-300 sm:text-lg sm:text-foreground-200 lg:text-xl 2xl:text-2xl">
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
        'flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between',
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
