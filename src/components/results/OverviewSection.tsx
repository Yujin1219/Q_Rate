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
  const daysElapsed = Math.ceil(
    (Date.now() - new Date(survey.createdAt).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <>
      {/* Header */}
      <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/30 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {survey.title}
            </h1>
            <div className="flex items-center space-x-6 text-gray-600">
              <span className="flex items-center">
                <i className="ri-user-line mr-2"></i>총 {responses.length}명
                응답
              </span>
              <span className="flex items-center">
                <i className="ri-calendar-line mr-2"></i>
                생성일: {survey.createdAt}
              </span>
            </div>
          </div>

          <div className="flex">
            <button
              onClick={async () => {
                const content = document.getElementById("results-content");
                if (!content) return;

                try {
                  const html2canvasMod = await import("html2canvas");
                  const jspdfMod = await import("jspdf");
                  const html2canvas = html2canvasMod.default || html2canvasMod;
                  const jsPDF = jspdfMod.jsPDF || jspdfMod.default || jspdfMod;

                  const canvas = await html2canvas(content, {
                    scale: 2,
                    useCORS: true,
                    allowTaint: false,
                  });

                  const imgData = canvas.toDataURL("image/png");

                  const pdf = new jsPDF({
                    unit: "mm",
                    format: "a4",
                    orientation: "p",
                  });

                  const pdfWidth = pdf.internal.pageSize.getWidth();
                  const pdfHeight = pdf.internal.pageSize.getHeight();

                  const imgProps = pdf.getImageProperties(imgData);
                  const imgWidth = pdfWidth;
                  const imgHeight =
                    (imgProps.height * imgWidth) / imgProps.width;

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

                  const fileName = `${
                    survey.title
                      ? survey.title.replace(/[^a-z0-9\-\_\s]/gi, "")
                      : "survey-results"
                  }.pdf`;
                  pdf.save(fileName);
                  alert("PDF로 저장되었습니다.");
                } catch (e) {
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

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-xl text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500/80 to-cyan-600/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
            <i className="ri-user-line text-white text-xl"></i>
          </div>
          <div className="text-2xl font-bold text-gray-800">
            {responses.length}
          </div>
          <div className="text-sm text-gray-600">총 응답 수</div>
        </div>

        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-xl text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500/80 to-emerald-600/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
            <i className="ri-question-line text-white text-xl"></i>
          </div>
          <div className="text-2xl font-bold text-gray-800">
            {survey.questions.length}
          </div>
          <div className="text-sm text-gray-600">총 문항 수</div>
        </div>

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
