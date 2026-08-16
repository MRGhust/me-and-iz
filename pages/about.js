import Head from 'next/head';

export default function About() {
  return (
    <>
      <Head>
        <title>درباره ما | گیم‌شاپ</title>
        <meta name="description" content="درباره گیم‌شاپ، مرجع خرید گیفت کارت و خدمات گیمینگ" />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">درباره گیم‌شاپ</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 leading-relaxed mb-6">
              گیم‌شاپ با هدف ارائه بهترین خدمات در زمینه خرید گیفت کارت، بازی‌های دیجیتال و خدمات گیمینگ تأسیس شده است. ما متعهد به ارائه محصولات با کیفیت و قیمت مناسب به همراه پشتیبانی عالی هستیم.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
              <div className="text-center p-6 bg-primary-50 rounded-xl">
                <div className="text-4xl font-bold text-primary-600 mb-2">+۵۰۰۰</div>
                <p className="text-gray-600">مشتری راضی</p>
              </div>
              <div className="text-center p-6 bg-accent-50 rounded-xl">
                <div className="text-4xl font-bold text-accent-600 mb-2">+۱۰۰۰۰</div>
                <p className="text-gray-600">سفارش موفق</p>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-xl">
                <div className="text-4xl font-bold text-green-600 mb-2">۲۴/۷</div>
                <p className="text-gray-600">پشتیبانی</p>
              </div>
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-4">چرا گیم‌شاپ؟</h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>تحویل فوری و آنی محصولات پس از پرداخت</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>ضمانت اصالت و کیفیت تمام محصولات</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>پشتیبانی ۲۴ ساعته در تمام روزهای هفته</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>قیمت‌های رقابتی و منصفانه</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>تنوع بالای محصولات و خدمات</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
