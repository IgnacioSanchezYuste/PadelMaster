import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import ApiZapas from './Fetch/FetchZapas';



export default function Zapatillas() {
return (
   <SafeAreaProvider style={{ backgroundColor: '#25292e', paddingTop: 50 }}>
     <SafeAreaView style={styles.safeArea}>
      <ApiZapas />
       
     </SafeAreaView>
   </SafeAreaProvider>
);
}
const styles = StyleSheet.create({
  safeArea: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },

});