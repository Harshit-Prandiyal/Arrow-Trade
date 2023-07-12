//components imports
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, Image, TouchableOpacity,ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//style imports
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
//my impoerts
import { Colors } from "../constants/colors";
import Portfolio from "../components/PortfolioItem";
import YourWatchList from "../components/YourWatchList";
const portfolioData = [
  {
    id: 1,
    ticker: "FB",
    name: "Facebook, Inc",
    price: 365.51,
    profit: 0.59,
  },
  {
    id: 2,
    ticker: "AAPL",
    name: "Apple, Inc",
    price: 149.62,
    profit: 0.38,
  },
  {
    id: 3,
    ticker: "AMZN",
    name: "Amazon, Inc",
    price: 400.31,
    profit: 100,
  },
  {
    id: 4,
    ticker: "AMZN",
    name: "Amazon, Inc",
    price: 400.31,
    profit: 100,
  },
  {
    id: 5,
    ticker: "AMZN",
    name: "Amazon, Inc",
    price: 400.31,
    profit: 100,
  },
];


export default function HomeViewScreen() {
  const [fontsLoaded] = useFonts({
    "Eudoxus-Sans-Bold": require("../assets/fonts/EudoxusSans-Bold.ttf"),
    "Eudoxus-Sans-Regular": require("../assets/fonts/EudoxusSans-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* top container with hello kits base starts */}
        <SafeAreaView>
        <View style={styles.header}>
          <View style={{ flex:1,flexDirection: "row", alignItems: "center",justifyContent:'flex-start' }}>
            <Image
              style={styles.image}
              source={require("../assets/images/avatar.png")}
            />
            <View  >
              <Text style={{ fontFamily: "Eudoxus-Sans-Bold", fontSize: 18 }}>
                Hi, Kitsbase!
              </Text>
              <Text
                style={{
                  fontFamily: "Eudoxus-Sans-Regular",
                  color: Colors.lightgray,
                }}
              >
                Welcome to Tradebase
              </Text>
            </View>
          </View>
          <Ionicons name="grid-outline" size={24} color="black" />
        </View>
        </SafeAreaView>
        {/* top container with hello kits base ends */}
        <LinearGradient
          // Button Linear Gradient
          //pink is not pink from colors as opacity is 0.4 not 1, darkblue is same
          colors={["#3500d4", "#f61c7a66"]}
          style={styles.card}
        ></LinearGradient>
        {/* PORTFOLIO */}
        <Portfolio data={portfolioData}/>
        {/* Your Washlist */}
        <YourWatchList data={portfolioData} />
      </ScrollView>
    
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "95%",
    padding: 5,

  },

  image: {
    resizeMode: "contain",
    margin: 3,
    marginRight: 20,
  },
  card: {
    height: 200,
    width: "95%",
    borderRadius: 24,
    margin: 25,
  },
  title: {
    fontFamily: "Eudoxus-Sans-Bold",
  },
});
