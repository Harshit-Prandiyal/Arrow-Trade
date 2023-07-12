import { View, Text, StyleSheet ,FlatList} from "react-native";

import { useFonts } from "expo-font";

import { Colors } from "../constants/colors";

function renderWatchlistItem({item}){
    return (
        <View style={{height:250,width:200,backgroundColor: Colors.whitishgrey,}} >
            <Text>{item.name}</Text>
        </View>
    );
}

export default function YourWatchList({data}) {
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
    <View style={{alignItems:'flex-start',width:'95%',marginBottom:40,flex:1}}>
      <Text
        style={{
          fontFamily: "Eudoxus-Sans-Bold",
          fontSize: 18,
          color: "black",
        }}
      >
        Your Watchlist
      </Text>
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
