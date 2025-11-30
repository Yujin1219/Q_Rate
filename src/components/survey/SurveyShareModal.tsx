import { useState } from 'react';

interface SurveyShareModalProps {
  isOpen: boolean;
  surveyTitle: string;
  surveyId: string;
  onClose: () => void;
}

export default function SurveyShareModal({
  isOpen,
  surveyTitle,
  surveyId,
  onClose,
}: SurveyShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // 설문 응답 링크 생성
  const surveyLink = `${window.location.origin}/survey/${surveyId}`;

  // 클립보드에 복사하는 함수
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(surveyLink);
      setCopied(true);
      // 3초 후 복사 완료 표시 해제
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      alert('링크 복사에 실패했습니다.');
      console.error('클립보드 복사 오류:', err);
    }
  };

  return (
    <>
      {/* 배경 (모달 닫기용) */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* 모달 */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">
          {/* 모달 헤더 */}
          <div className="bg-gradient-to-r from-purple-500/80 to-violet-600/80 p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold">설문이 생성되었습니다!</h2>
              <button
                onClick={onClose}
                className="p-1 hover:bg-white/20 rounded-lg transition-all duration-200"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            <p className="text-white/90 text-sm">"{surveyTitle}"</p>
          </div>

          {/* 모달 본문 */}
          <div className="p-6 space-y-6">
            {/* 성공 아이콘 */}
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-violet-600/20 rounded-full flex items-center justify-center border border-purple-500/30">
                <i className="ri-check-double-line text-3xl text-purple-600"></i>
              </div>
            </div>

            {/* 설명 텍스트 */}
            <div className="text-center">
              <p className="text-gray-700 font-medium mb-2">
                설문 링크를 공유하여 응답자를 모집할 수 있습니다.
              </p>
              <p className="text-gray-500 text-sm">
                아래 버튼으로 링크를 복사하고 공유하세요.
              </p>
            </div>

            {/* 링크 표시 영역 */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <p className="text-xs text-gray-500 mb-2">설문 링크</p>
              <div className="flex items-center justify-between gap-2">
                <code className="text-sm text-gray-700 truncate font-mono">
                  {surveyLink}
                </code>
                <button
                  onClick={copyToClipboard}
                  className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                    copied
                      ? 'bg-green-500/20 text-green-700'
                      : 'bg-purple-500/20 text-purple-700 hover:bg-purple-500/30'
                  }`}
                >
                  {copied ? (
                    <>
                      <i className="ri-check-line mr-1"></i>
                      복사됨
                    </>
                  ) : (
                    <>
                      <i className="ri-file-copy-line mr-1"></i>
                      복사
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* 모달 푸터 */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-all duration-300"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
