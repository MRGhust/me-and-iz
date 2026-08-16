import Head from 'next/head';
import { useApp } from '../../components/AppContext';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Package, Tag, Users, ShoppingCart, Plus, Edit, Trash2 } from 'lucide-react';

export default function AdminDashboard() {
  const { currentUser, db, isAdmin, addCategory, updateCategory, deleteCategory, addItem, updateItem, deleteItem } = useApp();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  const [categoryForm, setCategoryForm] = useState({
    name: '',
    slug: '',
    icon: 'Gift',
    color: '#0ea5e9'
  });

  const [itemForm, setItemForm] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    available: true
  });

  useEffect(() => {
    if (!currentUser || !isAdmin()) {
      router.push('/login');
    }
  }, [currentUser, router]);

  if (!currentUser || !isAdmin()) {
    return null;
  }

  const handleAddCategory = (e) => {
    e.preventDefault();
    addCategory(categoryForm);
    setShowCategoryModal(false);
    setCategoryForm({ name: '', slug: '', icon: 'Gift', color: '#0ea5e9' });
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (editingItem) {
      updateItem(selectedCategory.id, editingItem.id, {
        ...itemForm,
        price: parseInt(itemForm.price)
      });
    } else {
      addItem(selectedCategory.id, {
        ...itemForm,
        price: parseInt(itemForm.price)
      });
    }
    setShowItemModal(false);
    setItemForm({ name: '', description: '', price: '', image: '', available: true });
    setEditingItem(null);
  };

  const openEditItem = (category, item) => {
    setSelectedCategory(category);
    setEditingItem(item);
    setItemForm({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      image: item.image,
      available: item.available
    });
    setShowItemModal(true);
  };

  const totalProducts = db.categories.reduce((sum, cat) => sum + cat.items.length, 0);

  return (
    <>
      <Head>
        <title>پنل مدیریت | گیم‌شاپ</title>
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">پنل مدیریت</h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-200 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
              activeTab === 'dashboard' 
                ? 'bg-primary-500 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            داشبورد
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
              activeTab === 'categories' 
                ? 'bg-primary-500 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            دسته‌بندی‌ها ({db.categories.length})
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
              activeTab === 'products' 
                ? 'bg-primary-500 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            محصولات ({totalProducts})
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
              activeTab === 'users' 
                ? 'bg-primary-500 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            کاربران ({db.users.length})
          </button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <Tag size={24} strokeWidth={1.5} className="text-primary-600" />
                <span className="text-3xl font-bold text-gray-800">{db.categories.length}</span>
              </div>
              <p className="text-gray-500">دسته‌بندی‌ها</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <Package size={24} strokeWidth={1.5} className="text-accent-600" />
                <span className="text-3xl font-bold text-gray-800">{totalProducts}</span>
              </div>
              <p className="text-gray-500">محصولات</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <Users size={24} strokeWidth={1.5} className="text-green-600" />
                <span className="text-3xl font-bold text-gray-800">{db.users.length}</span>
              </div>
              <p className="text-gray-500">کاربران</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <ShoppingCart size={24} strokeWidth={1.5} className="text-orange-600" />
                <span className="text-3xl font-bold text-gray-800">{db.orders.length}</span>
              </div>
              <p className="text-gray-500">سفارش‌ها</p>
            </div>
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div>
            <button
              onClick={() => setShowCategoryModal(true)}
              className="btn-primary mb-6 flex items-center gap-2"
            >
              <Plus size={20} />
              افزودن دسته‌بندی جدید
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {db.categories.map(category => (
                <div key={category.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${category.color}15` }}
                      >
                        <span className="text-2xl">{category.icon}</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">{category.name}</h3>
                        <p className="text-sm text-gray-500">{category.items.length} محصول</p>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteCategory(category.id)}
                      className="text-red-500 hover:text-red-600 p-2"
                    >
                      <Trash2 size={18} strokeWidth={1.5} />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => {
                      setSelectedCategory(category);
                      setActiveTab('products');
                    }}
                    className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    مدیریت محصولات
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            {selectedCategory ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">محصولات {selectedCategory.name}</h2>
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="text-sm text-primary-600 hover:text-primary-700"
                    >
                      بازگشت به همه دسته‌بندی‌ها
                    </button>
                  </div>
                  <button
                    onClick={() => setShowItemModal(true)}
                    className="btn-primary flex items-center gap-2"
                  >
                    <Plus size={20} />
                    افزودن محصول
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedCategory.items.map(item => (
                    <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                      <div className="aspect-square bg-gray-50 rounded-lg mb-4 overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23f1f5f9" width="100" height="100"/><text x="50" y="55" text-anchor="middle" fill="%2394a3b8" font-size="40">📦</text></svg>';
                          }}
                        />
                      </div>
                      <h3 className="font-bold text-gray-800 mb-2">{item.name}</h3>
                      <p className="text-sm text-gray-500 mb-3 line-clamp-2">{item.description}</p>
                      <p className="font-bold text-primary-600 mb-4">{item.price.toLocaleString('fa-IR')} تومان</p>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditItem(selectedCategory, item)}
                          className="flex-1 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                        >
                          <Edit size={16} />
                          ویرایش
                        </button>
                        <button
                          onClick={() => deleteItem(selectedCategory.id, item.id)}
                          className="py-2 px-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedCategory.items.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">هنوز محصولی در این دسته‌بندی وجود ندارد</p>
                    <button
                      onClick={() => setShowItemModal(true)}
                      className="mt-4 btn-primary"
                    >
                      افزودن اولین محصول
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">لطفاً یک دسته‌بندی انتخاب کنید</p>
                <button
                  onClick={() => setActiveTab('categories')}
                  className="btn-primary"
                >
                  مشاهده دسته‌بندی‌ها
                </button>
              </div>
            )}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-right py-4 px-6 font-medium text-gray-600">کاربر</th>
                  <th className="text-right py-4 px-6 font-medium text-gray-600">نام کاربری</th>
                  <th className="text-right py-4 px-6 font-medium text-gray-600">تاریخ عضویت</th>
                  <th className="text-right py-4 px-6 font-medium text-gray-600">نقش</th>
                </tr>
              </thead>
              <tbody>
                {db.users.map(user => (
                  <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-bold">
                          {user.fullName ? user.fullName.charAt(0) : user.username.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-800">{user.fullName || '-'}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600">{user.username}</td>
                    <td className="py-4 px-6 text-gray-600">{new Date(user.createdAt).toLocaleDateString('fa-IR')}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === 'admin' 
                          ? 'bg-accent-100 text-accent-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {user.role === 'admin' ? 'مدیر' : 'کاربر'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {db.users.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">هنوز کاربری ثبت‌نام نکرده است</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 mb-6">افزودن دسته‌بندی جدید</h2>
            
            <form onSubmit={handleAddCategory} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">نام دسته‌بندی</label>
                <input
                  type="text"
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">شناسه (slug)</label>
                <input
                  type="text"
                  value={categoryForm.slug}
                  onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                  className="input-field"
                  placeholder="مثال: gift-cards"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">آیکون</label>
                <select
                  value={categoryForm.icon}
                  onChange={(e) => setCategoryForm({ ...categoryForm, icon: e.target.value })}
                  className="input-field"
                >
                  <option value="Gift">Gift</option>
                  <option value="Gamepad2">Gamepad2</option>
                  <option value="Crown">Crown</option>
                  <option value="Coins">Coins</option>
                  <option value="Palette">Palette</option>
                  <option value="Star">Star</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">رنگ</label>
                <input
                  type="color"
                  value={categoryForm.color}
                  onChange={(e) => setCategoryForm({ ...categoryForm, color: e.target.value })}
                  className="w-full h-10 rounded-lg cursor-pointer"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button type="submit" className="btn-primary flex-1">افزودن</button>
                <button
                  type="button"
                  onClick={() => setShowCategoryModal(false)}
                  className="flex-1 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  انصراف
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add/Edit Item Modal */}
      {showItemModal && selectedCategory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              {editingItem ? 'ویرایش محصول' : 'افزودن محصول جدید'}
            </h2>
            
            <form onSubmit={handleAddItem} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">نام محصول</label>
                <input
                  type="text"
                  value={itemForm.name}
                  onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">توضیحات</label>
                <textarea
                  value={itemForm.description}
                  onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })}
                  className="input-field"
                  rows="3"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">قیمت (تومان)</label>
                <input
                  type="number"
                  value={itemForm.price}
                  onChange={(e) => setItemForm({ ...itemForm, price: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">آدرس تصویر</label>
                <input
                  type="text"
                  value={itemForm.image}
                  onChange={(e) => setItemForm({ ...itemForm, image: e.target.value })}
                  className="input-field"
                  placeholder="/images/product.png"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="available"
                  checked={itemForm.available}
                  onChange={(e) => setItemForm({ ...itemForm, available: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor="available" className="text-sm font-medium text-gray-700">موجود است</label>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button type="submit" className="btn-primary flex-1">
                  {editingItem ? 'ذخیره تغییرات' : 'افزودن'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowItemModal(false);
                    setEditingItem(null);
                  }}
                  className="flex-1 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  انصراف
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
