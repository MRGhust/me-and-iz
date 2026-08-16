import Head from 'next/head';
import { useApp } from '../components/AppContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { User, Phone, Mail, Calendar } from 'lucide-react';

export default function Profile() {
  const { currentUser, logout } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return null;
  }

  return (
    <>
      <Head>
        <title>پروفایل کاربری | گیم‌شاپ</title>
      </Head>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {currentUser.fullName ? currentUser.fullName.charAt(0) : currentUser.username.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-1">{currentUser.fullName || currentUser.username}</h1>
              <p className="text-gray-500 text-sm">عضو از {new Date(currentUser.createdAt).toLocaleDateString('fa-IR')}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <User size={20} strokeWidth={1.5} className="text-primary-600" />
              <div>
                <p className="text-xs text-gray-500">نام کاربری</p>
                <p className="font-medium text-gray-800">{currentUser.username}</p>
              </div>
            </div>
            
            {currentUser.phone && (
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <Phone size={20} strokeWidth={1.5} className="text-primary-600" />
                <div>
                  <p className="text-xs text-gray-500">شماره تماس</p>
                  <p className="font-medium text-gray-800">{currentUser.phone}</p>
                </div>
              </div>
            )}
            
            {currentUser.email && (
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <Mail size={20} strokeWidth={1.5} className="text-primary-600" />
                <div>
                  <p className="text-xs text-gray-500">ایمیل</p>
                  <p className="font-medium text-gray-800">{currentUser.email}</p>
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <Calendar size={20} strokeWidth={1.5} className="text-primary-600" />
              <div>
                <p className="text-xs text-gray-500">تاریخ عضویت</p>
                <p className="font-medium text-gray-800">{new Date(currentUser.createdAt).toLocaleDateString('fa-IR')}</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => logout()}
            className="w-full py-3 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium"
          >
            خروج از حساب
          </button>
        </div>

        {/* Orders History Placeholder */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">سفارش‌های من</h2>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-500">هنوز سفارشی ثبت نکرده‌اید</p>
          </div>
        </div>
      </div>
    </>
  );
}
