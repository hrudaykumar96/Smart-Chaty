const LoadingDots = () => {
  return (
    <div className="flex justify-start">
      <div className="bg-white border border-[#e8ecf3] px-4 py-3 rounded-2xl flex gap-1">
        <span className="w-2 h-2 bg-[#94a3b8] rounded-full animate-bounce" />
        <span className="w-2 h-2 bg-[#94a3b8] rounded-full animate-bounce [animation-delay:0.15s]" />
        <span className="w-2 h-2 bg-[#94a3b8] rounded-full animate-bounce [animation-delay:0.3s]" />
      </div>
    </div>
  );
};

export default LoadingDots;