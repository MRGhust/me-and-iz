import Link from 'next/link';
import { getIcon } from './Icons';

export default function CategoryCard({ category }) {
  const IconComponent = getIcon(category.icon);

  return (
    <Link href={`/category/${category.slug}`} className="block group">
      <div 
        className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all card-hover border border-gray-100"
        style={{ '--hover-color': category.color }}
      >
        <div 
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto"
          style={{ backgroundColor: `${category.color}15` }}
        >
          <IconComponent 
            size={32} 
            strokeWidth={1.5}
            style={{ color: category.color }}
          />
        </div>
        <h3 className="text-lg font-bold text-gray-800 text-center mb-2">
          {category.name}
        </h3>
        <p className="text-sm text-gray-500 text-center">
          {category.items.length} محصول
        </p>
      </div>
    </Link>
  );
}
