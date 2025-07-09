import React, { useReducer, ReactNode, useMemo, useCallback } from 'react';
import { message } from 'antd';

import { cartReducer } from './cartReducer';
import { CartContextType, initialCartState, Product } from '../../types';
import { CartContext } from './CartContext';

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  const [messageApi, contextHolder] = message.useMessage();

  const totalPrice = useMemo(() => {
    return state.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [state.items]);

  const totalItems = useMemo(() => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  }, [state.items]);

  const addItem = useCallback(
    (product: Product, quantity: number = 1) => {
      dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
      messageApi.success(`${product.name} added to cart!`);
    },
    [messageApi]
  );

  const removeItem = useCallback(
    (productId: string) => {
      dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
      messageApi.success('Item removed from cart');
    },
    [messageApi]
  );

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
    messageApi.success('Cart cleared');
  }, [messageApi]);

  const getTotalPrice = useCallback(() => totalPrice, [totalPrice]);
  const getTotalItems = useCallback(() => totalItems, [totalItems]);

  const value: CartContextType = useMemo(
    () => ({
      items: state.items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems,
    }),
    [state.items, addItem, removeItem, updateQuantity, clearCart, getTotalPrice, getTotalItems]
  );

  return (
    <CartContext.Provider value={value}>
      {contextHolder}
      {children}
    </CartContext.Provider>
  );
};
