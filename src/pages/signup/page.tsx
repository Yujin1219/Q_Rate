// src/pages/signup/page.tsx
import AuthLayout from '../login_signup_auth/AuthLayout';
import SignupForm from './SignupForm';

export default function SignupPage() {
  return (
    <AuthLayout
      title="회원가입"
      subtitle="Q+rate와 함께 시작하세요"
    >
      <SignupForm />
    </AuthLayout>
  );
}
