import { useContext } from 'react';
import { CartContextType } from '../types/cart';
import { CartContext } from '../context';

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
