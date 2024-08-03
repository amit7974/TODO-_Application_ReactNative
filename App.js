import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Detail from "./screens/Detail";
import Home from "./screens/Home";

 const Stack = createStackNavigator();
 export default function App(){
  return(
<NavigationContainer>
<Stack.Navigator screenOptions={{headerShown:false}}>
<Stack.Screen
name='Home'
getComponent={Home}
/>
<Stack.Screen
name='Detail'
component={Detail}
/>
</Stack.Navigator>
</NavigationContainer>

  )
 }