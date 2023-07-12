//components imports

import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

//style imports
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
//my impoerts
import { Colors } from "../constants/colors";
import { FlatList } from "react-native";

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
        <Text style={{fontFamily: "Eudoxus-Sans-Bold"}} >{item.ticker}</Text>
        <Text style={{fontFamily: "Eudoxus-Sans-Bold",color:Colors.lightgray,flexShrink: 1 }} >{item.name}</Text>
        </View>
        </View>
        <View style={{marginLeft:10}}>
          <Text style={{fontFamily: "Eudoxus-Sans-Bold"}} >${item.price}</Text>
          <View style={{borderRadius:12,height:20,backgroundColor:Colors.pink,width:65,alignItems:'center',justifyContent:'center',flexDirection:'row'}} >
          <View style={{margin:2,marginRight:4}} >
          <Ionicons name="triangle" size={7} color="white" />
          </View>
            <Text style={{fontFamily: "Eudoxus-Sans-Bold",color:'white',fontSize:12 }} >{item.profit}%</Text>
          </View>
        </View>
      </View>
      </TouchableOpacity>
    );
  };
export default  function Portfolio({data}) {
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
          <Text
            style={{
              fontFamily: "Eudoxus-Sans-Bold",
              fontSize: 18,
              color: "black",
            }}
          >
            Portfolio
          </Text>
          <TouchableOpacity>
            <Text
              style={{
                fontFamily: "Eudoxus-Sans-Bold",
                color: Colors.pink,
                fontSize: 16,
              }}
            >
              View all
            </Text>
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