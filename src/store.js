import { create } from 'zustand';

const useStore = create((set) => ({
  user: null,
  token: null,
  cart: {},
  
  login: (userData) => {
    localStorage.setItem('apnaMandiSession', JSON.stringify(userData));
    set({ user: userData, token: userData.token });
  },
  logout: () => {
    localStorage.removeItem('apnaMandiSession');
    set({ user: null, token: null, cart: {} });
  },
  checkUserSession: () => {
    try {
      const session = localStorage.getItem('apnaMandiSession');
      if (session) {
        const userData = JSON.parse(session);
        set({ user: userData, token: userData.token });
      }
    } catch (error) {
      console.error("Could not parse user session", error);
      localStorage.removeItem('apnaMandiSession');
    }
  },

  addToCart: (productId) => set((state) => ({
    cart: { ...state.cart, [productId]: (state.cart[productId] || 0) + 1 },
  })),
  removeFromCart: (productId) => set((state) => {
    const newCart = { ...state.cart };
    if (newCart[productId] > 1) {
      newCart[productId] -= 1;
    } else {
      delete newCart[productId];
    }
    return { cart: newCart };
  }),
  clearCart: () => set({ cart: {} }),
}));

export default useStore;
