import { useState } from 'react';
import { identityLabels } from '../data';

export default function Generate() {
  const [selected, setSelected] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setSelected((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index].sort((a, b) => a - b)
    );
  };

  const resetSelection = () => {
    setSelected([]);
  };

  const generateLink = () => {
    const baseUrl = window.location.origin;
    const ids = selected.join('');
    // 명확한 쿼리 스트링 생성
    return `${baseUrl}/?page=iamnot&id=${ids}`;
  };

  const getPreviewUrl = () => {
    const ids = selected.join('');
    return `/?page=iamnot&id=${ids}`;
  };

  const copyLink = async () => {
    const link = generateLink();
    try {
      await navigator.clipboard.writeText(link);
      alert('링크가 복사되었습니다!');
    } catch {
      prompt('링크를 복사하세요:', link);
    }
  };

  const openLink = () => {
    const previewUrl = getPreviewUrl();
    window.location.href = previewUrl;
  };

  return (
    <div className="min-h-screen bg-white p-4 pb-32">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="py-8 text-center">
          <a href="/" className="text-3xl font-black tracking-tighter text-black">
            IAMNOT
          </a>
          <p className="mt-2 text-gray-500">
            자신이 아닌 것들을 선택하세요
          </p>
        </div>

        {/* Selection Grid */}
        <div className="grid grid-cols-1 gap-3">
          {identityLabels.map((label, index) => {
            const isSelected = selected.includes(index);
            return (
              <button
                key={index}
                onClick={() => toggleItem(index)}
                className={`
                  p-4 rounded-2xl text-left text-lg font-medium transition-all
                  ${isSelected
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                <span className="flex items-center justify-between">
                  <span>{label}</span>
                  <span className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center
                    ${isSelected
                      ? 'border-white bg-white'
                      : 'border-gray-300'
                    }
                  `}>
                    {isSelected && (
                      <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Reset Button */}
        {selected.length > 0 && (
          <div className="mt-4 text-center">
            <button
              onClick={resetSelection}
              className="text-gray-400 hover:text-gray-600 text-sm underline"
            >
              선택 초기화
            </button>
          </div>
        )}
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-2xl mx-auto">
          {selected.length === 0 ? (
            <div className="text-center text-gray-400 py-2">
              최소 1개 이상 선택해주세요
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-center text-sm text-gray-500 truncate px-4">
                {generateLink()}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={copyLink}
                  className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                >
                  링크 복사
                </button>
                <button
                  onClick={openLink}
                  className="flex-1 py-3 px-4 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
                >
                  미리보기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
