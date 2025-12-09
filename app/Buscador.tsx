import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native';
import { debounce } from 'lodash-es';

const SearchPalas = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<Pala[]>([]);
  const [loading, setLoading] = useState(false);

  // Búsqueda con debounce
interface Pala {
    id: number;
    name: string;
    marca: string;
    modelo: string;
    price?: number;
}

const debouncedSearch = useCallback(
    debounce(async (query: string): Promise<void> => {
        if (query.trim() === '') {
            setResults([]);
            return;
        }
        
        setLoading(true);
        try {
            const response = await fetch(
                `https://ignaciosanchezyuste.es/API_PADEL/palas/search?q=${encodeURIComponent(query)}`
            );
            const data: Pala[] = await response.json();
            setResults(data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    }, 500),
    []
);

  useEffect(() => {
    debouncedSearch(search);
    
    // Limpiar debounce al desmontar
    return () => {
      debouncedSearch.cancel();
    };
  }, [search]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar pala por name, marca o modelo..."
        value={search}
        onChangeText={setSearch}
      />
      
      <FlatList
        data={results}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <View style={styles.cardDetails}>
              <Text style={styles.cardMarca}>{item.marca}</Text>
              <Text style={styles.cardModelo}>{item.modelo}</Text>
            </View>
            {item.price && (
              <Text style={styles.cardPrecio}>${item.price}</Text>
            )}
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {loading ? 'Buscando...' : 'No se encontraron palas'}
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    margin: 10,
    backgroundColor: '#fff',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    margin: 16,
    fontSize: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    margin: 16  ,
    backgroundColor: '#f9f9f9',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardDetails: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  cardMarca: {
    fontSize: 14,
    color: '#666',
    marginRight: 16,
  },
  cardModelo: {
    fontSize: 14,
    color: '#666',
  },
  cardPrecio: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2e7d32',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 24,
  },
});

export default SearchPalas;