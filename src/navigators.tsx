import { createStackNavigator } from '@react-navigation/stack';
import BottomTab from './screens/Dashboard';
import Login from './screens/Login';
import HomeScreen from './screens/HomeScreen';
import Transaction from './screens/Transaction';
import Success from './screens/Success';

const Stack = createStackNavigator();

  export function AuthNavigator() {
    return (
      <Stack.Navigator 
      screenOptions={{
        headerShown:false
      }}
      initialRouteName='Login'>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="BottomTab" component={BottomTab} />
      </Stack.Navigator>
    );
  }
  export function AppNavigator() {
    return (
      <Stack.Navigator
      screenOptions={{
        headerShown:false
      }}
      initialRouteName='HomeScreen'>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Transaction" component={Transaction} />
        <Stack.Screen name="Success" component={Success} />
      </Stack.Navigator>
    );
  }