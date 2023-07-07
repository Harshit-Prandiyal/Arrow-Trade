import { StyleSheet, Text, View, } from "react-native";
import { StatusBar } from "expo-status-bar";

import { NavigationContainer } from "@react-navigation/native";

import { useFonts } from "expo-font";

import { MyTabs } from "./components/MyTabs";




export default function App() {
  
  const [fontsLoaded] = useFonts({
    "Eudoxus-Sans-Bold": require("./assets/fonts/EudoxusSans-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Eudoxus-Sans-Bold",
  },
});
