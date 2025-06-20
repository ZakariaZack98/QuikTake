import { useState, useEffect } from 'react';

const useCart = () => {
  // Initialize cart state from localStorage if available
  const [cart, setCart] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        // Update quantity if item already exists
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item to cart
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Update item quantity in cart
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Clear the entire cart
  const clearCart = () => {
    setCart([]);
  };

  // Calculate total items in cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate total price of cart
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };
};

export default useCart;

//* USAGE EXAMPLE =================================
// import React from 'react';
// import useCart from './hooks/useCart';

// const ProductPage = ({ product }) => {
//   const { cart, addToCart, totalItems } = useCart();

//   const handleAddToCart = () => {
//     addToCart(product);
//     alert(`${product.name} added to cart! Total items: ${totalItems}`);
//   };

//   return (
//     <div>
//       <h2>{product.name}</h2>
//       <p>Price: ${product.price}</p>
//       <button onClick={handleAddToCart}>Add to Cart</button>
//       <p>Items in cart: {totalItems}</p>
//     </div>
//   );
// };

// export default ProductPage;