const LoadingDots = () => {
  return (
    <div className="flex justify-start animate-fade-in">
      <div className="bg-white border border-[#e8ecf3] px-4.5 py-3.5 rounded-2xl rounded-tl-none shadow-xs flex gap-1.5 items-center">
        <span className="w-2.5 h-2.5 bg-[#5245FA] rounded-full animate-bounce [animation-delay:-0.3s]" />
        <span className="w-2.5 h-2.5 bg-[#0F89F7] rounded-full animate-bounce [animation-delay:-0.15s]" />
        <span className="w-2.5 h-2.5 bg-[#02D3F8] rounded-full animate-bounce" />
      </div>
    </div>
  );
};

export default LoadingDots;