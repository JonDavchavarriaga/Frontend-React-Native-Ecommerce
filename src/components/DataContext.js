import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [token, setToken] = useState(null);

  // Cargar el token de AsyncStorage al iniciar la app
  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('jwtToken');
        if (storedToken) {
          setToken(storedToken);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error al cargar el token', error);
      }
    };
    loadToken();
  }, []);

  // Eliminar el token y cerrar sesión
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('jwtToken');
      setToken(null);
      setIsLoggedIn(false);
      setCart([]); // Opcional: limpiar el carrito al cerrar sesión
    } catch (error) {
      console.error('Error al eliminar el token', error);
    }
  };

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
        logout,
        token, // Exporta el token si lo necesitas en otros componentes
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
