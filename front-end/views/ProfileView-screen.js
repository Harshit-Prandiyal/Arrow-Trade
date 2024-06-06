import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Colors } from "../constants/colors";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MyText from "../components/MyText";
import { useSelector } from "react-redux";
import { Ionicons, FontAwesome, Entypo } from "@expo/vector-icons";
const screenWidth = Dimensions.get("window").width;
const Header = () => {
  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "90%",
          marginTop: 10,
        }}
      >
        <MyText size={20} isBold={true}>
          Profile
        </MyText>
        <MyText color={Colors.pink} size={15} isBold={true}>
          Edit Profile
        </MyText>
      </View>
    </SafeAreaView>
  );
};
const ProfileImg = ({ name, email }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        marginHorizontal: 15,
        height: 70,
        marginTop: 35,
      }}
    >
      <View
        style={{
          flex: 3,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            resizeMode="cover"
            source={require("../assets/images/avatar.png")}
          />
        </View>
      </View>
      <View
        style={{ flex: 7, alignItems: "flex-start", justifyContent: "center" }}
      >
        <MyText size={22} isBold={true}>
          {name}
        </MyText>
        <MyText color={Colors.lightgray} size={12}>
          {email}
        </MyText>
      </View>
    </View>
  );
};
const ReferalBox = ({ name, email }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        width: "90%",
        marginHorizontal: 15,
        height: 70,
        marginTop: 35,
        borderRadius: 16,
        backgroundColor: "#F3FBED",
      }}
    >
      <View
        style={{
          flex: 2,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name={"gift-sharp"} size={30} color={Colors.pink} />
        </View>
      </View>
      <View
        style={{ flex: 8, alignItems: "flex-start", justifyContent: "center" }}
      >
        <MyText size={18} isBold={true}>
          {name}
        </MyText>
        <MyText color={Colors.lightgray} size={12}>
          {email}
        </MyText>
      </View>
    </View>
  );
};
export default function ProfileViewScreen() {
  const user = useSelector((state) => state.auth.user);
  return (
    <View style={styles.container}>
      <Header />
      <ProfileImg name={user.name} email={user.email} />
      <ReferalBox
        name={"Referral Code"}
        email={"Share your friend get $20 of free cryptos"}
      />
      <View style={{ marginTop: 20, width: "100%" , flex:1  ,justifyContent:'flex-start' }}>
        {/* Billing and payments  */}
        <View
          style={{
            marginHorizontal: 15,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems:'center'
          }}
        >
          <View style={{flexDirection: "row",justifyContent:'flex-start'}} >
          <FontAwesome name="credit-card-alt" size={25} color={Colors.pink} />
          <MyText size={16} isBold={true} extrastyles={{ marginLeft: 15 }}>
            Billing/Payments
          </MyText>
          </View>
          <Ionicons name="chevron-forward" size={20} />
        </View>
        {/* Language */}
        <View
          style={{
            marginTop:20,
            marginHorizontal: 15,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems:'center'
          }}
        >
          <View style={{flexDirection: "row",justifyContent:'flex-start'}} >
          <Entypo name="language" size={25} color={Colors.pink} />
          <MyText size={16} isBold={true} extrastyles={{ marginLeft: 15 }}>
            Language
          </MyText>
          </View>
          <Ionicons name="chevron-forward" size={20} />
        </View>
         {/* Language */}
         <View
          style={{
            marginTop:20,
            marginHorizontal: 15,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems:'center'
          }}
        >
          <View style={{flexDirection: "row",justifyContent:'flex-start'}} >
          <Ionicons name="settings" size={25} color={Colors.pink} />
          <MyText size={16} isBold={true} extrastyles={{ marginLeft: 15 }}>
            Settings
          </MyText>
          </View>
          <Ionicons name="chevron-forward" size={20} />
        </View>
        {/* Language */}
        <View
          style={{
            marginTop:20,
            marginHorizontal: 15,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems:'center'
          }}
        >
          <View style={{flexDirection: "row",justifyContent:'flex-start'}} >
          <FontAwesome name="question-circle" size={25} color={Colors.pink} />
          <MyText size={16} isBold={true} extrastyles={{ marginLeft: 15 }}>
            FAQ
          </MyText>
          </View>
          <Ionicons name="chevron-forward" size={20} />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontFamily: "Eudoxus-Sans-Bold",
  },
});
