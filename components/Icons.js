import { Gift, Gamepad2, Crown, Coins, Palette, Star, ShoppingCart } from 'lucide-react';

const iconMap = {
  Gift,
  Gamepad2,
  Crown,
  Coins,
  Palette,
  Star,
  ShoppingCart
};

export function getIcon(name) {
  const IconComponent = iconMap[name] || Gift;
  return IconComponent;
}

export function formatPrice(price) {
  return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
}
