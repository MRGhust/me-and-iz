import Head from 'next/head';
import { useApp } from '../components/AppContext';
import { formatPrice } from '../components/Icons';
import { Trash2, Plus, Minus } from 'lucide-react';
import Link from 'next/link';

export default function Cart() {
  const { cart, removeFromCart, updateCartItem, clearCart } = useApp();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <>
        <Head>
          <title>سبد خرید | گیم‌شاپ</title>
        </Head>
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">سبد خرید شما خالی است</h1>
          <p className="text-gray-500 mb-8">برای شروع خرید به صفحه اصلی بروید</p>
          <Link href="/" className="btn-primary inline-block">
            مشاهده محصولات
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>سبد خرید | گیم‌شاپ</title>
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">سبد خرید</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex gap-4">
                <div className="w-24 h-24 bg-gray-50 rounded-lg flex-shrink-0 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23f1f5f9" width="100" height="100"/><text x="50" y="55" text-anchor="middle" fill="%2394a3b8" font-size="40">📦</text></svg>';
                    }}
                  />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-500 mb-2 line-clamp-1">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary-600">{formatPrice(item.price)}</span>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateCartItem(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                      >
                        <Minus size={16} strokeWidth={2} />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateCartItem(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                      >
                        <Plus size={16} strokeWidth={2} />
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-600 p-2 self-start"
                >
                  <Trash2 size={20} strokeWidth={1.5} />
                </button>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="text-red-500 hover:text-red-600 text-sm font-medium"
            >
              خالی کردن سبد خرید
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-6">خلاصه سفارش</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>تعداد محصولات</span>
                  <span>{cart.reduce((sum, item) => sum + item.quantity, 0)} عدد</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>مبلغ کل</span>
                  <span className="font-bold text-primary-600">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold text-gray-800">
                  <span>قابل پرداخت</span>
                  <span className="text-primary-600">{formatPrice(total)}</span>
                </div>
              </div>

              <button className="btn-primary w-full mb-3">
                ثبت سفارش و پرداخت
              </button>
              
              <p className="text-xs text-gray-500 text-center">
                پس از ثبت سفارش، همکاران ما با شما تماس خواهند گرفت
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
