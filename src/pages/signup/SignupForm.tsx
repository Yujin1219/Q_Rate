// src/pages/signup/SignupForm.tsx
// 실제 회원가입 폼만 담당하는 컴포넌트 (레이아웃은 AuthLayout이 담당)

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignupForm() {
  const navigate = useNavigate();

  // 회원가입에서 사용할 입력값들을 하나의 객체로 관리
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '남성',
    age: '25-34',
    isAgreed: false
  });

  // input / select 값 변경 시 호출
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    setFormData(prev => ({
      ...prev,
      // 체크박스냐 / 일반 input이냐에 따라 값 다르게 세팅
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : value
    }));
  };

  // 회원가입 버튼 클릭 or 폼 제출 시 실행
  const handleSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 비밀번호/비밀번호 확인 일치 여부
    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 약관 동의 체크 여부
    if (!formData.isAgreed) {
      alert('이용약관 및 개인정보처리방침에 동의해주세요.');
      return;
    }

    // 실제 저장할 userInfo 객체 구성
    const userInfo = {
      //  임시 userId 발급
      userId: `user_${Date.now()}`,
      name: formData.name,
      email: formData.email,
      password: formData.password,
      gender: formData.gender,
      age: formData.age,
      // 가입일: 오늘 날짜(YYYY-MM-DD)
      joinDate: new Date().toISOString().split('T')[0]
    };

    // 로컬스토리지에 문자열 형태로 저장
    localStorage.setItem('userInfo', JSON.stringify(userInfo));

    console.log('Signup Success:', userInfo);
    alert('회원가입 완료! 로그인 페이지로 이동합니다.');
    navigate('/login'); // 회원가입 후 로그인 페이지로 이동
  };

  return (
    <form onSubmit={handleSignup} className="space-y-5">
      {/* 이름 입력 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="이름을 입력하세요"
          required
          className="w-full px-4 py-3 bg-white/60 backdrop-blur-xl border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400/50 transition-all duration-300 text-gray-800 placeholder-gray-400 shadow-inner"
        />
      </div>

      {/* 이메일 입력 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="이메일을 입력하세요"
          required
          className="w-full px-4 py-3 bg-white/60 backdrop-blur-xl border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400/50 transition-all duration-300 text-gray-800 placeholder-gray-400 shadow-inner"
        />
      </div>

      {/* 성별 / 나이 선택 */}
      <div className="grid grid-cols-2 gap-4">
        {/* 성별 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">성별</label>
          <div className="relative">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-3 pr-8 bg-white/60 backdrop-blur-xl border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400/50 transition-all duration-300 text-gray-800 shadow-inner appearance-none cursor-pointer"
            >
              <option value="남성">남성</option>
              <option value="여성">여성</option>
              <option value="기타">기타</option>
            </select>
            <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"></i>
          </div>
        </div>

        {/* 나이 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">나이</label>
          <div className="relative">
            <select
              name="age"
              value={formData.age}
              onChange={handleChange}
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
        </div>
      </div>

      {/* 비밀번호 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">비밀번호</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="비밀번호를 입력하세요"
          required
          className="w-full px-4 py-3 bg-white/60 backdrop-blur-xl border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400/50 transition-all duration-300 text-gray-800 placeholder-gray-400 shadow-inner"
        />
      </div>

      {/* 비밀번호 확인 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">비밀번호 확인</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="비밀번호를 다시 입력하세요"
          required
          className="w-full px-4 py-3 bg-white/60 backdrop-blur-xl border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400/50 transition-all duration-300 text-gray-800 placeholder-gray-400 shadow-inner"
        />
      </div>

      {/* 약관 동의 체크박스 */}
      <div className="flex items-start">
        <input
          type="checkbox"
          name="isAgreed"
          checked={formData.isAgreed}
          onChange={handleChange}
          className="w-4 h-4 mt-1 rounded border-gray-300 text-violet-600 focus:ring-violet-500 cursor-pointer"
        />
        <label className="ml-2 text-sm text-gray-600">
          <a href="#" className="text-violet-600 hover:text-violet-700 font-medium">
            이용약관
          </a>{' '}
          및{' '}
          <a href="#" className="text-violet-600 hover:text-violet-700 font-medium">
            개인정보처리방침
          </a>
          에 동의합니다
        </label>
      </div>

      {/* 회원가입 버튼 */}
      <button
        type="submit"
        className="relative w-full py-3 text-white font-medium rounded-xl cursor-pointer whitespace-nowrap transition-all duration-500 shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 hover:scale-105 overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
        <span className="relative z-10">회원가입</span>
      </button>

      {/* 로그인 페이지로 이동 링크 */}
      <div className="text-center pt-4">
        <span className="text-gray-600">이미 계정이 있으신가요? </span>
        <Link to="/login" className="text-violet-600 hover:text-violet-700 font-medium">
          로그인
        </Link>
      </div>
    </form>
  );
}
