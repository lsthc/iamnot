export default function Landing() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4 text-center">
      <div className="space-y-6 max-w-lg">
        <h1 className="text-6xl font-black tracking-tighter text-black">
          IAMNOT
        </h1>
        <p className="text-xl text-gray-600 font-medium">
          자신이 무엇이 아닌지 정의하세요.
        </p>
        
        <div className="pt-8">
          <a
            href="/?page=generate"
            className="inline-block rounded-full bg-black px-8 py-4 text-lg font-bold text-white transition-transform hover:scale-105 active:scale-95"
          >
            시작하기
          </a>
        </div>
      </div>
    </div>
  );
}
