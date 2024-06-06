import react from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import MyText from "../components/MyText";
import { Colors } from "../constants/colors";
import { registerUser } from "../util/auth";
import { useDispatch } from "react-redux";
import { setAuthenticated, setUser } from "../models/authSlice";
import Spinner from 'react-native-loading-spinner-overlay';

const validateRegister = (email, password, name) => {
  // us regex to validate email
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!email || !password || !name) {
    return false;
  }
  if (!emailRegex.test(email)) {
    return false;
  }
  if (password.length < 5) {
    return false;
  }
  return true;
};

export default function RegisterViewScreen() {
  const [email, setEmail] = react.useState("");
  const [password, setPassword] = react.useState("");
  const [name, setName] = react.useState("");
  const dispatch = useDispatch();
  // handler functions
  const handleRegisterPress = async () => {
    const isValid = validateRegister(email, password, name);
    console.log(email, password, isValid);
    if (!isValid) return;
    try {
      const { isAuthenticated, user } = await registerUser({
        email,
        password,
        name,
      });
      console.log(isAuthenticated, "auth status");
      if (isAuthenticated) {
        dispatch(
          setUser({
            _id: user._id,
            email: user.email,
            name: user.name,
            balance: user.balance,
            totalGain: user.totalGain,
            totalLoss: user.totalLoss,
          })
        );
        dispatch(setAuthenticated({ status: true }));
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ width: "90%", justifyContent: "flex-start" }}>
        <MyText isBold={true} size={34} color={Colors.headingBlackBlue}>
          Getting Started
        </MyText>
        <Text style={{ color: Colors.lightgray }}>
          create an account to continue!
        </Text>
      </View>
      <View
        style={{ width: "90%", justifyContent: "center", alignItems: "center" }}
      >
        <TextInput
          style={styles.input}
          placeholder="Full name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <TouchableOpacity
        onPress={handleRegisterPress}
        style={{
          backgroundColor: Colors.Darkblue,
          width: "90%",
          height: 60,
          marginTop: 24,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 24,
        }}
      >
        <MyText isBold={false} size={14} color="white">
          Register
        </MyText>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 60,
    width: "100%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "black",
    placeholderTextColor: Colors.lightgray,
    borderColor: "#F4F4F6",
    borderRadius: 24,
  },
});
