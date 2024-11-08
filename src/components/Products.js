import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { DataContext } from './DataContext';

const Products = () => {
  const { buyProducts } = useContext(DataContext);

  // Estado para almacenar los productos obtenidos
  const [productos, setProductos] = useState([]);

  // Usamos useEffect para hacer la solicitud cuando el componente se monta
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Hacemos la solicitud a la API
        const response = await fetch('http://localhost:8080/Article?page=0&size=10&sortBy=name&ascending=true');
        const data = await response.json();

        // Extraemos los productos del JSON y actualizamos el estado
        setProductos(data.content);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []); // Este hook solo se ejecuta una vez cuando el componente se monta

  const handleBuyPress = (product) => {
    buyProducts(product);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>FOURMINDS STORE</Text>
      <FlatList
        data={productos}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            {/* Asegúrate de que la URL de la imagen esté completa */}
            {/* <Image source={{ uri: {item.image} }} style={styles.productImage} /> */}
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>Precio: {item.price} $</Text>
            <Text style={styles.productDescription}>{item.description}</Text>
            <Pressable style={styles.buyButton} onPress={() => handleBuyPress(item)}>
              <Text style={styles.buyButtonText}>Comprar</Text>
            </Pressable>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginEnd: 10,
    marginBottom: 12,
    textAlign: 'center',
  },
  productItem: {
    borderBottomWidth: 0,
    borderColor: '#ccc',
    paddingVertical: 18,
    alignItems: 'center',
  },
  productImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 8,
  },
  productName: {
    fontSize: 18,
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    color: 'green',
  },
  productDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  buyButton: {
    backgroundColor: 'orange',
    padding: 8,
    width: 150,
    marginTop: 8,
    borderRadius: 5,
  },
  buyButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Products;
