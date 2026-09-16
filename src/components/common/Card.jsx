const Card = ({ children, className = "", hover = false, ...props }) => {
  return (
    <div
      className={`glass-card rounded-2xl p-6 ${
        hover
          ? "transition-all duration-300 hover:border-primary-400/40 hover:shadow-glow-sm hover:-translate-y-1"
          : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;