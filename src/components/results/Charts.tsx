import type { ResponseData, ChartData } from "../../types/survey";

interface BarChartProps {
  chartData: ChartData[];
}

// 객관식 차트 컴포넌트 - 막대, 파이, 통계
export function BarChart({ chartData }: BarChartProps) {
  return (
    <div className="bg-white/30 backdrop-blur-sm rounded-xl p-6 border border-white/40">
      <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
        <i className="ri-bar-chart-line mr-2"></i>
        막대 차트
      </h3>
      <div className="space-y-4">
        {chartData.map((item, idx) => (
          <div key={idx}>
            <div className="flex justify-between text-sm text-gray-700 mb-1">
              <span className="truncate">{item.label}</span>
              <span className="ml-2">{item.value}명</span>
            </div>
            <div className="w-full bg-white/40 backdrop-blur-sm rounded-full h-3 border border-white/50">
              <div
                className="bg-gradient-to-r from-purple-500 to-violet-600 h-3 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-600 mt-1">{item.percentage}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface PieChartProps {
  chartData: ChartData[];
  responses: ResponseData[];
}

export function PieChart({ chartData, responses }: PieChartProps) {
  return (
    <div className="bg-white/30 backdrop-blur-sm rounded-xl p-6 border border-white/40">
      <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
        <i className="ri-pie-chart-line mr-2"></i>
        파이 차트
      </h3>
      <div className="flex items-center justify-center">
        {chartData.length > 0 ? (
          <div className="relative w-48 h-48">
            {/* 3D Shadow Effect */}
            <div className="absolute top-2 left-2 w-full h-full">
              <svg
                className="w-full h-full transform -rotate-90"
                viewBox="0 0 120 120"
              >
                {(() => {
                  let currentAngle = 0;
                  const shadowColors = [
                    "#4C1D95",
                    "#5B21B6",
                    "#6D28D9",
                    "#7C3AED",
                    "#8B5CF6",
                  ];

                  return chartData.map((item, idx) => {
                    if (item.percentage === 0) return null;

                    const startAngle = currentAngle;
                    const angle = (item.percentage / 100) * 360;
                    const endAngle = startAngle + angle;

                    const startAngleRad = (startAngle * Math.PI) / 180;
                    const endAngleRad = (endAngle * Math.PI) / 180;

                    const outerRadius = 45;
                    const innerRadius = 20;

                    const x1 = 60 + outerRadius * Math.cos(startAngleRad);
                    const y1 = 60 + outerRadius * Math.sin(startAngleRad);
                    const x2 = 60 + outerRadius * Math.cos(endAngleRad);
                    const y2 = 60 + outerRadius * Math.sin(endAngleRad);

                    const x3 = 60 + innerRadius * Math.cos(endAngleRad);
                    const y3 = 60 + innerRadius * Math.sin(endAngleRad);
                    const x4 = 60 + innerRadius * Math.cos(startAngleRad);
                    const y4 = 60 + innerRadius * Math.sin(startAngleRad);

                    const largeArcFlag = angle > 180 ? 1 : 0;

                    const pathData = [
                      `M ${x1} ${y1}`,
                      `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                      `L ${x3} ${y3}`,
                      `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
                      "Z",
                    ].join(" ");

                    currentAngle = endAngle;

                    return (
                      <path
                        key={idx}
                        d={pathData}
                        fill={shadowColors[idx % shadowColors.length]}
                        opacity="0.3"
                      />
                    );
                  });
                })()}
              </svg>
            </div>

            {/* Main Chart */}
            <div className="relative z-10">
              <svg
                className="w-full h-full transform -rotate-90"
                viewBox="0 0 120 120"
              >
                <defs>
                  {chartData.map((_, idx) => (
                    <linearGradient
                      key={idx}
                      id={`gradient-${idx}`}
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        stopColor={
                          [
                            "#A855F7",
                            "#C084FC",
                            "#DDD6FE",
                            "#F3E8FF",
                            "#FAF5FF",
                          ][idx % 5]
                        }
                      />
                      <stop
                        offset="100%"
                        stopColor={
                          [
                            "#7C3AED",
                            "#A855F7",
                            "#C084FC",
                            "#DDD6FE",
                            "#F3E8FF",
                          ][idx % 5]
                        }
                      />
                    </linearGradient>
                  ))}
                </defs>

                {(() => {
                  let currentAngle = 0;

                  return chartData.map((item, idx) => {
                    if (item.percentage === 0) return null;

                    const startAngle = currentAngle;
                    const angle = (item.percentage / 100) * 360;
                    const endAngle = startAngle + angle;

                    const startAngleRad = (startAngle * Math.PI) / 180;
                    const endAngleRad = (endAngle * Math.PI) / 180;

                    const outerRadius = 45;
                    const innerRadius = 20;

                    const x1 = 60 + outerRadius * Math.cos(startAngleRad);
                    const y1 = 60 + outerRadius * Math.sin(startAngleRad);
                    const x2 = 60 + outerRadius * Math.cos(endAngleRad);
                    const y2 = 60 + outerRadius * Math.sin(endAngleRad);

                    const x3 = 60 + innerRadius * Math.cos(endAngleRad);
                    const y3 = 60 + innerRadius * Math.sin(endAngleRad);
                    const x4 = 60 + innerRadius * Math.cos(startAngleRad);
                    const y4 = 60 + innerRadius * Math.sin(startAngleRad);

                    const largeArcFlag = angle > 180 ? 1 : 0;

                    const pathData = [
                      `M ${x1} ${y1}`,
                      `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                      `L ${x3} ${y3}`,
                      `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
                      "Z",
                    ].join(" ");

                    currentAngle = endAngle;

                    return (
                      <g key={idx}>
                        <path
                          d={pathData}
                          fill={`url(#gradient-${idx})`}
                          className="hover:opacity-90 transition-all duration-300 hover:scale-105 cursor-pointer"
                          stroke="white"
                          strokeWidth="2"
                          filter="drop-shadow(0 4px 8px rgba(0,0,0,0.1))"
                          style={{
                            transformOrigin: "60px 60px",
                          }}
                        />
                      </g>
                    );
                  });
                })()}
              </svg>
            </div>

            {/* Center Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-md rounded-full flex flex-col items-center justify-center border-2 border-white/50 shadow-lg">
                <span className="text-lg font-bold text-purple-700">
                  {responses.length}
                </span>
                <span className="text-xs text-purple-600">응답</span>
              </div>
            </div>

            {/* Floating Labels */}
            {chartData.map((item, idx) => {
              if (item.percentage === 0) return null;

              let currentAngle = 0;
              for (let i = 0; i < idx; i++) {
                currentAngle += (chartData[i].percentage / 100) * 360;
              }
              const midAngle =
                currentAngle + ((item.percentage / 100) * 360) / 2;
              const midAngleRad = (midAngle * Math.PI) / 180;

              const labelRadius = 55;
              const labelX = 60 + labelRadius * Math.cos(midAngleRad);
              const labelY = 60 + labelRadius * Math.sin(midAngleRad);

              return (
                <div
                  key={idx}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-semibold text-purple-700 border border-purple-200 shadow-md"
                  style={{
                    left: `${(labelX / 120) * 100}%`,
                    top: `${(labelY / 120) * 100}%`,
                  }}
                >
                  {item.percentage}%
                </div>
              );
            })}
          </div>
        ) : (
          <div className="w-48 h-48 flex items-center justify-center bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-full border-2 border-white/40 shadow-lg">
            <div className="text-center">
              <i className="ri-pie-chart-line text-gray-400 text-3xl mb-2"></i>
              <p className="text-sm text-gray-500">데이터 없음</p>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Legend */}
      {chartData.length > 0 && (
        <div className="mt-6 space-y-3">
          {chartData.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 bg-white/40 backdrop-blur-sm rounded-lg border border-white/50 hover:bg-white/50 transition-all duration-300"
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div
                    className="w-4 h-4 rounded-full shadow-md"
                    style={{
                      background: `linear-gradient(135deg, ${
                        ["#A855F7", "#C084FC", "#DDD6FE", "#F3E8FF", "#FAF5FF"][
                          idx % 5
                        ]
                      }, ${
                        ["#7C3AED", "#A855F7", "#C084FC", "#DDD6FE", "#F3E8FF"][
                          idx % 5
                        ]
                      })`,
                    }}
                  ></div>
                  <div className="absolute inset-0 w-4 h-4 rounded-full bg-white/20"></div>
                </div>
                <span className="text-gray-700 font-medium truncate max-w-[120px]">
                  {item.label}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 font-semibold">
                  {item.percentage}%
                </span>
                <span className="text-xs text-gray-500">({item.value}명)</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface StatisticsProps {
  chartData: ChartData[];
  responses: ResponseData[];
}

export function Statistics({ chartData, responses }: StatisticsProps) {
  return (
    <div className="bg-white/30 backdrop-blur-sm rounded-xl p-6 border border-white/40">
      <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
        <i className="ri-calculator-line mr-2"></i>
        상세 통계
      </h3>
      <div className="space-y-3">
        {chartData.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-3 bg-white/40 backdrop-blur-sm rounded-lg border border-white/50"
          >
            <div className="flex items-center space-x-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{
                  backgroundColor: [
                    "#8B5CF6",
                    "#A855F7",
                    "#C084FC",
                    "#DDD6FE",
                    "#EDE9FE",
                  ][idx % 5],
                }}
              ></div>
              <span className="text-gray-700 font-medium text-sm">
                {item.label}
              </span>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-gray-800">
                {item.value}
              </div>
              <div className="text-xs text-gray-600">{item.percentage}%</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-4 bg-gradient-to-r from-purple-500/20 to-violet-600/20 backdrop-blur-sm rounded-lg border border-white/40">
        <div className="text-center">
          <div className="text-xl font-bold text-gray-800">
            {responses.length}
          </div>
          <div className="text-xs text-gray-600">총 응답 수</div>
        </div>
      </div>
    </div>
  );
}
