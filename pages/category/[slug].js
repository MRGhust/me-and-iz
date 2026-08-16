import Head from 'next/head';
import { useRouter } from 'next/router';
import { useApp } from '../../components/AppContext';
import ProductCard from '../../components/ProductCard';
import { getIcon } from '../../components/Icons';

export default function CategoryPage() {
  const router = useRouter();
  const { slug } = router.query;
  const { db } = useApp();

  const category = db.categories.find(c => c.slug === slug);

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-800">دسته‌بندی یافت نشد</h1>
      </div>
    );
  }

  const IconComponent = getIcon(category.icon);

  return (
    <>
      <Head>
        <title>{category.name} | گیم‌شاپ</title>
        <meta name="description" content={category.description || `خرید از دسته‌بندی ${category.name}`} />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Header */}
        <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: `${category.color}15` }}
            >
              <IconComponent 
                size={32} 
                strokeWidth={1.5}
                style={{ color: category.color }}
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{category.name}</h1>
              <p className="text-gray-500">{category.items.length} محصول در این دسته‌بندی</p>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {category.items.map(item => (
            <ProductCard key={item.id} item={item} categoryId={category.id} />
          ))}
        </div>

        {category.items.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">هنوز محصولی در این دسته‌بندی وجود ندارد</p>
          </div>
        )}
      </div>
    </>
  );
}
