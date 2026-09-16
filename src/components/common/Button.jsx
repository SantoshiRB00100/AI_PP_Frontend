import Loader from "./Loader";

const VARIANTS = {
  primary: "bg-brand-gradient text-white shadow-glow-sm hover:shadow-glow-purple",
  secondary: "glass-card text-white hover:border-accent-400/50 hover:shadow-glow-cyan",
  ghost: "text-primary-300 hover:text-white hover:bg-white/5",
  danger: "bg-red-500/15 text-red-300 border border-red-500/30 hover:bg-red-500/25",
};

const SIZES = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className = "",
  type = "button",
  onClick,
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-medium
        transition-all duration-300 ease-out active:scale-[0.97]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none
        ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {loading && <Loader size="sm" />}
      {children}
    </button>
  );
};

export default Button;