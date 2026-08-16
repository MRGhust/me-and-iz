import { useApp } from './AppContext';
import { formatPrice } from './Icons';

export default function ProductCard({ item, categoryId }) {
  const { addToCart } = useApp();

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all card-hover border border-gray-100">
      <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23f1f5f9" width="100" height="100"/><text x="50" y="55" text-anchor="middle" fill="%2394a3b8" font-size="40">📦</text></svg>';
          }}
        />
      </div>
      
      <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 min-h-[3rem]">
        {item.name}
      </h3>
      
      <p className="text-sm text-gray-500 mb-3 line-clamp-2 min-h-[2.5rem]">
        {item.description}
      </p>
      
      <div className="flex items-center justify-between">
        <span className={`font-bold ${item.available ? 'text-primary-600' : 'text-red-500'}`}>
          {formatPrice(item.price)}
        </span>
        
        <button
          onClick={() => addToCart({ ...item, categoryId })}
          disabled={!item.available}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            item.available 
              ? 'bg-primary-500 text-white hover:bg-primary-600' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {item.available ? 'افزودن' : 'ناموجود'}
        </button>
      </div>
    </div>
  );
}
