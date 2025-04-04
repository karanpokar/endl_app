import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Transaction from "./Transaction";
import Profile from "./Profile";
import { AppNavigator } from "../navigators";

const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen name="Transaction" component={AppNavigator} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default BottomTab;
