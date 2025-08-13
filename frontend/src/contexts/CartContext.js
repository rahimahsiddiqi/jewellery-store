import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

// Create session ID if it doesn't exist
const getSessionId = () => {
  let sessionId = localStorage.getItem('cartSessionId');
  if (!sessionId) {
    sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('cartSessionId', sessionId);
  }
  return sessionId;
};

// Set up axios defaults
const sessionId = getSessionId();
axios.defaults.headers.common['session-id'] = sessionId;

const CartContext = createContext();

const initialState = {
  items: [],
  subtotal: 0,
  shipping: 0,
  discount: 0,
  total: 0,
  couponCode: '',
  loading: false,
  error: null
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'CART_START':
      return { ...state, loading: true, error: null };
    
    case 'CART_SUCCESS':
      return { 
        ...state, 
        ...action.payload, 
        loading: false, 
        error: null 
      };
    
    case 'CART_FAIL':
      return { 
        ...state, 
        loading: false, 
        error: action.payload 
      };
    
    case 'ADD_ITEM':
      return { 
        ...state, 
        ...action.payload, 
        loading: false, 
        error: null 
      };
    
    case 'UPDATE_ITEM':
      return { 
        ...state, 
        ...action.payload, 
        loading: false, 
        error: null 
      };
    
    case 'REMOVE_ITEM':
      return { 
        ...state, 
        ...action.payload, 
        loading: false, 
        error: null 
      };
    
    case 'CLEAR_CART':
      return { 
        ...state, 
        items: [], 
        subtotal: 0, 
        shipping: 0, 
        discount: 0, 
        total: 0, 
        couponCode: '', 
        loading: false, 
        error: null 
      };
    
    case 'APPLY_COUPON':
      return { 
        ...state, 
        ...action.payload, 
        loading: false, 
        error: null 
      };
    
    case 'REMOVE_COUPON':
      return { 
        ...state, 
        ...action.payload, 
        loading: false, 
        error: null 
      };
    
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart on component mount
  useEffect(() => {
    loadCart();
  }, []);

  // Load cart from server
  const loadCart = async () => {
    dispatch({ type: 'CART_START' });
    try {
      const res = await axios.get('/api/cart');
      dispatch({ type: 'CART_SUCCESS', payload: res.data });
    } catch (error) {
      console.error('Load cart error:', error);
      dispatch({ type: 'CART_FAIL', payload: 'Failed to load cart' });
    }
  };

  // Add item to cart
  const addToCart = async (productId, quantity = 1, selectedOptions = {}) => {
    dispatch({ type: 'CART_START' });
    try {
      const res = await axios.post('/api/cart/add', {
        productId,
        quantity,
        selectedOptions
      });
      dispatch({ type: 'ADD_ITEM', payload: res.data });
      toast.success('Item added to cart!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add item to cart';
      dispatch({ type: 'CART_FAIL', payload: message });
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Update cart item quantity
  const updateCartItem = async (itemId, quantity, selectedOptions = {}) => {
    dispatch({ type: 'CART_START' });
    try {
      const res = await axios.put(`/api/cart/update/${itemId}`, {
        quantity,
        selectedOptions
      });
      dispatch({ type: 'UPDATE_ITEM', payload: res.data });
      toast.success('Cart updated!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update cart item';
      dispatch({ type: 'CART_FAIL', payload: message });
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    dispatch({ type: 'CART_START' });
    try {
      const res = await axios.delete(`/api/cart/remove/${itemId}`);
      dispatch({ type: 'REMOVE_ITEM', payload: res.data });
      toast.success('Item removed from cart!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to remove item from cart';
      dispatch({ type: 'CART_FAIL', payload: message });
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Clear cart
  const clearCart = async () => {
    dispatch({ type: 'CART_START' });
    try {
      await axios.delete('/api/cart/clear');
      dispatch({ type: 'CLEAR_CART' });
      toast.success('Cart cleared!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to clear cart';
      dispatch({ type: 'CART_FAIL', payload: message });
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Apply coupon code
  const applyCoupon = async (couponCode) => {
    dispatch({ type: 'CART_START' });
    try {
      const res = await axios.post('/api/cart/apply-coupon', { couponCode });
      dispatch({ type: 'APPLY_COUPON', payload: res.data });
      toast.success('Coupon applied successfully!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to apply coupon';
      dispatch({ type: 'CART_FAIL', payload: message });
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Remove coupon code
  const removeCoupon = async () => {
    dispatch({ type: 'CART_START' });
    try {
      const res = await axios.delete('/api/cart/remove-coupon');
      dispatch({ type: 'REMOVE_COUPON', payload: res.data });
      toast.success('Coupon removed!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to remove coupon';
      dispatch({ type: 'CART_FAIL', payload: message });
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Check if item is in cart
  const isInCart = (productId) => {
    return state.items.some(item => item.product._id === productId || item.product.id === productId);
  };

  // Get item quantity in cart
  const getItemQuantity = (productId) => {
    const item = state.items.find(item => item.product._id === productId || item.product.id === productId);
    return item ? item.quantity : 0;
  };

  // Get cart item count
  const getCartItemCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    ...state,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
    loadCart,
    isInCart,
    getItemQuantity,
    getCartItemCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 