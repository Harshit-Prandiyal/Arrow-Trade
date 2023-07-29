import { StyleSheet, Text, View, } from "react-native";
import { StatusBar } from "expo-status-bar";

import { NavigationContainer } from "@react-navigation/native";
import { store } from "./models/store";

import { MyTabs } from "./components/MyTabs";
import { Provider } from "react-redux";




export default function App() {
  
  return (
    <>
      <StatusBar style="dark" />
      <Provider store={store}>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
      </Provider>
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
