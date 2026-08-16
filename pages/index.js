import Head from 'next/head';
import { useApp } from '../components/AppContext';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const { db } = useApp();

  return (
    <>
      <Head>
        <title>گیم‌شاپ | خرید گیفت کارت و خدمات گیمینگ</title>
        <meta name="description" content="مرجع خرید گیفت کارت، بازی و خدمات گیمینگ با بهترین قیمت" />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-500 to-accent-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            به گیم‌شاپ خوش آمدید
          </h1>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            مرجع تخصصی خرید گیفت کارت، بازی‌های دیجیتال و خدمات گیمینگ با تحویل فوری و پشتیبانی ۲۴ ساعته
          </p>
          <div className="flex justify-center gap-4">
            <a href="#categories" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              مشاهده دسته‌بندی‌ها
            </a>
            <a href="/contact" className="border border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">
              تماس با ما
            </a>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">دسته‌بندی‌های محصولات</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              انواع گیفت کارت، بازی‌های دیجیتال، اشتراک‌ها و خدمات گیمینگ را در دسته‌بندی‌های زیر مشاهده کنید
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {db.categories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">محصولات ویژه</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              محبوب‌ترین محصولات گیم‌شاپ را از دست ندهید
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {db.categories.slice(0, 4).flatMap(category => 
              category.items.slice(0, 1).map(item => (
                <ProductCard key={item.id} item={item} categoryId={category.id} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">تحویل فوری</h3>
              <p className="text-gray-500 text-sm">تحویل آنی محصولات پس از پرداخت</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">ضمانت اصالت</h3>
              <p className="text-gray-500 text-sm">تضمین کیفیت و اصالت تمام محصولات</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M2.75 12a9.25 9.25 0 1118.5 0 9.25 9.25 0 01-18.5 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">پشتیبانی ۲۴/۷</h3>
              <p className="text-gray-500 text-sm">پاسخگویی در تمام ساعات شبانه‌روز</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
