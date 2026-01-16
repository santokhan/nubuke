"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const initCart = () => {
      try {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error("Cart hydration failed:", error);
      } finally {
        setTimeout(() => {
          setIsClient(true);
        }, 0);
      }
    };

    initCart();
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isClient]);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const cartTotal = cartItems.reduce(
    (acc, item) => acc + Number(item.price || 0) * item.qty,
    0
  );

  const updateQty = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };

  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  if (!isClient) return null;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount: cartItems.reduce((acc, item) => acc + item.qty, 0),
        cartTotal,
        isCartOpen,
        toggleCart,
        updateQty,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);