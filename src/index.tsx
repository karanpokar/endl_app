/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useAppKit } from "@reown/appkit-ethers5-react-native";
import React from "react";
import type { PropsWithChildren } from "react";
import { Dimensions, StyleSheet, useColorScheme, View } from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";
import { NavigationContainer } from "@react-navigation/native";
import BottomTab from "./screens/Dashboard";
import { useUser } from "./context/useUserContext";
import { AuthNavigator } from "./navigators";
import Toast from "react-native-toast-message";

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Home(): React.JSX.Element {
  const { height, width } = Dimensions.get("screen");
  const { user }: any = useUser();
  const { open } = useAppKit();
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
   height:"100%"
    
  };

  return (
    /*@ts-ignore*/
    <View style={backgroundStyle}>
      <Toast/>
      <NavigationContainer>
        {!user ? <BottomTab /> : <AuthNavigator />}
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
});

export default Home;

{
  /* <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      /> */
}
