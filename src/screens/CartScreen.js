import React, { useContext, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DataContext } from '../components/DataContext';

export default function CartScreen() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useContext(DataContext);

  const [hovered, setHovered] = useState(false); // Estado para controlar el hover en "Ir a pagar"

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      {/* Imagen del producto */}
      <Image source={{ uri: item.image }} style={styles.productImage} />

      {/* Detalles del producto */}
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>

        {/* Cantidad de productos con botones para incrementar y reducir */}
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => updateQuantity(item.id, item.quanty - 1)}>
            <Text style={styles.quantityButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quanty}</Text>
          <TouchableOpacity onPress={() => updateQuantity(item.id, item.quanty + 1)}>
            <Text style={styles.quantityButton}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Botón para eliminar el producto */}
      <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeButton}>
        <Text style={styles.removeButtonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Carrito de Compras</Text>

      {/* Lista de productos en el carrito */}
      <FlatList data={cart} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />

      {/* Total y botón para continuar */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${getTotalPrice()}</Text>
        <Pressable
          style={[
            styles.checkoutButton,
            hovered && styles.checkButtonHovered, // Aplica el estilo de aumento
          ]}
          onPress={() => alert('Continuar con la compra')}
          onMouseEnter={() => setHovered(true)} // Activa el hover en escritorio
          onMouseLeave={() => setHovered(false)} // Desactiva el hover en escritorio
          onPressIn={() => setHovered(true)} // Activa el efecto de aumento al presionar en móviles
          onPressOut={() => setHovered(false)} // Desactiva el efecto de aumento al soltar en móviles
        >
          <Text style={styles.checkoutButtonText}>Ir a pagar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: '#888',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityButton: {
    fontSize: 20,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  removeButton: {
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  totalContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'orange',
    borderRadius: 5,
    alignItems: 'center',
    transition: 'transform 0.2s ease', // Animación suave para web
  },
  checkButtonHovered: {
    transform: [{ scale: 1.1 }], // Efecto de aumento al hacer hover
  },
  checkoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
