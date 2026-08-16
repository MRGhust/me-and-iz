import { AppProvider } from '../components/AppContext';
import Header from '../components/Header';

export default function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Component {...pageProps} />
        </main>
        <footer className="bg-white border-t border-gray-100 py-8 mt-12">
          <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
            © ۱۴۰۳ گیم‌شاپ - تمامی حقوق محفوظ است
          </div>
        </footer>
      </div>
    </AppProvider>
  );
}
