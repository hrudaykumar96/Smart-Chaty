const Spinner = () => {
  return (
    <div
      role="status"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#030C31]/85 backdrop-blur-xl animate-fade-in"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Glow ambient spot */}
        <div className="absolute w-[200px] h-[200px] rounded-full bg-[#5245FA]/10 blur-[60px] pointer-events-none animate-pulse" />

        {/* Elegant Branded Ring Spinner & Logo */}
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-[3px] border-white/5 border-t-[#02D3F8] border-r-[#5245FA] border-b-[#0F89F7] animate-spin duration-1000" />
          <img
            src="/favicon.svg"
            alt="Loading Logo"
            className="absolute w-8 h-8 drop-shadow-[0_0_8px_rgba(82,69,250,0.4)] animate-pulse"
          />
        </div>

        <p className="text-xs font-bold tracking-[0.4em] uppercase text-slate-300 bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent drop-shadow-md select-none">
          Loading
        </p>
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
