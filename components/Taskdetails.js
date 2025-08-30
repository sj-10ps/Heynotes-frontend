import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from "@expo/vector-icons";
import { viewnotebyid } from '../redux/noteviewbyid';
import { deletetask } from '../redux/deletetaskslice';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Taskdetails = () => {
  const route = useRoute();
  const { id } = route.params;
  const { loading, success, data } = useSelector(state => state.viewnotebyid);
  const dispatch = useDispatch();
  const navigate=useNavigation()
  const [pinned,setpinned]=useState([])

    useEffect(() => {
    dispatch(viewnotebyid(id));
    loadpins()
  }, [id]);

  const loadpins=async()=>{
    const data=await AsyncStorage.getItem("PINNED")
    if(data){
      setpinned(JSON.parse(data))
    }
  }

   const handledelete=()=>{
    Alert.alert(
        "Delete task",
        "Are you sure you want to delete this task??",[
            {
                text:'Cancel',
                style:'cancel'
            },
            {
                text:'ok',
                onPress:async()=>{
                    await dispatch(deletetask(id))
    const updatedpins=pinned.filter(p=>p.id!==id)
    setpinned(updatedpins)
    await AsyncStorage.setItem("PINNED",JSON.stringify(updatedpins))
    navigate.goBack()               
                    }
                
            }
        ],
        {
            cancelable:true
        }
    )

    
  }

  if (loading) return <ActivityIndicator color={'red'} size={'large'} style={{ flex: 1 }} />;

  if (!data) return (
    <View style={styles.container}>
      <Text style={styles.error}>Note not found</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.scroll}>

        <Text style={styles.title}>{data.title}</Text>

 
        <Text style={styles.content}>{data.content}</Text>

     
        <Text style={styles.date}>
          Created: {new Date(data.createdAt).toLocaleDateString()} {new Date(data.createdAt).toLocaleTimeString()}
        </Text>
        <Text style={styles.date}>
          Updated: {new Date(data.updatedAt).toLocaleDateString()} {new Date(data.createdAt).toLocaleTimeString()}
        </Text>

      
        <View style={styles.actions}>
          <TouchableOpacity style={styles.iconBtn} onPress={()=>navigate.navigate('Edittask',{data:data})}>
            <Ionicons name="pencil" size={24} color="blue" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={handledelete}>
            <Ionicons name="trash" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    padding: 16,
 
  },
  scroll: {
    
    justifyContent: "flex-start",
    backgroundColor:'#ccc',
       padding:10,
       borderRadius:12,
       elevation:12
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  content: {
    fontSize: 18,
    lineHeight: 24,
    color: "#444",
    marginBottom: 20,
  },
  date: {
    fontSize: 14,
    color: "gray",
    marginBottom: 30,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 20,
  },
  iconBtn: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#f5f5f5",
  },
  error: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 50,
  },
});

export default Taskdetails;
