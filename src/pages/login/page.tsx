// src/pages/login/page.tsx
import AuthLayout from '../login_signup_auth/AuthLayout';
import LoginForm from './LoginForm';

export default function LoginPage() {
  return (
    <AuthLayout
      title="로그인"
      subtitle="Q+rate에 오신 것을 환영합니다"
    >
      <LoginForm />
    </AuthLayout>
  );
}
