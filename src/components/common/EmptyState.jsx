const EmptyState = ({ icon: Icon, title, message }) => (
  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] py-16 text-center">
    {Icon && (
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-500/10 text-primary-400">
        <Icon size={28} />
      </div>
    )}
    <h3 className="text-lg font-semibold text-white">{title}</h3>
    {message && <p className="mt-1 max-w-sm text-sm text-white/50">{message}</p>}
  </div>
);

export default EmptyState;