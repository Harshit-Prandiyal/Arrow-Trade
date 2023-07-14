//components imports

import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

//style imports
import { Ionicons } from "@expo/vector-icons";
//my impoerts
import { Colors } from "../constants/colors";
import { FlatList } from "react-native";
import MyText from "./MyText";
const renderPortfolioItem = ({ item }) => {     
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
          style={{...styles.image,height:40,marginRight:5}}
          source={require("../assets/images/avatar.png")}
        />
        <View style={{flexShrink: 1}} >
        <MyText isBold={true} >{item.ticker}</MyText>
        <MyText isBold={true} color={Colors.lightgray} extrastyles={{flexShrink: 1 }} >{item.name}</MyText>
        </View>
        </View>
        <View style={{marginLeft:10}}>
          
          <MyText isBold={true} >${item.price}</MyText>
          <View style={{borderRadius:12,height:20,backgroundColor:Colors.pink,width:65,alignItems:'center',justifyContent:'center',flexDirection:'row'}} >
          <View style={{margin:2,marginRight:4}} >
          <Ionicons name="triangle" size={7} color="white" />
          </View>
            <MyText isBold={true} color={"white"} size={12} >{item.profit}%</MyText>
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