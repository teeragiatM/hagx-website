'use client';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export function NavLink({ href, className, ...props }: NavLinkProps) {
  const pathname = usePathname();
  const active =
    href === '/' ? pathname === '/' : pathname.startsWith(href.split('#')[0]);

  return (
    <a
      href={href}
      className={cn(
        'transition-colors',
        active ? 'text-foreground-100' : 'text-foreground-200 hover:text-foreground-100',
        className
      )}
      {...props}
    />
  );
}
