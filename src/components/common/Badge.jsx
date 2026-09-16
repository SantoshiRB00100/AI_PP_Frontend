const Badge = ({ children, className = "" }) => (
  <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium capitalize ${className}`}>
    {children}
  </span>
);

export default Badge;