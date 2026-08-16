import { createContext, useContext, useState, useEffect } from 'react';
import dbData from '../data/db.json';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [db, setDb] = useState(dbData);
  const [currentUser, setCurrentUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    const savedCart = localStorage.getItem('cart');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const login = (username, password) => {
    const user = db.users.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      return { success: true, user };
    }
    return { success: false, error: 'نام کاربری یا رمز عبور اشتباه است' };
  };

  const register = (userData) => {
    const existingUser = db.users.find(u => u.username === userData.username);
    if (existingUser) {
      return { success: false, error: 'این نام کاربری قبلاً ثبت شده است' };
    }
    const newUser = {
      id: Date.now(),
      ...userData,
      role: 'user',
      createdAt: new Date().toISOString()
    };
    setDb(prev => ({
      ...prev,
      users: [...prev.users, newUser]
    }));
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prev => prev.filter(i => i.id !== itemId));
  };

  const updateCartItem = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev => prev.map(i => i.id === itemId ? { ...i, quantity } : i));
  };

  const clearCart = () => {
    setCart([]);
  };

  const isAdmin = () => currentUser?.role === 'admin';

  const addCategory = (category) => {
    const newCategory = {
      id: Date.now(),
      ...category,
      items: []
    };
    setDb(prev => ({
      ...prev,
      categories: [...prev.categories, newCategory]
    }));
  };

  const updateCategory = (id, updates) => {
    setDb(prev => ({
      ...prev,
      categories: prev.categories.map(c => c.id === id ? { ...c, ...updates } : c)
    }));
  };

  const deleteCategory = (id) => {
    setDb(prev => ({
      ...prev,
      categories: prev.categories.filter(c => c.id !== id)
    }));
  };

  const addItem = (categoryId, item) => {
    const newItem = {
      id: Date.now(),
      ...item
    };
    setDb(prev => ({
      ...prev,
      categories: prev.categories.map(c => 
        c.id === categoryId 
          ? { ...c, items: [...c.items, newItem] }
          : c
      )
    }));
  };

  const updateItem = (categoryId, itemId, updates) => {
    setDb(prev => ({
      ...prev,
      categories: prev.categories.map(c => 
        c.id === categoryId 
          ? { ...c, items: c.items.map(i => i.id === itemId ? { ...i, ...updates } : i) }
          : c
      )
    }));
  };

  const deleteItem = (categoryId, itemId) => {
    setDb(prev => ({
      ...prev,
      categories: prev.categories.map(c => 
        c.id === categoryId 
          ? { ...c, items: c.items.filter(i => i.id !== itemId) }
          : c
      )
    }));
  };

  const value = {
    db,
    currentUser,
    cart,
    login,
    register,
    logout,
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart,
    isAdmin,
    addCategory,
    updateCategory,
    deleteCategory,
    addItem,
    updateItem,
    deleteItem
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
