import { CartAction, CartState } from '../../types';

export const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex((item) => item.product.id === product.id);

      if (existingItemIndex > -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
        return { items: updatedItems };
      }

      return {
        items: [...state.items, { product, quantity }],
      };
    }

    case 'REMOVE_ITEM': {
      const { productId } = action.payload;
      return {
        items: state.items.filter((item) => item.product.id !== productId),
      };
    }

    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;

      if (quantity <= 0) {
        return {
          items: state.items.filter((item) => item.product.id !== productId),
        };
      }

      const updatedItems = state.items.map((item) => (item.product.id === productId ? { ...item, quantity } : item));

      return { items: updatedItems };
    }

    case 'CLEAR_CART':
      return { items: [] };

    case 'LOAD_CART':
      return { items: action.payload.items };

    default:
      return state;
  }
};
