import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import ApiMochilas from './Fetch/FetchMochilas';

export default function Mochilas() {
return (
   <SafeAreaProvider style={{ backgroundColor: '#25292e', paddingTop: 50 }}>
     <SafeAreaView style={styles.safeArea}>
      <ApiMochilas />
     </SafeAreaView>
   </SafeAreaProvider>
);
}
const styles = StyleSheet.create({
  safeArea: {
      flex: 1,
      width: '100%',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },

});