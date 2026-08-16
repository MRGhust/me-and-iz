import Head from 'next/head';
import { useApp } from '../components/AppContext';
import CategoryCard from '../components/CategoryCard';

export default function Categories() {
  const { db } = useApp();

  return (
    <>
      <Head>
        <title>دسته‌بندی‌ها | گیم‌شاپ</title>
        <meta name="description" content="مشاهده تمام دسته‌بندی‌های محصولات گیم‌شاپ" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">دسته‌بندی‌های محصولات</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            انواع گیفت کارت، بازی‌های دیجیتال، اشتراک‌ها و خدمات گیمینگ
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {db.categories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </>
  );
}
