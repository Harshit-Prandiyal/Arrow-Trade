import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput,TouchableOpacity,Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MyText from "../components/MyText";
import { Colors } from "../constants/colors";
import { fetchBasicData } from "../util/basicData";
import { Ionicons } from "@expo/vector-icons";

const dummyData = [
  {
      "id": "bitcoin",
      "symbol": "btc",
      "name": "Bitcoin",
      "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
      "current_price": 29475.13,
      "price_change_percentage_24h": 0.95857
  },
  {
      "id": "tether",
      "symbol": "usdt",
      "name": "Tether",
      "image": "https://assets.coingecko.com/coins/images/325/large/Tether.png?1668148663",
      "current_price": 1,
      "price_change_percentage_24h": -0.01924
  },
  {
      "id": "solana",
      "symbol": "sol",
      "name": "Solana",
      "image": "https://assets.coingecko.com/coins/images/4128/large/solana.png?1640133422",
      "current_price": 25.17,
      "price_change_percentage_24h": 7.30701
  },
  {
    "id": "solana",
    "symbol": "sol",
    "name": "Solana",
    "image": "https://assets.coingecko.com/coins/images/4128/large/solana.png?1640133422",
    "current_price": 25.17,
    "price_change_percentage_24h": 7.30701
},
{
  "id": "solana",
  "symbol": "sol",
  "name": "Solana",
  "image": "https://assets.coingecko.com/coins/images/4128/large/solana.png?1640133422",
  "current_price": 25.17,
  "price_change_percentage_24h": 7.30701
},
{
  "id": "solana",
  "symbol": "sol",
  "name": "Solana",
  "image": "https://assets.coingecko.com/coins/images/4128/large/solana.png?1640133422",
  "current_price": 25.17,
  "price_change_percentage_24h": 7.30701
},
{
  "id": "solana",
  "symbol": "sol",
  "name": "Solana",
  "image": "https://assets.coingecko.com/coins/images/4128/large/solana.png?1640133422",
  "current_price": 25.17,
  "price_change_percentage_24h": 7.30701
},
{
  "id": "solana",
  "symbol": "sol",
  "name": "Solana",
  "image": "https://assets.coingecko.com/coins/images/4128/large/solana.png?1640133422",
  "current_price": 25.17,
  "price_change_percentage_24h": 7.30701
},{
  "id": "solana",
  "symbol": "sol",
  "name": "Solana",
  "image": "https://assets.coingecko.com/coins/images/4128/large/solana.png?1640133422",
  "current_price": 25.17,
  "price_change_percentage_24h": 7.30701
}
];
function DisplayStockData({ item ,onPress}) {
  const imageUrl = item.image ? item.image  :  "https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579";
    const wentUp = item.price_change_percentage_24h >= 0 ? true : false;
    const price_change_percentage_24h = item.price_change_percentage_24h > 0 ? item.price_change_percentage_24h : -1*item.price_change_percentage_24h;
  return (
    <TouchableOpacity onPress={()=>{onPress(item.id)}} >
      <View
      style={{
        height: 100,
        marginLeft: 20,
        marginRight: 20,
        width:'100%',
        borderRadius: 10,
        marginVertical: 5,
        padding: 5,
        backgroundColor: Colors.whitishgrey,
      }}
    >
      <View style={styles.innerContainer}>
        <View style={{ flexDirection: "row",width:'90%',flex:1}}>
          <Image
            style={{ ...styles.image, height: 40, width: 40,marginLeft:5, }}
            source={{
              uri: imageUrl,
            }}
          />
          <View style={{ flexShrink: 1 ,marginLeft:20}}>
            <MyText isBold={true}>{item.symbol.toUpperCase()}</MyText>
            <MyText
              isBold={true}
              color={Colors.lightgray}
              extrastyles={{ flexShrink: 1 }}
            >
              {item.name}
            </MyText>
          </View>
        </View>
        <View style={{alignItems:'center',justifyContent:'center'}} >
          <MyText isBold={true} >${item.current_price}</MyText>
          <View style={{flexDirection:'row' ,alignItems:'center',justifyContent:'flex-end' }} >
          <Ionicons name={wentUp?"caret-up-outline" :"caret-down-outline"} size={7} color={wentUp ? Colors.green69 :Colors.pink} />
          <MyText isBold={true} size={10} color={wentUp ? Colors.green69 :Colors.pink} >${price_change_percentage_24h.toFixed(2)}%</MyText>
          </View>
        </View>
      </View>
    </View>
    </TouchableOpacity>
  );
}
export default function ExchangeViewScreen() {
  const [id, setId] = useState("");
  const [portfolioData, setPortfolioData] = useState([]);
  const myPortfolio = [
    {
      id: "bitcoin",
    },
    {
      id:"tether",
    },
    {
      id:"solana",
    }
  ];

  useEffect(() => {
    // try{
    //   ( async ()=>{
    //     const data = await fetchBasicData(myPortfolio);
    //     if(data){
    //       setPortfolioData(data);
    //     }
    // } )()
    // }catch(err){
    //   console.log(err);
    // }
    setPortfolioData(dummyData);
  }, []); 
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ alignItems: "flex-start",width:'100%',marginLeft:20 }}>
        <MyText isBold={true} size={22}>
          Select Coins
        </MyText>
      </SafeAreaView>
      <View style={{width:'100%' , }} >
      <View style={{justifyContent:"center",alignContent:"center",paddingHorizontal:20,width:"100%"}} >
        <TextInput
          style={styles.input}
          onChangeText={setId}
          value={id}
          placeholder="Search company , coin..."
        />
      </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer} >
      { (portfolioData).map( (item,index)=>{
              const uniqueKey =  index || item.id ;
              return <DisplayStockData key={uniqueKey} item={item} onPress={()=> console.log('pressed')} />
          } )   }
      
      </ScrollView>
    </View>
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
  input: {
    height: 60,
    margin: 12,
    borderWidth: 2,
    borderRadius: 24,
    borderColor: Colors.purpleblue,
    padding: 10,
    paddingHorizontal: 20,
  },
  scrollContainer:{
    flexGrow:1,
    width:'90%',
    marginTop:30,
   
    alignItems:'center',
  },
  innerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
});
