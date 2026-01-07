import { CameraView, CameraType, useCameraPermissions, } from 'expo-camera';
import { take } from 'lodash-es';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { useRef } from 'react';
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';
export default function App() {
const cameraRef = useRef<CameraView>(null);
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<string | null>(null);
  const router = useRouter();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

const takePicture = async () => {
  if (cameraRef.current) {
    const photo = await cameraRef.current.takePictureAsync({
      quality: 1,
      base64: true,
    });
    setPhoto(photo.uri);
    router.replace(`./NewProduct?photo=${photo.uri}`);
  }}

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[ styles.cameraButton]} onPress={takePicture}>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 64,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: '100%',
    paddingHorizontal: 64,
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  cameraButton: {
    backgroundColor: '#ffffffff',
    borderRadius: 100,
    width: 70,
    height: 70,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
