import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ActivityIndicator, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { linkTo } from 'expo-router/build/global-state/routing';

// Definir el tipo para la pelota
type Pelota = {
  id: number;
  img: string;
  name: string;
  price: string;
  url: string;
  Categoría: string;
};

export default function DetallePelota() {
  const { itemID } = useLocalSearchParams(); // Obtener el ID desde la navegación
  const [pelota, setPelota] = useState<Pelota | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPelota = async (): Promise<void> => {
      try {
        const response = await fetch(`https://ignaciosanchezyuste.es/API_PADEL/pelotas/${itemID}`);

        // Verifica si hay respuesta
        if (!response) {
          throw new Error('No se recibió respuesta del servidor');
        }

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const json = await response.json();

        // DEBUG
        console.log('Respuesta JSON completa:', json);
        console.log('Tipo de json:', typeof json);

        // ✅ La API devuelve { ropa: {...} }
        if (json && json.pelota && json.pelota.id) {
          console.log('Pelota encontrada:', json.pelota.name);
          setPelota(json.pelota);
        } else {
          console.warn('Formato inesperado:', json);
          throw new Error('Formato de respuesta inesperado de la API');
        }
      } catch (err: any) {
        console.error('Error en fetchRopa:', err);
        setError(err?.message || 'Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    if (itemID) {
      fetchPelota();
    } else {
      setError('No se proporcionó ID del producto');
      setLoading(false);
    }
  }, [itemID]);

  const handleOpenUrl = () => {
    if (pelota?.url) {
      Linking.openURL(pelota.url);
    }
  };

  if (loading) {
    return (
      <SafeAreaProvider style={{ backgroundColor: '#25292e' }}>
        <SafeAreaView style={[styles.safeArea, styles.centerContent]}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.loadingText}>Cargando detalles...</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  if (error) {
    return (
      <SafeAreaProvider style={{ backgroundColor: '#25292e' }}>
        <SafeAreaView style={[styles.safeArea, styles.centerContent]}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  if (!pelota) {
    return (
      <SafeAreaProvider style={{ backgroundColor: '#25292e' }}>
        <SafeAreaView style={[styles.safeArea, styles.centerContent]}>
          <Text style={styles.errorText}>Producto no encontrado</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <>
    <Stack.Screen options={{ title: pelota.name }} />
    <SafeAreaProvider style={{ backgroundColor: '#25292e' }}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          {/* Imagen del producto */}
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: pelota.img }} 
              style={styles.image}
              resizeMode="contain"
            />
          </View>

          {/* Información del producto */}
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{pelota.name}</Text>
            <Text style={styles.price}>{pelota.price} €</Text>
            <Text style={styles.category}>Categoría: {pelota.Categoría}</Text>
            <Text style={styles.id}>ID: {pelota.id}</Text>
            
            {/* Botón para abrir URL */}
            <TouchableOpacity style={styles.button} onPress={handleOpenUrl}>
              <Text style={styles.buttonText}>Ver en tienda online</Text>
            </TouchableOpacity>
            
            {/* Botón para volver (opcional) */}
            <TouchableOpacity style={styles.backButton} onPress={() => linkTo('/')}>
              <Text style={styles.backButtonText}>Volver</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#25292e',
  },
  container: {
    padding: 20,
    alignItems: 'center',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  price: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0A7D00',
    marginBottom: 15,
    textAlign: 'center',
  },
  category: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  id: {
    fontSize: 14,
    color: '#999',
    marginBottom: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    backgroundColor: '#8E8E93',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 16,
    marginTop: 12,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 16,
    textAlign: 'center',
  },
});