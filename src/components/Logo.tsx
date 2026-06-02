type LogoProps = {
  variant?: "color" | "light";
  showWordmark?: boolean;
  className?: string;
};

export function Logo({ variant = "color", showWordmark = true, className }: LogoProps) {
  return (
    <div className={`flex items-center ${className || ""}`}>
      <img
        src="/logo.png"
        alt="صامل للتسويق العقاري"
        className="h-12 w-auto"
      />
    </div>
  );
}
