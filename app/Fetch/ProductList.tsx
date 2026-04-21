import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import UserCard from '../UserCard';
import { User } from '../types';

type Props = {
  endpoint: string;
  dataKey: string;
  title?: string;
  emptyLabel?: string;
};

const getColumnsForWidth = (width: number) => {
  if (width >= 1200) return 5;
  if (width >= 900) return 4;
  if (width >= 600) return 3;
  return 2;
};

const ProductList = ({ endpoint, dataKey, title, emptyLabel }: Props) => {
  const { width } = useWindowDimensions();
  const numColumns = useMemo(() => getColumnsForWidth(width), [width]);

  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>('');

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const json = await response.json();
      const items = json?.[dataKey];
      setData(Array.isArray(items) ? items : []);
    } catch (err: any) {
      setError(err?.message || 'Error al cargar los datos');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [endpoint, dataKey]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, [fetchData]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter((item) => item.name?.toLowerCase().includes(q));
  }, [data, query]);

  const renderItem = useCallback(
    ({ item }: { item: User }) => (
      <View style={[styles.cellWrapper, { flex: 1 / numColumns }]}>
        <UserCard item={item} />
      </View>
    ),
    [numColumns]
  );

  const keyExtractor = useCallback((item: User) => item.id.toString(), []);

  const ListHeader = useMemo(
    () => (
      <View style={styles.searchWrapper}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={`Buscar${title ? ` en ${title.toLowerCase()}` : ''}...`}
            placeholderTextColor="#999"
            value={query}
            onChangeText={setQuery}
            autoCorrect={false}
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
          {query.length > 0 && (
            <Pressable onPress={() => setQuery('')} hitSlop={10} style={styles.clearBtn}>
              <Ionicons name="close-circle" size={18} color="#888" />
            </Pressable>
          )}
        </View>
        {!loading && !error && (
          <Text style={styles.count}>
            {filtered.length} resultado{filtered.length === 1 ? '' : 's'}
          </Text>
        )}
      </View>
    ),
    [query, loading, error, filtered.length, title]
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Cargando{title ? ` ${title.toLowerCase()}` : ''}...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <Pressable onPress={onRefresh} style={styles.retryBtn}>
          <Text style={styles.retryText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <FlatList
      key={`cols-${numColumns}`}
      data={filtered}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      numColumns={numColumns}
      columnWrapperStyle={numColumns > 1 ? styles.columnWrapper : undefined}
      contentContainerStyle={styles.listContent}
      style={styles.flatList}
      ListHeaderComponent={ListHeader}
      ListEmptyComponent={
        <View style={styles.centered}>
          <Ionicons name="search-outline" size={40} color="#bbb" />
          <Text style={styles.emptyText}>
            {query ? 'Sin resultados para tu búsqueda' : emptyLabel || 'No hay productos disponibles'}
          </Text>
        </View>
      }
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      initialNumToRender={8}
      maxToRenderPerBatch={10}
      windowSize={7}
      removeClippedSubviews
      showsVerticalScrollIndicator
    />
  );
};

const styles = StyleSheet.create({
  flatList: {
    width: '100%',
    alignSelf: 'center',
  },
  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 24,
    paddingTop: 8,
  },
  columnWrapper: {
    gap: 10,
    marginBottom: 4,
  },
  cellWrapper: {
    maxWidth: '100%',
  },
  searchWrapper: {
    paddingVertical: 8,
    gap: 6,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#222',
    paddingVertical: 0,
  },
  clearBtn: {
    padding: 4,
  },
  count: {
    fontSize: 12,
    color: '#ccc',
    paddingLeft: 4,
  },
  centered: {
    flex: 1,
    minHeight: 200,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#ccc',
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 16,
    textAlign: 'center',
  },
  emptyText: {
    marginTop: 12,
    fontSize: 15,
    color: '#aaa',
    textAlign: 'center',
  },
  retryBtn: {
    marginTop: 14,
    backgroundColor: '#007AFF',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default ProductList;
