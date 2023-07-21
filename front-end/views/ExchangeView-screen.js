import { View , Text ,StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MyText from "../components/MyText";
export default function ExchangeViewScreen(){
    return (
        <View style={styles.container} >  
            <SafeAreaView style={{alignItems:'center'}} >
              <MyText isBold={true} size={18} >Exchange</MyText>
            </SafeAreaView>
            <Text> Exchange screen </Text>
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
  });