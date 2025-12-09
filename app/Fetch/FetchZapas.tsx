import { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import UserCard from '../UserCard';
import { User } from '../types';


const ApiZapas = () => {

  const { width } = Dimensions.get('window');

  // Definir cuántas columnas mostrar según el ancho

  // ✅ Estados correctamente definidos
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener datos de la API
  const fetchData = async (): Promise<void> => {
    try {
      const response = await fetch('https://ignaciosanchezyuste.es/API_PADEL/zapatillas');

      // Verifica si hay respuesta
      if (!response) {
        throw new Error('No se recibió respuesta del servidor');
      }

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const json = await response.json();

      // ✅ Accede a la propiedad "zapatillas"
      if (json && json.zapatillas && Array.isArray(json.zapatillas)) {
        console.log('Número de zapatillas:', json.zapatillas.length);
        setData(json.zapatillas);
      } else {
        console.warn('Formato inesperado:', json);
        setData(json.zapatillas);
      }
    } catch (err: any) {
      console.error('Error en fetchData:', err);
      setError(err?.message || 'Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  // Llamada a la función fetchData al montar el componente
  useEffect(() => {
    fetchData();
  }, []);

  // Renderizado condicional basado en el estado loading
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Cargando palas...</Text>
      </View>
    );
  }

  // Renderizado condicional basado en el estado error
  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  // DEBUG: Ver datos antes de renderizar
  console.log('Datos listos para renderizar:', data.length, 'items');

  // Si no hay datos
  if (data.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No se encontraron palas</Text>
      </View>
    );
  }

  // Renderizado de la lista de usuarios
  // En el return de ApiExample.tsx, reemplaza el FlatList actual con:
  
    return (<FlatList
      data={data}
      renderItem={({ item }) => <UserCard item={item} />}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContainer2}
      showsVerticalScrollIndicator={true}
      style={[styles.flatList, {paddingHorizontal: '5%'}]} 
    />
    );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  listContainer: {
    paddingHorizontal: 8, // ✅ Cambiado: padding horizontal reducido
    paddingVertical: 10,
  },
  listContainer2: {
    paddingVertical: 16,
    paddingHorizontal: 0,
    justifyContent: 'center',
  },
  columnWrapper: {
    justifyContent: 'space-evenly',
    marginBottom: 15,
    paddingHorizontal: 4, // ✅ Añadido: padding interno para columnas
  },
  flatList: { // ✅ Añadido: estilo para el FlatList
    width: '100%',
    alignSelf: 'center',
    height: 'auto',
     // ✅ Centra el FlatList
  },
});

export default ApiZapas;