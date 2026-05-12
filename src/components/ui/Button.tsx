import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  target,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  target?: "_blank" | "_self";
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500/40";

  const styles: Record<Variant, string> = {
    primary:
      "bg-[color:var(--fh-blue)] text-white hover:opacity-95 shadow-sm",
    secondary:
      "bg-white text-[color:var(--fh-ink)] border border-black/10 hover:bg-black/5",
    ghost: "text-[color:var(--fh-ink)] hover:bg-black/5",
  };

  const cls = `${base} ${styles[variant]} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        className={cls}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} onClick={onClick} type="button">
      {children}
    </button>
  );
}
