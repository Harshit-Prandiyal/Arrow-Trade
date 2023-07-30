//components imports
import { useState,useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//style imports
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
//my imports
import { Colors } from "../constants/colors";
import Portfolio from "../components/PortfolioItem";
import YourWatchList from "../components/YourWatchList";
import MyText from "../components/MyText";
import { handleGoToStockDetail ,handleGoToPortfolio,joinAndRemoveDuplicates,filterResponseByPortfolio} from "../controllers/Home-controller";
///api requests 
import { fetchBasicData } from "../util/basicData";
import { useSelector } from "react-redux";
export default function HomeViewScreen({navigation}) {
  const [portfolioData, setPortfolioData] = useState([]);
  const [watchlistData, setwatchlistData] = useState([]);
  const myPortfolio = useSelector((state) => state.MyPortfolio);
  const myWatchlist = useSelector((state) => state.MyWatchlist);
  const fetchIds = joinAndRemoveDuplicates(myPortfolio,myWatchlist);
  useEffect(() => {
    try{
      ( async ()=>{
        if(fetchIds.length>0){
          const data = await fetchBasicData(fetchIds);
          // console.log(data);
        if(data){
          const yourPortfolio = filterResponseByPortfolio(data,myPortfolio);
          // console.log('Your Portfolio ',yourPortfolio);
          setPortfolioData(yourPortfolio);
          const yourWatchlist = filterResponseByPortfolio(data,myWatchlist);
           setwatchlistData(yourWatchlist);
        }
        }
    } )()
    }catch(err){
      console.log(err);
    } 
  }, [myPortfolio]);
  const handlePortfolioPress = (id) => {
    handleGoToStockDetail(navigation, id);
  }
  const portfolioViewAllPressHandler = () => {
    handleGoToPortfolio(navigation);
  }
  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* top container with hello kits base starts */}
        <SafeAreaView>
          <View style={styles.header}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Image
                style={styles.image}
                source={require("../assets/images/avatar.png")}
              />
              <View>
                <MyText isBold={true} size={18} color={"black"}>
                  Hi, Kitsbase!
                </MyText>
                <MyText isBold={false} size={14} color={Colors.lightgray}>
                  Welcome to Tradebase
                </MyText>
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
        >
          <View style={{ margin: 20  }}>
            <View style={{marginBottom:6}} >
            <MyText isBold={true} color={Colors.lightgray}>Your Total Balance</MyText>
            </View>
            {/** total portfolio value and percent channge */}
            <View style={{ flexDirection: "row" ,alignItems:'flex-start'}}>
              <MyText isBold={true} color={"white"} size={26}>$12,031,082</MyText>
              <View
                style={{
                  borderRadius: 12,
                  height: 20,
                  backgroundColor: "white",
                  width: 58,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  marginLeft:10,
                  marginTop:6,
                }}
              >
                <View style={{ margin: 2, marginRight: 4 }}>
                  <Ionicons name="triangle" size={10} color={Colors.pink} />
                </View>
                <MyText color={Colors.pink} size={10} isBold={true}>53%</MyText>
              </View>
            </View>
            {/** total portfolio value change */}
            <View style={{marginTop:10}} >
            <MyText isBold={true} color={"white"} size={16} >$1208.24</MyText>
            </View>
            {/** corner rounded container with top performing stocks TODO */}
          </View>
        </LinearGradient>
        {/* PORTFOLIO */}
        <Portfolio data={portfolioData} onPress={handlePortfolioPress} viewAllPressHandler={portfolioViewAllPressHandler} />
        {/* Your Washlist */}
        <YourWatchList data={watchlistData} onPress={handlePortfolioPress} />
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
