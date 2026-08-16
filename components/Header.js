import Link from 'next/link';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useApp } from '../components/AppContext';
import { useState } from 'react';

export default function Header() {
  const { currentUser, cart, logout, isAdmin } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary-600">
            گیم‌شاپ
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 space-x-reverse">
            <Link href="/" className="text-gray-600 hover:text-primary-500 transition-colors">
              صفحه اصلی
            </Link>
            <Link href="/categories" className="text-gray-600 hover:text-primary-500 transition-colors">
              دسته‌بندی‌ها
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-primary-500 transition-colors">
              درباره ما
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-primary-500 transition-colors">
              تماس با ما
            </Link>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4 space-x-reverse">
            {/* Cart */}
            <Link href="/cart" className="relative p-2 text-gray-600 hover:text-primary-500 transition-colors">
              <ShoppingCart size={24} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User */}
            {currentUser ? (
              <div className="flex items-center space-x-2 space-x-reverse">
                <Link href="/profile" className="p-2 text-gray-600 hover:text-primary-500 transition-colors">
                  <User size={24} strokeWidth={1.5} />
                </Link>
                {isAdmin() && (
                  <Link href="/admin" className="text-xs bg-accent-500 text-white px-2 py-1 rounded-full">
                    پنل ادمین
                  </Link>
                )}
                <button 
                  onClick={logout}
                  className="text-sm text-gray-600 hover:text-red-500 transition-colors"
                >
                  خروج
                </button>
              </div>
            ) : (
              <Link href="/login" className="p-2 text-gray-600 hover:text-primary-500 transition-colors">
                <User size={24} strokeWidth={1.5} />
              </Link>
            )}

            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-3">
              <Link href="/" className="text-gray-600 hover:text-primary-500 transition-colors py-2">
                صفحه اصلی
              </Link>
              <Link href="/categories" className="text-gray-600 hover:text-primary-500 transition-colors py-2">
                دسته‌بندی‌ها
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-primary-500 transition-colors py-2">
                درباره ما
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-primary-500 transition-colors py-2">
                تماس با ما
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
