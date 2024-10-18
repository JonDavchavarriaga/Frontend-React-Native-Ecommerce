import React, { useContext } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { DataContext } from './DataContext';

const Products = () => {
  const { buyProducts } = useContext(DataContext);
  const productos = [
    {
      id: 1,
      productName: 'Iphone 11',
      price: 699,
      img: 'https://www.pngarts.com/files/8/Apple-iPhone-11-PNG-Image.png',
    },
    {
      id: 2,
      productName: 'Samsung Galaxy S21',
      price: 799,
      img: 'https://images.samsung.com/is/image/samsung/p6pim/mx/galaxy-s21/gallery/mx-galaxy-s21-5g-g991-sm-g991bzvlltm-368339682?$624_624_PNG$',
    },
    {
      id: 3,
      productName: 'Sony 4K TV',
      price: 1200,
      img: 'https://sony.scene7.com/is/image/sonyglobalsolutions/TVFY23_UE_Primary_image?$mediaCarouselSmall$&fmt=png-alpha',
    },
    {
      id: 4,
      productName: 'MacBook Pro',
      price: 1500,
      img: 'https://atlas-content-cdn.pixelsquid.com/assets_v2/246/2461903618920420852/previews/G03-200x200.jpg',
    },
    {
      id: 5,
      productName: 'Dell XPS 13',
      price: 999,
      img: 'https://i.blogs.es/0e6ccc/dell-xps-12-1/1366_2000.png',
    },
    {
      id: 6,
      productName: 'Apple Watch Series 6',
      price: 399,
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFD3iHNU_6X_K-Lpetwf22Sz1CfaJI8FgB4g&s',
    },
  ];

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
            <Image source={{ uri: item.img }} style={styles.productImage} />
            <Text style={styles.productName}>{item.productName}</Text>
            <Text style={styles.productPrice}> Precio: {item.price} $</Text>
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
