import { Link } from 'expo-router';
import { memo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { User } from './types';

type Props = {
  item: User;
};

const UserCard = ({ item }: Props) => {
  return (
    <Link
      href={{ pathname: `./Detalles/${item.Categoría}_Detail`, params: { itemID: item.id } }}
      asChild>
      <Pressable style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.img }} style={styles.image} resizeMode="contain" />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.price}>{item.price} €</Text>
        </View>
      </Pressable>
    </Link>
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
    flex: 1,
    marginBottom: 10,
  },
  imageContainer: {
    aspectRatio: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: '100%',
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

export default memo(UserCard);
