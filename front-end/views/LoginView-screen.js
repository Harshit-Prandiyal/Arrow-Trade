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
import { logUserIn } from "../util/auth";
import { useDispatch } from "react-redux";
import { setAuthenticated, setUser } from "../models/authSlice";
import { setPortfolio } from "../models/PortfolioSlice";
import { setWatchlist } from "../models/WatchlistSlice";
import Spinner from "react-native-loading-spinner-overlay";
import Toast from 'react-native-toast-message'
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warn: ...']);
const validateLogin = (email, password) => {
  // us regex to validate email
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!email || !password) {
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

export default function LoginViewScreen({ navigation }) {
  const [email, setEmail] = react.useState("");
  const [password, setPassword] = react.useState("");
  const [loading, setLoading] = react.useState(false);
  const dispatch = useDispatch();
  const handleLoginPress = async () => {
    const isValid = validateLogin(email, password);
    if (!isValid) return;
    try {
      setLoading(true);
      const res = await logUserIn(email, password);
      setLoading(false);
      if (!res) return;
      const { isAuthenticated, user } = res;
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
        dispatch(setPortfolio(user.portfolio));
        dispatch(setWatchlist(user.watchlist));
        dispatch(setAuthenticated({ status: true }));
        const str = `You have logged in as ${user.name}`;
        Toast.show({
          type: 'success',
          text1: 'Successful Log In',
          text2: str
        });
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during login:", error);
    }
  };
  const handleSignupPress = () => {
    navigation.navigate("RegisterScreen");
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
      <Spinner visible={loading} />
      <View
        style={{ width: "90%", justifyContent: "flex-start", marginBottom: 15 }}
      >
        <MyText isBold={true} size={34} color={Colors.headingBlackBlue}>
          Let's Sign You In
        </MyText>
        <Text style={{ color: Colors.lightgray }}>
          Welcome back, you've been missed!
        </Text>
      </View>
      <View
        style={{ width: "90%", justifyContent: "center", alignItems: "center" }}
      >
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
      <View style={{ width: "100%", alignItems: "center", marginTop: 24 }}>
        <TouchableOpacity
          onPress={handleLoginPress}
          style={{
            backgroundColor: Colors.Darkblue,
            width: "90%",
            height: 60,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 24,
          }}
        >
          <Text style={{ color: "white" }}>Login</Text>
        </TouchableOpacity>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 5,
          }}
        >
          <MyText size={14} color={Colors.lightgray} style={{ marginTop: 10 }}>
            Don't have an account?{"  "}
          </MyText>
          <TouchableOpacity onPress={handleSignupPress}>
            <MyText
              size={14}
              color={Colors.pink}
              style={{ marginTop: 10, marginLeft: 5 }}
            >
              Signup
            </MyText>
          </TouchableOpacity>
        </View>
      </View>
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
