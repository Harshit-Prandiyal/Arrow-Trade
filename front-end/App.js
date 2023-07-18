import { StyleSheet, Text, View, } from "react-native";
import { StatusBar } from "expo-status-bar";

import { NavigationContainer } from "@react-navigation/native";


import { MyTabs } from "./components/MyTabs";




export default function App() {
  
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
});
