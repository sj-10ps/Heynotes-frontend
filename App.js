import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button, Settings } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import {Ionicons} from '@expo/vector-icons'
import Tasks from "./components/Tasks";
import Taskform from "./components/Taskform";
import Taskdetails from "./components/Taskdetails";
import Edittask from "./components/Edittask";
import Settingspage from "./components/Settings";

const Bottomnavigator=createBottomTabNavigator()
const StackNavigator=createStackNavigator()


export default function App() {
 
  
  return (
   <NavigationContainer>
     <StackNavigatorComponent/>
   </NavigationContainer>
  );
}


const StackNavigatorComponent=()=>{ 
  return(
    <StackNavigator.Navigator initialRouteName="home" >
       <StackNavigator.Screen  name="home" component={BottomnavigatorComponent} options={{headerShown:false}}/>
        <StackNavigator.Screen  name="Taskdetails" component={Taskdetails} />
        <StackNavigator.Screen  name="Edittask" component={Edittask} />
        <StackNavigator.Screen  name="Settings" component={Settingspage} />
    </StackNavigator.Navigator>
  )
}

const BottomnavigatorComponent=()=>{
  return(
  <Bottomnavigator.Navigator screenOptions={({route})=>({
     tabBarIcon:({color,size})=>{
      let iconname
      if(route.name==="Tasks") iconname="clipboard-outline"
      else iconname="add-circle"
      return <Ionicons color={color} size={size} name={iconname}/>
     },
     tabBarInactiveTintColor:'grey',
     tabBarActiveTintColor:'red',
     animation:'fade'

  })}>
     <Bottomnavigator.Screen name="Tasks" component={Tasks}/>
     <Bottomnavigator.Screen name="Addtasks" component={Taskform}/>
    
  </Bottomnavigator.Navigator>
  )
}




