import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ActivityIndicator, ScrollView, Linking, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';

// Definir el tipo para el producto - ajustado para coincidir con la API
type Producto = {
  id?: number; // Opcional porque la API lo genera
  img: string;
  name: string;
  price: string;
  url: string;
  categoria: string; // Nota: en minúsculas para coincidir con la API
};

// URL base de la API
const API_BASE_URL = 'https://ignaciosanchezyuste.es/API_PADEL';

// Función para obtener la URL de la API según la categoría
const getApiUrl = (categoria: string): string => {
  const categoriaNormalizada = categoria.toLowerCase().trim();
  
  // Mapeo de categorías a endpoints
  const endpoints: Record<string, string> = {
    'accesorios': `${API_BASE_URL}/accesorios`,
    'mochilas': `${API_BASE_URL}/mochilas_paleteros`,
    'paleteros': `${API_BASE_URL}/mochilas_paleteros`,
    'mochilas_paleteros': `${API_BASE_URL}/mochilas_paleteros`,
    'ropa': `${API_BASE_URL}/ropa`,
    'pelotas': `${API_BASE_URL}/pelotas`,
    'zapatillas': `${API_BASE_URL}/zapatillas`,
    'palas': `${API_BASE_URL}/palas`,
  };
  
  return endpoints[categoriaNormalizada] || `${API_BASE_URL}/palas`;
};

