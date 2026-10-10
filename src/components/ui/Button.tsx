import Link from "next/link";
import { Magnetic } from "@/components/animations/Magnetic";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "text";

const base = "group relative inline-flex items-center justify-center gap-3 overflow-hidden px-8 py-4 text-[0.95rem] transition-[transform,color,background-color,border-color] duration-500 ease-calm active:scale-[0.97]";
const variants: Record<Variant, string> = {
  // Gold fill slides up on hover (the ::before layer) for a calm, liquid feel.
  primary: "bg-champagne text-espresso before:absolute before:inset-0 before:translate-y-full before:bg-ivory before:transition-transform before:duration-500 before:ease-calm hover:before:translate-y-0",
  outline: "border border-ivory/50 text-ivory hover:border-champagne hover:text-champagne",
  text: "px-0 py-1 border-b border-current hover:opacity-70",
};

export function Button({ href, children, variant = "primary", magnetic = false, className, ...rest }: {
  href?: string; children: React.ReactNode; variant?: Variant; magnetic?: boolean; className?: string;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">) {
  const classes = cn(base, variants[variant], className);
  const inner = <span className="relative z-10">{children}</span>;
  const el = href ? (
    <Link href={href} className={classes}>{inner}</Link>
  ) : (
    <button className={classes} {...rest}>{inner}</button>
  );
  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}
