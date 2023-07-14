import { View, Text, StyleSheet ,FlatList} from "react-native";


import { Colors } from "../constants/colors";

import MyText from "./MyText";
function renderWatchlistItem({item}){
    return (
        <View style={{height:250,width:200,backgroundColor: Colors.whitishgrey,}} >
            <Text>{item.name}</Text>
        </View>
    );
}

export default function YourWatchList({data}) {
  return (
    <View style={{alignItems:'flex-start',width:'95%',marginBottom:40,flex:1}}>
      <MyText isBold={true} size={18} color={"black"} >Your Watchlist</MyText>
      <FlatList
          data={data}
          renderItem={renderWatchlistItem}
          keyExtractor={(item) => item.id}
          horizontal={true}
        />
    </View>
  );
}
const styles = StyleSheet.create({});
