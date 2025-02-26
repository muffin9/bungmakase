export default function LoadingSpinner({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-gradient">
      <div className="flex flex-col items-center gap-4">
        {/* 스피너 애니메이션 */}
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-third opacity-30 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-t-third animate-spin rounded-full"></div>
        </div>

        {/* 로딩 텍스트 */}
        <p className="text-third text-lg font-medium animate-pulse">{text}</p>
      </div>
    </div>
  );
}
