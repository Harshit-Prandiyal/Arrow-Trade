import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginViewScreen from "../views/LoginView-screen";
import RegisterViewScreen from "../views/RegisterView-screen";

const Stack = createNativeStackNavigator();
function AuthStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true ,
      headerStyle: {
      backgroundColor: '#fff',
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
      },
      }}>
      <Stack.Screen name="LoginScreen" component={LoginViewScreen} options={{headerShown:false}} />
      <Stack.Screen name="RegisterScreen" component={RegisterViewScreen} options={{headerShown:false}} />
    </Stack.Navigator>
  );
}
export default AuthStackNavigator;