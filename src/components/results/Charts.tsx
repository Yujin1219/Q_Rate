import type { ResponseData, ChartData } from "../../types/survey";
import {
  ResponsiveContainer,
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as ReTooltip,
  Cell,
  PieChart as RePieChart,
  Pie,
} from "recharts";

interface BarChartProps {
  chartData: ChartData[];
}

// 객관식 차트 컴포넌트 - 막대 그래프
export function BarChart({ chartData }: BarChartProps) {
  const barColor = "#7C3AED";
  return (
    <div className="results-charts bg-white/30 backdrop-blur-sm rounded-xl p-6 border border-white/40">
      {/* focus outline 제거 */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .results-charts .recharts-surface *:focus { outline: none !important; }
            .results-charts .recharts-wrapper *:focus { outline: none !important; }
            .results-charts svg:focus { outline: none !important; }
          `,
        }}
      />
      <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
        <i className="ri-bar-chart-line mr-2"></i>
        막대 차트
      </h3>
      {/* 보기별 응답 수 막대 그래프 */}
      <div className="space-y-4">
        {chartData.map((item, idx) => (
          <div key={idx}>
            <div className="flex justify-between text-sm text-gray-700 mb-1">
              <span className="truncate">{item.label}</span>
              <span className="ml-2">{item.value}명</span>
            </div>
            <div className="w-full bg-white/40 backdrop-blur-sm rounded-full h-6 border border-white/50 flex items-center">
              <div className="w-full px-0">
                <ResponsiveContainer width="100%" height={28}>
                  {/* Recharts 막대 그래프로 보기 비율 표시 */}
                  <ReBarChart
                    data={[{ name: item.label, value: item.percentage }]}
                    layout="vertical"
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                    barCategoryGap={0}
                    barGap={0}
                  >
                    <XAxis
                      type="number"
                      dataKey="value"
                      domain={[0, 100]}
                      hide
                    />
                    <YAxis type="category" dataKey="name" hide width={0} />
                    <ReTooltip
                      contentStyle={{ display: "none" }}
                      cursor={false}
                    />
                    <Bar
                      dataKey="value"
                      isAnimationActive={true}
                      radius={[12, 12, 12, 12]}
                      barSize={12}
                    >
                      <Cell fill={barColor} />
                    </Bar>
                  </ReBarChart>
                </ResponsiveContainer>
              </div>
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

// 객관식 차트 컴포넌트 - 파이 차트
export function PieChart({ chartData, responses }: PieChartProps) {
  return (
    <div className="results-charts bg-white/30 backdrop-blur-sm rounded-xl p-6 border border-white/40">
      {/* focus outline 제거 */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .results-charts .recharts-surface *:focus { outline: none !important; }
            .results-charts .recharts-wrapper *:focus { outline: none !important; }
            .results-charts svg:focus { outline: none !important; }
          `,
        }}
      />
      <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
        <i className="ri-pie-chart-line mr-2"></i>
        파이 차트
      </h3>
      {/* 보기별 응답 수 파이 그래프 */}
      <div className="flex items-center justify-center">
        {chartData.length > 0 ? (
          <div className="relative w-48 h-48">
            <ResponsiveContainer width={192} height={192}>
              {/* Recharts 파이 그래프로 보기 비율 표시 */}
              <RePieChart>
                <Pie
                  data={chartData.map((c) => ({
                    name: c.label,
                    value: c.value,
                  }))}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={40}
                  outerRadius={72}
                  startAngle={-90}
                  endAngle={270}
                  paddingAngle={2}
                >
                  {/* 색상 지정 */}
                  {chartData.map((_, idx) => (
                    <Cell
                      key={`cell-${idx}`}
                      fill={
                        ["#A855F7", "#C084FC", "#DDD6FE", "#F3E8FF", "#FAF5FF"][
                          idx % 5
                        ]
                      }
                    />
                  ))}
                </Pie>
              </RePieChart>
            </ResponsiveContainer>

            {/* 가운데 응답 수 표시 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-md rounded-full flex flex-col items-center justify-center border-2 border-white/50 shadow-lg">
                <span className="text-lg font-bold text-purple-700">
                  {responses.length}
                </span>
                <span className="text-xs text-purple-600">응답</span>
              </div>
            </div>

            {chartData.map((item, idx) => {
              if (item.percentage === 0) return null;

              // 각 조각의 중앙 각도 계산
              let currentAngle = 0;
              for (let i = 0; i < idx; i++) {
                currentAngle += (chartData[i].percentage / 100) * 360;
              }
              const midAngle =
                currentAngle + ((item.percentage / 100) * 360) / 2;
              const midAngleRad = (midAngle * Math.PI) / 180;

              // 레이블 위치 계산
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

// 객관식 차트 컴포넌트 - 통계
export function Statistics({ chartData, responses }: StatisticsProps) {
  return (
    <div className="bg-white/30 backdrop-blur-sm rounded-xl p-6 border border-white/40">
      <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
        <i className="ri-calculator-line mr-2"></i>
        상세 통계
      </h3>
      <div className="space-y-3">
        {/* 보기별 응답 수/비율 카드 */}
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

      {/* 전체 응답 수 하이라이트 카드 */}
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
