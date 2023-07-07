import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {useFonts} from 'expo-font';
export default function App() {
  const [fontsLoaded] = useFonts({
    'Eudoxus-Sans-Bold': require('./assets/fonts/EudoxusSans-Bold.ttf'),
  });
  if(!fontsLoaded){
    return <View>
      <Text>Loading...</Text>
    </View>
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    fontFamily:'Eudoxus-Sans-Bold',
  },
});
