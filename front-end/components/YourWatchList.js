import { View, Text, StyleSheet, FlatList, Image, Pressable, TouchableOpacity } from "react-native";
//style imports
import { Colors } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
//my imports
import MyText from "./MyText";

export function renderWatchlistItem({ item }) {
  const imageUrl = item.image ? item.image  :  "https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579";
  const wentUp = item.price_change_percentage_24h >= 0 ? true : false;
  const price_change_percentage_24h = item.price_change_percentage_24h > 0 ? item.price_change_percentage_24h : -1*item.price_change_percentage_24h;
    
  return (
    <TouchableOpacity>
      <View
      style={{
        height: 100,
        width: 230,
        marginBottom: 70,
        marginRight: 5,
        borderRadius: 10,
        margin:5,
        padding:5,
        backgroundColor: Colors.whitishgrey,
      }}
    >
      <View style={styles.innerContainer}>
        <View style={{ flexDirection: "row" }}>
          <Image
            style={{ ...styles.image, height: 40, width: 40,marginLeft:5, }}
            source={{
              uri:imageUrl,
            }}
          />
          <View style={{ flexShrink: 1 ,}}>
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
        <View  >
          <MyText isBold={true} >${item.current_price}</MyText>
          <View style={{flexDirection:'row' ,alignItems:'center',justifyContent:'flex-end' }} >
          <Ionicons name={wentUp?"caret-up-outline" :"caret-down-outline"} size={12} color={wentUp ? Colors.green69: Colors.pink} />
          <MyText isBold={true} size={10} color={wentUp ? Colors.green69: Colors.pink} >{price_change_percentage_24h.toFixed(2)}%</MyText>
          </View>
        </View>
      </View>
    </View>
    </TouchableOpacity>
  );
}

export default function YourWatchList({ data }) {
  return (
    <View
      style={{
        alignItems: "flex-start",
        width: "95%",
        marginBottom: 40,
        flex: 1,
      }}
    >
      <MyText isBold={true} size={18} color={"black"}>
        Your Watchlist
      </MyText>
      <FlatList
        data={data}
        renderItem={renderWatchlistItem}
        keyExtractor={(item) => item.id}
        horizontal={true}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    resizeMode: "contain",
    margin: 3,
    marginRight: 20,
  },
});
