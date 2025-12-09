import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Categoria } from './types';
import { Link } from 'expo-router';


// Definimos el tipo Props para el componente UserCard
type Props = {
  item: Categoria;
};
// Recibe un props con item dentro
const CategoriaCard = ({ item }: Props) => {
  return (
    //
    <Link href={`./${item.table_name}`} style={styles.card}>
      <View>
        <Text style={styles.title} numberOfLines={1}>{item.table_name}</Text>
      </View>
    </Link> 
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    textAlign: 'center',
    //overflow: 'hidden',
    elevation: 0,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    width: '10%',
    height:'auto', // ✅ Altura fija para uniformidad
    marginHorizontal: 1,
    padding: 10,
    paddingBottom: 0,
  },

  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#222',
    textAlign: 'center',
    height: 40,
  },
});

export default CategoriaCard;