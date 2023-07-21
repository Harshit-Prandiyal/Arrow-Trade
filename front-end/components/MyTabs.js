import { View, Image, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import HomeViewScreen from "../views/HomeView-screen";
import ExchangeViewScreen from "../views/ExchangeView-screen";
import PortfolioViewScreen from "../views/PortfolioView-screen";
import ProfileViewScreen from "../views/ProfileView-screen";
import OrderHistoryViewScreen from "../views/OrderHistoryView-screen";
import StockDetailViewScreen from "../views/StockDetailView-screen";
const Stack = createNativeStackNavigator();
function HomescreenNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true ,
      headerStyle: {
      backgroundColor: '#fff',
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
      },
      }}>
      <Stack.Screen name="HomeScreen" component={HomeViewScreen} options={{headerShown:false}} />
      <Stack.Screen name="StockDetailScreen" component={StockDetailViewScreen} />
      <Stack.Screen name="PortfolioScreen" component={PortfolioViewScreen} options={{headerShown:false}} />
    </Stack.Navigator>
  );
}

import { Colors } from "../constants/colors";
const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      top: -30,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <View
      style={{
        width: 65,
        height: 65,
        borderRadius: 35,
        backgroundColor: Colors.Darkblue,
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);
const Tab = createBottomTabNavigator();
export function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#ffffff",
          height: 90,
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarActiveTintColor: Colors.Darkblue,
        tabBarInactiveTintColor: Colors.lightgray,
      }}
    >
      <Tab.Screen
        name="HomeScreenNavigator"
        component={HomescreenNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Ionicons
                name="home"
                size={25}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="PortfolioScreen"
        component={PortfolioViewScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Ionicons
                name="pie-chart"
                size={25}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ExchangeScreen"
        component={ExchangeViewScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons
                name="repeat"
                size={25}
                color={'white'}
              />
          ),
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="OrderHistoryScreen"
        component={OrderHistoryViewScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Ionicons
                name="stats-chart"
                size={25}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileViewScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Ionicons
                name="person"
                size={25}
                color={color}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
