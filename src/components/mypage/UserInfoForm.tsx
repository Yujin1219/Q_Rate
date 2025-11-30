import { useState } from 'react';

interface UserInfo {
  name: string;
  email: string;
  gender: string;
  age: string;
  joinDate: string;
}

interface UserInfoFormProps {
  userInfo: UserInfo;
  onSave: (updatedInfo: UserInfo) => void;
}

export default function UserInfoForm({ userInfo, onSave }: UserInfoFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(userInfo);

  const handleSave = () => {
    onSave(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(userInfo);
    setIsEditing(false);
  };

  return (
    <div className="relative backdrop-blur-xl bg-white/60 rounded-3xl p-8 border border-white/40 shadow-xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-purple-500/5 to-transparent"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">기본 정보</h3>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="relative inline-flex items-center px-5 py-2.5 text-white font-medium rounded-xl cursor-pointer whitespace-nowrap transition-all duration-500 shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 hover:scale-105 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
              <i className="ri-edit-line mr-2 relative z-10"></i>
              <span className="relative z-10">수정</span>
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleCancel}
                className="relative inline-flex items-center px-5 py-2.5 font-medium rounded-xl cursor-pointer whitespace-nowrap transition-all duration-500 overflow-hidden group backdrop-blur-xl bg-white/60 border border-white/40 text-gray-700 hover:bg-white/80"
              >
                <i className="ri-close-line mr-2"></i>
                취소
              </button>
              <button
                onClick={handleSave}
                className="relative inline-flex items-center px-5 py-2.5 text-white font-medium rounded-xl cursor-pointer whitespace-nowrap transition-all duration-500 shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 hover:scale-105 overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                <i className="ri-save-line mr-2 relative z-10"></i>
                <span className="relative z-10">저장</span>
              </button>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
            {isEditing ? (
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="w-full px-4 py-3 bg-white/60 backdrop-blur-xl border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400/50 transition-all duration-300 text-gray-800 shadow-inner"
              />
            ) : (
              <div className="px-4 py-3 bg-white/40 backdrop-blur-xl border border-white/30 rounded-xl text-gray-800">
                {userInfo.name}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
            {isEditing ? (
              <input
                type="email"
                value={editForm.email}
                disabled
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none text-gray-800 shadow-inner"
              />
            ) : (
              <div className="px-4 py-3 bg-white/40 backdrop-blur-xl border border-white/30 rounded-xl text-gray-800">
                {userInfo.email}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">성별</label>
            {isEditing ? (
              <div className="relative">
                <select
                  value={editForm.gender}
                  onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })}
                  className="w-full px-4 py-3 pr-8 bg-white/60 backdrop-blur-xl border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400/50 transition-all duration-300 text-gray-800 shadow-inner appearance-none cursor-pointer"
                >
                  <option value="남성">남성</option>
                  <option value="여성">여성</option>
                  <option value="기타">기타</option>
                </select>
                <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"></i>
              </div>
            ) : (
              <div className="px-4 py-3 bg-white/40 backdrop-blur-xl border border-white/30 rounded-xl text-gray-800">
                {userInfo.gender}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">나이</label>
            {isEditing ? (
              <div className="relative">
                <select
                  value={editForm.age}
                  onChange={(e) => setEditForm({ ...editForm, age: e.target.value })}
                  className="w-full px-4 py-3 pr-8 bg-white/60 backdrop-blur-xl border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400/50 transition-all duration-300 text-gray-800 shadow-inner appearance-none cursor-pointer"
                >
                  <option value="18-24">18-24세</option>
                  <option value="25-34">25-34세</option>
                  <option value="35-44">35-44세</option>
                  <option value="45-54">45-54세</option>
                  <option value="55-64">55-64세</option>
                  <option value="65+">65세 이상</option>
                </select>
                <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"></i>
              </div>
            ) : (
              <div className="px-4 py-3 bg-white/40 backdrop-blur-xl border border-white/30 rounded-xl text-gray-800">
                {userInfo.age}세
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
