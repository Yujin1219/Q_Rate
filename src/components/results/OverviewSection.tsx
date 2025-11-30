import type { Survey, ResponseData } from "../../types/survey";

interface OverviewSectionProps {
  survey: Survey;
  responses: ResponseData[];
}

// 설문 개요 섹션 컴포넌트
export default function OverviewSection({
  survey,
  responses,
}: OverviewSectionProps) {
  // 설문 생성일로부터 경과일 계산
  const daysElapsed = Math.ceil(
    (Date.now() - new Date(survey.createdAt).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <>
      {/* 상단 개요 카드 */}
      <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/30 shadow-xl">
        <div className="flex items-center justify-between">
          {/* 설문 제목 및 기본 정보 */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {survey.title}
            </h1>
            <div className="flex items-center space-x-6 text-gray-600">
              {/* 총 응답 수 */}
              <span className="flex items-center">
                <i className="ri-user-line mr-2"></i>총 {responses.length}명
                응답
              </span>

              {/* 설문 생성일 */}
              <span className="flex items-center">
                <i className="ri-calendar-line mr-2"></i>
                생성일: {survey.createdAt}
              </span>
            </div>
          </div>

          {/* PDF 저장 버튼 */}
          <div className="flex">
            <button
              onClick={async () => {
                // 결과 섹션 DOM 가져오기
                const content = document.getElementById("results-content");
                if (!content) return;

                try {
                  // html2canvas + jsPDF 동적 import
                  const html2canvasMod = await import("html2canvas");
                  const jspdfMod = await import("jspdf");
                  const html2canvas = html2canvasMod.default || html2canvasMod;
                  const jsPDF = jspdfMod.jsPDF || jspdfMod.default || jspdfMod;

                  // DOM을 이미지로 캡처
                  const canvas = await html2canvas(content, {
                    scale: 2,
                    useCORS: true,
                    allowTaint: false,
                  });

                  // PNG로 변환
                  const imgData = canvas.toDataURL("image/png");

                  // A4 PDF 생성
                  const pdf = new jsPDF({
                    unit: "mm",
                    format: "a4",
                    orientation: "p",
                  });

                  // PDF 크기 정보
                  const pdfWidth = pdf.internal.pageSize.getWidth();
                  const pdfHeight = pdf.internal.pageSize.getHeight();

                  // 이미지 비율 계산
                  const imgProps = pdf.getImageProperties(imgData);
                  const imgWidth = pdfWidth;
                  const imgHeight =
                    (imgProps.height * imgWidth) / imgProps.width;

                  // 여러 페이지 처리
                  let heightLeft = imgHeight;
                  let position = 0;

                  pdf.addImage(
                    imgData,
                    "PNG",
                    0,
                    position,
                    imgWidth,
                    imgHeight
                  );
                  heightLeft -= pdfHeight;

                  while (heightLeft > 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(
                      imgData,
                      "PNG",
                      0,
                      position,
                      imgWidth,
                      imgHeight
                    );
                    heightLeft -= pdfHeight;
                  }

                  // 파일명 자동 생성 후 저장
                  const fileName = `${
                    survey.title
                      ? survey.title.replace(/[^a-z0-9\-\_\s]/gi, "")
                      : "survey-results"
                  }.pdf`;
                  pdf.save(fileName);

                  alert("PDF로 저장되었습니다.");
                } catch (e) {
                  // 오류 시 콘솔 출력 및 인쇄 대체
                  console.error(e);
                  window.print();
                }
              }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500/80 to-violet-600/80 backdrop-blur-sm hover:from-purple-600/90 hover:to-violet-700/90 text-white font-medium rounded-full cursor-pointer whitespace-nowrap transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border border-white/20"
            >
              <i className="ri-download-line mr-2"></i>
              PDF 저장
            </button>
          </div>
        </div>
      </div>

      {/* 요약 통계 4개 카드 */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {/* 총 응답 수 */}
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-xl text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500/80 to-cyan-600/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
            <i className="ri-user-line text-white text-xl"></i>
          </div>
          <div className="text-2xl font-bold text-gray-800">
            {responses.length}
          </div>
          <div className="text-sm text-gray-600">총 응답 수</div>
        </div>

        {/* 문항 수 */}
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-xl text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500/80 to-emerald-600/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
            <i className="ri-question-line text-white text-xl"></i>
          </div>
          <div className="text-2xl font-bold text-gray-800">
            {survey.questions.length}
          </div>
          <div className="text-sm text-gray-600">총 문항 수</div>
        </div>

        {/* 일평균 응답 수 */}
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-xl text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500/80 to-red-600/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
            <i className="ri-time-line text-white text-xl"></i>
          </div>
          <div className="text-2xl font-bold text-gray-800">
            {Math.round((responses.length / Math.max(1, daysElapsed)) * 10) /
              10}
          </div>
          <div className="text-sm text-gray-600">일평균 응답</div>
        </div>

        {/* 완료율 (응답 있으면 100%) */}
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-xl text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500/80 to-violet-600/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
            <i className="ri-bar-chart-line text-white text-xl"></i>
          </div>
          <div className="text-2xl font-bold text-gray-800">
            {responses.length > 0 ? "100%" : "0%"}
          </div>
          <div className="text-sm text-gray-600">완료율</div>
        </div>
      </div>
    </>
  );
}
