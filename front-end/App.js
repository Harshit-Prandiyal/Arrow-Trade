import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { NavigationContainer } from "@react-navigation/native";
import { store } from "./models/store";

import { MyTabs } from "./components/MyTabs";
import AuthStackNavigator from "./components/authStack";
import { Provider } from "react-redux";
import { useSelector } from "react-redux";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { Colors } from "./constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { LogBox } from "react-native";
LogBox.ignoreAllLogs();
const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#83c886' }}
      contentContainerStyle={{ paddingHorizontal: 15 ,backgroundColor:'#e7f4e8' }}
      text1Style={{
        fontSize: 16,
        fontWeight: "500",
      }}
      text2Style={{
        fontSize: 14,
      }}
      renderLeadingIcon={() => (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: '#e7f4e8',
            paddingLeft:10,
          }}
        >
          <MaterialIcons size={30} color={"#83c886"} name={"check-circle"} />
        </View>
      )}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: "#ff8a64" }}
      contentContainerStyle={{
        backgroundColor: "#ffe8e1",
        paddingHorizontal: 15,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: "500",
      }}
      text2Style={{
        fontSize: 14,
      }}
      renderLeadingIcon={() => (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#ffe8e1",
            paddingLeft:10,
          }}
        >
          <MaterialIcons size={30} color={"#ff8a64"} name={"error"} />
        </View>
      )}
    />
  ),
  customToast: ({ text1, props }) => (
    <View
      style={{ height: 60, width: "100%", backgroundColor: Colors.green69 }}
    >
      <Text>{text1}</Text>
    </View>
  ),
};
const Navigator = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <NavigationContainer>
      {isAuthenticated ? <MyTabs /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};
export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <Provider store={store}>
        <Navigator />
        <Toast config={toastConfig} />
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
