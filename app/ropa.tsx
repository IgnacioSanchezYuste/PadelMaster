import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";




import Apiropa from './Fetch/FetchRopa';




export default function ropa() {
return (
   <SafeAreaProvider style={{ backgroundColor: '#25292e', paddingTop: 20 }}>
     <SafeAreaView style={styles.safeArea}>
       <Apiropa />
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