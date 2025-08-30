import React, { useState } from "react";
import { View, StyleSheet ,Text, Button} from "react-native";
import ColorPicker from "react-native-wheel-color-picker";
import { useDispatch, useSelector } from "react-redux";
import { reset, setColor } from "../redux/notecolorslice";
import { useNavigation } from "@react-navigation/native";

const Settingspage =()=> {
  const dispatch=useDispatch()
  const navigate=useNavigation()
  const {backgroundColor}=useSelector(state=>state.notecolor)

  return (
    <View style={[styles.container,{backgroundColor:backgroundColor}]}>
        <Text style={{fontWeight:"bold",fontSize:30,textAlign:'center'}}>Choose Notes BG</Text>
      <ColorPicker
        color={backgroundColor}
        onColorChange={(color)=>dispatch(setColor(color))}
        thumbSize={30}
        sliderSize={30}
        noSnap={true}
        row={false}
      />
      <View style={styles.buttons}>
       <Button title="save" onPress={()=>navigate.navigate('home')} ></Button>
       <Button title="reset" color={'grey'} onPress={()=>dispatch(reset())} ></Button>
       <Button title="Cancel" color={'red'} onPress={()=>navigate.navigate('home')} ></Button>
      </View>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display:'flex',
    height:500,
    width:300,
    padding: 30,
    alignSelf:'center'
  },
  buttons:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:30
    
  }
});

export default Settingspage
