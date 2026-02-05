import { identityLabels } from '../data';
import TypingText from '../components/TypingText';

interface ViewerProps {
  id: string | null;
}

export default function Viewer({ id }: ViewerProps) {
  // Parse IDs from prop or URL
  let idParam = id;
  
  // 추가 안전장치: 직접 URL에서도 읽기
  if (!idParam) {
    const urlParams = new URLSearchParams(window.location.search);
    idParam = urlParams.get('id');
  }

  let selectedLabels: string[] = [];

  if (idParam) {
    const indices = idParam.split('').map(Number).filter(n => !isNaN(n) && n >= 0 && n < identityLabels.length);
    selectedLabels = indices.map(i => identityLabels[i]);
  }

  // Default to all labels if none specified
  if (selectedLabels.length === 0) {
    selectedLabels = [...identityLabels];
  }

  // 디버깅 로그
  console.log('Viewer - id prop:', id);
  console.log('Viewer - idParam:', idParam);
  console.log('Viewer - selectedLabels:', selectedLabels);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-6">
      <div className="text-center max-w-[90vw]">
        <div className="text-4xl sm:text-5xl md:text-6xl font-black text-black leading-tight">
          <span className="block mb-2">저는</span>
          <TypingText 
            texts={selectedLabels} 
            typingSpeed={100}
            deletingSpeed={50}
            pauseDuration={2000}
          />
          <span className="block mt-2">아닙니다.</span>
        </div>
      </div>

      <div className="fixed bottom-8 left-0 right-0 text-center">
        <a
          href="/?page=generate"
          className="inline-block rounded-full bg-black px-6 py-3 text-base font-bold text-white transition-transform hover:scale-105 active:scale-95"
        >
          나만의 링크 만들기
        </a>
      </div>
    </div>
  );
}
