import Head from 'next/head';
import { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this to a backend
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 3000);
  };

  return (
    <>
      <Head>
        <title>تماس با ما | گیم‌شاپ</title>
        <meta name="description" content="ارتباط با پشتیبانی گیم‌شاپ" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">تماس با ما</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            برای هرگونه سوال یا مشکل، از طریق فرم زیر یا اطلاعات تماس با ما در ارتباط باشید
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6">اطلاعات تماس</h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                    <Phone size={24} strokeWidth={1.5} className="text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">شماره تماس</p>
                    <p className="font-medium text-gray-800">۰۲۱-۱۲۳۴۵۶۷۸</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center">
                    <Mail size={24} strokeWidth={1.5} className="text-accent-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">ایمیل</p>
                    <p className="font-medium text-gray-800">support@gameshop.ir</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <MapPin size={24} strokeWidth={1.5} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">آدرس</p>
                    <p className="font-medium text-gray-800">تهران، میدان ونک، خیابان ملاصدرا</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="font-bold text-gray-800 mb-3">ساعات کاری</h3>
                <p className="text-gray-600 text-sm">شنبه تا چهارشنبه: ۹ صبح تا ۶ عصر</p>
                <p className="text-gray-600 text-sm">پنجشنبه: ۹ صبح تا ۲ ظهر</p>
                <p className="text-gray-600 text-sm">جمعه: تعطیل</p>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4">سوالات متداول</h2>
              <div className="space-y-3 text-sm opacity-90">
                <p>• تحویل گیفت کارت‌ها آنی است</p>
                <p>• پشتیبانی ۲۴ ساعته پاسخگو است</p>
                <p>• امکان بازگشت وجه در صورت مشکل فنی وجود دارد</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6">ارسال پیام</h2>

            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">پیام شما ارسال شد</h3>
                <p className="text-gray-500">به زودی با شما تماس خواهیم گرفت</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">نام و نام خانوادگی</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-field"
                    placeholder="مثال: علی محمدی"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ایمیل</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-field"
                    placeholder="example@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">شماره تماس</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="input-field"
                    placeholder="09123456789"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">پیام</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="input-field"
                    rows="5"
                    placeholder="پیام خود را بنویسید..."
                    required
                  />
                </div>

                <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                  <Send size={20} />
                  ارسال پیام
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
