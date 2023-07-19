//components imports

import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

//style imports
import { Ionicons } from "@expo/vector-icons";
//my impoerts
import { Colors } from "../constants/colors";
import { FlatList } from "react-native";
import MyText from "./MyText";
const renderPortfolioItem = ({ item }) => {     
    const imageUrl = item.image ? item.image  :  "https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579";
    const wentUp = item.price_change_percentage_24h >= 0 ? true : false;
    const price_change_percentage_24h = item.price_change_percentage_24h > 0 ? item.price_change_percentage_24h : -1*item.price_change_percentage_24h;
    
    return (
      <TouchableOpacity>
      <View
        style={{
          height: 170,
          width: 170,
          backgroundColor: Colors.whitishgrey,
          margin: 5,
          borderRadius: 10,
          justifyContent:'space-around',
          alignItems:'flex-start',
          paddingVertical:20,
          paddingHorizontal:5,
        }}
      >
        <View style={{flexDirection:'row' }} >
        <Image
          style={{...styles.image,height:40,width:40,marginRight:5}}
          source={{
            uri: imageUrl,
          }}
        />
        <View style={{flexShrink: 1}} >
        <MyText isBold={true} >{item.symbol.toUpperCase()}</MyText>
        <MyText isBold={true} color={Colors.lightgray} extrastyles={{flexShrink: 1 }} >{item.name}</MyText>
        </View>
        </View>
        <View style={{marginLeft:10}}>
          
          <MyText isBold={true} >${item.current_price}</MyText>
          <View style={{borderRadius:12,height:20,backgroundColor:wentUp ? Colors.green69: Colors.pink,width:68,alignItems:'center',justifyContent:'center',flexDirection:'row'}} >
          <View style={{margin:2,marginRight:4}} >
          <Ionicons name={wentUp?"caret-up-outline" :"caret-down-outline"} size={12} color="white" />
          </View>
            <MyText isBold={true} color={"white"} size={12} >{price_change_percentage_24h.toFixed(2)}%</MyText>
          </View>
        </View>
      </View>
      </TouchableOpacity>
    );
  };
export default  function Portfolio({data}) {
    return (
      <View style={{ width: "95%" ,marginBottom:10}}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            marginBottom:10,
          }}
        >
          <MyText isBold={true} size={18} color={"black"} >Portfolio</MyText>
          <TouchableOpacity>
            <MyText isBold={true} size={16} color={Colors.pink} >View all</MyText>
          </TouchableOpacity>
        </View>
        <FlatList
          data={data}
          renderItem={renderPortfolioItem}
          keyExtractor={(item) => item.id}
          horizontal={true}
        />
      </View>
    );
  }
  const styles = StyleSheet.create({
    image: {
        resizeMode: "contain",
        margin: 3,
        marginRight: 20,
      },
  });