export default function NewProduct() {
  const router = useRouter();
  
  // Estado inicial del producto
  const initialProductState: Producto = {
    img: '',
    name: '',
    price: '',
    url: '',
    categoria: 'palas' // Valor por defecto
  };

  const [producto, setProducto] = useState<Producto>(initialProductState);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Producto>>({});

  // Función para validar el formulario
  const validarFormulario = (): boolean => {
    const nuevosErrores: Partial<Producto> = {};

    if (!producto.name.trim()) {
      nuevosErrores.name = 'El nombre es requerido';
    }

    if (!producto.price.trim()) {
      nuevosErrores.price = 'El precio es requerido';
    } else if (isNaN(Number(producto.price.replace(',', '.')))) {
      nuevosErrores.price = 'El precio debe ser un número válido';
    }

    if (!producto.categoria.trim()) {
      nuevosErrores.categoria = 'La categoría es requerida';
    }

    setErrors(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async () => {
    if (!validarFormulario()) {
      Alert.alert('Error', 'Por favor, corrige los errores en el formulario');
      return;
    }

    setLoading(true);
    try {
      // Preparar datos para enviar - NO incluir id si es 0 o undefined
      const productoParaEnviar: any = {
        img: producto.img.trim(),
        name: producto.name.trim(),
        price: producto.price.trim(),
        url: producto.url.trim(),
        categoria: producto.categoria.trim()
      };

      // Solo incluir id si tiene valor

      const apiUrl = getApiUrl(producto.categoria);
      
      console.log('Enviando datos a:', apiUrl);
      console.log('Datos a enviar:', productoParaEnviar);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productoParaEnviar)
      });

      console.log('Respuesta status:', response.status);
      
      if (!response.ok) {
        // Intentar leer el mensaje de error de la respuesta
        const errorData = await response.json().catch(() => ({}));
        console.log('Error data:', errorData);
        throw new Error(`Error HTTP: ${response.status} - ${errorData.message || 'Error desconocido'}`);
      }

      const resultado = await response.json();
      console.log('Respuesta exitosa:', resultado);
      
      Alert.alert(
        '¡Éxito!',
        resultado.message || 'Producto añadido correctamente',
        [
          {
            text: 'OK',
            onPress: () => {
              // Limpiar formulario
              setProducto(initialProductState);
              // O puedes redirigir a otra pantalla
              // router.back();
            }
          }
        ]
      );
      
    } catch (error) {
      console.error('Error completo al añadir producto:', error);
      Alert.alert(
        'Error',
        //error.message || 'No se pudo añadir el producto. Verifica tu conexión o intenta más tarde.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Función para limpiar el formulario
  const handleLimpiar = () => {
    setProducto(initialProductState);
    setErrors({});
  };

  // Función para actualizar un campo específico
  const handleChange = (campo: keyof Producto, valor: string) => {
    setProducto(prev => ({
      ...prev,
      [campo]: valor
    }));
    
    // Limpiar error del campo al modificar
    if (errors[campo]) {
      setErrors(prev => ({
        ...prev,
        [campo]: undefined
      }));
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <Stack.Screen options={{ title: 'Añadir Producto' }} />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <Text style={styles.titulo}>Añadir Nuevo Producto</Text>
            
            {/* Campo: Nombre */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nombre del Producto *</Text>
              <TextInput
                style={[styles.input, errors.name && styles.inputError]}
                value={producto.name}
                onChangeText={(text) => handleChange('name', text)}
                placeholder="Ej: Pala Adidas Metalbone"
                placeholderTextColor="#999"
              />
              {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            </View>

            {/* Campo: Precio */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Precio *</Text>
              <TextInput
                style={[styles.input, errors.price && styles.inputError]}
                value={producto.price}
                onChangeText={(text) => handleChange('price', text)}
                placeholder="Ej: 299.99"
                placeholderTextColor="#999"
                keyboardType="decimal-pad"
              />
              {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}
            </View>

            {/* Campo: URL de la Imagen */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>URL de la Imagen *</Text>
              <TextInput
                style={[styles.input, errors.img && styles.inputError]}
                value={producto.img}
                onChangeText={(text) => handleChange('img', text)}
                placeholder="https://ejemplo.com/imagen.jpg"
                placeholderTextColor="#999"
                keyboardType="url"
                autoCapitalize="none"
              />
              {errors.img && <Text style={styles.errorText}>{errors.img}</Text>}
              {producto.img ? (
                <View style={styles.previewContainer}>
                  <Text style={styles.previewLabel}>Vista previa:</Text>
                  <Image 
                    source={{ uri: producto.img }} 
                    style={styles.imagePreview}
                    resizeMode="cover"
                    onError={() => console.log('Error cargando imagen')}
                  />
                </View>
              ) : null}
            </View>

            {/* Campo: URL del Producto */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>URL del Producto *</Text>
              <TextInput
                style={[styles.input, errors.url && styles.inputError]}
                value={producto.url}
                onChangeText={(text) => handleChange('url', text)}
                placeholder="https://tienda.com/producto"
                placeholderTextColor="#999"
                keyboardType="url"
                autoCapitalize="none"
              />
              {errors.url && <Text style={styles.errorText}>{errors.url}</Text>}
            </View>

           <View style={styles.inputGroup}>
  <Text style={styles.label}>Categoría *</Text>
  <View style={[styles.pickerContainer, errors.categoria && styles.inputError]}>
    <Picker
      selectedValue={producto.categoria}
      onValueChange={(itemValue) => handleChange('categoria', itemValue)}
      style={styles.picker}
      dropdownIconColor="#007AFF"
      mode="dropdown" // Para Android
    >
      <Picker.Item label="Selecciona una categoría" value="" />
      <Picker.Item label="Palas" value="pala" />
      <Picker.Item label="Zapatillas" value="zapatilla" />
      <Picker.Item label="Ropa" value="ropa" />
      <Picker.Item label="Pelotas" value="pelota" />
      <Picker.Item label="Accesorios" value="accesorio" />
      <Picker.Item label="Mochilas y Paleteros" value="mochila" />
    </Picker>
  </View>
  {errors.categoria && <Text style={styles.errorText}>{errors.categoria}</Text>}
</View>

            {/* Botones de acción */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.submitButton]}
                onPress={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Text style={styles.buttonText}>Añadir Producto</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.clearButton]}
                onPress={handleLimpiar}
                disabled={loading}
              >
                <Text style={styles.buttonText}>Limpiar Formulario</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.backButton]}
                onPress={() => router.back()}
                disabled={loading}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  pickerContainer: {
    backgroundColor: '#e0e0e0ff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden', // Para que el borde redondeado funcione
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#333',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#e0e0e0ff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  inputError: {
    borderColor: '#ff6b6b',
    borderWidth: 2,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 14,
    marginTop: 5,
  },
  helperText: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 5,
    fontStyle: 'italic',
  },
  previewContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  previewLabel: {
    color: '#333',
    fontSize: 14,
    marginBottom: 5,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  buttonContainer: {
    marginTop: 20,
    gap: 10,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    backgroundColor: '#ff5722',
  },
  clearButton: {
    backgroundColor: '#2196f3',
  },
  backButton: {
    backgroundColor: '#8E8E93',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});