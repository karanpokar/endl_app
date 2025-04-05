import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Transaction from "./Transaction";
import Profile from "./Profile";
import { AppNavigator } from "../navigators";

import Icon from "react-native-vector-icons";
import { Image } from "react-native";

const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Wallet"
        component={AppNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              style={{ height: 24, width: 24 }}
              source={require("../assets/icons/wallet.png")}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              style={{ height: 24, width: 24 }}
              source={require("../assets/icons/user.png")}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTab;
