import { View, Text, StyleSheet, FlatList, Image, Pressable, TouchableOpacity } from "react-native";
//style imports
import { Colors } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
//my imports
import MyText from "./MyText";

function renderWatchlistItem({ item }) {
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
              uri: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579",
            }}
          />
          <View style={{ flexShrink: 1 ,}}>
            <MyText isBold={true}>{item.ticker}</MyText>
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
          <MyText isBold={true} >${item.price}</MyText>
          <View style={{flexDirection:'row' ,alignItems:'center',justifyContent:'flex-end' }} >
          <Ionicons name="triangle" size={7} color={Colors.pink} />
          <MyText isBold={true} size={10} color={Colors.pink} >$0.23%</MyText>
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
