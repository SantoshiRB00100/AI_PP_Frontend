const baseStyles =
  "w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white " +
  "placeholder:text-white/30 outline-none transition-all duration-200 " +
  "focus:border-accent-400/60 focus:bg-white/[0.07] focus:shadow-glow-sm";

const Input = ({ label, error, className = "", ...props }) => (
  <div className="w-full">
    {label && <label className="mb-1.5 block text-sm font-medium text-white/70">{label}</label>}
    <input className={`${baseStyles} ${className}`} {...props} />
    {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
  </div>
);

export const Textarea = ({ label, error, className = "", ...props }) => (
  <div className="w-full">
    {label && <label className="mb-1.5 block text-sm font-medium text-white/70">{label}</label>}
    <textarea className={`${baseStyles} resize-none ${className}`} {...props} />
    {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
  </div>
);

export const Select = ({ label, error, children, className = "", ...props }) => (
  <div className="w-full">
    {label && <label className="mb-1.5 block text-sm font-medium text-white/70">{label}</label>}
    <select className={`${baseStyles} ${className}`} {...props}>
      {children}
    </select>
    {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
  </div>
);

export default Input;