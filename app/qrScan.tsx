import { CameraView } from "expo-camera";
import { Linking, Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function QrScan() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {Platform.OS === "android" && <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />}
      
      {/* Botón de regreso en la esquina superior izquierda */}
      <View style={styles.header}>
        <Link href="/" style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
          <Text style={styles.backButtonText}>Go Back</Text>
        </Link>
      </View>

      {/* Vista de la cámara ocupando toda la pantalla */}
      <CameraView
        style={styles.camera}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ['qr']
        }}
        onBarcodeScanned={({ data }) => {
          console.log(data);
          if (data.startsWith("p-")) {
            router.replace(`./Detalles/pala_Detail?itemID=${data.slice(2)}`);
          }
          if (data.startsWith("pe-")) {
            router.replace(`./Detalles/pelota_Detail?itemID=${data.slice(3)}`);
          }
          if (data.startsWith("r-")) {
            router.replace(`./Detalles/ropa_Detail?itemID=${data.slice(2)}`);
          }
          if (data.startsWith("m-")) {
            router.replace(`./Detalles/mochila_Detail?itemID=${data.slice(2)}`);
          }
          if (data.startsWith("a-")) {
            router.replace(`./Detalles/accesorio_Detail?itemID=${data.slice(2)}`);
          }
          if (data.startsWith("z-")) {
            router.replace(`./Detalles/zapatilla_Detail?itemID=${data.slice(2)}`);
          }
        }}
      />

      {/* Overlay para mejor UX */}
      <View style={styles.overlay}>
        {/* Marco para el área de escaneo */}
        <View style={styles.scanFrame}>
          <View style={styles.cornerTL} />
          <View style={styles.cornerTR} />
          <View style={styles.cornerBL} />
          <View style={styles.cornerBR} />
        </View>
        
        {/* Instrucciones */}
        <Text style={styles.instructions}>
          Apunta al código QR para escanear
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : (StatusBar.currentHeight ?? 0) + 10,
    left: 16,
    zIndex: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    gap: 8,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  scanFrame: {
    width: 250,
    height: 250,
    marginBottom: 40,
    position: 'relative',
  },
  cornerTL: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 30,
    height: 30,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: '#dbdbdbff',
    opacity: 0.8,
  },
  cornerTR: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 30,
    height: 30,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: '#dbdbdbff',
    opacity: 0.8,
  },
  cornerBL: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 30,
    height: 30,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: '#dbdbdbff',
    opacity: 0.8,
  },
  cornerBR: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: '#dbdbdbff',
    opacity: 0.8,
  },
  instructions: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 20,
  },
});