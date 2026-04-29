const Spinner = () => {
  return (
    <div
      role="status"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
    >
      <div className="flex flex-col items-center gap-5">
        <div className="flex items-center gap-3 rounded-full bg-white/15 px-5 py-4 shadow-2xl backdrop-blur-md border border-white/20">
          <span className="size-4 rounded-full bg-white animate-bounce [animation-delay:-0.3s]" />
          <span className="size-4 rounded-full bg-white animate-bounce [animation-delay:-0.15s]" />
          <span className="size-4 rounded-full bg-white animate-bounce" />
        </div>

        <p className="text-sm font-semibold tracking-[0.3em] uppercase text-white drop-shadow-md">
          Loading
        </p>
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
