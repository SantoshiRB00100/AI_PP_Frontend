const Loader = ({ size = "md" }) => {
  const sizes = {
    sm: "w-5 h-5 border-2",
    md: "w-9 h-9 border-[3px]",
    lg: "w-14 h-14 border-4",
  };

  return (
    <div
      className={`${sizes[size]} rounded-full border-primary-500/30 border-t-accent-400 animate-spin`}
    />
  );
};

export default Loader;