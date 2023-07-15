import { Text } from "react-native";
import { useFonts } from "expo-font";
export default function MyText({children,color,size,isBold,extrastyles}){
    const [fontsLoaded] = useFonts({
        "Eudoxus-Sans-Bold": require("../assets/fonts/EudoxusSans-Bold.ttf"),
        "Eudoxus-Sans-Regular": require("../assets/fonts/EudoxusSans-Regular.ttf"),
      });
      if (!fontsLoaded) {
        return (
            <Text style={{...(size && {fontSize:size}),
            ...(color && {color:color}),
            ...(extrastyles && extrastyles),}} >{children}</Text>
        );
      }
      return (
        <Text style={{
            fontFamily: isBold ? "Eudoxus-Sans-Bold" : "Eudoxus-Sans-Regular" ,
              ...(size && {fontSize:size}),
              ...(color && {color:color}),
              ...(extrastyles && extrastyles),
        }} >{children}</Text>
      );
}