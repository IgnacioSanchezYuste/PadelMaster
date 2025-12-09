import { useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const isPermissionGranted = Boolean(permission?.granted);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      
      <View style={styles.content}>
        {/* Icono o logo */}
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <Ionicons name="scan" size={48} color="#6366f1" />
          </View>
        </View>

        {/* Texto principal */}
        <Text style={styles.title}>QR Code Scanner</Text>
        <Text style={styles.subtitle}>
          Escanea códigos QR con tu cámara para ver los detalles del artículo asociado.
        </Text>

        {/* Estado del permiso */}
        <View style={styles.permissionStatus}>
          <View style={[
            styles.statusIndicator,
            { backgroundColor: isPermissionGranted ? '#10b981' : '#ef4444' }
          ]} />
          <Text style={styles.statusText}>
            {isPermissionGranted ? 'Permiso concedido' : 'Permiso requerido'}
          </Text>
        </View>

        {/* Botones */}
        <View style={styles.buttonContainer}>
          {!isPermissionGranted && (
            <Pressable
              style={({ pressed }) => [
                styles.button,
                styles.permissionButton,
                pressed && styles.buttonPressed
              ]}
              onPress={requestPermission}
            >
              <Ionicons name="camera" size={20} color="white" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Conceder Permiso</Text>
            </Pressable>
          )}

          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.scanButton,
              (!isPermissionGranted && styles.buttonDisabled),
              pressed && styles.buttonPressed
            ]}
            onPress={() => router.replace("../qrScan")}
            disabled={!isPermissionGranted}
          >
            <Ionicons name="scan-outline" size={22} color="white" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>
              {isPermissionGranted ? 'Escanear Código' : 'Esperando permiso...'}
            </Text>
          </Pressable>
        </View>

        {/* Información adicional */}
        <View style={styles.infoBox}>
          <Ionicons name="information-circle" size={18} color="#6b7280" />
          <Text style={styles.infoText}>
            Para escanear códigos QR, necesitamos acceso a tu cámara
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  safeArea: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  iconContainer: {
    marginBottom: 32,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  permissionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
    marginBottom: 32,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',     
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  permissionButton: {
    backgroundColor: '#6366f1',
  },
  scanButton: {
    backgroundColor: '#10b981',
  },
  buttonDisabled: {
    backgroundColor: '#9ca3af',
    opacity: 0.7,
  },
  buttonPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    width: '100%',
  },
  infoText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 10,
    flex: 1,
    lineHeight: 20,
  },
});