import React, { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const localCart = localStorage.getItem('cart');
    return localCart ? JSON.parse(localCart) : [];
  });

  const [count, setCount] = useState(() => {
    const localCart = localStorage.getItem('cart');
    return localCart ? JSON.parse(localCart).reduce((acc, item) => acc + item.quantity, 0) : 0;
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setCount(prevCount => prevCount + 1);
  };

  const updateQuantity = (id, value) => {
    setCart((prevCart) =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + value } : item
      )
    );
  };

  const removeCart = (id) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== id));
    setCount(prevCount => prevCount - 1);
  };

  const value = {
    cart,
    addCart,
    updateQuantity,
    removeCart,
    count,
    setCart,
    setCount
  };
  return <CartContext.Provider value={value}>
    {children}
  </CartContext.Provider>;
}

export { CartProvider, CartContext };
