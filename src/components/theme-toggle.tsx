import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border hairline hover:bg-foreground hover:text-background transition-colors ${className}`}
    >
      <span
        className="material-symbols-outlined !text-[18px]"
        style={{ fontVariationSettings: '"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24' }}
      >
        {theme === "dark" ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
}
