// components/ㄹ/PageHeader.tsx
interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;  // 버튼이나 다른 액션들을 넣을 수 있는 슬롯
  fullWidth?: boolean;  // 전체 너비 여부
}

export default function PageHeader({ 
  title, 
  description, 
  actions,
  fullWidth = true 
}: PageHeaderProps) {
  return (
    <div className="rounded-2xl">
      {/* 헤더 내용물 - 조건부 너비 제한 */}
      <div className={`${fullWidth ? 'max-w-7xl mx-auto' : ''} px-4 sm:px-6 lg:px-8 py-6`}>
        <div className="flex items-center justify-between">
          {/* 제목 및 설명 */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
            {description && (
              <p className="text-gray-600">{description}</p>
            )}
          </div>
          
          {/* 액션 버튼들 */}
          {actions && (
            <div className="flex space-x-3">
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}