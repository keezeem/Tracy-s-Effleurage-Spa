export function SampleBadge({ children = "Sample", tone = "light" }: { children?: React.ReactNode; tone?: "light" | "dark" }) {
  return (
    <span className={`inline-block border px-2 py-0.5 text-xs ${tone === "dark" ? "border-champagne/60 text-champagne" : "border-chocolate/40 text-chocolate"}`}>
      {children}
    </span>
  );
}
