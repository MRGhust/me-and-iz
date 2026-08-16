import Head from 'next/head';
import { useState } from 'react';
import { useApp } from '../components/AppContext';
import { useRouter } from 'next/router';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullName: '',
    phone: '',
    email: ''
  });
  const [error, setError] = useState('');
  
  const { login, register } = useApp();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const result = login(formData.username, formData.password);
      if (result.success) {
        router.push('/');
      } else {
        setError(result.error);
      }
    } else {
      if (!formData.fullName || !formData.phone) {
        setError('لطفاً نام و شماره تماس را وارد کنید');
        return;
      }
      const result = register(formData);
      if (result.success) {
        router.push('/');
      } else {
        setError(result.error);
      }
    }
  };

  return (
    <>
      <Head>
        <title>{isLogin ? 'ورود' : 'ثبت‌نام'} | گیم‌شاپ</title>
      </Head>

      <div className="max-w-md mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {isLogin ? 'ورود به حساب کاربری' : 'ایجاد حساب کاربری'}
          </h1>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    نام و نام خانوادگی
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="input-field"
                    placeholder="مثال: علی محمدی"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    شماره تماس
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="input-field"
                    placeholder="مثال: 09123456789"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ایمیل (اختیاری)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-field"
                    placeholder="example@email.com"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                نام کاربری
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="input-field"
                placeholder="نام کاربری خود را وارد کنید"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                رمز عبور
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="input-field"
                placeholder="رمز عبور خود را وارد کنید"
                required
              />
            </div>

            <button type="submit" className="btn-primary w-full">
              {isLogin ? 'ورود' : 'ثبت‌نام'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              {isLogin ? 'حساب کاربری ندارید؟ ثبت‌نام کنید' : 'قبلاً ثبت‌نام کرده‌اید؟ وارد شوید'}
            </button>
          </div>

          {/* Demo Admin Account Info */}
          {isLogin && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-800 font-medium mb-2">حساب ادمین تست:</p>
              <p className="text-xs text-blue-600">نام کاربری: admin</p>
              <p className="text-xs text-blue-600">رمز عبور: admin123</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
