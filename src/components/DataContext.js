import React, { createContext, useState } from 'react';

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);

  // Añadir un producto o actualizar la cantidad si ya existe
  const buyProducts = (product) => {
    const productRepeat = cart.find((item) => item.id === product.id);

    if (productRepeat) {
      setCart(cart.map((item) => (item.id === product.id ? { ...item, quanty: item.quanty + 1 } : item)));
    } else {
      setCart([...cart, { ...product, quanty: 1 }]);
    }
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Función para actualizar la cantidad de un producto
  const updateQuantity = (id, quanty) => {
    if (quanty <= 0) {
      removeFromCart(id);
    } else {
      setCart(cart.map((item) => (item.id === id ? { ...item, quanty } : item)));
    }
  };

  // Función para calcular el precio total
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quanty, 0);
  };

  return (
    <DataContext.Provider
      value={{
        cart,
        setCart,
        buyProducts,
        removeFromCart,
        updateQuantity,
        getTotalPrice,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
