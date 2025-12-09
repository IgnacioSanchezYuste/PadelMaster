import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { User } from './types';


// Definimos el tipo Props para el componente UserCard
type Props = {
  item: User;
};
// Recibe un props con item dentro
const UserCard = ({ item }: Props) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        {/* ✅ Contenedor para la imagen */}
        <Image 
          source={{ uri: item.img }} 
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.price}>{item.price} €</Text>
      </View>
    </View> 
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    width: '22%',
    height: 'auto', // ✅ Altura fija para uniformidad
    marginHorizontal: 1,
    marginBottom: 15,
  },
  imageContainer: {
    aspectRatio: 1, // ✅ Mantiene relación 2:1 (rectángulo)
    width: '100%',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  
  
  image: {
    width: '100%',
    height: '100%',
    margin: 0,
  },

  infoContainer: {
    padding: 10,
    minHeight: 80,
  },

  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#222',
    textAlign: 'center',
    marginBottom: 8,
    height: 40,
  },

  price: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0A7D00',
    textAlign: 'center',
  },
});

export default UserCard;