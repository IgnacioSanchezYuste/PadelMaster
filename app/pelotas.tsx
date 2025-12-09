import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";



import ApiPelotas from './Fetch/FetchPelotas';




export default function Pelotas() {
return (
   <SafeAreaProvider style={{ backgroundColor: '#25292e', paddingTop: 20 }}>
     <SafeAreaView style={styles.safeArea}>
       <ApiPelotas />
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